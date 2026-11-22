import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'SAM CORP',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-blue-50/60 to-neutral-200 p-6 text-center dark:from-neutral-800 dark:via-blue-950/30 dark:to-neutral-900"
        role="img"
        aria-label={alt}
      >
        <Layers className="mb-3 h-8 w-8 text-[#1A73E8] dark:text-[#60A5FA]" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
