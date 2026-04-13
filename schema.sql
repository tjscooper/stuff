-- StuffDB Schema
-- Run this in the Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/mjlmfevnmuysoilhqwiv/sql

-- =====================
-- POSTS (blog/portfolio)
-- =====================
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'other',
  cover_image TEXT DEFAULT '',
  image_urls TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================
-- HABIT ITEMS (daily task lists)
-- =====================
CREATE TABLE IF NOT EXISTS habit_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  group_name TEXT NOT NULL CHECK (group_name IN ('Chore', 'Tim', 'Work')),
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  timebox_minutes INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_items ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Public read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Authenticated users have full access to posts (read drafts, write, edit, delete)
CREATE POLICY "Auth full access to posts"
  ON posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Habit items are private — authenticated users only
CREATE POLICY "Auth manage habits"
  ON habit_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
