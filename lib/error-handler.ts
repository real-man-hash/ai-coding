export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(
    message: string, 
    statusCode: number = 500, 
    isOperational: boolean = true,
    code?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, true, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, true, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super('Rate limit exceeded', 429, true, 'RATE_LIMIT');
    this.name = 'RateLimitError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500, true, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
  }
}

export class AIServiceError extends AppError {
  constructor(message: string) {
    super(message, 502, true, 'AI_SERVICE_ERROR');
    this.name = 'AIServiceError';
  }
}

export function handleError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    console.error('Unexpected error:', error);
    return {
      message: 'Internal server error',
      statusCode: 500,
    };
  }

  return {
    message: 'Unknown error occurred',
    statusCode: 500,
  };
}

export function createErrorResponse(error: unknown) {
  const { message, statusCode } = handleError(error);
  return Response.json({ error: message }, { status: statusCode });
}
