'use client';

import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 pointer-events-none">
      <div className="flex items-center gap-3">
        <p className="text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 font-light whitespace-nowrap">
          Scroll for reflections
        </p>
          <div className="w-6 h-10 border-2 border-[#8DA070] dark:border-[#5B9BD5] rounded-full flex items-start justify-center p-2 animate-bounce transition-colors duration-200">
            <div className="w-1 h-3 bg-[#8DA070] dark:bg-[#5B9BD5] rounded-full animate-scroll-down transition-colors duration-200"></div>
        </div>
      </div>
    </div>
  );
}

