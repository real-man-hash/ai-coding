// Performance optimization utilities

// Database query optimization
export const DB_OPTIMIZATION = {
  // Connection pool settings
  POOL_CONFIG: {
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
  },
  
  // Query timeouts
  QUERY_TIMEOUT: 30000, // 30 seconds
  
  // Batch sizes for bulk operations
  BATCH_SIZES: {
    INSERT: 100,
    UPDATE: 50,
    DELETE: 50,
  },
} as const;

// Caching configuration
export const CACHE_CONFIG = {
  // Redis configuration (if implemented)
  REDIS: {
    TTL: {
      SHORT: 300,    // 5 minutes
      MEDIUM: 1800,  // 30 minutes
      LONG: 3600,    // 1 hour
    },
    KEYS: {
      USER_BLIND_SPOTS: 'user:blind_spots:',
      USER_CARDS: 'user:cards:',
      USER_MATCHES: 'user:matches:',
      ANALYSIS_RESULT: 'analysis:',
    },
  },
  
  // Memory cache for frequently accessed data
  MEMORY: {
    MAX_SIZE: 1000,
    TTL: 300000, // 5 minutes
  },
} as const;

// API rate limiting
export const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 60000, // 1 minute
  MAX_REQUESTS: {
    ANALYZE: 10,
    CARDS: 20,
    MATCH: 5,
    GENERAL: 100,
  },
} as const;

// Performance monitoring
export const PERFORMANCE_CONFIG = {
  // Response time thresholds
  THRESHOLDS: {
    EXCELLENT: 100,  // < 100ms
    GOOD: 200,       // < 200ms
    ACCEPTABLE: 500, // < 500ms
    SLOW: 1000,      // < 1s
  },
  
  // Monitoring intervals
  MONITORING: {
    INTERVAL: 30000, // 30 seconds
    RETENTION: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;

// Image optimization
export const IMAGE_OPTIMIZATION = {
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,
  QUALITY: 85,
  FORMATS: ['webp', 'jpeg', 'png'],
  SIZES: [320, 640, 1280, 1920],
} as const;

// Text processing optimization
export const TEXT_OPTIMIZATION = {
  MAX_LENGTH: 10000,
  CHUNK_SIZE: 1000,
  BATCH_SIZE: 10,
  ENCODING: 'utf-8',
} as const;

// Database indexing recommendations
export const INDEX_RECOMMENDATIONS = [
  'CREATE INDEX idx_users_created_at ON users(created_at);',
  'CREATE INDEX idx_blind_spots_user_id ON blind_spots(user_id);',
  'CREATE INDEX idx_blind_spots_topic ON blind_spots(topic);',
  'CREATE INDEX idx_flashcards_user_id ON flashcards(user_id);',
  'CREATE INDEX idx_flashcards_topic ON flashcards(related_topic);',
  'CREATE INDEX idx_buddy_matches_user1 ON buddy_matches(user_id1);',
  'CREATE INDEX idx_buddy_matches_user2 ON buddy_matches(user_id2);',
  'CREATE INDEX idx_buddy_matches_status ON buddy_matches(status);',
  'CREATE INDEX idx_learning_sessions_user_id ON learning_sessions(user_id);',
  'CREATE INDEX idx_learning_sessions_created_at ON learning_sessions(created_at);',
];

// Performance utility functions
export class PerformanceUtils {
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static async measureAsync<T>(
    fn: () => Promise<T>,
    label: string
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const end = performance.now();
      console.log(`${label} took ${end - start} milliseconds`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${label} failed after ${end - start} milliseconds:`, error);
      throw error;
    }
  }

  static measureSync<T>(fn: () => T, label: string): T {
    const start = performance.now();
    try {
      const result = fn();
      const end = performance.now();
      console.log(`${label} took ${end - start} milliseconds`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${label} failed after ${end - start} milliseconds:`, error);
      throw error;
    }
  }
}

// Memory usage monitoring
export class MemoryMonitor {
  private static instance: MemoryMonitor;
  private metrics: Array<{ timestamp: number; usage: NodeJS.MemoryUsage }> = [];

  static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  record(): void {
    const usage = process.memoryUsage();
    this.metrics.push({
      timestamp: Date.now(),
      usage,
    });

    // Keep only last 1000 records
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  getMetrics(): Array<{ timestamp: number; usage: NodeJS.MemoryUsage }> {
    return [...this.metrics];
  }

  getAverageMemoryUsage(): NodeJS.MemoryUsage {
    if (this.metrics.length === 0) {
      return process.memoryUsage();
    }

    const sum = this.metrics.reduce(
      (acc, metric) => ({
        rss: acc.rss + metric.usage.rss,
        heapTotal: acc.heapTotal + metric.usage.heapTotal,
        heapUsed: acc.heapUsed + metric.usage.heapUsed,
        external: acc.external + metric.usage.external,
        arrayBuffers: acc.arrayBuffers + metric.usage.arrayBuffers,
      }),
      { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 }
    );

    const count = this.metrics.length;
    return {
      rss: sum.rss / count,
      heapTotal: sum.heapTotal / count,
      heapUsed: sum.heapUsed / count,
      external: sum.external / count,
      arrayBuffers: sum.arrayBuffers / count,
    };
  }
}

// Query optimization helpers
export class QueryOptimizer {
  static buildSelectQuery(
    table: string,
    fields: string[],
    conditions: Record<string, any> = {},
    orderBy?: string,
    limit?: number
  ): { query: string; params: any[] } {
    let query = `SELECT ${fields.join(', ')} FROM ${table}`;
    const params: any[] = [];
    const whereClauses: string[] = [];

    Object.entries(conditions).forEach(([key, value], index) => {
      whereClauses.push(`${key} = ?`);
      params.push(value);
    });

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    return { query, params };
  }

  static buildInsertQuery(
    table: string,
    data: Record<string, any>
  ): { query: string; params: any[] } {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map(() => '?').join(', ');

    const query = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders})`;
    return { query, params: values };
  }

  static buildUpdateQuery(
    table: string,
    data: Record<string, any>,
    conditions: Record<string, any>
  ): { query: string; params: any[] } {
    const setClauses = Object.keys(data).map(key => `${key} = ?`);
    const whereClauses = Object.keys(conditions).map(key => `${key} = ?`);
    const params = [...Object.values(data), ...Object.values(conditions)];

    const query = `UPDATE ${table} SET ${setClauses.join(', ')} WHERE ${whereClauses.join(' AND ')}`;
    return { query, params };
  }
}
