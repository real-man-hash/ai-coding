import { NextRequest, NextResponse } from 'next/server';
import { 
  InputValidator, 
  RateLimiter, 
  createSecurityMiddleware,
  SecurityAuditLogger 
} from '../security';
import { RATE_LIMIT_CONFIG } from '../performance';

// Security middleware for API routes
export function withSecurity(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const securityLogger = SecurityAuditLogger.getInstance();
    const clientId = RateLimiter.getClientIdentifier(request);
    
    try {
      // Rate limiting
      const rateLimit = RateLimiter.checkRateLimit(
        clientId,
        RATE_LIMIT_CONFIG.MAX_REQUESTS.GENERAL,
        RATE_LIMIT_CONFIG.WINDOW_MS
      );

      if (!rateLimit.allowed) {
        securityLogger.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
          clientId,
          path: request.nextUrl.pathname,
          method: request.method,
        });

        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { 
            status: 429,
            headers: {
              'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            },
          }
        );
      }

      // Input validation for POST/PUT requests
      if (['POST', 'PUT'].includes(request.method)) {
        try {
          const body = await request.json();
          
          // Basic validation
          if (body && typeof body === 'object') {
            // Check for suspicious patterns
            const bodyStr = JSON.stringify(body);
            if (bodyStr.includes('<script') || bodyStr.includes('javascript:')) {
              securityLogger.logSecurityEvent('POTENTIAL_XSS', {
                clientId,
                path: request.nextUrl.pathname,
                body: bodyStr.substring(0, 1000), // Log first 1000 chars
              });

              return NextResponse.json(
                { error: 'Invalid request content' },
                { status: 400 }
              );
            }
          }
        } catch (error) {
          // Invalid JSON
          securityLogger.logSecurityEvent('INVALID_JSON', {
            clientId,
            path: request.nextUrl.pathname,
            error: error instanceof Error ? error.message : 'Unknown error',
          });

          return NextResponse.json(
            { error: 'Invalid JSON in request body' },
            { status: 400 }
          );
        }
      }

      // Add security headers
      const securityHeaders = createSecurityMiddleware()(request);
      
      // Call the actual handler
      const response = await handler(request);
      
      // Add security headers to response
      securityHeaders.forEach((value, key) => {
        response.headers.set(key, value);
      });

      return response;

    } catch (error) {
      securityLogger.logSecurityEvent('SECURITY_MIDDLEWARE_ERROR', {
        clientId,
        path: request.nextUrl.pathname,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Specific rate limiting for different endpoints
export function withRateLimit(limit: number, windowMs: number = RATE_LIMIT_CONFIG.WINDOW_MS) {
  return function(handler: (request: NextRequest) => Promise<NextResponse>) {
    return async (request: NextRequest): Promise<NextResponse> => {
      const clientId = RateLimiter.getClientIdentifier(request);
      const rateLimit = RateLimiter.checkRateLimit(clientId, limit, windowMs);

      if (!rateLimit.allowed) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { 
            status: 429,
            headers: {
              'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            },
          }
        );
      }

      return handler(request);
    };
  };
}

// Input validation middleware
export function withInputValidation(validators: Record<string, (value: any) => { isValid: boolean; error?: string }>) {
  return function(handler: (request: NextRequest) => Promise<NextResponse>) {
    return async (request: NextRequest): Promise<NextResponse> => {
      if (!['POST', 'PUT'].includes(request.method)) {
        return handler(request);
      }

      try {
        const body = await request.json();
        
        for (const [field, validator] of Object.entries(validators)) {
          const value = body[field];
          const validation = validator(value);
          
          if (!validation.isValid) {
            return NextResponse.json(
              { error: validation.error },
              { status: 400 }
            );
          }
        }

        return handler(request);
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid request body' },
          { status: 400 }
        );
      }
    };
  };
}

// CORS middleware
export function withCORS(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const origin = request.headers.get('origin');
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] 
      : ['http://localhost:3000'];

    const headers = new Headers();
    
    if (origin && allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
    }
    
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    headers.set('Access-Control-Max-Age', '86400');

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers });
    }

    const response = await handler(request);
    
    // Add CORS headers to response
    headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;
  };
}

// Content Security Policy middleware
export function withCSP(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const response = await handler(request);
    
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');

    response.headers.set('Content-Security-Policy', csp);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
  };
}
