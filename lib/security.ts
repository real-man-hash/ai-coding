// Security utilities and configurations

import { NextRequest } from 'next/server';
import { RATE_LIMIT_CONFIG } from './performance';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Input validation
export class InputValidator {
  static validateContent(content: string): { isValid: boolean; error?: string } {
    if (!content || typeof content !== 'string') {
      return { isValid: false, error: 'Content must be a non-empty string' };
    }

    if (content.trim().length === 0) {
      return { isValid: false, error: 'Content cannot be empty' };
    }

    if (content.length > 10000) {
      return { isValid: false, error: 'Content too long. Maximum 10,000 characters allowed.' };
    }

    // Check for potential XSS
    const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (xssPattern.test(content)) {
      return { isValid: false, error: 'Content contains potentially malicious script tags' };
    }

    return { isValid: true };
  }

  static validateUserId(userId: string): { isValid: boolean; error?: string } {
    if (!userId || typeof userId !== 'string') {
      return { isValid: false, error: 'User ID must be a non-empty string' };
    }

    // Check if userId is a valid number string
    if (!/^\d+$/.test(userId)) {
      return { isValid: false, error: 'User ID must be a valid number' };
    }

    return { isValid: true };
  }

  static validateConfidence(confidence: number): { isValid: boolean; error?: string } {
    if (typeof confidence !== 'number' || isNaN(confidence)) {
      return { isValid: false, error: 'Confidence must be a valid number' };
    }

    if (confidence < 0 || confidence > 1) {
      return { isValid: false, error: 'Confidence must be between 0 and 1' };
    }

    return { isValid: true };
  }

  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || typeof email !== 'string') {
      return { isValid: false, error: 'Email must be a non-empty string' };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }

    return { isValid: true };
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  }
}

// Rate limiting
export class RateLimiter {
  static checkRateLimit(
    identifier: string,
    limit: number,
    windowMs: number = RATE_LIMIT_CONFIG.WINDOW_MS
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const key = identifier;
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      // First request or window expired
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
    }

    if (record.count >= limit) {
      // Rate limit exceeded
      return { allowed: false, remaining: 0, resetTime: record.resetTime };
    }

    // Increment count
    record.count++;
    rateLimitStore.set(key, record);
    return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
  }

  static getClientIdentifier(request: NextRequest): string {
    // In production, use a more sophisticated method to identify clients
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    return ip;
  }
}

// Security headers
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),
} as const;

// CORS configuration
export const CORS_CONFIG = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400, // 24 hours
} as const;

// SQL injection prevention
export class SQLInjectionPrevention {
  static sanitizeQuery(query: string): string {
    // Remove common SQL injection patterns
    const dangerousPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
      /(--|\#|\/\*|\*\/)/g,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
      /(\b(OR|AND)\s+['"]\s*=\s*['"])/gi,
      /(\b(OR|AND)\s+['"]\s*LIKE\s*['"])/gi,
    ];

    let sanitized = query;
    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    return sanitized;
  }

  static validateQueryParams(params: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};
    
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'string') {
        sanitized[key] = InputValidator.sanitizeInput(value);
      } else {
        sanitized[key] = value;
      }
    });

    return sanitized;
  }
}

// File upload security
export class FileUploadSecurity {
  static validateFileType(file: File, allowedTypes: string[]): { isValid: boolean; error?: string } {
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Invalid file type' };
    }

    return { isValid: true };
  }

  static validateFileSize(file: File, maxSize: number): { isValid: boolean; error?: string } {
    if (file.size > maxSize) {
      return { isValid: false, error: `File too large. Maximum ${maxSize} bytes allowed.` };
    }

    return { isValid: true };
  }

  static sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special characters with underscore
      .replace(/_{2,}/g, '_') // Replace multiple underscores with single
      .replace(/^_|_$/g, '') // Remove leading/trailing underscores
      .toLowerCase();
  }

  static checkFileContent(file: File): Promise<{ isSafe: boolean; error?: string }> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // Check for executable content
        const executablePatterns = [
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          /javascript:/gi,
          /vbscript:/gi,
          /onload\s*=/gi,
          /onerror\s*=/gi,
        ];

        const isSafe = !executablePatterns.some(pattern => pattern.test(content));
        resolve({ isSafe, error: isSafe ? undefined : 'File contains potentially malicious content' });
      };
      reader.readAsText(file);
    });
  }
}

// Authentication and authorization
export class AuthSecurity {
  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static hashPassword(password: string): string {
    // In production, use bcrypt or similar
    return Buffer.from(password).toString('base64');
  }

  static verifyPassword(password: string, hash: string): boolean {
    return Buffer.from(password).toString('base64') === hash;
  }

  static validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return { isValid: errors.length === 0, errors };
  }
}

// Security middleware
export function createSecurityMiddleware() {
  return (request: NextRequest) => {
    const headers = new Headers();
    
    // Add security headers
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      headers.set(key, value);
    });

    // Add CORS headers
    const origin = request.headers.get('origin');
    if (origin && CORS_CONFIG.origin.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
    }
    headers.set('Access-Control-Allow-Methods', CORS_CONFIG.methods.join(', '));
    headers.set('Access-Control-Allow-Headers', CORS_CONFIG.allowedHeaders.join(', '));
    headers.set('Access-Control-Max-Age', CORS_CONFIG.maxAge.toString());

    return headers;
  };
}

// Security audit logging
export class SecurityAuditLogger {
  private static instance: SecurityAuditLogger;
  private logs: Array<{ timestamp: number; event: string; details: any }> = [];

  static getInstance(): SecurityAuditLogger {
    if (!SecurityAuditLogger.instance) {
      SecurityAuditLogger.instance = new SecurityAuditLogger();
    }
    return SecurityAuditLogger.instance;
  }

  logSecurityEvent(event: string, details: any): void {
    this.logs.push({
      timestamp: Date.now(),
      event,
      details,
    });

    // Keep only last 1000 logs
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }

    // In production, send to security monitoring service
    console.warn(`Security Event: ${event}`, details);
  }

  getLogs(): Array<{ timestamp: number; event: string; details: any }> {
    return [...this.logs];
  }

  getRecentLogs(minutes: number = 60): Array<{ timestamp: number; event: string; details: any }> {
    const cutoff = Date.now() - (minutes * 60 * 1000);
    return this.logs.filter(log => log.timestamp > cutoff);
  }
}
