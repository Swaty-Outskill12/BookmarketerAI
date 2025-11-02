/*
  # Create Book Briefs Table

  1. New Tables
    - `book_briefs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `book_title` (text)
      - `book_type` (text)
      - `format` (text array) - supports multiple format selections
      - `geography` (text array) - supports multiple region selections
      - `target_audience` (text array)
      - `competitors` (text array)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on book_briefs table
    - Add policies for authenticated users to manage their own book briefs
*/

-- Create book_briefs table
CREATE TABLE IF NOT EXISTS book_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  book_title text,
  book_type text,
  format text[],
  geography text[],
  target_audience text[],
  competitors text[],
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE book_briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own book briefs"
  ON book_briefs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own book briefs"
  ON book_briefs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own book briefs"
  ON book_briefs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own book briefs"
  ON book_briefs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_book_briefs_user_id ON book_briefs(user_id);