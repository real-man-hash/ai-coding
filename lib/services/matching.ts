import { db } from '../db/connection';
import { users, buddyMatches, blindSpots } from '../db/schema';
import { eq, and, ne, sql } from 'drizzle-orm';
import { logger } from '../logger';
import { AppError } from '../error-handler';
import aiClient from '../ai-client';

export interface UserProfile {
  userId: string;
  learningPatterns: {
    preferredSubjects: string[];
    studyStyle: string;
    availability: string;
    experienceLevel: string;
  };
  knowledgeGaps: Array<{
    topic: string;
    confidence: number;
  }>;
}

export interface MatchResult {
  userId: string;
  compatibilityScore: number;
  commonTopics: string[];
  learningStyle: string;
  availability: string;
  suggestedActivities: string[];
}

export interface MatchingResponse {
  matches: MatchResult[];
  suggestedTopics: Array<{
    topic: string;
    reason: string;
  }>;
}

export class MatchingService {
  async findMatches(userProfile: UserProfile): Promise<MatchingResponse> {
    const startTime = Date.now();
    
    try {
      logger.info('Starting buddy matching process', { userId: userProfile.userId });

      // Get all users except the requesting user
      const allUsers = await db
        .select()
        .from(users)
        .where(ne(users.id, parseInt(userProfile.userId)));

      logger.databaseOperation('select', 'users', true, Date.now() - startTime);

      // Calculate compatibility scores for each potential match
      const matches: MatchResult[] = [];
      
      for (const user of allUsers) {
        const compatibilityScore = await this.calculateCompatibility(userProfile, user);
        
        if (compatibilityScore > 0.3) { // Only include matches with reasonable compatibility
          const commonTopics = this.findCommonTopics(userProfile, user);
          const suggestedActivities = await this.generateSuggestedActivities(userProfile, user, commonTopics);
          
          matches.push({
            userId: user.id.toString(),
            compatibilityScore,
            commonTopics,
            learningStyle: user.studyStyle?.learningType || 'unknown',
            availability: user.availability?.time || 'flexible',
            suggestedActivities
          });
        }
      }

      // Sort matches by compatibility score (descending)
      matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

      // Generate AI-suggested discussion topics
      const suggestedTopics = await this.generateDiscussionTopics(userProfile);

      // Store matches in database
      await this.storeMatches(userProfile.userId, matches);

      logger.info('Buddy matching completed', { 
        userId: userProfile.userId, 
        matchesCount: matches.length,
        duration: Date.now() - startTime 
      });

      return {
        matches: matches.slice(0, 10), // Return top 10 matches
        suggestedTopics
      };

    } catch (error) {
      logger.error('Buddy matching failed', { userId: userProfile.userId, error }, error as Error);
      throw error;
    }
  }

  async getUserMatches(userId: string): Promise<MatchResult[]> {
    try {
      const matches = await db
        .select({
          userId: buddyMatches.userId2,
          compatibilityScore: buddyMatches.compatibilityScore,
          commonTopics: buddyMatches.commonTopics,
          suggestedActivities: buddyMatches.suggestedActivities,
          status: buddyMatches.status
        })
        .from(buddyMatches)
        .where(eq(buddyMatches.userId1, parseInt(userId)))
        .orderBy(buddyMatches.compatibilityScore);

      logger.databaseOperation('select', 'buddy_matches', true, 0);
      
      return matches.map(match => ({
        userId: match.userId.toString(),
        compatibilityScore: match.compatibilityScore,
        commonTopics: match.commonTopics as string[] || [],
        learningStyle: 'unknown', // Would need to join with users table for full details
        availability: 'flexible',
        suggestedActivities: match.suggestedActivities as string[] || []
      }));
    } catch (error) {
      logger.error('Failed to retrieve user matches', { userId }, error as Error);
      throw new AppError('Failed to retrieve matches', 500);
    }
  }

  async updateMatchStatus(matchId: number, status: 'accepted' | 'rejected' | 'active'): Promise<boolean> {
    try {
      const result = await db
        .update(buddyMatches)
        .set({ status })
        .where(eq(buddyMatches.id, matchId));

      logger.databaseOperation('update', 'buddy_matches', true, 0);
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Failed to update match status', { matchId, status }, error as Error);
      throw new AppError('Failed to update match status', 500);
    }
  }

  private async calculateCompatibility(userProfile: UserProfile, candidateUser: any): Promise<number> {
    let score = 0;
    let factors = 0;

    // Subject overlap (40% weight)
    const userSubjects = userProfile.learningPatterns.preferredSubjects;
    const candidateSubjects = candidateUser.interestTags || [];
    const subjectOverlap = this.calculateOverlap(userSubjects, candidateSubjects);
    score += subjectOverlap * 0.4;
    factors += 0.4;

    // Learning style compatibility (20% weight)
    const userStyle = userProfile.learningPatterns.studyStyle;
    const candidateStyle = candidateUser.studyStyle?.learningType;
    const styleCompatibility = this.calculateStyleCompatibility(userStyle, candidateStyle);
    score += styleCompatibility * 0.2;
    factors += 0.2;

    // Experience level compatibility (20% weight)
    const userLevel = userProfile.learningPatterns.experienceLevel;
    const candidateLevel = candidateUser.experienceLevel;
    const levelCompatibility = this.calculateLevelCompatibility(userLevel, candidateLevel);
    score += levelCompatibility * 0.2;
    factors += 0.2;

    // Knowledge gap complementarity (20% weight)
    const gapComplementarity = await this.calculateGapComplementarity(userProfile, candidateUser);
    score += gapComplementarity * 0.2;
    factors += 0.2;

    return factors > 0 ? score / factors : 0;
  }

