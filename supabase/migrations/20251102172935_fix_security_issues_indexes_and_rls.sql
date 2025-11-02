/*
  # Fix Security Issues - Indexes and RLS Optimization

  ## Changes Made
  
  1. **Add Missing Indexes for Foreign Keys**
    - Add index for Book_Information.author_id
    - Add index for Facebook_paid_ad_Information.marketing_plan_id
    - Add index for Marketing_Plan_Information.author_id
    - Add index for Organic_Post_Information.marketing_plan_id
  
  2. **Optimize RLS Policies** (Replace auth.uid() with (SELECT auth.uid()))
    - Update all profiles table policies
    - Update all marketing_plans table policies
    - Update all chat_messages table policies
    - Update all book_briefs table policies
  
  3. **Enable RLS for Unprotected Tables**
    - Enable RLS on Author_Information
    - Enable RLS on Book_Information
    - Enable RLS on Marketing_Plan_Information
  
  4. **Add RLS Policies for Tables with RLS Enabled but No Policies**
    - Add policies for Facebook_paid_ad_Information
    - Add policies for Organic_Post_Information
  
  ## Security Benefits
  - Improved query performance with proper indexes
  - Optimized RLS policies for better scalability
  - Complete data protection across all tables
*/

-- =====================================================
-- 1. ADD MISSING INDEXES FOR FOREIGN KEYS
-- =====================================================

-- Index for Book_Information.author_id
CREATE INDEX IF NOT EXISTS idx_book_information_author_id 
ON "Book_Information"(author_id);

-- Index for Facebook_paid_ad_Information.marketing_plan_id
CREATE INDEX IF NOT EXISTS idx_facebook_paid_ad_marketing_plan_id 
ON "Facebook_paid_ad_Information"(marketing_plan_id);

-- Index for Marketing_Plan_Information.author_id
CREATE INDEX IF NOT EXISTS idx_marketing_plan_information_author_id 
ON "Marketing_Plan_Information"(author_id);

-- Index for Organic_Post_Information.marketing_plan_id
CREATE INDEX IF NOT EXISTS idx_organic_post_marketing_plan_id 
ON "Organic_Post_Information"(marketing_plan_id);

-- =====================================================
-- 2. OPTIMIZE RLS POLICIES - PROFILES TABLE
-- =====================================================

-- Drop and recreate optimized policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id);

-- =====================================================
-- 3. OPTIMIZE RLS POLICIES - MARKETING_PLANS TABLE
-- =====================================================

-- Drop and recreate optimized policies for marketing_plans
DROP POLICY IF EXISTS "Users can view own marketing plans" ON marketing_plans;
DROP POLICY IF EXISTS "Users can insert own marketing plans" ON marketing_plans;
DROP POLICY IF EXISTS "Users can update own marketing plans" ON marketing_plans;
DROP POLICY IF EXISTS "Users can delete own marketing plans" ON marketing_plans;

CREATE POLICY "Users can view own marketing plans"
  ON marketing_plans FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own marketing plans"
  ON marketing_plans FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own marketing plans"
  ON marketing_plans FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own marketing plans"
  ON marketing_plans FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- =====================================================
-- 4. OPTIMIZE RLS POLICIES - CHAT_MESSAGES TABLE
-- =====================================================

-- Drop and recreate optimized policies for chat_messages
DROP POLICY IF EXISTS "Users can view chat messages for own marketing plans" ON chat_messages;
DROP POLICY IF EXISTS "Users can insert chat messages for own marketing plans" ON chat_messages;

CREATE POLICY "Users can view chat messages for own marketing plans"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = chat_messages.marketing_plan_id
      AND marketing_plans.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Users can insert chat messages for own marketing plans"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM marketing_plans
      WHERE marketing_plans.id = chat_messages.marketing_plan_id
      AND marketing_plans.user_id = (SELECT auth.uid())
    )
  );

-- =====================================================
-- 5. OPTIMIZE RLS POLICIES - BOOK_BRIEFS TABLE
-- =====================================================

-- Drop and recreate optimized policies for book_briefs
DROP POLICY IF EXISTS "Users can view own book briefs" ON book_briefs;
DROP POLICY IF EXISTS "Users can insert own book briefs" ON book_briefs;
DROP POLICY IF EXISTS "Users can update own book briefs" ON book_briefs;
DROP POLICY IF EXISTS "Users can delete own book briefs" ON book_briefs;

