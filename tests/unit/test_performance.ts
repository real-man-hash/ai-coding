import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { PerformanceUtils, MemoryMonitor } from '../../lib/performance';

describe('PerformanceUtils', () => {
  describe('debounce', () => {
    it('should delay function execution', (done) => {
      let callCount = 0;
      const debouncedFn = PerformanceUtils.debounce(() => {
        callCount++;
        expect(callCount).toBe(1);
        done();
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();
    });

    it('should execute function only once after delay', (done) => {
      let callCount = 0;
      const debouncedFn = PerformanceUtils.debounce(() => {
        callCount++;
      }, 50);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });
  });

  describe('throttle', () => {
    it('should limit function execution frequency', (done) => {
      let callCount = 0;
      const throttledFn = PerformanceUtils.throttle(() => {
        callCount++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 50);
    });

    it('should allow execution after throttle period', (done) => {
      let callCount = 0;
      const throttledFn = PerformanceUtils.throttle(() => {
        callCount++;
      }, 50);

      throttledFn();

      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 100);
    });
  });

  describe('measureAsync', () => {
    it('should measure async function execution time', async () => {
      const mockFn = jest.fn().mockResolvedValue('test result');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = await PerformanceUtils.measureAsync(mockFn, 'Test Function');

      expect(result).toBe('test result');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Test Function took \d+ milliseconds/)
      );

      consoleSpy.mockRestore();
    });

    it('should handle async function errors', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Test error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(PerformanceUtils.measureAsync(mockFn, 'Test Function')).rejects.toThrow('Test error');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Test Function failed after \d+ milliseconds/),
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('measureSync', () => {
    it('should measure sync function execution time', () => {
      const mockFn = jest.fn().mockReturnValue('test result');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = PerformanceUtils.measureSync(mockFn, 'Test Function');

      expect(result).toBe('test result');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Test Function took \d+ milliseconds/)
      );

      consoleSpy.mockRestore();
    });

    it('should handle sync function errors', () => {
      const mockFn = jest.fn().mockImplementation(() => {
        throw new Error('Test error');
      });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => PerformanceUtils.measureSync(mockFn, 'Test Function')).toThrow('Test error');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Test Function failed after \d+ milliseconds/),
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});

describe('MemoryMonitor', () => {
  let memoryMonitor: MemoryMonitor;

  beforeEach(() => {
    memoryMonitor = MemoryMonitor.getInstance();
    // Clear any existing metrics
    (memoryMonitor as any).metrics = [];
  });

  afterEach(() => {
    // Clean up
    (memoryMonitor as any).metrics = [];
  });

  describe('getInstance', () => {
    it('should return singleton instance', () => {
      const instance1 = MemoryMonitor.getInstance();
      const instance2 = MemoryMonitor.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('record', () => {
    it('should record memory usage', () => {
      const initialLength = (memoryMonitor as any).metrics.length;
      memoryMonitor.record();
      const finalLength = (memoryMonitor as any).metrics.length;
      expect(finalLength).toBe(initialLength + 1);
    });

    it('should limit metrics to 1000 records', () => {
      // Add 1001 records
      for (let i = 0; i < 1001; i++) {
        memoryMonitor.record();
      }
      const metrics = memoryMonitor.getMetrics();
      expect(metrics.length).toBe(1000);
    });
  });

  describe('getMetrics', () => {
    it('should return copy of metrics', () => {
      memoryMonitor.record();
      const metrics1 = memoryMonitor.getMetrics();
      const metrics2 = memoryMonitor.getMetrics();
      expect(metrics1).not.toBe(metrics2); // Different objects
      expect(metrics1).toEqual(metrics2); // Same content
    });
  });

  describe('getAverageMemoryUsage', () => {
    it('should return current memory usage when no metrics', () => {
      const average = memoryMonitor.getAverageMemoryUsage();
      expect(average).toHaveProperty('rss');
      expect(average).toHaveProperty('heapTotal');
      expect(average).toHaveProperty('heapUsed');
      expect(average).toHaveProperty('external');
      expect(average).toHaveProperty('arrayBuffers');
    });

    it('should calculate average of recorded metrics', () => {
      // Mock metrics
      (memoryMonitor as any).metrics = [
        { timestamp: 1, usage: { rss: 100, heapTotal: 200, heapUsed: 150, external: 50, arrayBuffers: 25 } },
        { timestamp: 2, usage: { rss: 200, heapTotal: 300, heapUsed: 250, external: 100, arrayBuffers: 50 } },
        { timestamp: 3, usage: { rss: 300, heapTotal: 400, heapUsed: 350, external: 150, arrayBuffers: 75 } },
      ];

      const average = memoryMonitor.getAverageMemoryUsage();
      expect(average.rss).toBe(200);
      expect(average.heapTotal).toBe(300);
      expect(average.heapUsed).toBe(250);
      expect(average.external).toBe(100);
      expect(average.arrayBuffers).toBe(50);
    });
  });
});
