import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Generate Cards API Contract Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  
  beforeAll(async () => {
    // Setup test database or mock data if needed
  });

  afterAll(async () => {
    // Cleanup test data if needed
  });

  describe('POST /api/generate-cards', () => {
    it('should generate memory cards from topics', async () => {
      const testTopics = ['linear algebra', 'calculus', 'statistics'];

      const response = await fetch(`${API_BASE_URL}/api/generate-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: testTopics,
          difficulty: 'intermediate'
        }),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('cards');
      expect(Array.isArray(data.cards)).toBe(true);
      expect(data.cards.length).toBeGreaterThan(0);
    });

    it('should validate required fields', async () => {
      const response = await fetch(`${API_BASE_URL}/api/generate-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    it('should handle empty topics array', async () => {
      const response = await fetch(`${API_BASE_URL}/api/generate-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: [],
        }),
      });

      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    it('should return proper card structure', async () => {
      const testTopics = ['machine learning'];

      const response = await fetch(`${API_BASE_URL}/api/generate-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: testTopics,
          difficulty: 'beginner'
        }),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      
      // Validate cards structure
      expect(data.cards).toBeDefined();
      expect(Array.isArray(data.cards)).toBe(true);
      
      if (data.cards.length > 0) {
        const card = data.cards[0];
        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('userId');
        expect(card).toHaveProperty('question');
        expect(card).toHaveProperty('answer');
        expect(card).toHaveProperty('relatedTopic');
        expect(card).toHaveProperty('createdAt');
        
        // Validate content
        expect(typeof card.question).toBe('string');
        expect(typeof card.answer).toBe('string');
        expect(typeof card.relatedTopic).toBe('string');
        expect(card.question.length).toBeGreaterThan(0);
        expect(card.answer.length).toBeGreaterThan(0);
      }
    });

    it('should handle different difficulty levels', async () => {
      const testTopics = ['programming'];
      const difficulties = ['beginner', 'intermediate', 'advanced'];

      for (const difficulty of difficulties) {
        const response = await fetch(`${API_BASE_URL}/api/generate-cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topics: testTopics,
            difficulty
          }),
        });

        expect(response.status).toBe(200);
        
        const data = await response.json();
        expect(data.cards).toBeDefined();
        expect(Array.isArray(data.cards)).toBe(true);
      }
    });

    it('should handle malformed JSON', async () => {
      const response = await fetch(`${API_BASE_URL}/api/generate-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/generate-cards', () => {
    it('should retrieve user cards', async () => {
      const response = await fetch(`${API_BASE_URL}/api/generate-cards?userId=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('cards');
      expect(Array.isArray(data.cards)).toBe(true);
    });

    it('should handle specific card retrieval', async () => {
      const response = await fetch(`${API_BASE_URL}/api/generate-cards?userId=1&cardId=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // This might return 404 if no card exists, or 200 with card data
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('DELETE /api/generate-cards', () => {
    it('should delete a specific card', async () => {
      const response = await fetch(`${API_BASE_URL}/api/generate-cards?userId=1&cardId=1`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // This might return 200 if deleted, or 404 if not found
      expect([200, 404]).toContain(response.status);
    });
  });
});
