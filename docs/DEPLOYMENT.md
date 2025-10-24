# Deployment Guide

## Prerequisites

### System Requirements
- Node.js 18.0 or higher
- MySQL 8.0 or higher
- 2GB RAM minimum (4GB recommended)
- 10GB disk space

### Required Services
- MySQL database server
- 火山引擎 API access
- Domain name (for production)

## Environment Setup

### 1. Database Configuration
Create a MySQL database and user:
```sql
CREATE DATABASE studymate;
CREATE USER 'studymate_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON studymate.* TO 'studymate_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Environment Variables
Create `.env.local` file:
```env
# Database
DATABASE_URL="mysql://studymate_user:secure_password@localhost:3306/studymate"

# 火山引擎 API
VOLCENGINE_ACCESS_KEY="your_access_key"
VOLCENGINE_SECRET_KEY="your_secret_key"
VOLCENGINE_REGION="your_region"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="production"

# Security (generate secure random strings)
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Migration
```bash
npm run db:migrate
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Production Deployment

### 1. Build Application
```bash
npm run build
```

### 2. Start Production Server
```bash
npm start
```

### 3. Process Management (PM2)
Install PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "studymate" -- start
pm2 save
pm2 startup
```

## Docker Deployment

### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Create docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://studymate_user:password@db:3306/studymate
      - VOLCENGINE_ACCESS_KEY=${VOLCENGINE_ACCESS_KEY}
      - VOLCENGINE_SECRET_KEY=${VOLCENGINE_SECRET_KEY}
      - VOLCENGINE_REGION=${VOLCENGINE_REGION}
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_DATABASE=studymate
      - MYSQL_USER=studymate_user
      - MYSQL_PASSWORD=password
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

volumes:
  mysql_data:
```

### 3. Deploy with Docker
```bash
docker-compose up -d
```

## Cloud Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### AWS Deployment
1. Use AWS RDS for MySQL database
2. Deploy application on AWS Elastic Beanstalk or ECS
3. Configure load balancer and auto-scaling

### DigitalOcean Deployment
1. Create Droplet with Node.js
2. Set up MySQL database
3. Configure Nginx as reverse proxy
4. Set up SSL certificate

## Database Migration

### Run Migrations
```bash
npm run db:migrate
```

### Rollback Migrations
```bash
npm run db:rollback
```

### Check Migration Status
```bash
npm run db:status
```

## Monitoring and Logging

### Application Logs
Logs are written to console and can be redirected to files:
```bash
npm start > app.log 2>&1
```

### Database Monitoring
Monitor MySQL performance and query execution:
```sql
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Connections';
```

### Health Checks
The application provides health check endpoints:
- `GET /api/health` - Application health
- `GET /api/health/db` - Database connectivity

## Security Considerations

### 1. Environment Variables
- Never commit `.env` files to version control
- Use strong, unique passwords
- Rotate API keys regularly

### 2. Database Security
- Use strong database passwords
- Limit database user privileges
- Enable SSL connections in production

### 3. Application Security
- Enable HTTPS in production
- Implement rate limiting
- Validate all input data
- Use secure headers

### 4. API Security
- Implement authentication middleware
- Add request validation
- Monitor for suspicious activity

## Performance Optimization

### 1. Database Optimization
- Add appropriate indexes
- Optimize queries
- Use connection pooling

### 2. Application Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies

### 3. Monitoring
- Set up application monitoring
- Monitor database performance
- Track API response times

## Backup and Recovery

### 1. Database Backup
```bash
mysqldump -u studymate_user -p studymate > backup.sql
```

### 2. Application Backup
- Backup source code
- Backup configuration files
- Backup uploaded files (if any)

### 3. Recovery Procedures
- Test backup restoration regularly
- Document recovery procedures
- Maintain disaster recovery plan

## Troubleshooting

### Common Issues

#### Database Connection Errors
- Check database credentials
- Verify database server is running
- Check network connectivity

#### API Errors
- Verify environment variables
- Check API service status
- Review application logs

#### Performance Issues
- Monitor database queries
- Check server resources
- Review application logs

### Log Analysis
```bash
# View application logs
tail -f app.log

# Search for errors
grep -i error app.log

# Monitor real-time logs
tail -f app.log | grep -i "error\|warn"
```

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and rotate API keys
- Monitor disk space and performance
- Backup database weekly

### Security Updates
- Apply security patches promptly
- Update Node.js and dependencies
- Review and update security configurations

### Performance Monitoring
- Monitor response times
- Track error rates
- Review resource usage
- Optimize based on metrics
