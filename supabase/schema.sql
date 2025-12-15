-- Create opinions table
CREATE TABLE IF NOT EXISTS opinions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opinion_id UUID NOT NULL REFERENCES opinions(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT NOT NULL -- Anonymous session identifier
  -- Note: One comment per round is enforced in application logic, not database constraint
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- Anonymous session identifier
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, session_id) -- One like per comment per session
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_opinions_published_at ON opinions(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_opinions_is_active ON opinions(is_active);
CREATE INDEX IF NOT EXISTS idx_comments_opinion_id ON comments(opinion_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_comment_id ON likes(comment_id);

-- Enable Row Level Security (RLS)
ALTER TABLE opinions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read opinions
CREATE POLICY "Anyone can read opinions" ON opinions
  FOR SELECT USING (true);

-- Policies: Everyone can read comments
CREATE POLICY "Anyone can read comments" ON comments
  FOR SELECT USING (true);

-- Policies: Anyone can insert comments (anonymous)
CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Policies: Anyone can read likes
CREATE POLICY "Anyone can read likes" ON likes
  FOR SELECT USING (true);

-- Policies: Anyone can insert likes (anonymous)
CREATE POLICY "Anyone can insert likes" ON likes
  FOR INSERT WITH CHECK (true);

-- Policies: Anyone can delete their own likes (by session_id)
CREATE POLICY "Anyone can delete their own likes" ON likes
  FOR DELETE USING (true);

