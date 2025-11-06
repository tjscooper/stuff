-- ==================== SEED DATA TABLES ====================
-- These tables store reference data (exercises, templates, achievements)
-- that is the same for all users. This allows you to manage the workout
-- program directly in Supabase without code changes.

-- Create exercises master table
CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    bodyweight BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout_templates table
CREATE TABLE IF NOT EXISTS workout_templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    objective TEXT NOT NULL,
    difficulty INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'strength', 'cardio', 'recovery', 'zen'
    preparation_time TEXT,
    preparation_activities JSONB,
    recovery_time TEXT,
    recovery_activities JSONB,
    rest_timer TEXT,
    exercises JSONB, -- Array of {id, sets, reps, notes}
    options JSONB, -- For recovery/zen types
    notes JSONB, -- For recovery/zen types
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quest_mapping table (which template on which level/day)
CREATE TABLE IF NOT EXISTS quest_mapping (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level INTEGER NOT NULL,
    quest_index INTEGER NOT NULL, -- 0-6 (7 quests per level)
    template_id TEXT NOT NULL REFERENCES workout_templates(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(level, quest_index)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    bonus INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quest_mapping_level ON quest_mapping(level);
CREATE INDEX IF NOT EXISTS idx_achievements_sort ON achievements(sort_order);

-- These tables don't need RLS since they're reference data
-- Everyone sees the same exercises, templates, and achievements
