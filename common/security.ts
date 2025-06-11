import DOMPurify from 'dompurify';

// Rate limiting configuration
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};

export class SecurityUtilities {
  /**
   * Sanitize HTML content to prevent XSS attacks
   */
  static sanitizeHtml(dirty: string): string {
    if (typeof window === 'undefined') {
      // Server-side fallback - basic sanitization
      return dirty
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    }

    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }

  /**
   * Sanitize text input by removing potentially dangerous characters
   */
  static sanitizeText(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .replace(/vbscript:/gi, '') // Remove vbscript: protocol
      .trim();
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Validate URL format and ensure it's safe
   */
  static isValidUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return ['http:', 'https:'].includes(parsedUrl.protocol);
    } catch {
      return false;
    }
  }

  /**
   * Rate limiting for actions (e.g., contact form submissions)
   */
  static checkRateLimit(
    identifier: string,
    maxRequests: number = 5,
    windowMs: number = 60000 // 1 minute
  ): boolean {
    const now = Date.now();
    const userLimit = rateLimitStore[identifier];

    if (!userLimit || now > userLimit.resetTime) {
      rateLimitStore[identifier] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return true;
    }

    if (userLimit.count >= maxRequests) {
      return false;
    }

    userLimit.count++;
    return true;
  }

  /**
   * Generate a simple client-side identifier for rate limiting
   */
  static getClientIdentifier(): string {
    // In a real app, you might use IP address or user session
    // For client-side, we'll use a combination of user agent and timestamp
    const navigator = typeof window !== 'undefined' ? window.navigator : null;
    if (!navigator) return 'server';

    const identifier = btoa(
      `${navigator.userAgent.slice(0, 50)}${navigator.language}`
    ).slice(0, 20);
    
    return identifier;
  }

  /**
   * Validate and sanitize contact form data
   */
  static validateContactForm(data: {
    message: string;
    email?: string;
    name?: string;
  }): {
    isValid: boolean;
    errors: string[];
    sanitizedData: typeof data;
  } {
    const errors: string[] = [];
    const sanitizedData = {
      message: this.sanitizeText(data.message),
      email: data.email ? this.sanitizeText(data.email) : undefined,
      name: data.name ? this.sanitizeText(data.name) : undefined,
    };

    // Validate message
    if (!sanitizedData.message || sanitizedData.message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
    
    if (sanitizedData.message.length > 1000) {
      errors.push('Message must be less than 1000 characters');
    }

    // Validate email if provided
    if (sanitizedData.email && !this.isValidEmail(sanitizedData.email)) {
      errors.push('Please provide a valid email address');
    }

    // Validate name if provided
    if (sanitizedData.name && sanitizedData.name.length > 100) {
      errors.push('Name must be less than 100 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData,
    };
  }

  /**
   * Content Security Policy nonce generator (for inline scripts/styles)
   */
  static generateNonce(): string {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback for environments without crypto
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Secure local storage with encryption (basic implementation)
   */
  static setSecureItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      // In a real app, you'd use proper encryption
      const encrypted = btoa(value);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.warn('Failed to store secure item:', error);
    }
  }

  static getSecureItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const encrypted = localStorage.getItem(key);
      return encrypted ? atob(encrypted) : null;
    } catch (error) {
      console.warn('Failed to retrieve secure item:', error);
      return null;
    }
  }
}

export default SecurityUtilities;