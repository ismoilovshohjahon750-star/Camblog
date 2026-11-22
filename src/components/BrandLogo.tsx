import React from 'react';

export const OFFICIAL_LOGO_SRC = '/assets/aistudio/1795272197967_8f89f59d.jpg';

interface BrandLogoProps {
  className?: string;
  onDarkSurface?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-10 w-[88px]',
  onDarkSurface = false,
}) => {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg ${
        onDarkSurface
          ? 'bg-white px-2 py-1 shadow-xs'
          : 'bg-white dark:bg-white dark:px-2 dark:py-0.5'
      }`}
    >
      <span className={`block overflow-hidden ${className}`}>
        <img
          src={OFFICIAL_LOGO_SRC}
          alt="SAM CORP"
          referrerPolicy="no-referrer"
          className="h-full w-full scale-[1.14] object-cover object-center"
        />
      </span>
    </span>
  );
};
