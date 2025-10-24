import { db } from '../db/connection';
import { flashcards, blindSpots } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import aiClient from '../ai-client';
import { logger } from '../logger';
import { AppError } from '../error-handler';
import type { GenerateCardsRequest, GenerateCardsResponse, Flashcard } from '../../types';

export class CardsService {
  async generateCards(request: GenerateCardsRequest, userId: number): Promise<GenerateCardsResponse> {
    const startTime = Date.now();
    
    try {
      logger.info('Starting card generation', { userId, topics: request.topics });

      // Validate input
      if (!request.topics || request.topics.length === 0) {
        throw new AppError('Topics cannot be empty', 400);
      }

      if (request.topics.length > 10) {
        throw new AppError('Too many topics. Maximum 10 topics allowed.', 400);
      }

      // Call AI service for card generation
      const aiStartTime = Date.now();
      const aiResponse = await aiClient.generateCards({
        topics: request.topics,
        difficulty: request.difficulty || 'intermediate'
      });
      
      logger.aiCall('generateCards', true, Date.now() - aiStartTime);

      // Process AI response and create flashcards
      const cardsData = aiResponse.cards.map(card => ({
        userId,
        question: card.question,
        answer: card.answer,
        relatedTopic: card.topic
      }));

      // Insert cards into database
      await db.insert(flashcards).values(cardsData);
      
      // Fetch the inserted cards
      const insertedCards = await db
        .select()
        .from(flashcards)
        .where(eq(flashcards.userId, userId))
        .orderBy(flashcards.createdAt);
        
      logger.databaseOperation('insert', 'flashcards', true, Date.now() - startTime);

      logger.info('Card generation completed', { 
        userId, 
        cardsGenerated: insertedCards.length,
        duration: Date.now() - startTime 
      });

      return {
        cards: insertedCards
      };

    } catch (error) {
      logger.error('Card generation failed', { userId, error }, error as Error);
      throw error;
    }
  }

  async getUserCards(userId: number, topic?: string): Promise<Flashcard[]> {
    try {
      let query = db
        .select()
        .from(flashcards)
        .where(eq(flashcards.userId, userId))
        .orderBy(flashcards.createdAt);

      if (topic) {
        query = query.where(eq(flashcards.relatedTopic, topic));
      }

      const userCards = await query;
      logger.databaseOperation('select', 'flashcards', true, 0);
      return userCards;
    } catch (error) {
      logger.error('Failed to retrieve user cards', { userId, topic }, error as Error);
      throw new AppError('Failed to retrieve cards', 500);
    }
  }

  async getCardById(cardId: number, userId: number): Promise<Flashcard | null> {
    try {
      const [card] = await db
        .select()
        .from(flashcards)
        .where(and(eq(flashcards.id, cardId), eq(flashcards.userId, userId)))
        .limit(1);

      logger.databaseOperation('select', 'flashcards', true, 0);
      return card || null;
    } catch (error) {
      logger.error('Failed to retrieve card', { cardId, userId }, error as Error);
      throw new AppError('Failed to retrieve card', 500);
    }
  }

  async deleteCard(cardId: number, userId: number): Promise<boolean> {
    try {
      const result = await db
        .delete(flashcards)
        .where(and(eq(flashcards.id, cardId), eq(flashcards.userId, userId)));

      logger.databaseOperation('delete', 'flashcards', true, 0);
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Failed to delete card', { cardId, userId }, error as Error);
      throw new AppError('Failed to delete card', 500);
    }
  }

  async generateCardsFromBlindSpots(userId: number, difficulty?: 'beginner' | 'intermediate' | 'advanced'): Promise<GenerateCardsResponse> {
    try {
      // Get user's blind spots
      const userBlindSpots = await db
        .select()
        .from(blindSpots)
        .where(eq(blindSpots.userId, userId));

      if (userBlindSpots.length === 0) {
        return { cards: [] };
      }

      // Extract topics from blind spots
      const topics = userBlindSpots.map(spot => spot.topic);

      // Generate cards for these topics
      return await this.generateCards({
        topics,
        difficulty: difficulty || 'intermediate'
      }, userId);

    } catch (error) {
      logger.error('Failed to generate cards from blind spots', { userId }, error as Error);
      throw new AppError('Failed to generate cards from blind spots', 500);
    }
  }

  async exportToAnki(userId: number, topic?: string): Promise<string> {
    try {
      const cards = await this.getUserCards(userId, topic);
      
      // Convert to Anki format (CSV)
      const ankiRows = cards.map(card => ({
        front: card.question,
        back: card.answer,
        tags: card.relatedTopic
      }));

      // Generate CSV content
      const csvHeader = 'Front,Back,Tags\n';
      const csvRows = ankiRows.map(row => 
        `"${row.front.replace(/"/g, '""')}","${row.back.replace(/"/g, '""')}","${row.tags}"`
      ).join('\n');

      const csvContent = csvHeader + csvRows;
      
      logger.info('Anki export completed', { userId, cardsExported: cards.length });
      return csvContent;

    } catch (error) {
      logger.error('Failed to export to Anki', { userId, topic }, error as Error);
      throw new AppError('Failed to export to Anki', 500);
    }
  }

  async getCardStats(userId: number): Promise<{
    totalCards: number;
    cardsByTopic: Record<string, number>;
    recentCards: number;
  }> {
    try {
      const allCards = await this.getUserCards(userId);
      
      // Calculate stats
      const totalCards = allCards.length;
      
      const cardsByTopic = allCards.reduce((acc, card) => {
        acc[card.relatedTopic] = (acc[card.relatedTopic] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Recent cards (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentCards = allCards.filter(card => 
        new Date(card.createdAt) > sevenDaysAgo
      ).length;

      return {
        totalCards,
        cardsByTopic,
        recentCards
      };

    } catch (error) {
      logger.error('Failed to get card stats', { userId }, error as Error);
      throw new AppError('Failed to get card stats', 500);
    }
  }
}

export const cardsService = new CardsService();
