import { describe, it, expect } from '@jest/globals';
import { 
  APP_CONFIG, 
  API_ENDPOINTS, 
  DB_TABLES, 
  MATCH_STATUS, 
  LEARNING_STYLES, 
  EXPERIENCE_LEVELS,
  STUDY_TIMES,
  SESSION_LENGTHS,
  DIFFICULTY_LEVELS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
} from '../../lib/constants';

describe('Constants', () => {
  describe('APP_CONFIG', () => {
    it('should have correct configuration values', () => {
      expect(APP_CONFIG.MAX_CONTENT_LENGTH).toBe(10000);
      expect(APP_CONFIG.MAX_FILE_SIZE).toBe(10 * 1024 * 1024);
      expect(APP_CONFIG.SUPPORTED_IMAGE_TYPES).toContain('image/jpeg');
      expect(APP_CONFIG.SUPPORTED_IMAGE_TYPES).toContain('image/png');
      expect(APP_CONFIG.SUPPORTED_TEXT_TYPES).toContain('text/plain');
      expect(APP_CONFIG.SUPPORTED_TEXT_TYPES).toContain('application/pdf');
      expect(APP_CONFIG.RATE_LIMITS.ANALYZE).toBe(10);
      expect(APP_CONFIG.RATE_LIMITS.CARDS).toBe(20);
      expect(APP_CONFIG.RATE_LIMITS.MATCH).toBe(5);
      expect(APP_CONFIG.PAGINATION.DEFAULT_LIMIT).toBe(10);
      expect(APP_CONFIG.PAGINATION.MAX_LIMIT).toBe(100);
    });
  });

  describe('API_ENDPOINTS', () => {
    it('should have correct endpoint paths', () => {
      expect(API_ENDPOINTS.ANALYZE).toBe('/api/analyze');
      expect(API_ENDPOINTS.CARDS).toBe('/api/generate-cards');
      expect(API_ENDPOINTS.CARDS_EXPORT).toBe('/api/generate-cards/export');
      expect(API_ENDPOINTS.MATCH).toBe('/api/match');
      expect(API_ENDPOINTS.HEALTH).toBe('/api/health');
    });
  });

  describe('DB_TABLES', () => {
    it('should have correct table names', () => {
      expect(DB_TABLES.USERS).toBe('users');
      expect(DB_TABLES.LEARNING_SESSIONS).toBe('learning_sessions');
      expect(DB_TABLES.BLIND_SPOTS).toBe('blind_spots');
      expect(DB_TABLES.FLASHCARDS).toBe('flashcards');
      expect(DB_TABLES.BUDDY_MATCHES).toBe('buddy_matches');
    });
  });

  describe('MATCH_STATUS', () => {
    it('should have correct status values', () => {
      expect(MATCH_STATUS.PENDING).toBe('pending');
      expect(MATCH_STATUS.ACCEPTED).toBe('accepted');
      expect(MATCH_STATUS.REJECTED).toBe('rejected');
      expect(MATCH_STATUS.ACTIVE).toBe('active');
    });
  });

  describe('LEARNING_STYLES', () => {
    it('should have correct learning style values', () => {
      expect(LEARNING_STYLES.VISUAL).toBe('visual');
      expect(LEARNING_STYLES.HANDS_ON).toBe('hands-on');
      expect(LEARNING_STYLES.READING).toBe('reading');
      expect(LEARNING_STYLES.AUDITORY).toBe('auditory');
      expect(LEARNING_STYLES.KINESTHETIC).toBe('kinesthetic');
    });
  });

  describe('EXPERIENCE_LEVELS', () => {
    it('should have correct experience level values', () => {
      expect(EXPERIENCE_LEVELS.BEGINNER).toBe('beginner');
      expect(EXPERIENCE_LEVELS.INTERMEDIATE).toBe('intermediate');
      expect(EXPERIENCE_LEVELS.ADVANCED).toBe('advanced');
      expect(EXPERIENCE_LEVELS.EXPERT).toBe('expert');
    });
  });

  describe('STUDY_TIMES', () => {
    it('should have correct study time values', () => {
      expect(STUDY_TIMES.MORNING).toBe('morning');
      expect(STUDY_TIMES.AFTERNOON).toBe('afternoon');
      expect(STUDY_TIMES.EVENING).toBe('evening');
      expect(STUDY_TIMES.NIGHT).toBe('night');
      expect(STUDY_TIMES.FLEXIBLE).toBe('flexible');
    });
  });

  describe('SESSION_LENGTHS', () => {
    it('should have correct session length values', () => {
      expect(SESSION_LENGTHS.SHORT).toBe('short');
      expect(SESSION_LENGTHS.MEDIUM).toBe('medium');
      expect(SESSION_LENGTHS.LONG).toBe('long');
      expect(SESSION_LENGTHS.VERY_SHORT).toBe('very short');
    });
  });

  describe('DIFFICULTY_LEVELS', () => {
    it('should have correct difficulty level values', () => {
      expect(DIFFICULTY_LEVELS.BEGINNER).toBe('beginner');
      expect(DIFFICULTY_LEVELS.INTERMEDIATE).toBe('intermediate');
      expect(DIFFICULTY_LEVELS.ADVANCED).toBe('advanced');
      expect(DIFFICULTY_LEVELS.EXPERT).toBe('expert');
    });
  });

  describe('ERROR_MESSAGES', () => {
    it('should have correct error message values', () => {
      expect(ERROR_MESSAGES.CONTENT_REQUIRED).toBe('Content is required');
      expect(ERROR_MESSAGES.CONTENT_TOO_LONG).toBe('Content too long. Maximum 10,000 characters allowed.');
      expect(ERROR_MESSAGES.INVALID_FILE_TYPE).toBe('Invalid file type');
      expect(ERROR_MESSAGES.FILE_TOO_LARGE).toBe('File too large. Maximum 10MB allowed.');
      expect(ERROR_MESSAGES.USER_NOT_FOUND).toBe('User not found');
      expect(ERROR_MESSAGES.MATCH_NOT_FOUND).toBe('Match not found');
      expect(ERROR_MESSAGES.CARD_NOT_FOUND).toBe('Card not found');
      expect(ERROR_MESSAGES.BLIND_SPOT_NOT_FOUND).toBe('Blind spot not found');
      expect(ERROR_MESSAGES.INVALID_USER_ID).toBe('Invalid user ID');
      expect(ERROR_MESSAGES.INVALID_CONFIDENCE).toBe('Confidence must be between 0 and 1');
      expect(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED).toBe('Rate limit exceeded');
      expect(ERROR_MESSAGES.DATABASE_ERROR).toBe('Database error occurred');
      expect(ERROR_MESSAGES.AI_SERVICE_ERROR).toBe('AI service error occurred');
    });
  });

  describe('SUCCESS_MESSAGES', () => {
    it('should have correct success message values', () => {
      expect(SUCCESS_MESSAGES.ANALYSIS_COMPLETE).toBe('Analysis completed successfully');
      expect(SUCCESS_MESSAGES.CARDS_GENERATED).toBe('Cards generated successfully');
      expect(SUCCESS_MESSAGES.MATCHES_FOUND).toBe('Matches found successfully');
      expect(SUCCESS_MESSAGES.MATCH_UPDATED).toBe('Match updated successfully');
      expect(SUCCESS_MESSAGES.CARD_DELETED).toBe('Card deleted successfully');
      expect(SUCCESS_MESSAGES.BLIND_SPOT_DELETED).toBe('Blind spot deleted successfully');
    });
  });
});
