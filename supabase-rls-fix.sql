-- ==================== RLS SECURITY FIX ====================
-- This script drops the insecure RLS policies and recreates them with proper auth checks
-- Run this in your Supabase SQL Editor to fix the security vulnerability
--
-- IMPORTANT: The old policies allowed ANY user to see ALL data!
-- These new policies ensure users can only access their OWN data.

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

DROP POLICY IF EXISTS "Users can view own weights" ON exercise_weights;
DROP POLICY IF EXISTS "Users can insert own weights" ON exercise_weights;
DROP POLICY IF EXISTS "Users can update own weights" ON exercise_weights;

DROP POLICY IF EXISTS "Users can view own history" ON weight_history;
DROP POLICY IF EXISTS "Users can insert own history" ON weight_history;
DROP POLICY IF EXISTS "Users can update own history" ON weight_history;

DROP POLICY IF EXISTS "Users can view own set weights" ON set_weights;
DROP POLICY IF EXISTS "Users can insert own set weights" ON set_weights;
DROP POLICY IF EXISTS "Users can update own set weights" ON set_weights;

DROP POLICY IF EXISTS "Users can view own quest progress" ON quest_set_progress;
DROP POLICY IF EXISTS "Users can insert own quest progress" ON quest_set_progress;
DROP POLICY IF EXISTS "Users can update own quest progress" ON quest_set_progress;

DROP POLICY IF EXISTS "Users can view own body weight" ON body_weight_history;
DROP POLICY IF EXISTS "Users can insert own body weight" ON body_weight_history;

DROP POLICY IF EXISTS "Users can view own customizations" ON workout_customizations;
DROP POLICY IF EXISTS "Users can insert own customizations" ON workout_customizations;
DROP POLICY IF EXISTS "Users can update own customizations" ON workout_customizations;
DROP POLICY IF EXISTS "Users can delete own customizations" ON workout_customizations;

DROP POLICY IF EXISTS "Users can view own exercises" ON custom_exercises;
DROP POLICY IF EXISTS "Users can insert own exercises" ON custom_exercises;
DROP POLICY IF EXISTS "Users can update own exercises" ON custom_exercises;
DROP POLICY IF EXISTS "Users can delete own exercises" ON custom_exercises;

-- Create secure policies with proper auth.uid() checks
-- user_progress policies
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (user_id = auth.uid()::text);

-- exercise_weights policies
CREATE POLICY "Users can view own weights" ON exercise_weights
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own weights" ON exercise_weights
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own weights" ON exercise_weights
    FOR UPDATE USING (user_id = auth.uid()::text);

-- weight_history policies
CREATE POLICY "Users can view own history" ON weight_history
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own history" ON weight_history
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own history" ON weight_history
    FOR UPDATE USING (user_id = auth.uid()::text);

-- set_weights policies
CREATE POLICY "Users can view own set weights" ON set_weights
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own set weights" ON set_weights
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own set weights" ON set_weights
    FOR UPDATE USING (user_id = auth.uid()::text);

-- quest_set_progress policies
CREATE POLICY "Users can view own quest progress" ON quest_set_progress
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own quest progress" ON quest_set_progress
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own quest progress" ON quest_set_progress
    FOR UPDATE USING (user_id = auth.uid()::text);

-- body_weight_history policies
CREATE POLICY "Users can view own body weight" ON body_weight_history
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own body weight" ON body_weight_history
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- workout_customizations policies
CREATE POLICY "Users can view own customizations" ON workout_customizations
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own customizations" ON workout_customizations
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own customizations" ON workout_customizations
    FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete own customizations" ON workout_customizations
    FOR DELETE USING (user_id = auth.uid()::text);

-- custom_exercises policies
CREATE POLICY "Users can view own exercises" ON custom_exercises
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own exercises" ON custom_exercises
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own exercises" ON custom_exercises
    FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete own exercises" ON custom_exercises
    FOR DELETE USING (user_id = auth.uid()::text);

-- Done! Your data is now properly secured at the database level.
