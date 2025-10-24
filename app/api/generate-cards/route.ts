import { NextRequest } from 'next/server';
import { cardsService } from '@/lib/services/cards';
import { createErrorResponse } from '@/lib/error-handler';
import { logger } from '@/lib/logger';
import type { GenerateCardsRequest } from '@/types';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    const body: GenerateCardsRequest = await request.json();
    
    // Validate required fields
    if (!body.topics || !Array.isArray(body.topics) || body.topics.length === 0) {
      return createErrorResponse(new Error('Topics array is required and cannot be empty'));
    }

    if (body.topics.length > 10) {
      return createErrorResponse(new Error('Too many topics. Maximum 10 topics allowed.'));
    }

    // Validate difficulty if provided
    if (body.difficulty && !['beginner', 'intermediate', 'advanced'].includes(body.difficulty)) {
      return createErrorResponse(new Error('Invalid difficulty level. Must be beginner, intermediate, or advanced'));
    }

    // For now, use a default user ID. In a real app, this would come from authentication
    const userId = 1; // TODO: Get from authentication middleware
    
    logger.info('API Request', {
      method: 'POST',
      url: '/api/generate-cards',
      userId,
      topicsCount: body.topics.length,
      difficulty: body.difficulty
    });

    // Call cards service
    const result = await cardsService.generateCards(body, userId);
    
    const duration = Date.now() - startTime;
    logger.apiRequest('POST', '/api/generate-cards', 200, duration);
    
    return Response.json(result, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('POST', '/api/generate-cards', 500, duration);
    logger.error('Generate Cards API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get('userId') || '1'); // TODO: Get from authentication
    const cardId = searchParams.get('cardId');
    const topic = searchParams.get('topic');
    
    logger.info('API Request', {
      method: 'GET',
      url: '/api/generate-cards',
      userId,
      cardId,
      topic
    });

    let result;
    
    if (cardId) {
      // Get specific card
      const card = await cardsService.getCardById(parseInt(cardId), userId);
      if (!card) {
        return createErrorResponse(new Error('Card not found'));
      }
      result = { card };
    } else {
      // Get all cards for user
      const cards = await cardsService.getUserCards(userId, topic || undefined);
      result = { cards };
    }
    
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/generate-cards', 200, duration);
    
    return Response.json(result, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/generate-cards', 500, duration);
    logger.error('Generate Cards API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId');
    const userId = parseInt(searchParams.get('userId') || '1'); // TODO: Get from authentication
    
    if (!cardId) {
      return createErrorResponse(new Error('Card ID is required'));
    }
    
    logger.info('API Request', {
      method: 'DELETE',
      url: '/api/generate-cards',
      userId,
      cardId
    });

    const deleted = await cardsService.deleteCard(parseInt(cardId), userId);
    
    if (!deleted) {
      return createErrorResponse(new Error('Card not found or not deleted'));
    }
    
    const duration = Date.now() - startTime;
    logger.apiRequest('DELETE', '/api/generate-cards', 200, duration);
    
    return Response.json({ success: true }, { status: 200 });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('DELETE', '/api/generate-cards', 500, duration);
    logger.error('Generate Cards API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}
