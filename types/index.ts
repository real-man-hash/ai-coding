// User related types
export interface User {
  id: number;
  name: string;
  studyStyle?: StudyStyle;
  interestTags?: string[];
  embeddingVector?: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyStyle {
  learningType: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  studyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  sessionLength: 'short' | 'medium' | 'long';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Learning session types
export interface LearningSession {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
}

// Knowledge gap analysis types
export interface BlindSpot {
  id: number;
  userId: number;
  topic: string;
  confidence: number;
  aiAnalysis?: AIAnalysis;
  createdAt: Date;
}

export interface AIAnalysis {
  topics: Array<{
    topic: string;
    confidence: number;
    isBlindSpot: boolean;
  }>;
  analysis: string;
  recommendations?: string[];
}

// Memory card types
export interface Flashcard {
  id: number;
  userId: number;
  question: string;
  answer: string;
  relatedTopic: string;
  createdAt: Date;
}

// Study buddy matching types
export interface BuddyMatch {
  id: number;
  userA: number;
  userB: number;
  matchScore: number;
  sharedTopics?: string[];
  createdAt: Date;
}

export interface MatchProfile {
  userId: number;
  name: string;
  matchScore: number;
  reason: string;
  sharedTopics: string[];
}

// API request/response types
export interface AnalyzeRequest {
  content: string;
  userAssessment?: Record<string, number>;
}

export interface AnalyzeResponse {
  blindSpots: BlindSpot[];
  analysis: AIAnalysis;
}

export interface GenerateCardsRequest {
  topics: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface GenerateCardsResponse {
  cards: Flashcard[];
}

export interface MatchRequest {
  userProfile: {
    learningStyle: string[];
    interestTags: string[];
    blindSpots: string[];
    studyTime: string;
  };
}

export interface MatchResponse {
  matches: MatchProfile[];
}

// UI component types
export interface RadarChartData {
  topic: string;
  confidence: number;
  fullMark: number;
}

export interface CardFlipState {
  isFlipped: boolean;
  cardId: number;
}
