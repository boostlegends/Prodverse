-- Create songs table for storing generated music
CREATE TABLE IF NOT EXISTS songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  stream_url TEXT NOT NULL,
  image_url TEXT,
  duration INTEGER,
  style TEXT,
  prompt TEXT,
  task_id TEXT NOT NULL,
  suno_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS songs_created_at_idx ON songs(created_at DESC);
CREATE INDEX IF NOT EXISTS songs_task_id_idx ON songs(task_id);
