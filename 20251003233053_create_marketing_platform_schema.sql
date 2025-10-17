/*
  # Create Marketing Platform Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `marketing_plans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `book_title` (text)
      - `book_genre` (text)
      - `target_audience` (text)
      - `campaign_goal` (text)
      - `monthly_budget` (numeric)
      - `plan_data` (jsonb) - stores the complete marketing plan
      - `status` (text) - 'draft', 'pending_payment', 'approved', 'active'
      - `subscription_type` (text) - 'monthly', '6months', null
      - `subscription_expires_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `marketing_plan_id` (uuid, references marketing_plans)
      - `role` (text) - 'user' or 'assistant'
      - `content` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create marketing_plans table
CREATE TABLE IF NOT EXISTS marketing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  book_title text NOT NULL,
  book_genre text,
  target_audience text,
  campaign_goal text,
  monthly_budget numeric,
  plan_data jsonb,
  status text DEFAULT 'draft',
  subscription_type text,
  subscription_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE marketing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own marketing plans"
  ON marketing_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own marketing plans"
  ON marketing_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own marketing plans"
  ON marketing_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own marketing plans"
  ON marketing_plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marketing_plan_id uuid NOT NULL REFERENCES marketing_plans(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view chat messages for own marketing plans"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = chat_messages.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert chat messages for own marketing plans"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = chat_messages.marketing_plan_id
      AND marketing_plans.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_marketing_plans_user_id ON marketing_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_marketing_plan_id ON chat_messages(marketing_plan_id);
