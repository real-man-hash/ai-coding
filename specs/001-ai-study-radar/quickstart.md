# AI StudyMate Radar - Quick Start Guide

## Overview

This guide will help you get the AI StudyMate Radar application up and running quickly. The application provides AI-powered learning gap analysis, memory card generation, and study buddy matching.

## Prerequisites

- Node.js 20.9.0 or higher
- MySQL 8.0 or higher
- npm or yarn package manager
- 火山引擎 API access (for AI features)

## Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd ai-study-radar

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/studymate"
DB_HOST=localhost
DB_PORT=3306
DB_USER=studymate_user
DB_PASSWORD=secure_password
DB_NAME=studymate

# 火山引擎 API Configuration
VOLCENGINE_ACCESS_KEY=your_access_key
VOLCENGINE_SECRET_KEY=your_secret_key
VOLCENGINE_REGION=your_region

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Database Setup

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE studymate;
CREATE USER 'studymate_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON studymate.* TO 'studymate_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Run database migrations
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Feature Testing

### 1. Knowledge Gap Analysis

1. Navigate to `/analyze`
2. Upload a text file or paste learning content
3. Click "Analyze Content"
4. View the radar chart and identified blind spots

**Test Content Example:**
```
Linear algebra is a branch of mathematics that deals with vector spaces and linear mappings.
A vector space is a collection of vectors that can be added together and multiplied by scalars.
Linear transformations are functions that preserve vector addition and scalar multiplication.
```

### 2. Memory Card Generation

1. Navigate to `/cards`
2. Click "Generate Cards" to create sample cards
3. Use the flip animation to study
4. Filter by topic or export to Anki format

### 3. Study Buddy Matching

1. Navigate to `/buddies`
2. Click "Find New Matches" to discover study partners
3. View compatibility scores and suggested activities
4. Accept or reject matches

## API Testing

### Test Analyze API

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Machine learning algorithms learn patterns from data.",
    "userAssessment": {
      "algorithms": 0.7,
      "patterns": 0.3
    }
  }'
```

### Test Cards API

```bash
curl -X POST http://localhost:3000/api/generate-cards \
  -H "Content-Type: application/json" \
  -d '{
    "topics": ["mathematics", "programming"],
    "difficulty": "intermediate"
  }'
```

### Test Match API

```bash
curl -X POST http://localhost:3000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1",
    "learningPatterns": {
      "preferredSubjects": ["mathematics", "physics"],
      "studyStyle": "visual",
      "availability": "evening",
      "experienceLevel": "intermediate"
    },
    "knowledgeGaps": [
      {"topic": "linear algebra", "confidence": 0.3}
    ]
  }'
```

## Troubleshooting

### Common Issues

#### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env.local`
- Ensure database exists and user has proper permissions

#### AI API Errors
- Verify 火山引擎 API credentials
- Check API rate limits
- Ensure network connectivity

#### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

### Performance Issues

#### Slow API Responses
- Check database query performance
- Monitor memory usage
- Review AI API response times

#### High Memory Usage
- Restart the development server
- Check for memory leaks in browser
- Monitor server resources

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:migrate   # Run migrations
npm run db:rollback  # Rollback migrations
npm run db:status    # Check migration status

# Testing
npm test             # Run all tests
npm run test:unit    # Run unit tests
npm run test:integration # Run integration tests
npm run test:contract # Run contract tests

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:
- Database connection string
- AI service credentials
- Security keys and secrets
- Domain and URL configurations

### Security Checklist

- [ ] Enable HTTPS
- [ ] Set secure database passwords
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Regular security updates

### Performance Optimization

- [ ] Enable gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up database indexing
- [ ] Monitor API response times
- [ ] Implement caching strategies

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check the deployment guide
4. Create an issue in the repository

## Next Steps

After successful setup:
1. Explore all three main features
2. Test the API endpoints
3. Review the documentation
4. Set up production deployment
5. Configure monitoring and logging
