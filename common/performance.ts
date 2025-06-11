// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();
  private static observers: Set<PerformanceObserver> = new Set();

  /**
   * Start timing a performance measurement
   */
  static startMeasurement(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
      this.measurements.set(name, performance.now());
    }
  }

  /**
   * End timing a performance measurement and log the result
   */
  static endMeasurement(name: string): number | null {
    if (typeof performance === 'undefined') return null;

    const startTime = this.measurements.get(name);
    if (!startTime) return null;

    const endTime = performance.now();
    const duration = endTime - startTime;

    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    this.measurements.delete(name);

    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Monitor Largest Contentful Paint (LCP)
   */
  static monitorLCP(callback?: (lcp: number) => void): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1] as PerformanceEntry & {
          startTime: number;
        };
        
        if (lcpEntry) {
          const lcp = lcpEntry.startTime;
          callback?.(lcp);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`📊 LCP: ${lcp.toFixed(2)}ms`);
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.add(observer);
    } catch (error) {
      console.warn('LCP monitoring not supported:', error);
    }
  }

  /**
   * Monitor First Input Delay (FID)
   */
  static monitorFID(callback?: (fid: number) => void): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = (entry as any).processingStart - entry.startTime;
          callback?.(fid);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`📊 FID: ${fid.toFixed(2)}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.add(observer);
    } catch (error) {
      console.warn('FID monitoring not supported:', error);
    }
  }

  /**
   * Monitor Cumulative Layout Shift (CLS)
   */
  static monitorCLS(callback?: (cls: number) => void): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          const layoutShift = entry as any;
          if (!layoutShift.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (
              sessionValue &&
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000
            ) {
              sessionValue += layoutShift.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = layoutShift.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              callback?.(clsValue);
              
              if (process.env.NODE_ENV === 'development') {
                console.log(`📊 CLS: ${clsValue.toFixed(4)}`);
              }
            }
          }
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.add(observer);
    } catch (error) {
      console.warn('CLS monitoring not supported:', error);
    }
  }

  /**
   * Get navigation timing metrics
   */
  static getNavigationMetrics(): Record<string, number> | null {
    if (typeof performance === 'undefined' || !performance.getEntriesByType) {
      return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) return null;

    return {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ssl: navigation.connectEnd - navigation.secureConnectionStart,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domParse: navigation.domContentLoadedEventStart - navigation.responseEnd,
      domReady: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      load: navigation.loadEventEnd - navigation.loadEventStart,
      total: navigation.loadEventEnd - navigation.navigationStart,
    };
  }

  /**
   * Log performance summary
   */
  static logPerformanceSummary(): void {
    if (process.env.NODE_ENV !== 'development') return;

    const metrics = this.getNavigationMetrics();
    if (!metrics) return;

    console.group('📊 Performance Summary');
    console.log(`DNS Lookup: ${metrics.dns.toFixed(2)}ms`);
    console.log(`TCP Connection: ${metrics.tcp.toFixed(2)}ms`);
    console.log(`SSL Handshake: ${metrics.ssl.toFixed(2)}ms`);
    console.log(`Time to First Byte: ${metrics.ttfb.toFixed(2)}ms`);
    console.log(`Content Download: ${metrics.download.toFixed(2)}ms`);
    console.log(`DOM Parse: ${metrics.domParse.toFixed(2)}ms`);
    console.log(`DOM Ready: ${metrics.domReady.toFixed(2)}ms`);
    console.log(`Page Load: ${metrics.load.toFixed(2)}ms`);
    console.log(`Total: ${metrics.total.toFixed(2)}ms`);
    console.groupEnd();
  }

  /**
   * Initialize all performance monitoring
   */
  static init(): void {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.monitorLCP();
    this.monitorFID();
    this.monitorCLS();

    // Log summary when page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.logPerformanceSummary();
      }, 1000);
    });
  }

  /**
   * Cleanup observers
   */
  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.measurements.clear();
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy loading utility for components
 */
export function createLazyComponent<T>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: any
) {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return importFunc;
  }
  
  // Client-side lazy loading would require React import
  // This is a simplified version for the utility functions
  return importFunc;
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, crossorigin?: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) link.crossOrigin = crossorigin;
  
  document.head.appendChild(link);
}

/**
 * Prefetch resources for next page
 */
export function prefetchResource(href: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  document.head.appendChild(link);
}

export default PerformanceMonitor;