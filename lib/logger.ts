export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: Error;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;
    
    let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (context && Object.keys(context).length > 0) {
      logMessage += `\nContext: ${JSON.stringify(context, null, 2)}`;
    }
    
    if (error) {
      logMessage += `\nError: ${error.message}`;
      if (error.stack) {
        logMessage += `\nStack: ${error.stack}`;
      }
    }
    
    return logMessage;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };

    const formattedLog = this.formatLog(entry);

    // In development, log to console with colors
    if (this.isDevelopment) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(formattedLog);
          break;
        case LogLevel.WARN:
          console.warn(formattedLog);
          break;
        case LogLevel.INFO:
          console.info(formattedLog);
          break;
        case LogLevel.DEBUG:
          console.debug(formattedLog);
          break;
      }
    } else {
      // In production, you might want to send logs to a service like DataDog, LogRocket, etc.
      console.log(formattedLog);
    }
  }

  error(message: string, context?: Record<string, any>, error?: Error): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  debug(message: string, context?: Record<string, any>): void {
    if (this.isDevelopment) {
      this.log(LogLevel.DEBUG, message, context);
    }
  }

  // Specific logging methods for different parts of the application
  apiRequest(method: string, url: string, statusCode: number, duration: number): void {
    this.info('API Request', {
      method,
      url,
      statusCode,
      duration: `${duration}ms`,
    });
  }

  aiCall(operation: string, success: boolean, duration: number, error?: Error): void {
    if (success) {
      this.info('AI Call Success', {
        operation,
        duration: `${duration}ms`,
      });
    } else {
      this.error('AI Call Failed', {
        operation,
        duration: `${duration}ms`,
      }, error);
    }
  }

  databaseOperation(operation: string, table: string, success: boolean, duration: number, error?: Error): void {
    if (success) {
      this.debug('Database Operation', {
        operation,
        table,
        duration: `${duration}ms`,
      });
    } else {
      this.error('Database Operation Failed', {
        operation,
        table,
        duration: `${duration}ms`,
      }, error);
    }
  }
}

// Create singleton instance
export const logger = new Logger();
