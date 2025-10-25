/*
  # Add Book Builder Pages Schema

  1. New Tables
    - `book_briefs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `book_title` (text)
      - `author_name` (text)
      - `format` (text)
      - `genre` (text)
      - `marketing_budget` (numeric)
      - `book_price` (numeric)
      - `book_cost` (numeric)
      - `pain_points` (text array)
      - `target_audience` (text array)
      - `geography` (text)
      - `competitors` (text array)
      - `unique_offerings` (text array)
      - `brand_voice` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `organic_posts`
      - `id` (uuid, primary key)
      - `marketing_plan_id` (uuid, references marketing_plans)
      - `post_number` (integer)
      - `post_type` (text) - 'IMAGE', 'VIDEO', 'TEXT'
      - `content` (text)
      - `media_url` (text)
      - `suggested_date` (date)
      - `posted` (boolean)
      - `posted_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `paid_ads`
      - `id` (uuid, primary key)
      - `marketing_plan_id` (uuid, references marketing_plans)
      - `ad_number` (integer)
      - `status` (text) - 'not_deployed', 'live', 'paused'
      - `budget` (numeric)
      - `start_date` (date)
      - `end_date` (date)
      - `audience_targeting` (jsonb)
      - `placements` (text)
      - `optimization` (text)
      - `media_url` (text)
      - `primary_text` (text)
      - `headline` (text)
      - `description` (text)
      - `cta` (text)
      - `website_url` (text)
      - `display_link` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create book_briefs table
CREATE TABLE IF NOT EXISTS book_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  book_title text,
  author_name text,
  format text,
  genre text,
  marketing_budget numeric,
  book_price numeric,
  book_cost numeric,
  pain_points text[],
  target_audience text[],
  geography text,
  competitors text[],
  unique_offerings text[],
  brand_voice text,
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

-- Create organic_posts table
CREATE TABLE IF NOT EXISTS organic_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marketing_plan_id uuid REFERENCES marketing_plans(id) ON DELETE CASCADE NOT NULL,
  post_number integer NOT NULL,
  post_type text DEFAULT 'IMAGE',
  content text,
  media_url text,
  suggested_date date,
  posted boolean DEFAULT false,
  posted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organic_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own organic posts"
  ON organic_posts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = organic_posts.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own organic posts"
  ON organic_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = organic_posts.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own organic posts"
  ON organic_posts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = organic_posts.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = organic_posts.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own organic posts"
  ON organic_posts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = organic_posts.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

-- Create paid_ads table
CREATE TABLE IF NOT EXISTS paid_ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marketing_plan_id uuid REFERENCES marketing_plans(id) ON DELETE CASCADE NOT NULL,
  ad_number integer NOT NULL,
  status text DEFAULT 'not_deployed',
  budget numeric DEFAULT 0,
  start_date date,
  end_date date,
  audience_targeting jsonb,
  placements text DEFAULT 'All',
  optimization text DEFAULT 'Conversions',
  media_url text,
  primary_text text,
  headline text,
  description text,
  cta text,
  website_url text,
  display_link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE paid_ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own paid ads"
  ON paid_ads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = paid_ads.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own paid ads"
  ON paid_ads FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = paid_ads.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own paid ads"
  ON paid_ads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = paid_ads.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = paid_ads.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own paid ads"
  ON paid_ads FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = paid_ads.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_book_briefs_user_id ON book_briefs(user_id);
CREATE INDEX IF NOT EXISTS idx_organic_posts_marketing_plan_id ON organic_posts(marketing_plan_id);
CREATE INDEX IF NOT EXISTS idx_paid_ads_marketing_plan_id ON paid_ads(marketing_plan_id);