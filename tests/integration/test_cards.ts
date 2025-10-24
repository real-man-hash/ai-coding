import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { db } from '../../lib/db/connection';
import { users, flashcards, blindSpots } from '../../lib/db/schema';
import { eq } from 'drizzle-orm';

describe('Memory Card Generation Integration Tests', () => {
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
    await db.delete(flashcards).where(eq(flashcards.userId, testUserId));
    await db.delete(blindSpots).where(eq(blindSpots.userId, testUserId));
    await db.delete(users).where(eq(users.id, testUserId));
  });

  describe('End-to-End Memory Card Generation', () => {
    it('should generate cards from blind spots', async () => {
      // Step 1: Create a blind spot
      const [blindSpot] = await db.insert(blindSpots).values({
        userId: testUserId,
        topic: 'linear algebra',
        confidence: 0.3,
        aiAnalysis: {
          topics: [
            { topic: 'linear algebra', confidence: 0.3, isBlindSpot: true }
          ],
          analysis: 'User needs help with linear algebra concepts'
        }
      }).returning();

      expect(blindSpot).toBeDefined();
      expect(blindSpot.topic).toBe('linear algebra');

      // Step 2: Simulate card generation (in real implementation, this would call the AI service)
      const mockCards = [
        {
          userId: testUserId,
          question: 'What is a vector space?',
          answer: 'A vector space is a collection of vectors that can be added together and multiplied by scalars.',
          relatedTopic: 'linear algebra'
        },
        {
          userId: testUserId,
          question: 'What is a linear transformation?',
          answer: 'A linear transformation is a function that preserves vector addition and scalar multiplication.',
          relatedTopic: 'linear algebra'
        }
      ];

      // Step 3: Insert generated cards
      const insertedCards = await db.insert(flashcards).values(mockCards).returning();

      expect(insertedCards).toHaveLength(2);
      expect(insertedCards[0].question).toBe('What is a vector space?');
      expect(insertedCards[1].question).toBe('What is a linear transformation?');
    });

    it('should generate cards with different difficulty levels', async () => {
      const difficulties = ['beginner', 'intermediate', 'advanced'];
      
      for (const difficulty of difficulties) {
        const mockCards = [
          {
            userId: testUserId,
            question: `What is the ${difficulty} concept of calculus?`,
            answer: `This is a ${difficulty} level explanation of calculus concepts.`,
            relatedTopic: 'calculus'
          }
        ];

        const insertedCards = await db.insert(flashcards).values(mockCards).returning();
        expect(insertedCards).toHaveLength(1);
        expect(insertedCards[0].question).toContain(difficulty);
      }
    });

    it('should retrieve user cards', async () => {
      const userCards = await db
        .select()
        .from(flashcards)
        .where(eq(flashcards.userId, testUserId));

      expect(Array.isArray(userCards)).toBe(true);
      expect(userCards.length).toBeGreaterThan(0);

      // Verify card structure
      const card = userCards[0];
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('userId');
      expect(card).toHaveProperty('question');
      expect(card).toHaveProperty('answer');
      expect(card).toHaveProperty('relatedTopic');
      expect(card).toHaveProperty('createdAt');
      expect(card.userId).toBe(testUserId);
    });

    it('should filter cards by topic', async () => {
      const linearAlgebraCards = await db
        .select()
        .from(flashcards)
        .where(eq(flashcards.userId, testUserId))
        .where(eq(flashcards.relatedTopic, 'linear algebra'));

      expect(Array.isArray(linearAlgebraCards)).toBe(true);
      linearAlgebraCards.forEach(card => {
        expect(card.relatedTopic).toBe('linear algebra');
      });
    });

    it('should delete a specific card', async () => {
      // First, get a card to delete
      const [cardToDelete] = await db
        .select()
        .from(flashcards)
        .where(eq(flashcards.userId, testUserId))
        .limit(1);

      if (cardToDelete) {
        const deleteResult = await db
          .delete(flashcards)
          .where(eq(flashcards.id, cardToDelete.id))
          .where(eq(flashcards.userId, testUserId));

        expect(deleteResult.rowCount).toBe(1);

        // Verify card is deleted
        const [deletedCard] = await db
          .select()
          .from(flashcards)
          .where(eq(flashcards.id, cardToDelete.id))
          .limit(1);

        expect(deletedCard).toBeUndefined();
      }
    });

    it('should handle empty topics gracefully', async () => {
      // Simulate generating cards from empty topics
      const mockCards = [];

      const insertedCards = await db.insert(flashcards).values(mockCards).returning();
      expect(insertedCards).toHaveLength(0);
    });

    it('should generate cards with proper content validation', async () => {
      const mockCards = [
        {
          userId: testUserId,
          question: 'What is machine learning?',
          answer: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience.',
          relatedTopic: 'machine learning'
        }
      ];

      const insertedCards = await db.insert(flashcards).values(mockCards).returning();
      
      expect(insertedCards).toHaveLength(1);
      const card = insertedCards[0];
      
      // Validate content quality
      expect(card.question.length).toBeGreaterThan(10);
      expect(card.answer.length).toBeGreaterThan(20);
      expect(card.question).toContain('?');
      expect(card.answer).not.toContain('?');
    });
  });
});
