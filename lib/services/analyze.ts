import { db } from '../db/connection';
import { learningSessions, blindSpots, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import aiClient from '../ai-client';
import { logger } from '../logger';
import { AppError } from '../error-handler';
import type { AnalyzeRequest, AnalyzeResponse, BlindSpot, AIAnalysis } from '../../types';

export class AnalyzeService {
  async analyzeContent(request: AnalyzeRequest, userId: number): Promise<AnalyzeResponse> {
    const startTime = Date.now();
    
    try {
      logger.info('Starting content analysis', { userId, contentLength: request.content.length });

      // Validate input
      if (!request.content || request.content.trim().length === 0) {
        throw new AppError('Content cannot be empty', 400);
      }

      if (request.content.length > 10000) {
        throw new AppError('Content too long. Maximum 10,000 characters allowed.', 400);
      }

      // Create learning session record
      const [session] = await db.insert(learningSessions).values({
        userId,
        content: request.content.trim()
      }).returning();

      logger.databaseOperation('insert', 'learning_sessions', true, Date.now() - startTime);

      // Call AI service for analysis
      const aiStartTime = Date.now();
      const aiAnalysis = await aiClient.analyzeContent({
        content: request.content,
        userAssessment: request.userAssessment
      });
      
      logger.aiCall('analyzeContent', true, Date.now() - aiStartTime);

      // Process AI response and create blind spots
      const blindSpotsData = aiAnalysis.topics
        .filter(topic => topic.isBlindSpot)
        .map(topic => ({
          userId,
          topic: topic.topic,
          confidence: topic.confidence,
          aiAnalysis: {
            topics: aiAnalysis.topics,
            analysis: aiAnalysis.analysis,
            recommendations: this.generateRecommendations(topic.topic, topic.confidence)
          }
        }));

      // Insert blind spots into database
      let insertedBlindSpots: BlindSpot[] = [];
      if (blindSpotsData.length > 0) {
        insertedBlindSpots = await db.insert(blindSpots).values(blindSpotsData).returning();
        logger.databaseOperation('insert', 'blind_spots', true, Date.now() - startTime);
      }

      logger.info('Content analysis completed', { 
        userId, 
        blindSpotsCount: insertedBlindSpots.length,
        duration: Date.now() - startTime 
      });

      return {
        blindSpots: insertedBlindSpots,
        analysis: {
          topics: aiAnalysis.topics,
          analysis: aiAnalysis.analysis,
          recommendations: this.generateOverallRecommendations(aiAnalysis.topics)
        }
      };

    } catch (error) {
      logger.error('Content analysis failed', { userId, error }, error as Error);
      throw error;
    }
  }

  async getUserBlindSpots(userId: number): Promise<BlindSpot[]> {
    try {
      const userBlindSpots = await db
        .select()
        .from(blindSpots)
        .where(eq(blindSpots.userId, userId))
        .orderBy(blindSpots.createdAt);

      logger.databaseOperation('select', 'blind_spots', true, 0);
      return userBlindSpots;
    } catch (error) {
      logger.error('Failed to retrieve user blind spots', { userId }, error as Error);
      throw new AppError('Failed to retrieve blind spots', 500);
    }
  }

  async getBlindSpotById(blindSpotId: number, userId: number): Promise<BlindSpot | null> {
    try {
      const [blindSpot] = await db
        .select()
        .from(blindSpots)
        .where(eq(blindSpots.id, blindSpotId))
        .where(eq(blindSpots.userId, userId))
        .limit(1);

      logger.databaseOperation('select', 'blind_spots', true, 0);
      return blindSpot || null;
    } catch (error) {
      logger.error('Failed to retrieve blind spot', { blindSpotId, userId }, error as Error);
      throw new AppError('Failed to retrieve blind spot', 500);
    }
  }

  async deleteBlindSpot(blindSpotId: number, userId: number): Promise<boolean> {
    try {
      const result = await db
        .delete(blindSpots)
        .where(eq(blindSpots.id, blindSpotId))
        .where(eq(blindSpots.userId, userId));

      logger.databaseOperation('delete', 'blind_spots', true, 0);
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Failed to delete blind spot', { blindSpotId, userId }, error as Error);
      throw new AppError('Failed to delete blind spot', 500);
    }
  }

  async getAnalysisHistory(userId: number, limit: number = 10): Promise<Array<{
    sessionId: number;
    content: string;
    createdAt: Date;
    blindSpotsCount: number;
  }>> {
    try {
      const history = await db
        .select({
          sessionId: learningSessions.id,
          content: learningSessions.content,
          createdAt: learningSessions.createdAt,
          blindSpotsCount: blindSpots.id
        })
        .from(learningSessions)
        .leftJoin(blindSpots, eq(learningSessions.id, blindSpots.userId))
        .where(eq(learningSessions.userId, userId))
        .groupBy(learningSessions.id)
        .orderBy(learningSessions.createdAt)
        .limit(limit);

      logger.databaseOperation('select', 'learning_sessions', true, 0);
      return history;
    } catch (error) {
      logger.error('Failed to retrieve analysis history', { userId }, error as Error);
      throw new AppError('Failed to retrieve analysis history', 500);
    }
  }

  private generateRecommendations(topic: string, confidence: number): string[] {
    const recommendations: string[] = [];
    
    if (confidence < 0.3) {
      recommendations.push(`Start with basic concepts of ${topic}`);
      recommendations.push(`Find beginner-friendly resources for ${topic}`);
    } else if (confidence < 0.6) {
      recommendations.push(`Practice more exercises on ${topic}`);
      recommendations.push(`Review intermediate concepts of ${topic}`);
    } else {
      recommendations.push(`Focus on advanced applications of ${topic}`);
      recommendations.push(`Teach others about ${topic} to reinforce learning`);
    }

    return recommendations;
  }

  private generateOverallRecommendations(topics: Array<{ topic: string; confidence: number; isBlindSpot: boolean }>): string[] {
    const blindSpotTopics = topics.filter(t => t.isBlindSpot);
    const strongTopics = topics.filter(t => !t.isBlindSpot && t.confidence > 0.7);
    
    const recommendations: string[] = [];
    
    if (blindSpotTopics.length > 0) {
      recommendations.push(`Focus on these areas: ${blindSpotTopics.map(t => t.topic).join(', ')}`);
    }
    
    if (strongTopics.length > 0) {
      recommendations.push(`Build on your strengths in: ${strongTopics.map(t => t.topic).join(', ')}`);
    }
    
    if (blindSpotTopics.length > 3) {
      recommendations.push('Consider breaking down complex topics into smaller, manageable parts');
    }
    
    return recommendations;
  }
}

export const analyzeService = new AnalyzeService();
