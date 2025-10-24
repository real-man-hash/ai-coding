// Application constants
export const APP_CONFIG = {
  MAX_CONTENT_LENGTH: 10000,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  SUPPORTED_TEXT_TYPES: ['text/plain', 'text/markdown', 'application/pdf'],
  RATE_LIMITS: {
    ANALYZE: 10, // requests per minute
    CARDS: 20,   // requests per minute
    MATCH: 5,    // requests per minute
  },
  PAGINATION: {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  ANALYZE: '/api/analyze',
  CARDS: '/api/generate-cards',
  CARDS_EXPORT: '/api/generate-cards/export',
  MATCH: '/api/match',
  HEALTH: '/api/health',
} as const;

// Database table names
export const DB_TABLES = {
  USERS: 'users',
  LEARNING_SESSIONS: 'learning_sessions',
  BLIND_SPOTS: 'blind_spots',
  FLASHCARDS: 'flashcards',
  BUDDY_MATCHES: 'buddy_matches',
} as const;

// Match statuses
export const MATCH_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  ACTIVE: 'active',
} as const;

// Learning styles
export const LEARNING_STYLES = {
  VISUAL: 'visual',
  HANDS_ON: 'hands-on',
  READING: 'reading',
  AUDITORY: 'auditory',
  KINESTHETIC: 'kinesthetic',
} as const;

// Experience levels
export const EXPERIENCE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
} as const;

// Study times
export const STUDY_TIMES = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  NIGHT: 'night',
  FLEXIBLE: 'flexible',
} as const;

// Session lengths
export const SESSION_LENGTHS = {
  SHORT: 'short',
  MEDIUM: 'medium',
  LONG: 'long',
  VERY_SHORT: 'very short',
} as const;

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  CONTENT_REQUIRED: 'Content is required',
  CONTENT_TOO_LONG: 'Content too long. Maximum 10,000 characters allowed.',
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File too large. Maximum 10MB allowed.',
  USER_NOT_FOUND: 'User not found',
  MATCH_NOT_FOUND: 'Match not found',
  CARD_NOT_FOUND: 'Card not found',
  BLIND_SPOT_NOT_FOUND: 'Blind spot not found',
  INVALID_USER_ID: 'Invalid user ID',
  INVALID_CONFIDENCE: 'Confidence must be between 0 and 1',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
  DATABASE_ERROR: 'Database error occurred',
  AI_SERVICE_ERROR: 'AI service error occurred',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  ANALYSIS_COMPLETE: 'Analysis completed successfully',
  CARDS_GENERATED: 'Cards generated successfully',
  MATCHES_FOUND: 'Matches found successfully',
  MATCH_UPDATED: 'Match updated successfully',
  CARD_DELETED: 'Card deleted successfully',
  BLIND_SPOT_DELETED: 'Blind spot deleted successfully',
} as const;