CREATE POLICY "Users can view own book briefs"
  ON book_briefs FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own book briefs"
  ON book_briefs FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own book briefs"
  ON book_briefs FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own book briefs"
  ON book_briefs FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- =====================================================
-- 6. ENABLE RLS FOR UNPROTECTED TABLES
-- =====================================================

-- Enable RLS on Author_Information
ALTER TABLE "Author_Information" ENABLE ROW LEVEL SECURITY;

-- Create policies for Author_Information
-- Assuming authors are linked to profiles via email or another mechanism
-- For now, allow authenticated users to view all authors, but only manage their own
CREATE POLICY "Authors can view all author information"
  ON "Author_Information" FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authors can insert own author information"
  ON "Author_Information" FOR INSERT
  TO authenticated
  WITH CHECK (email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid())));

CREATE POLICY "Authors can update own author information"
  ON "Author_Information" FOR UPDATE
  TO authenticated
  USING (email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid())))
  WITH CHECK (email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid())));

CREATE POLICY "Authors can delete own author information"
  ON "Author_Information" FOR DELETE
  TO authenticated
  USING (email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid())));

-- Enable RLS on Book_Information
ALTER TABLE "Book_Information" ENABLE ROW LEVEL SECURITY;

-- Create policies for Book_Information
CREATE POLICY "Users can view books for their author profile"
  ON "Book_Information" FOR SELECT
  TO authenticated
  USING (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "Users can insert books for their author profile"
  ON "Book_Information" FOR INSERT
  TO authenticated
  WITH CHECK (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "Users can update books for their author profile"
  ON "Book_Information" FOR UPDATE
  TO authenticated
  USING (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  )
  WITH CHECK (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "Users can delete books for their author profile"
  ON "Book_Information" FOR DELETE
  TO authenticated
  USING (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

-- Enable RLS on Marketing_Plan_Information
ALTER TABLE "Marketing_Plan_Information" ENABLE ROW LEVEL SECURITY;

-- Create policies for Marketing_Plan_Information
CREATE POLICY "Users can view their marketing plan information"
  ON "Marketing_Plan_Information" FOR SELECT
  TO authenticated
  USING (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "Users can insert their marketing plan information"
  ON "Marketing_Plan_Information" FOR INSERT
  TO authenticated
  WITH CHECK (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "Users can update their marketing plan information"
  ON "Marketing_Plan_Information" FOR UPDATE
  TO authenticated
  USING (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  )
  WITH CHECK (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

CREATE POLICY "Users can delete their marketing plan information"
  ON "Marketing_Plan_Information" FOR DELETE
  TO authenticated
  USING (
    author_id IN (
      SELECT id FROM "Author_Information" 
      WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
    )
  );

-- =====================================================
-- 7. ADD POLICIES FOR TABLES WITH RLS BUT NO POLICIES
-- =====================================================

-- Create policies for Facebook_paid_ad_Information
CREATE POLICY "Users can view their facebook ads"
  ON "Facebook_paid_ad_Information" FOR SELECT
  TO authenticated
  USING (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );

CREATE POLICY "Users can insert their facebook ads"
  ON "Facebook_paid_ad_Information" FOR INSERT
  TO authenticated
  WITH CHECK (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );

CREATE POLICY "Users can update their facebook ads"
  ON "Facebook_paid_ad_Information" FOR UPDATE
  TO authenticated
  USING (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  )
  WITH CHECK (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );

CREATE POLICY "Users can delete their facebook ads"
  ON "Facebook_paid_ad_Information" FOR DELETE
  TO authenticated
  USING (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );

-- Create policies for Organic_Post_Information
CREATE POLICY "Users can view their organic posts"
  ON "Organic_Post_Information" FOR SELECT
  TO authenticated
  USING (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );

CREATE POLICY "Users can insert their organic posts"
  ON "Organic_Post_Information" FOR INSERT
  TO authenticated
  WITH CHECK (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );

CREATE POLICY "Users can update their organic posts"
  ON "Organic_Post_Information" FOR UPDATE
  TO authenticated
  USING (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  )
  WITH CHECK (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );

CREATE POLICY "Users can delete their organic posts"
  ON "Organic_Post_Information" FOR DELETE
  TO authenticated
  USING (
    marketing_plan_id IN (
      SELECT id FROM "Marketing_Plan_Information"
      WHERE author_id IN (
        SELECT id FROM "Author_Information"
        WHERE email = (SELECT email FROM profiles WHERE id = (SELECT auth.uid()))
      )
    )
  );