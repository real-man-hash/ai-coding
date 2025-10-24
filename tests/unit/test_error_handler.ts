import { describe, it, expect } from '@jest/globals';
import { 
  AppError, 
  ValidationError, 
  NotFoundError, 
  RateLimitError, 
  DatabaseError, 
  AIServiceError,
  handleError,
  createErrorResponse
} from '../../lib/error-handler';

describe('Error Classes', () => {
  describe('AppError', () => {
    it('should create error with default values', () => {
      const error = new AppError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
      expect(error.code).toBeUndefined();
    });

    it('should create error with custom values', () => {
      const error = new AppError('Test error', 400, false, 'TEST_ERROR');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(false);
      expect(error.code).toBe('TEST_ERROR');
    });

    it('should capture stack trace', () => {
      const error = new AppError('Test error');
      expect(error.stack).toBeDefined();
    });
  });

  describe('ValidationError', () => {
    it('should create validation error with correct defaults', () => {
      const error = new ValidationError('Invalid input');
      expect(error.message).toBe('Invalid input');
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(true);
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.name).toBe('ValidationError');
    });

    it('should create validation error with field', () => {
      const error = new ValidationError('Invalid email', 'email');
      expect(error.message).toBe('Invalid email');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('NotFoundError', () => {
    it('should create not found error with correct defaults', () => {
      const error = new NotFoundError('User');
      expect(error.message).toBe('User not found');
      expect(error.statusCode).toBe(404);
      expect(error.isOperational).toBe(true);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.name).toBe('NotFoundError');
    });
  });

  describe('RateLimitError', () => {
    it('should create rate limit error with correct defaults', () => {
      const error = new RateLimitError();
      expect(error.message).toBe('Rate limit exceeded');
      expect(error.statusCode).toBe(429);
      expect(error.isOperational).toBe(true);
      expect(error.code).toBe('RATE_LIMIT');
      expect(error.name).toBe('RateLimitError');
    });
  });

  describe('DatabaseError', () => {
    it('should create database error with correct defaults', () => {
      const error = new DatabaseError('Connection failed');
      expect(error.message).toBe('Connection failed');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
      expect(error.code).toBe('DATABASE_ERROR');
      expect(error.name).toBe('DatabaseError');
    });
  });

  describe('AIServiceError', () => {
    it('should create AI service error with correct defaults', () => {
      const error = new AIServiceError('API timeout');
      expect(error.message).toBe('API timeout');
      expect(error.statusCode).toBe(502);
      expect(error.isOperational).toBe(true);
      expect(error.code).toBe('AI_SERVICE_ERROR');
      expect(error.name).toBe('AIServiceError');
    });
  });
});

describe('Error Handling Functions', () => {
  describe('handleError', () => {
    it('should handle AppError instances', () => {
      const error = new AppError('Test error', 400);
      const result = handleError(error);
      expect(result.message).toBe('Test error');
      expect(result.statusCode).toBe(400);
    });

    it('should handle Error instances', () => {
      const error = new Error('Generic error');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const result = handleError(error);
      expect(result.message).toBe('Internal server error');
      expect(result.statusCode).toBe(500);
      expect(consoleSpy).toHaveBeenCalledWith('Unexpected error:', error);
      
      consoleSpy.mockRestore();
    });

    it('should handle unknown error types', () => {
      const result = handleError('string error');
      expect(result.message).toBe('Unknown error occurred');
      expect(result.statusCode).toBe(500);
    });

    it('should handle null/undefined errors', () => {
      const result1 = handleError(null);
      const result2 = handleError(undefined);
      expect(result1.message).toBe('Unknown error occurred');
      expect(result2.message).toBe('Unknown error occurred');
    });
  });

  describe('createErrorResponse', () => {
    it('should create Response with error message and status code', () => {
      const error = new AppError('Test error', 400);
      const response = createErrorResponse(error);
      
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(400);
    });

    it('should handle generic errors', () => {
      const error = new Error('Generic error');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const response = createErrorResponse(error);
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(500);
      
      consoleSpy.mockRestore();
    });

    it('should handle unknown error types', () => {
      const response = createErrorResponse('string error');
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(500);
    });
  });
});