  private calculateOverlap(arr1: string[], arr2: string[]): number {
    if (arr1.length === 0 || arr2.length === 0) return 0;
    
    const set1 = new Set(arr1.map(s => s.toLowerCase()));
    const set2 = new Set(arr2.map(s => s.toLowerCase()));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  private calculateStyleCompatibility(style1: string, style2: string): number {
    if (!style1 || !style2) return 0.5; // Neutral if unknown
    
    const compatibleStyles = {
      'visual': ['visual', 'hands-on'],
      'hands-on': ['hands-on', 'visual', 'kinesthetic'],
      'reading': ['reading', 'auditory'],
      'auditory': ['auditory', 'reading'],
      'kinesthetic': ['kinesthetic', 'hands-on']
    };

    const compatible = compatibleStyles[style1.toLowerCase()] || [];
    return compatible.includes(style2.toLowerCase()) ? 1.0 : 0.3;
  }

  private calculateLevelCompatibility(level1: string, level2: string): number {
    if (!level1 || !level2) return 0.5;
    
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const index1 = levels.indexOf(level1.toLowerCase());
    const index2 = levels.indexOf(level2.toLowerCase());
    
    if (index1 === -1 || index2 === -1) return 0.5;
    
    const diff = Math.abs(index1 - index2);
    return Math.max(0, 1 - diff * 0.3);
  }

  private async calculateGapComplementarity(userProfile: UserProfile, candidateUser: any): Promise<number> {
    try {
      // Get candidate's blind spots
      const candidateBlindSpots = await db
        .select()
        .from(blindSpots)
        .where(eq(blindSpots.userId, candidateUser.id));

      const userTopics = userProfile.knowledgeGaps.map(gap => gap.topic.toLowerCase());
      const candidateTopics = candidateBlindSpots.map(spot => spot.topic.toLowerCase());

      // Check for complementary gaps (user struggles with what candidate knows well, and vice versa)
      const userStrongTopics = userProfile.knowledgeGaps
        .filter(gap => gap.confidence > 0.7)
        .map(gap => gap.topic.toLowerCase());
      
      const candidateStrongTopics = candidateBlindSpots
        .filter(spot => spot.confidence > 0.7)
        .map(spot => spot.topic.toLowerCase());

      const complementarity = this.calculateOverlap(userTopics, candidateStrongTopics) +
                            this.calculateOverlap(candidateTopics, userStrongTopics);

      return Math.min(complementarity, 1.0);
    } catch (error) {
      logger.error('Failed to calculate gap complementarity', { error }, error as Error);
      return 0.5; // Neutral score if calculation fails
    }
  }

  private findCommonTopics(userProfile: UserProfile, candidateUser: any): string[] {
    const userSubjects = userProfile.learningPatterns.preferredSubjects;
    const candidateSubjects = candidateUser.interestTags || [];
    
    return userSubjects.filter(subject => 
      candidateSubjects.some(candidateSubject => 
        candidateSubject.toLowerCase().includes(subject.toLowerCase()) ||
        subject.toLowerCase().includes(candidateSubject.toLowerCase())
      )
    );
  }

  private async generateSuggestedActivities(
    userProfile: UserProfile, 
    candidateUser: any, 
    commonTopics: string[]
  ): Promise<string[]> {
    const activities: string[] = [];
    
    // Basic activity suggestions based on common topics
    if (commonTopics.length > 0) {
      activities.push(`Study ${commonTopics[0]} together`);
      activities.push(`Work on ${commonTopics[0]} problems`);
    }

    // AI-generated suggestions
    try {
      const aiSuggestions = await aiClient.generateStudyActivities({
        userProfile,
        candidateProfile: {
          learningStyle: candidateUser.studyStyle?.learningType || 'unknown',
          subjects: candidateUser.interestTags || [],
          experienceLevel: candidateUser.experienceLevel || 'intermediate'
        },
        commonTopics
      });

      activities.push(...aiSuggestions);
    } catch (error) {
      logger.error('Failed to generate AI study activities', { error }, error as Error);
      // Fallback to basic suggestions
      activities.push('Schedule regular study sessions');
      activities.push('Share study resources and notes');
    }

    return activities.slice(0, 5); // Limit to 5 suggestions
  }

  private async generateDiscussionTopics(userProfile: UserProfile): Promise<Array<{topic: string, reason: string}>> {
    try {
      const topics = await aiClient.generateDiscussionTopics({
        learningPatterns: userProfile.learningPatterns,
        knowledgeGaps: userProfile.knowledgeGaps
      });

      return topics.map(topic => ({
        topic: topic.topic,
        reason: topic.reason || `Based on your interest in ${topic.topic}`
      }));
    } catch (error) {
      logger.error('Failed to generate discussion topics', { error }, error as Error);
      
      // Fallback topics based on user's subjects
      return userProfile.learningPatterns.preferredSubjects.map(subject => ({
        topic: `Latest developments in ${subject}`,
        reason: `You're interested in ${subject}`
      }));
    }
  }

  private async storeMatches(userId: string, matches: MatchResult[]): Promise<void> {
    try {
      const matchData = matches.map(match => ({
        userId1: parseInt(userId),
        userId2: parseInt(match.userId),
        compatibilityScore: match.compatibilityScore,
        commonTopics: match.commonTopics,
        suggestedActivities: match.suggestedActivities,
        status: 'pending' as const
      }));

      await db.insert(buddyMatches).values(matchData);
      logger.databaseOperation('insert', 'buddy_matches', true, 0);
    } catch (error) {
      logger.error('Failed to store matches', { userId, error }, error as Error);
      // Don't throw error here as the main matching process should continue
    }
  }
}

export const matchingService = new MatchingService();
