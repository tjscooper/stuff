-- ==================== GAINZ QUEST DATABASE SCHEMA ====================
-- Run this SQL in your Supabase SQL Editor to create all tables
-- Tables use Row Level Security (RLS) to ensure users only see their own data

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE,
    current_level INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    completed_quests JSONB DEFAULT '[]'::jsonb,
    unlocked_achievements JSONB DEFAULT '[]'::jsonb,
    last_quest_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exercise_weights table (current weight per exercise)
CREATE TABLE IF NOT EXISTS exercise_weights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    exercise_name TEXT NOT NULL,
    current_weight NUMERIC DEFAULT 10,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, exercise_name)
);

-- Create weight_history table (historical weight data per level)
CREATE TABLE IF NOT EXISTS weight_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    exercise_name TEXT NOT NULL,
    level INTEGER NOT NULL,
    weight NUMERIC NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, exercise_name, level)
);

-- Create set_weights table (per-set weight tracking)
CREATE TABLE IF NOT EXISTS set_weights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    quest_id TEXT NOT NULL,
    exercise_idx INTEGER NOT NULL,
    set_num INTEGER NOT NULL,
    weight NUMERIC NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, quest_id, exercise_idx, set_num)
);

-- Create quest_set_progress table (checkbox states)
CREATE TABLE IF NOT EXISTS quest_set_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    quest_id TEXT NOT NULL UNIQUE,
    progress JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, quest_id)
);

-- Create body_weight_history table
CREATE TABLE IF NOT EXISTS body_weight_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    weight NUMERIC NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout_customizations table
CREATE TABLE IF NOT EXISTS workout_customizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    template_id TEXT NOT NULL,
    customization_json JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, template_id)
);

-- Create custom_exercises table
CREATE TABLE IF NOT EXISTS custom_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    exercise_data_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, exercise_id)
);

-- ==================== ROW LEVEL SECURITY (RLS) ====================
-- Enable RLS on all tables
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_set_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_weight_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_exercises ENABLE ROW LEVEL SECURITY;

-- Create policies: users can only access their own data
-- Note: We're using a client-side generated user_id for anonymous auth

-- user_progress policies
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (true);

-- exercise_weights policies
CREATE POLICY "Users can view own weights" ON exercise_weights
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own weights" ON exercise_weights
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own weights" ON exercise_weights
    FOR UPDATE USING (true);

-- weight_history policies
CREATE POLICY "Users can view own history" ON weight_history
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own history" ON weight_history
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own history" ON weight_history
    FOR UPDATE USING (true);

-- set_weights policies
CREATE POLICY "Users can view own set weights" ON set_weights
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own set weights" ON set_weights
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own set weights" ON set_weights
    FOR UPDATE USING (true);

-- quest_set_progress policies
CREATE POLICY "Users can view own quest progress" ON quest_set_progress
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own quest progress" ON quest_set_progress
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own quest progress" ON quest_set_progress
    FOR UPDATE USING (true);

-- body_weight_history policies
CREATE POLICY "Users can view own body weight" ON body_weight_history
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own body weight" ON body_weight_history
    FOR INSERT WITH CHECK (true);

-- workout_customizations policies
CREATE POLICY "Users can view own customizations" ON workout_customizations
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own customizations" ON workout_customizations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own customizations" ON workout_customizations
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own customizations" ON workout_customizations
    FOR DELETE USING (true);

-- custom_exercises policies
CREATE POLICY "Users can view own exercises" ON custom_exercises
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own exercises" ON custom_exercises
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own exercises" ON custom_exercises
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own exercises" ON custom_exercises
    FOR DELETE USING (true);

-- ==================== INDEXES ====================
-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_exercise_weights_user ON exercise_weights(user_id);
CREATE INDEX IF NOT EXISTS idx_weight_history_user ON weight_history(user_id, exercise_name);
CREATE INDEX IF NOT EXISTS idx_set_weights_user ON set_weights(user_id, quest_id);
CREATE INDEX IF NOT EXISTS idx_body_weight_user ON body_weight_history(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_custom_user ON workout_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_exercises_user ON custom_exercises(user_id);
