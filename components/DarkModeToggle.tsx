'use client';

import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white dark:bg-[#1a2332] border border-[#5C3A21]/20 dark:border-white/20 transition-all duration-200"
        aria-label="Toggle dark mode"
        disabled
      >
        <svg
          className="w-4 h-4 text-[#5C3A21]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <span className="text-xs text-[#5C3A21] font-light">
          Dark
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white dark:bg-[#1a2332] border border-[#5C3A21]/20 dark:border-white/20 hover:border-[#8DA070] dark:hover:border-[#5B9BD5] hover:bg-[#8DA070]/10 dark:hover:bg-[#5B9BD5]/10 transition-all duration-200 group"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <>
          <svg
            className="w-4 h-4 text-[#5C3A21]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span className="text-xs text-[#5C3A21] font-light">
            Dark
          </span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span className="text-xs text-white font-light">
            Light
          </span>
        </>
      )}
    </button>
  );
}

