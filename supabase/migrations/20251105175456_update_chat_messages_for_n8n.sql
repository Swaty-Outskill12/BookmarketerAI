/*
  # Update chat_messages table for n8n integration

  1. Changes
    - Add `user_id` column to link messages directly to users (for authentication)
    - Add `conversation_id` column for tracking conversation threads
    - Add `updated_at` column for tracking updates
    - Make `marketing_plan_id` nullable since not all chats are tied to a marketing plan
    - Add indexes for better query performance

  2. Security
    - Update RLS policies to use user_id for authentication
    - Maintain data integrity with proper constraints
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'chat_messages' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE chat_messages 
    ADD COLUMN user_id uuid REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'chat_messages' AND column_name = 'conversation_id'
  ) THEN
    ALTER TABLE chat_messages 
    ADD COLUMN conversation_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'chat_messages' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE chat_messages 
    ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

DO $$
BEGIN
  ALTER TABLE chat_messages 
  ALTER COLUMN marketing_plan_id DROP NOT NULL;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DROP POLICY IF EXISTS "Users can view their own messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can insert their own messages" ON chat_messages;

CREATE POLICY "Users can view their own chat messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id 
  ON chat_messages(user_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id 
  ON chat_messages(conversation_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at_desc 
  ON chat_messages(created_at DESC);
