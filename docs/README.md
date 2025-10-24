# AI StudyMate Radar Documentation

## Overview

AI StudyMate Radar is an intelligent learning platform that helps students identify knowledge gaps, generate memory cards, and find compatible study partners through AI-powered analysis and matching algorithms.

## Features

### 🧠 AI Knowledge Gap Analysis
- Upload learning content (text, images, PDFs)
- AI-powered analysis to identify knowledge blind spots
- Visual radar chart representation of knowledge areas
- OCR support for image content extraction

### 📚 Memory Card Generation
- Automatic generation of Q&A flashcards from knowledge gaps
- Interactive card flip animations
- Topic-based filtering and organization
- Anki format export for external study tools

### 👥 Study Buddy Matching
- Intelligent matching based on learning patterns and knowledge gaps
- Compatibility scoring algorithm
- AI-suggested discussion topics and study activities
- Progress tracking and match management

## Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: TailwindCSS, shadcn/ui components
- **Database**: MySQL with Drizzle ORM
- **AI Integration**: 火山引擎 API
- **Testing**: Jest, React Testing Library
- **Charts**: Recharts.js
- **Animations**: Framer Motion

### Project Structure
```
app/
├── (auth)/              # Authentication pages
├── (dashboard)/         # Dashboard pages
├── analyze/            # Knowledge gap analysis
├── cards/              # Memory cards
├── buddies/            # Study buddy matching
└── api/                # API endpoints

components/
└── ui/                 # Reusable UI components

lib/
├── services/           # Business logic services
├── db/                 # Database schema and connection
└── utils/              # Utility functions

tests/
├── contract/           # API contract tests
├── integration/        # Integration tests
└── unit/               # Unit tests
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Environment Configuration)
4. Run database migrations: `npm run db:migrate`
5. Start development server: `npm run dev`

### Environment Configuration
Create a `.env.local` file with:
```env
DATABASE_URL="mysql://username:password@localhost:3306/studymate"
VOLCENGINE_ACCESS_KEY="your_access_key"
VOLCENGINE_SECRET_KEY="your_secret_key"
VOLCENGINE_REGION="your_region"
```

## API Documentation

### Analyze API
- `POST /api/analyze` - Analyze learning content
- `GET /api/analyze` - Get user's blind spots
- `DELETE /api/analyze` - Delete specific blind spot

### Cards API
- `POST /api/generate-cards` - Generate memory cards
- `GET /api/generate-cards` - Get user's cards
- `GET /api/generate-cards/export` - Export cards to Anki format
- `DELETE /api/generate-cards` - Delete specific card

### Match API
- `POST /api/match` - Find study buddies
- `GET /api/match` - Get user's matches
- `PUT /api/match` - Update match status

## Database Schema

### Core Tables
- `users` - User profiles and learning patterns
- `learning_sessions` - Content analysis sessions
- `blind_spots` - Identified knowledge gaps
- `flashcards` - Generated memory cards
- `buddy_matches` - Study partner matches

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:contract
npm run test:integration
npm run test:unit

# Run with coverage
npm run test:coverage
```

### Test Structure
- **Contract Tests**: API endpoint validation
- **Integration Tests**: End-to-end functionality
- **Unit Tests**: Individual component testing

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all required environment variables are set in production:
- Database connection string
- AI service credentials
- Security keys and secrets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
