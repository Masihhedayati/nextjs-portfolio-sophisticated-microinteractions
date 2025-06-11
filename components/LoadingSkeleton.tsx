import React from 'react';
import styles from './LoadingSkeleton.module.scss';

interface LoadingSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  count?: number;
  animation?: 'pulse' | 'wave';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  count = 1,
  animation = 'pulse'
}) => {
  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const elements = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${styles.skeleton} ${styles[animation]} ${className}`}
      style={skeletonStyle}
      aria-hidden="true"
    />
  ));

  return count === 1 ? elements[0] : <>{elements}</>;
};

export default LoadingSkeleton;