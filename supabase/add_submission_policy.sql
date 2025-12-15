-- Add policy to allow opinion submissions
-- Run this in Supabase SQL Editor after creating the tables

-- Policy: Anyone can insert opinions (for submissions)
CREATE POLICY "Anyone can insert opinions" ON opinions
  FOR INSERT WITH CHECK (true);

