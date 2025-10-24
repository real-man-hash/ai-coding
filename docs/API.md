# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently using mock user ID (1) for development. In production, this would be handled by authentication middleware.

## Analyze API

### POST /api/analyze
Analyze learning content and identify knowledge gaps.

**Request Body:**
```json
{
  "content": "string (required)",
  "userAssessment": {
    "topic1": 0.5,
    "topic2": 0.8
  }
}
```

**Response:**
```json
{
  "blindSpots": [
    {
      "id": 1,
      "userId": 1,
      "topic": "linear algebra",
      "confidence": 0.3,
      "aiAnalysis": {
        "topics": [...],
        "analysis": "string",
        "recommendations": [...]
      },
      "createdAt": "2025-01-27T10:00:00Z"
    }
  ],
  "analysis": {
    "topics": [
      {
        "topic": "string",
        "confidence": 0.5,
        "isBlindSpot": true
      }
    ],
    "analysis": "string",
    "recommendations": ["string"]
  }
}
```

### GET /api/analyze
Get user's blind spots.

**Query Parameters:**
- `userId` (optional): User ID (default: 1)
- `blindSpotId` (optional): Specific blind spot ID

**Response:**
```json
{
  "blindSpots": [...] // Array of blind spots
}
```

### DELETE /api/analyze
Delete a specific blind spot.

**Query Parameters:**
- `blindSpotId` (required): ID of blind spot to delete
- `userId` (optional): User ID (default: 1)

**Response:**
```json
{
  "success": true
}
```

## Cards API

### POST /api/generate-cards
Generate memory cards from topics.

**Request Body:**
```json
{
  "topics": ["mathematics", "physics"],
  "difficulty": "intermediate"
}
```

**Response:**
```json
{
  "cards": [
    {
      "id": 1,
      "userId": 1,
      "question": "What is the derivative of x²?",
      "answer": "2x",
      "relatedTopic": "calculus",
      "createdAt": "2025-01-27T10:00:00Z"
    }
  ]
}
```

### GET /api/generate-cards
Get user's memory cards.

**Query Parameters:**
- `userId` (optional): User ID (default: 1)

**Response:**
```json
{
  "cards": [...] // Array of flashcards
}
```

### GET /api/generate-cards/export
Export cards to Anki format.

**Query Parameters:**
- `userId` (optional): User ID (default: 1)
- `topic` (optional): Filter by topic

**Response:**
CSV file with Anki-compatible format

### DELETE /api/generate-cards
Delete a specific card.

**Query Parameters:**
- `cardId` (required): ID of card to delete
- `userId` (optional): User ID (default: 1)

**Response:**
```json
{
  "success": true
}
```

## Match API

### POST /api/match
Find compatible study partners.

**Request Body:**
```json
{
  "userId": "1",
  "learningPatterns": {
    "preferredSubjects": ["mathematics", "physics"],
    "studyStyle": "visual",
    "availability": "evening",
    "experienceLevel": "intermediate"
  },
  "knowledgeGaps": [
    {
      "topic": "linear algebra",
      "confidence": 0.3
    }
  ]
}
```

**Response:**
```json
{
  "matches": [
    {
      "userId": "2",
      "compatibilityScore": 0.85,
      "commonTopics": ["mathematics"],
      "learningStyle": "visual",
      "availability": "evening",
      "suggestedActivities": [
        "Study calculus together",
        "Work on linear algebra problems"
      ]
    }
  ],
  "suggestedTopics": [
    {
      "topic": "Latest developments in mathematics",
      "reason": "You're interested in mathematics"
    }
  ]
}
```

### GET /api/match
Get user's existing matches.

**Query Parameters:**
- `userId` (required): User ID

**Response:**
```json
{
  "matches": [...] // Array of matches
}
```

### PUT /api/match
Update match status.

**Query Parameters:**
- `matchId` (required): ID of match to update
- `status` (required): New status (accepted, rejected, active)

**Response:**
```json
{
  "success": true,
  "status": "accepted"
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API endpoints are subject to rate limiting:
- Analyze API: 10 requests per minute per user
- Cards API: 20 requests per minute per user
- Match API: 5 requests per minute per user

## Data Validation

### Content Analysis
- Content must be non-empty string
- Maximum content length: 10,000 characters
- User assessment values must be between 0 and 1

### Card Generation
- Topics array must not be empty
- Difficulty must be one of: beginner, intermediate, advanced

### Matching
- User ID must be valid string
- Learning patterns must include all required fields
- Knowledge gaps must have valid confidence scores (0-1)
