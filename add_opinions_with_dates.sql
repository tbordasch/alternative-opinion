-- ============================================
-- SQL Script: Add Opinions with Rotation Dates
-- ============================================
-- This script helps you add opinions that will automatically rotate
-- on Tuesday, Friday, and Sunday.
--
-- HOW IT WORKS:
-- 1. The system uses the OLDEST opinion's published_at as the start date
-- 2. It counts rotation days (Tuesday, Friday, Sunday) since that start
-- 3. It cycles through opinions in order based on that count
--
-- IMPORTANT:
-- - Each opinion should have a unique published_at date
-- - Dates should align with Tuesday, Friday, or Sunday
-- - Opinions are ordered by published_at (oldest first)
-- - The system cycles through them automatically
--
-- ============================================
-- STEP 1: Check your current opinions
-- ============================================
-- Run this first to see what you have:
-- SELECT id, content, published_at, is_active 
-- FROM opinions 
-- ORDER BY published_at ASC;

-- ============================================
-- STEP 2: Add new opinions with rotation dates
-- ============================================
-- Replace the dates below with your desired rotation schedule
-- Make sure dates are on Tuesday, Friday, or Sunday
-- Format: 'YYYY-MM-DD HH:MM:SS+00' (UTC timezone)

INSERT INTO opinions (content, published_at, is_active)
VALUES 
  -- Opinion 1 (Starts TODAY - Sunday, December 14, 2025)
  (
    'The idea of "The One" creates unrealistic expectations and dissatisfaction.',
    '2025-12-14 00:00:00+00',  -- Sunday, December 14, 2025 (TODAY)
    true
  ),
  -- Opinion 2 (Next rotation day)
  (
    'Internships should always be paid. Unpaid internships are classist gatekeeping.',
    '2025-12-16 00:00:00+00',  -- Tuesday, December 16, 2025
    true
  ),
  -- Opinion 3 (Next rotation day)
  (
    'Sometimes, love is not enough. Compatibility matters more than chemistry.',
    '2025-12-19 00:00:00+00',  -- Friday, December 19, 2025
    true
  ),
  -- Opinion 4
  (
    'Weddings are a waste of money. Spend that cash on the honeymoon or a house.',
    '2025-12-21 00:00:00+00',  -- Sunday, December 21, 2025
    true
  ),
  -- Opinion 5
  (
    'AI art is real art. The tool changed, just like when we moved from paintbrushes to cameras.',
    '2025-12-23 00:00:00+00',  -- Tuesday, December 23, 2025
    true
  ),
  -- Opinion 6
  (
    'Most people are terrified of silence because they can''t stand their own thoughts.',
    '2025-12-26 00:00:00+00',  -- Friday, December 26, 2025
    true
  ),
  -- Opinion 7
  (
    'We judge others by their actions, but ourselves by our intentions.',
    '2025-12-28 00:00:00+00',  -- Sunday, December 28, 2025
    true
  ),
  -- Opinion 8
  (
    'In 50 years, eating meat will be viewed with the same horror as slavery is today.',
    '2025-12-30 00:00:00+00',  -- Tuesday, December 30, 2025
    true
  ),
  -- Opinion 9
  (
    'Happiness is not the goal of life; meaning is. Chasing happiness leads to misery.',
    '2026-01-02 00:00:00+00',  -- Friday, January 2, 2026
    true
  ),
  -- Opinion 10
  (
    'The 40-hour work week is a relic of the industrial revolution and makes no sense in the digital age.',
    '2026-01-04 00:00:00+00',  -- Sunday, January 4, 2026
    true
  ),
  -- Opinion 11
  (
    'Salaries should be public information. Secrecy only benefits the employer.',
    '2026-01-07 00:00:00+00',  -- Tuesday, January 7, 2026
    true
  ),
  -- Opinion 12
  (
    'If a business can''t pay a living wage, its business model has failed and it deserves to close.',
    '2026-01-09 00:00:00+00',  -- Friday, January 9, 2026
    true
  );

-- ============================================
-- STEP 3: Verify your opinions
-- ============================================
-- After running the INSERT, verify with:
-- SELECT id, LEFT(content, 50) as content_preview, published_at, is_active 
-- FROM opinions 
-- WHERE is_active = true
-- ORDER BY published_at ASC;

-- ============================================
-- HOW TO ADD FUTURE OPINIONS:
-- ============================================
-- When you want to add new opinions in the future:
--
-- 1. Check the last opinion's published_at date
-- 2. Find the next rotation day (Tuesday, Friday, or Sunday) after that date
-- 3. Add your new opinion with that date
--
-- Example:
-- If your last opinion has published_at = '2026-01-09' (Friday),
-- your next opinion should have published_at = '2026-01-11' (Sunday)
--
-- INSERT INTO opinions (content, published_at, is_active)
-- VALUES (
--   'Your new opinion text here',
--   '2026-01-11 00:00:00+00',  -- Next Sunday
--   true
-- );
--
-- ============================================
-- TIPS:
-- ============================================
-- - You can add opinions with dates far in the future
-- - The system will automatically cycle through them
-- - If you add an opinion with a date in the past, it will appear
--   in the rotation based on when it should have first appeared
-- - Always use UTC timezone (+00) for consistency
-- - Set is_active = true for opinions you want to show
-- - Set is_active = false to hide opinions without deleting them

