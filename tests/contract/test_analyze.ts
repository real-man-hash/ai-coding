import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Analyze API Contract Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  
  beforeAll(async () => {
    // Setup test database or mock data if needed
  });

  afterAll(async () => {
    // Cleanup test data if needed
  });

  describe('POST /api/analyze', () => {
    it('should analyze text content and return knowledge gaps', async () => {
      const testContent = `
        Linear algebra is a branch of mathematics that deals with vector spaces and linear mappings.
        A vector space is a collection of vectors that can be added together and multiplied by scalars.
        Linear transformations are functions that preserve vector addition and scalar multiplication.
      `;

      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: testContent,
          userAssessment: {
            'vector spaces': 0.3,
            'linear transformations': 0.7
          }
        }),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('blindSpots');
      expect(data).toHaveProperty('analysis');
      expect(Array.isArray(data.blindSpots)).toBe(true);
      expect(data.analysis).toHaveProperty('topics');
      expect(data.analysis).toHaveProperty('analysis');
    });

    it('should handle empty content gracefully', async () => {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: '',
        }),
      });

      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    it('should validate required fields', async () => {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
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

    it('should handle malformed JSON', async () => {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      });

      expect(response.status).toBe(400);
    });

    it('should return proper response structure', async () => {
      const testContent = 'Machine learning algorithms learn patterns from data.';

      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: testContent,
        }),
      });

      expect(response.status).toBe(200);
      
      const data = await response.json();
      
      // Validate blindSpots structure
      expect(data.blindSpots).toBeDefined();
      expect(Array.isArray(data.blindSpots)).toBe(true);
      
      if (data.blindSpots.length > 0) {
        const blindSpot = data.blindSpots[0];
        expect(blindSpot).toHaveProperty('id');
        expect(blindSpot).toHaveProperty('userId');
        expect(blindSpot).toHaveProperty('topic');
        expect(blindSpot).toHaveProperty('confidence');
        expect(blindSpot).toHaveProperty('createdAt');
      }

      // Validate analysis structure
      expect(data.analysis).toBeDefined();
      expect(data.analysis).toHaveProperty('topics');
      expect(data.analysis).toHaveProperty('analysis');
      expect(Array.isArray(data.analysis.topics)).toBe(true);
      
      if (data.analysis.topics.length > 0) {
        const topic = data.analysis.topics[0];
        expect(topic).toHaveProperty('topic');
        expect(topic).toHaveProperty('confidence');
        expect(topic).toHaveProperty('isBlindSpot');
        expect(typeof topic.confidence).toBe('number');
        expect(typeof topic.isBlindSpot).toBe('boolean');
      }
    });
  });
});
