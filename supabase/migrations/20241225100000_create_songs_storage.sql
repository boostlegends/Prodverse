-- Create storage bucket for songs (audio and images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('songs', 'songs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to songs bucket
CREATE POLICY "Public read access for songs"
ON storage.objects FOR SELECT
USING (bucket_id = 'songs');

-- Allow authenticated and anonymous uploads (for API routes)
CREATE POLICY "Allow uploads to songs bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'songs');

-- Allow updates to songs bucket
CREATE POLICY "Allow updates to songs bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'songs');

-- Allow deletes from songs bucket
CREATE POLICY "Allow deletes from songs bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'songs');
