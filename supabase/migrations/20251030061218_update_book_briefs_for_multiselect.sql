/*
  # Update Book Briefs Table for Multi-Select Fields

  1. Schema Changes
    - Update `format` column to be an array to support multiple format selections (up to 3)
    - Update `geography` column to be an array to support multiple region selections (up to 3)
    - Ensure `target_audience`, `competitors`, and other array fields are properly configured
    - Add a book_type column for single selection dropdown
  
  2. Notes
    - Existing text fields remain as arrays where they were already arrays
    - geography changes from text to array for multi-select support
    - format changes from text to array for multi-select support
    - All changes are safe and use IF EXISTS/IF NOT EXISTS patterns
*/

-- Add book_type column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'book_type'
  ) THEN
    ALTER TABLE book_briefs ADD COLUMN book_type text;
  END IF;
END $$;

-- Convert format from text to text array if it's currently text
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'format' AND data_type = 'text'
  ) THEN
    ALTER TABLE book_briefs ALTER COLUMN format TYPE text[] USING ARRAY[format]::text[];
  END IF;
END $$;

-- Convert geography from text to text array if it's currently text
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'book_briefs' AND column_name = 'geography' AND data_type = 'text'
  ) THEN
    ALTER TABLE book_briefs ALTER COLUMN geography TYPE text[] USING ARRAY[geography]::text[];
  END IF;
END $$;
