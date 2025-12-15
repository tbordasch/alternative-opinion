'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

function getNextRotationDay(): { date: Date; dayName: string } {
  const now = new Date();
  const currentDay = now.getDay();
  
  const rotationDays = [2, 5, 0];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let daysUntilNext = 0;
  let nextDay = 0;
  
  for (let i = 0; i < 7; i++) {
    const checkDay = (currentDay + i) % 7;
    if (rotationDays.includes(checkDay)) {
      daysUntilNext = i;
      nextDay = checkDay;
      break;
    }
  }
  
  if (daysUntilNext === 0 && rotationDays.includes(currentDay)) {
    for (let i = 1; i < 7; i++) {
      const checkDay = (currentDay + i) % 7;
      if (rotationDays.includes(checkDay)) {
        daysUntilNext = i;
        nextDay = checkDay;
        break;
      }
    }
  }
  
  const nextDate = new Date(now);
  nextDate.setDate(now.getDate() + daysUntilNext);
  nextDate.setHours(0, 0, 0, 0);
  
  return {
    date: nextDate,
    dayName: dayNames[nextDay]
  };
}

export default function Navbar() {
  const [hoursUntil, setHoursUntil] = useState<number>(0);
  const [nextDate, setNextDate] = useState<Date>(new Date());

  useEffect(() => {
    const updateRotationInfo = () => {
      const nextRotation = getNextRotationDay();
      const hours = Math.floor((nextRotation.date.getTime() - new Date().getTime()) / (1000 * 60 * 60));
      setHoursUntil(hours);
      setNextDate(nextRotation.date);
    };

    updateRotationInfo();
    // Update every hour
    const interval = setInterval(updateRotationInfo, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full border-b border-[#5C3A21]/20 dark:border-white/10 bg-white dark:bg-[#1a2332] transition-colors duration-200 flex-shrink-0">
      <div className="relative flex items-center justify-between py-3 sm:py-4 md:py-5 lg:py-6">
        {/* Left: Navigation Elements - At the very edge */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 pl-2 sm:pl-4 md:pl-6 lg:pl-8 xl:pl-16">
          <Link 
            href="/about" 
            className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 hover:bg-[#8DA070] dark:hover:bg-[#5B9BD5] border border-[#8DA070]/30 dark:border-[#5B9BD5]/30 hover:border-[#8DA070] dark:hover:border-[#5B9BD5] flex items-center justify-center transition-all duration-200 group"
          >
            <span className="text-[10px] sm:text-xs text-[#5C3A21] dark:text-white group-hover:text-white font-light whitespace-nowrap">How it works</span>
          </Link>
          <Link 
            href="/submit" 
            className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 hover:bg-[#8DA070] dark:hover:bg-[#5B9BD5] border border-[#8DA070]/30 dark:border-[#5B9BD5]/30 hover:border-[#8DA070] dark:hover:border-[#5B9BD5] flex items-center justify-center transition-all duration-200 group"
          >
            <span className="text-[10px] sm:text-xs text-[#5C3A21] dark:text-white group-hover:text-white font-light whitespace-nowrap">Submit</span>
          </Link>
          <Link 
            href="/contact" 
            className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 hover:bg-[#8DA070] dark:hover:bg-[#5B9BD5] border border-[#8DA070]/30 dark:border-[#5B9BD5]/30 hover:border-[#8DA070] dark:hover:border-[#5B9BD5] flex items-center justify-center transition-all duration-200 group"
          >
            <span className="text-[10px] sm:text-xs text-[#5C3A21] dark:text-white group-hover:text-white font-light whitespace-nowrap">Contact</span>
          </Link>
        </div>

        {/* Center: Branding - Absolutely centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0 px-1 sm:px-2">
          <Link href="/" className="group text-center">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#5C3A21] dark:text-white mb-0.5 sm:mb-1 transition-colors group-hover:text-[#8B4513] dark:group-hover:text-[#5B9BD5]">
              The Opinions
            </h1>
            <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-[#5C3A21]/70 dark:text-white/70 font-light hidden sm:block">
              Space for thinking critically
            </p>
          </Link>
        </div>

        {/* Right: Rotation Info, Dark Mode Toggle and Archive - At the very edge */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 pr-2 sm:pr-4 md:pr-6 lg:pr-8 xl:pr-16">
          {/* Rotation Info */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <p className="text-[10px] sm:text-xs text-[#5C3A21]/70 dark:text-white/70 font-light whitespace-nowrap">
              Changes on: <span className="font-bold">Tuesday • Friday • Sunday</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-[#5C3A21]/70 dark:text-white/70 font-light">
                {hoursUntil === 1 ? 'hour' : 'hours'} until next
              </span>
              <span className="text-xs sm:text-sm font-light text-[#8B4513] dark:text-[#5B9BD5]">
                {hoursUntil}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1.5">
            <DarkModeToggle />
            <Link 
              href="/archive" 
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#8B4513]/10 dark:bg-[#5B9BD5]/20 hover:bg-[#8B4513] dark:hover:bg-[#5B9BD5] border border-[#8B4513]/30 dark:border-[#5B9BD5]/30 hover:border-[#8B4513] dark:hover:border-[#5B9BD5] flex items-center justify-center transition-all duration-200 group"
            >
              <span className="text-xs text-[#5C3A21] dark:text-white group-hover:text-white font-light whitespace-nowrap">Archive</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

