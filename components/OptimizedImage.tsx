'use client';

import React, { useState, useRef, useEffect } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  lazy?: boolean;
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  lazy = true,
  quality = 75,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate optimized src with quality parameter
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.startsWith('data:') || originalSrc.startsWith('blob:')) {
      return originalSrc;
    }
    
    // For external images, you might want to use a service like Cloudinary
    // For now, just return the original src
    return originalSrc;
  };

  const imageStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  return (
    <div 
      ref={containerRef}
      className={`optimized-image-container ${className}`}
      style={imageStyle}
    >
      {!isInView && lazy && !priority ? (
        <LoadingSkeleton 
          width={width || '100%'} 
          height={height || '200px'}
          className="imageSkeleton"
        />
      ) : (
        <>
          {!isLoaded && !hasError && (
            <LoadingSkeleton 
              width={width || '100%'} 
              height={height || '200px'}
              className="imageSkeleton"
            />
          )}
          
          {hasError ? (
            <div 
              className="image-error-placeholder"
              style={{
                ...imageStyle,
                backgroundColor: 'var(--theme-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--theme-text)',
                fontSize: '0.875rem',
                borderRadius: '4px'
              }}
            >
              Failed to load image
            </div>
          ) : (
            <img
              ref={imgRef}
              src={getOptimizedSrc(src)}
              alt={alt}
              style={{
                ...imageStyle,
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
                objectFit: 'cover'
              }}
              onLoad={handleLoad}
              onError={handleError}
              loading={lazy && !priority ? 'lazy' : 'eager'}
              decoding="async"
            />
          )}
        </>
      )}
      
      <style jsx>{`
        .optimized-image-container {
          position: relative;
          overflow: hidden;
        }
        
        .image-error-placeholder {
          background: var(--theme-border);
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;