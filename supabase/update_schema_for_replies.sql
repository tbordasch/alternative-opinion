-- Update schema to support replies and remove comment constraint
-- Run this after the main schema.sql

-- Remove the unique constraint on (opinion_id, session_id) if it exists
ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_opinion_id_session_id_key;

-- Create replies table
CREATE TABLE IF NOT EXISTS replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  opinion_id UUID NOT NULL REFERENCES opinions(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT NOT NULL -- Anonymous session identifier
);

-- Create indexes for replies
CREATE INDEX IF NOT EXISTS idx_replies_comment_id ON replies(comment_id);
CREATE INDEX IF NOT EXISTS idx_replies_opinion_id ON replies(opinion_id);
CREATE INDEX IF NOT EXISTS idx_replies_session_id ON replies(session_id);
CREATE INDEX IF NOT EXISTS idx_replies_created_at ON replies(created_at DESC);

-- Enable Row Level Security for replies
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read replies
CREATE POLICY "Anyone can read replies" ON replies
  FOR SELECT USING (true);

-- Policies: Anyone can insert replies (anonymous)
CREATE POLICY "Anyone can insert replies" ON replies
  FOR INSERT WITH CHECK (true);

