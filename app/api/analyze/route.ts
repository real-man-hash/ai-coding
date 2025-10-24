import { NextRequest } from 'next/server';
import { analyzeService } from '@/lib/services/analyze';
import { createErrorResponse } from '@/lib/error-handler';
import { logger } from '@/lib/logger';
import type { AnalyzeRequest } from '@/types';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    const body: AnalyzeRequest = await request.json();
    
    // Validate required fields
    if (!body.content) {
      return createErrorResponse(new Error('Content is required'));
    }

    if (typeof body.content !== 'string') {
      return createErrorResponse(new Error('Content must be a string'));
    }

    // For now, use a default user ID. In a real app, this would come from authentication
    const userId = 1; // TODO: Get from authentication middleware
    
    logger.info('API Request', {
      method: 'POST',
      url: '/api/analyze',
      userId,
      contentLength: body.content.length
    });

    // Call analyze service
    const result = await analyzeService.analyzeContent(body, userId);
    
    const duration = Date.now() - startTime;
    logger.apiRequest('POST', '/api/analyze', 200, duration);
    
    return Response.json(result, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('POST', '/api/analyze', 500, duration);
    logger.error('Analyze API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get('userId') || '1'); // TODO: Get from authentication
    const blindSpotId = searchParams.get('blindSpotId');
    
    logger.info('API Request', {
      method: 'GET',
      url: '/api/analyze',
      userId,
      blindSpotId
    });

    let result;
    
    if (blindSpotId) {
      // Get specific blind spot
      const blindSpot = await analyzeService.getBlindSpotById(parseInt(blindSpotId), userId);
      if (!blindSpot) {
        return createErrorResponse(new Error('Blind spot not found'));
      }
      result = { blindSpot };
    } else {
      // Get all blind spots for user
      const blindSpots = await analyzeService.getUserBlindSpots(userId);
      result = { blindSpots };
    }
    
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/analyze', 200, duration);
    
    return Response.json(result, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/analyze', 500, duration);
    logger.error('Analyze API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const blindSpotId = searchParams.get('blindSpotId');
    const userId = parseInt(searchParams.get('userId') || '1'); // TODO: Get from authentication
    
    if (!blindSpotId) {
      return createErrorResponse(new Error('Blind spot ID is required'));
    }
    
    logger.info('API Request', {
      method: 'DELETE',
      url: '/api/analyze',
      userId,
      blindSpotId
    });

    const deleted = await analyzeService.deleteBlindSpot(parseInt(blindSpotId), userId);
    
    if (!deleted) {
      return createErrorResponse(new Error('Blind spot not found or not deleted'));
    }
    
    const duration = Date.now() - startTime;
    logger.apiRequest('DELETE', '/api/analyze', 200, duration);
    
    return Response.json({ success: true }, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('DELETE', '/api/analyze', 500, duration);
    logger.error('Analyze API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}
