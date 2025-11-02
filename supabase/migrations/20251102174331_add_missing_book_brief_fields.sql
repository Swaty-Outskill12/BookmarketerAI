/*
  # Add Missing Fields to Book Briefs Table

  1. Schema Changes
    - Add `author_name` (text) - The name of the book author
    - Add `author_id` (text) - External author ID for API integration
    - Add `genre` (text) - The book's genre/category
    - Add `marketing_budget` (numeric) - Monthly marketing budget in dollars
    - Add `book_price` (numeric) - Selling price of the book
    - Add `book_cost` (numeric) - Production cost per book
    - Add `pain_points` (text array) - Customer pain points the book addresses
    - Add `unique_offerings` (text array) - Unique value propositions of the book
    - Add `brand_voice` (text) - The brand voice style for marketing
  
  2. Notes
    - All new fields are nullable to support gradual data population
    - Uses safe IF NOT EXISTS patterns to avoid errors
    - Maintains backward compatibility with existing data
*/

-- Add author_name column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'author_name'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN author_name text;
  END IF;
END $$;

-- Add author_id column for API integration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'author_id'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN author_id text;
  END IF;
END $$;

-- Add genre column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'genre'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN genre text;
  END IF;
END $$;

-- Add marketing_budget column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'marketing_budget'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN marketing_budget numeric;
  END IF;
END $$;

-- Add book_price column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'book_price'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN book_price numeric;
  END IF;
END $$;

-- Add book_cost column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'book_cost'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN book_cost numeric;
  END IF;
END $$;

-- Add pain_points column (array)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'pain_points'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN pain_points text[];
  END IF;
END $$;

-- Add unique_offerings column (array)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'unique_offerings'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN unique_offerings text[];
  END IF;
END $$;

-- Add brand_voice column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'brand_voice'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN brand_voice text;
  END IF;
END $$;

-- Create index on author_id for better query performance
CREATE INDEX IF NOT EXISTS idx_book_briefs_author_id ON book_briefs(author_id);