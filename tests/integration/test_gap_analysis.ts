import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { db } from '../../lib/db/connection';
import { users, learningSessions, blindSpots } from '../../lib/db/schema';
import { eq } from 'drizzle-orm';

describe('Knowledge Gap Analysis Integration Tests', () => {
  let testUserId: number;

  beforeAll(async () => {
    // Create a test user
    const [user] = await db.insert(users).values({
      name: 'Test User',
      studyStyle: {
        learningType: 'visual',
        studyTime: 'evening',
        sessionLength: 'medium',
        difficulty: 'intermediate'
      },
      interestTags: ['mathematics', 'computer science']
    }).returning();
    
    testUserId = user.id;
  });

  afterAll(async () => {
    // Cleanup test data
    await db.delete(blindSpots).where(eq(blindSpots.userId, testUserId));
    await db.delete(learningSessions).where(eq(learningSessions.userId, testUserId));
    await db.delete(users).where(eq(users.id, testUserId));
  });

  describe('End-to-End Knowledge Gap Analysis', () => {
    it('should create learning session and generate blind spots', async () => {
      const testContent = `
        Calculus is the mathematical study of continuous change.
        Derivatives measure the rate of change of a function.
        Integrals measure the accumulation of quantities.
        The fundamental theorem of calculus connects derivatives and integrals.
      `;

      // Step 1: Create learning session
      const [session] = await db.insert(learningSessions).values({
        userId: testUserId,
        content: testContent
      }).returning();

      expect(session).toBeDefined();
      expect(session.userId).toBe(testUserId);
      expect(session.content).toBe(testContent);

      // Step 2: Simulate AI analysis (in real implementation, this would call the AI service)
      const mockAnalysis = {
        topics: [
          { topic: 'derivatives', confidence: 0.8, isBlindSpot: false },
          { topic: 'integrals', confidence: 0.4, isBlindSpot: true },
          { topic: 'fundamental theorem', confidence: 0.2, isBlindSpot: true }
        ],
        analysis: 'User shows good understanding of derivatives but struggles with integrals and the fundamental theorem.'
      };

      // Step 3: Create blind spots based on analysis
      const blindSpotData = mockAnalysis.topics
        .filter(topic => topic.isBlindSpot)
        .map(topic => ({
          userId: testUserId,
          topic: topic.topic,
          confidence: topic.confidence,
          aiAnalysis: mockAnalysis
        }));

      const insertedBlindSpots = await db.insert(blindSpots).values(blindSpotData).returning();

      expect(insertedBlindSpots).toHaveLength(2);
      expect(insertedBlindSpots[0].topic).toBe('integrals');
      expect(insertedBlindSpots[1].topic).toBe('fundamental theorem');
    });

    it('should handle user assessment data correctly', async () => {
      const testContent = 'Machine learning involves supervised and unsupervised learning algorithms.';
      const userAssessment = {
        'supervised learning': 0.9,
        'unsupervised learning': 0.3,
        'algorithms': 0.6
      };

      // Create learning session with user assessment
      const [session] = await db.insert(learningSessions).values({
        userId: testUserId,
        content: testContent
      }).returning();

      // Simulate analysis with user assessment
      const mockAnalysis = {
        topics: [
          { topic: 'supervised learning', confidence: 0.9, isBlindSpot: false },
          { topic: 'unsupervised learning', confidence: 0.3, isBlindSpot: true },
          { topic: 'algorithms', confidence: 0.6, isBlindSpot: false }
        ],
        analysis: 'User is confident with supervised learning but needs help with unsupervised learning.'
      };

      const blindSpotData = mockAnalysis.topics
        .filter(topic => topic.isBlindSpot)
        .map(topic => ({
          userId: testUserId,
          topic: topic.topic,
          confidence: topic.confidence,
          aiAnalysis: mockAnalysis
        }));

      const insertedBlindSpots = await db.insert(blindSpots).values(blindSpotData).returning();

      expect(insertedBlindSpots).toHaveLength(1);
      expect(insertedBlindSpots[0].topic).toBe('unsupervised learning');
      expect(insertedBlindSpots[0].confidence).toBe(0.3);
    });

    it('should retrieve blind spots for a user', async () => {
      const userBlindSpots = await db
        .select()
        .from(blindSpots)
        .where(eq(blindSpots.userId, testUserId));

      expect(Array.isArray(userBlindSpots)).toBe(true);
      expect(userBlindSpots.length).toBeGreaterThan(0);

      // Verify blind spot structure
      const blindSpot = userBlindSpots[0];
      expect(blindSpot).toHaveProperty('id');
      expect(blindSpot).toHaveProperty('userId');
      expect(blindSpot).toHaveProperty('topic');
      expect(blindSpot).toHaveProperty('confidence');
      expect(blindSpot).toHaveProperty('aiAnalysis');
      expect(blindSpot.userId).toBe(testUserId);
    });

    it('should handle empty content gracefully', async () => {
      const [session] = await db.insert(learningSessions).values({
        userId: testUserId,
        content: ''
      }).returning();

      expect(session).toBeDefined();
      expect(session.content).toBe('');

      // Empty content should not generate blind spots
      const mockAnalysis = {
        topics: [],
        analysis: 'No meaningful content to analyze.'
      };

      const blindSpotData = mockAnalysis.topics
        .filter(topic => topic.isBlindSpot)
        .map(topic => ({
          userId: testUserId,
          topic: topic.topic,
          confidence: topic.confidence,
          aiAnalysis: mockAnalysis
        }));

      expect(blindSpotData).toHaveLength(0);
    });
  });
});
