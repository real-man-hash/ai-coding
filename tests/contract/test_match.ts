import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Match API Contract Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  
  beforeAll(async () => {
    // Setup test database or mock data if needed
  });

  afterAll(async () => {
    // Cleanup test data if needed
  });

  describe('POST /api/match', () => {
    it('should find compatible study partners based on learning patterns', async () => {
      const testUserProfile = {
        userId: 'test-user-123',
        learningPatterns: {
          preferredSubjects: ['mathematics', 'physics'],
          studyStyle: 'visual',
          availability: 'evening',
          experienceLevel: 'intermediate'
        },
        knowledgeGaps: [
          { topic: 'linear algebra', confidence: 0.3 },
          { topic: 'calculus', confidence: 0.7 }
        ]
      };

      const response = await fetch(`${API_BASE_URL}/api/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUserProfile),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('matches');
      expect(data).toHaveProperty('suggestedTopics');
      expect(Array.isArray(data.matches)).toBe(true);
      expect(Array.isArray(data.suggestedTopics)).toBe(true);
    });

    it('should handle empty user profile gracefully', async () => {
      const response = await fetch(`${API_BASE_URL}/api/match`, {
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

    it('should validate required fields', async () => {
      const response = await fetch(`${API_BASE_URL}/api/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'test-user-123'
          // Missing learningPatterns
        }),
      });

      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    it('should handle malformed JSON', async () => {
      const response = await fetch(`${API_BASE_URL}/api/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      });

      expect(response.status).toBe(400);
    });

    it('should return proper response structure', async () => {
      const testUserProfile = {
        userId: 'test-user-456',
        learningPatterns: {
          preferredSubjects: ['computer science'],
          studyStyle: 'hands-on',
          availability: 'weekend',
          experienceLevel: 'beginner'
        },
        knowledgeGaps: [
          { topic: 'programming', confidence: 0.2 }
        ]
      };

      const response = await fetch(`${API_BASE_URL}/api/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUserProfile),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      
      // Validate matches structure
      expect(data.matches).toBeDefined();
      expect(Array.isArray(data.matches)).toBe(true);
      
      if (data.matches.length > 0) {
        const match = data.matches[0];
        expect(match).toHaveProperty('userId');
        expect(match).toHaveProperty('compatibilityScore');
        expect(match).toHaveProperty('commonTopics');
        expect(match).toHaveProperty('learningStyle');
        expect(match).toHaveProperty('availability');
        expect(typeof match.compatibilityScore).toBe('number');
        expect(Array.isArray(match.commonTopics)).toBe(true);
      }

      // Validate suggestedTopics structure
      expect(data.suggestedTopics).toBeDefined();
      expect(Array.isArray(data.suggestedTopics)).toBe(true);
      
      if (data.suggestedTopics.length > 0) {
        const topic = data.suggestedTopics[0];
        expect(topic).toHaveProperty('topic');
        expect(topic).toHaveProperty('reason');
        expect(typeof topic.topic).toBe('string');
        expect(typeof topic.reason).toBe('string');
      }
    });

    it('should handle user with no knowledge gaps', async () => {
      const testUserProfile = {
        userId: 'test-user-789',
        learningPatterns: {
          preferredSubjects: ['history'],
          studyStyle: 'reading',
          availability: 'morning',
          experienceLevel: 'advanced'
        },
        knowledgeGaps: []
      };

      const response = await fetch(`${API_BASE_URL}/api/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUserProfile),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('matches');
      expect(data).toHaveProperty('suggestedTopics');
      // Should still return matches based on learning patterns
    });

    it('should return matches sorted by compatibility score', async () => {
      const testUserProfile = {
        userId: 'test-user-sort',
        learningPatterns: {
          preferredSubjects: ['mathematics'],
          studyStyle: 'visual',
          availability: 'evening',
          experienceLevel: 'intermediate'
        },
        knowledgeGaps: [
          { topic: 'statistics', confidence: 0.4 }
        ]
      };

      const response = await fetch(`${API_BASE_URL}/api/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUserProfile),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      
      if (data.matches.length > 1) {
        // Check that matches are sorted by compatibility score (descending)
        for (let i = 0; i < data.matches.length - 1; i++) {
          expect(data.matches[i].compatibilityScore).toBeGreaterThanOrEqual(
            data.matches[i + 1].compatibilityScore
          );
        }
      }
    });
  });

  describe('GET /api/match/:userId', () => {
    it('should retrieve user profile and matches', async () => {
      const userId = 'test-user-get';
      
      const response = await fetch(`${API_BASE_URL}/api/match/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // This endpoint might return 404 if user doesn't exist, which is acceptable
      expect([200, 404]).toContain(response.status);
      
      if (response.status === 200) {
        const data = await response.json();
        expect(data).toHaveProperty('user');
        expect(data).toHaveProperty('matches');
        expect(data.user).toHaveProperty('userId');
      }
    });

    it('should handle invalid user ID format', async () => {
      const response = await fetch(`${API_BASE_URL}/api/match/invalid-id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect([400, 404]).toContain(response.status);
    });
  });
});
