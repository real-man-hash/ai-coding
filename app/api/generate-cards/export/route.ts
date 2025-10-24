import { NextRequest } from 'next/server';
import { cardsService } from '@/lib/services/cards';
import { createErrorResponse } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get('userId') || '1'); // TODO: Get from authentication
    const topic = searchParams.get('topic');
    
    logger.info('API Request', {
      method: 'GET',
      url: '/api/generate-cards/export',
      userId,
      topic
    });

    // Generate Anki CSV content
    const csvContent = await cardsService.exportToAnki(userId, topic || undefined);
    
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/generate-cards/export', 200, duration);
    
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="anki-cards-${topic || 'all'}.csv"`
      }
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiRequest('GET', '/api/generate-cards/export', 500, duration);
    logger.error('Export API error', { error }, error as Error);
    
    return createErrorResponse(error);
  }
}
