// components/LoadingSkeleton.tsx
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-300 rounded-md h-32"></div>
      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
      <div className="bg-gray-300 h-4 rounded w-1/2"></div>
      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
      <div className="bg-gray-300 h-4 rounded w-1/4"></div>
    </div>
  );
};

export default LoadingSkeleton;
