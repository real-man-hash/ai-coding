export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
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
