import { NextRequest } from 'next/server';
import { matchingService } from '@/lib/services/matching';
import { createErrorResponse } from '@/lib/error-handler';
import { logger } from '@/lib/logger';
import type { UserProfile } from '@/lib/services/matching';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    const body: UserProfile = await request.json();
    
    // Validate required fields
    if (!body.userId) {
      return createErrorResponse(new Error('User ID is required'));
    }

    if (!body.learningPatterns) {
      return createErrorResponse(new Error('Learning patterns are required'));
    }

    if (!body.learningPatterns.preferredSubjects || !Array.isArray(body.learningPatterns.preferredSubjects)) {
      return createErrorResponse(new Error('Preferred subjects are required and must be an array'));
    }

    if (!body.learningPatterns.studyStyle) {
      return createErrorResponse(new Error('Study style is required'));
    }

    if (!body.learningPatterns.availability) {
      return createErrorResponse(new Error('Availability is required'));
    }

    if (!body.learningPatterns.experienceLevel) {
      return createErrorResponse(new Error('Experience level is required'));
    }

    if (!body.knowledgeGaps || !Array.isArray(body.knowledgeGaps)) {
      return createErrorResponse(new Error('Knowledge gaps are required and must be an array'));
    }

    // Validate knowledge gaps structure
    for (const gap of body.knowledgeGaps) {
      if (!gap.topic || typeof gap.topic !== 'string') {
        return createErrorResponse(new Error('Each knowledge gap must have a topic string'));
      }
      if (typeof gap.confidence !== 'number' || gap.confidence < 0 || gap.confidence > 1) {
        return createErrorResponse(new Error('Each knowledge gap must have a confidence number between 0 and 1'));
      }
    }
    
    logger.info('API Request', {
      method: 'POST',
      url: '/api/match',
      userId: body.userId,
      subjectsCount: body.learningPatterns.preferredSubjects.length,
      gapsCount: body.knowledgeGaps.length
    });

    // Call matching service
    const result = await matchingService.findMatches(body);
    
    const duration = Date.now() - startTime;
    logger.apiRequest('POST', '/api/match', 200, duration);
    
    return Response.json(result, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('POST', '/api/match', 500, duration);
    logger.error('Match API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return createErrorResponse(new Error('User ID is required'));
    }
    
    logger.info('API Request', {
      method: 'GET',
      url: '/api/match',
      userId
    });

    // Get user's existing matches
    const matches = await matchingService.getUserMatches(userId);
    
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/match', 200, duration);
    
    return Response.json({ matches }, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/match', 500, duration);
    logger.error('Match API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get('matchId');
    const status = searchParams.get('status') as 'accepted' | 'rejected' | 'active';
    
    if (!matchId) {
      return createErrorResponse(new Error('Match ID is required'));
    }

    if (!status || !['accepted', 'rejected', 'active'].includes(status)) {
      return createErrorResponse(new Error('Valid status is required (accepted, rejected, or active)'));
    }
    
    logger.info('API Request', {
      method: 'PUT',
      url: '/api/match',
      matchId,
      status
    });

    // Update match status
    const updated = await matchingService.updateMatchStatus(parseInt(matchId), status);
    
    if (!updated) {
      return createErrorResponse(new Error('Match not found or not updated'));
    }
    
    const duration = Date.now() - startTime;
    logger.apiRequest('PUT', '/api/match', 200, duration);
    
    return Response.json({ success: true, status }, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('PUT', '/api/match', 500, duration);
    logger.error('Match API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}
