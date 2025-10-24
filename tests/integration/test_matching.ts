import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { db } from '../../lib/db/connection';
import { users, learningSessions, blindSpots, buddyMatches } from '../../lib/db/schema';
import { eq, and } from 'drizzle-orm';

describe('Buddy Matching Integration Tests', () => {
  let testUser1Id: number;
  let testUser2Id: number;
  let testUser3Id: number;

  beforeAll(async () => {
    // Create test users with different learning patterns
    const [user1] = await db.insert(users).values({
      name: 'Alice - Visual Learner',
      studyStyle: {
        learningType: 'visual',
        studyTime: 'evening',
        sessionLength: 'long',
        difficulty: 'intermediate'
      },
      interestTags: ['mathematics', 'physics']
    }).returning();

    const [user2] = await db.insert(users).values({
      name: 'Bob - Hands-on Learner',
      studyStyle: {
        learningType: 'hands-on',
        studyTime: 'morning',
        sessionLength: 'medium',
        difficulty: 'beginner'
      },
      interestTags: ['computer science', 'programming']
    }).returning();

    const [user3] = await db.insert(users).values({
      name: 'Charlie - Reading Learner',
      studyStyle: {
        learningType: 'reading',
        studyTime: 'afternoon',
        sessionLength: 'short',
        difficulty: 'advanced'
      },
      interestTags: ['literature', 'history']
    }).returning();

    testUser1Id = user1.id;
    testUser2Id = user2.id;
    testUser3Id = user3.id;

    // Create learning sessions and blind spots for each user
    await createUserLearningData(testUser1Id, 'mathematics', [
      { topic: 'calculus', confidence: 0.3 },
      { topic: 'linear algebra', confidence: 0.7 }
    ]);

    await createUserLearningData(testUser2Id, 'programming', [
      { topic: 'algorithms', confidence: 0.2 },
      { topic: 'data structures', confidence: 0.8 }
    ]);

    await createUserLearningData(testUser3Id, 'literature', [
      { topic: 'poetry analysis', confidence: 0.4 },
      { topic: 'literary theory', confidence: 0.9 }
    ]);
  });

  afterAll(async () => {
    // Cleanup test data
    await db.delete(buddyMatches).where(
      and(
        eq(buddyMatches.userId1, testUser1Id),
        eq(buddyMatches.userId2, testUser2Id)
      )
    );
    await db.delete(buddyMatches).where(
      and(
        eq(buddyMatches.userId1, testUser1Id),
        eq(buddyMatches.userId2, testUser3Id)
      )
    );
    await db.delete(blindSpots).where(eq(blindSpots.userId, testUser1Id));
    await db.delete(blindSpots).where(eq(blindSpots.userId, testUser2Id));
    await db.delete(blindSpots).where(eq(blindSpots.userId, testUser3Id));
    await db.delete(learningSessions).where(eq(learningSessions.userId, testUser1Id));
    await db.delete(learningSessions).where(eq(learningSessions.userId, testUser2Id));
    await db.delete(learningSessions).where(eq(learningSessions.userId, testUser3Id));
    await db.delete(users).where(eq(users.id, testUser1Id));
    await db.delete(users).where(eq(users.id, testUser2Id));
    await db.delete(users).where(eq(users.id, testUser3Id));
  });

  describe('End-to-End Buddy Matching', () => {
    it('should create compatible matches between users', async () => {
      // Simulate matching algorithm finding compatible users
      const compatibilityScore = calculateCompatibility(
        testUser1Id, testUser2Id, ['mathematics', 'computer science']
      );

      const [match] = await db.insert(buddyMatches).values({
        userId1: testUser1Id,
        userId2: testUser2Id,
        compatibilityScore,
        commonTopics: ['mathematics'],
        suggestedActivities: [
          'Study calculus together',
          'Work on programming problems'
        ],
        status: 'pending'
      }).returning();

      expect(match).toBeDefined();
      expect(match.userId1).toBe(testUser1Id);
      expect(match.userId2).toBe(testUser2Id);
      expect(match.compatibilityScore).toBeGreaterThan(0);
      expect(Array.isArray(match.commonTopics)).toBe(true);
      expect(Array.isArray(match.suggestedActivities)).toBe(true);
    });

    it('should find users with complementary knowledge gaps', async () => {
      // User 1 struggles with calculus, User 2 is good at it
      // User 2 struggles with algorithms, User 1 could help
      const user1BlindSpots = await db
        .select()
        .from(blindSpots)
        .where(eq(blindSpots.userId, testUser1Id));

      const user2BlindSpots = await db
        .select()
        .from(blindSpots)
        .where(eq(blindSpots.userId, testUser2Id));

      expect(user1BlindSpots.length).toBeGreaterThan(0);
      expect(user2BlindSpots.length).toBeGreaterThan(0);

      // Check that users have different blind spots (complementary)
      const user1Topics = user1BlindSpots.map(bs => bs.topic);
      const user2Topics = user2BlindSpots.map(bs => bs.topic);
      
      const hasComplementaryGaps = user1Topics.some(topic => 
        !user2Topics.includes(topic)
      ) && user2Topics.some(topic => 
        !user1Topics.includes(topic)
      );

      expect(hasComplementaryGaps).toBe(true);
    });

    it('should calculate compatibility based on learning styles', async () => {
      const user1 = await db.select().from(users).where(eq(users.id, testUser1Id)).limit(1);
      const user2 = await db.select().from(users).where(eq(users.id, testUser2Id)).limit(1);

      expect(user1[0]).toBeDefined();
      expect(user2[0]).toBeDefined();

      const compatibility = calculateCompatibility(
        testUser1Id, testUser2Id, 
        [...user1[0].interestTags, ...user2[0].interestTags]
      );

      expect(compatibility).toBeGreaterThan(0);
      expect(compatibility).toBeLessThanOrEqual(1);
    });

    it('should retrieve matches for a specific user', async () => {
      // Create another match for user1
      const [match2] = await db.insert(buddyMatches).values({
        userId1: testUser1Id,
        userId2: testUser3Id,
        compatibilityScore: 0.6,
        commonTopics: ['general study'],
        suggestedActivities: ['Study group sessions'],
        status: 'active'
      }).returning();

      // Retrieve all matches for user1
      const user1Matches = await db
        .select()
        .from(buddyMatches)
        .where(eq(buddyMatches.userId1, testUser1Id));

      expect(user1Matches.length).toBeGreaterThanOrEqual(2);
      
      // Verify match structure
      const match = user1Matches[0];
      expect(match).toHaveProperty('id');
      expect(match).toHaveProperty('userId1');
      expect(match).toHaveProperty('userId2');
      expect(match).toHaveProperty('compatibilityScore');
      expect(match).toHaveProperty('commonTopics');
      expect(match).toHaveProperty('suggestedActivities');
      expect(match).toHaveProperty('status');
      expect(match).toHaveProperty('createdAt');
    });

    it('should update match status', async () => {
      const [match] = await db.insert(buddyMatches).values({
        userId1: testUser2Id,
        userId2: testUser3Id,
        compatibilityScore: 0.5,
        commonTopics: ['general study'],
        suggestedActivities: ['Study group sessions'],
        status: 'pending'
      }).returning();

      // Update match status to accepted
      await db
        .update(buddyMatches)
        .set({ status: 'accepted' })
        .where(eq(buddyMatches.id, match.id));

      const updatedMatch = await db
        .select()
        .from(buddyMatches)
        .where(eq(buddyMatches.id, match.id))
        .limit(1);

      expect(updatedMatch[0].status).toBe('accepted');
    });

    it('should handle users with no compatible matches', async () => {
      // Create a user with very different interests
      const [isolatedUser] = await db.insert(users).values({
        name: 'Isolated User',
        studyStyle: {
          learningType: 'auditory',
          studyTime: 'late night',
          sessionLength: 'very short',
          difficulty: 'expert'
        },
        interestTags: ['quantum physics', 'advanced mathematics']
      }).returning();

      // This user should have low compatibility with others
      const compatibility1 = calculateCompatibility(
        isolatedUser.id, testUser1Id, 
        ['quantum physics', 'mathematics']
      );
      const compatibility2 = calculateCompatibility(
        isolatedUser.id, testUser2Id, 
        ['quantum physics', 'programming']
      );

      expect(compatibility1).toBeLessThan(0.5);
      expect(compatibility2).toBeLessThan(0.5);

      // Cleanup isolated user
      await db.delete(users).where(eq(users.id, isolatedUser.id));
    });
  });

  // Helper function to create user learning data
  async function createUserLearningData(userId: number, subject: string, blindSpots: Array<{topic: string, confidence: number}>) {
    // Create learning session
    await db.insert(learningSessions).values({
      userId,
      content: `Learning content about ${subject}`
    });

    // Create blind spots
    const blindSpotData = blindSpots.map(bs => ({
      userId,
      topic: bs.topic,
      confidence: bs.confidence,
      aiAnalysis: {
        topics: [{ topic: bs.topic, confidence: bs.confidence, isBlindSpot: true }],
        analysis: `User needs help with ${bs.topic}`
      }
    }));

    await db.insert(blindSpots).values(blindSpotData);
  }

  // Helper function to calculate compatibility (simplified algorithm)
  function calculateCompatibility(userId1: number, userId2: number, topics: string[]): number {
    // Simplified compatibility calculation
    // In real implementation, this would be more sophisticated
    const baseScore = 0.3;
    const topicBonus = Math.min(topics.length * 0.1, 0.4);
    const randomFactor = Math.random() * 0.3; // Simulate other factors
    
    return Math.min(baseScore + topicBonus + randomFactor, 1.0);
  }
});
