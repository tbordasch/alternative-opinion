-- Remove the unique constraint on (opinion_id, session_id)
-- This allows users to comment once per day (as per app logic) rather than once per opinion per session
ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_opinion_id_session_id_key;


