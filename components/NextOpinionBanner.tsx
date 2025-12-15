'use client';

import { useEffect, useState } from 'react';

interface NextOpinionBannerProps {
  nextDate: Date;
  dayName: string;
}

export default function NextOpinionBanner({ nextDate, dayName }: NextOpinionBannerProps) {
  const [daysUntil, setDaysUntil] = useState(0);
  const [hoursUntil, setHoursUntil] = useState(0);

  useEffect(() => {
    const calculateTimeUntil = () => {
      const now = new Date();
      const diff = nextDate.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setDaysUntil(Math.max(0, days));
      setHoursUntil(Math.max(0, hours));
    };

    calculateTimeUntil();
    const interval = setInterval(calculateTimeUntil, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, [nextDate]);

  const nextDateFormatted = nextDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 border-b border-gray-200 py-3 sm:py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600 font-light">
                Opinions change on:
              </span>
              <span className="text-xs sm:text-sm text-gray-900 font-medium">
                Tuesday • Friday • Sunday
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-light text-gray-900">
                {daysUntil}
              </div>
              <div className="text-xs text-gray-500 font-light">
                {daysUntil === 1 ? 'day' : 'days'}
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-xs sm:text-sm text-gray-600 font-light">
              Next: <span className="text-gray-900 font-medium">{nextDateFormatted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

