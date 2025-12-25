-- Supabase Schema for Prodverse
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Create songs table
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS songs_created_at_idx ON songs(created_at DESC);
CREATE INDEX IF NOT EXISTS songs_task_id_idx ON songs(task_id);

-- Enable Row Level Security (optional - for user-specific songs later)
-- ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for now (you can add auth later)
-- CREATE POLICY "Allow public read" ON songs FOR SELECT USING (true);
-- CREATE POLICY "Allow public insert" ON songs FOR INSERT WITH CHECK (true);
