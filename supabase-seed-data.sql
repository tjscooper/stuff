-- ==================== SEED DATA FOR GAINZ QUEST ====================
-- Run this AFTER running supabase-seed-data-schema.sql
-- This populates the reference tables with exercises, templates, and mappings

-- Clear existing data (if re-seeding)
TRUNCATE quest_mapping, workout_templates, exercises, achievements CASCADE;

-- ==================== EXERCISES ====================
INSERT INTO exercises (id, name, bodyweight) VALUES
-- Push exercises
('push_ups', 'Push-ups', true),
('incline_push_ups', 'Incline Push-ups', true),
('diamond_push_ups', 'Diamond Push-ups', true),
('pike_push_ups', 'Pike Push-ups', true),
('decline_push_ups', 'Decline Push-ups', true),
('bench_press', 'Bench Press', false),
('incline_dumbbell_press', 'Incline Dumbbell Press', false),
('dumbbell_bench_press', 'Dumbbell Bench Press', false),
('chest_flyes', 'Chest Flyes', false),
('pec_deck', 'Pec Deck (or Chest Flyes)', false),
('chest_press_machine', 'Chest Press Machine (or Push-ups)', false),

-- Triceps
('tricep_dips', 'Tricep Dips', true),
('overhead_tricep_extension', 'Overhead Tricep Extension', false),
('skull_crushers', 'Skull Crushers', false),

-- Pull exercises
('pull_ups', 'Pull-ups/Assisted', true),
('chin_ups', 'Chin-ups', true),
('lat_pulldowns', 'Lat Pulldowns (or Assisted Pull-ups)', false),
('bent_over_rows', 'Bent-over Dumbbell Rows', false),
('single_arm_rows', 'Single-arm Dumbbell Rows', false),
('seated_rows', 'Seated Rows', false),
('face_pulls', 'Face Pulls', false),

-- Biceps
('bicep_curls', 'Bicep Curls', false),
('hammer_curls', 'Hammer Curls', false),
('concentration_curls', 'Concentration Curls', false),
('bicep_21s', '21s Bicep Curls', false),

-- Shoulders
('overhead_press', 'Overhead Press', false),
('arnold_press', 'Arnold Press', false),
('lateral_raises', 'Lateral Raises', false),
('front_raises', 'Front Raises', false),

-- Legs
('squats', 'Squats', false),
('goblet_squats', 'Goblet Squats', false),
('walking_lunges', 'Walking Lunges', true),
('lunges', 'Alternating Lunges', true),
('romanian_deadlifts', 'Romanian Deadlifts', false),
('calf_raises', 'Calf Raises', true),
('jump_squats', 'Jump Squats', true),

-- Circuit/Cardio
('burpees', 'Burpees', true),
('mountain_climbers', 'Mountain Climbers', true),
('jumping_jacks', 'Jumping Jacks', true),
('high_knees', 'High Knees', true),
('plank_hold', 'Plank Hold', true),
('circuit_round', 'CIRCUIT (3-4 rounds)', true);

-- ==================== WORKOUT TEMPLATES ====================

-- Chest & Triceps Battle
INSERT INTO workout_templates (id, name, objective, difficulty, type, preparation_time, preparation_activities, recovery_time, recovery_activities, rest_timer, exercises) VALUES
('chest_triceps', 'CHEST & TRICEPS BATTLE', 'Defeat chest and tricep enemies', 2, 'strength',
 '5-8 min',
 '["Light cardio warmup: 5 minutes", "Arm circles: 10 forward, 10 backward", "Push-up to downward dog: 8 reps"]'::jsonb,
 '5 min',
 '["Chest doorway stretch: 30 sec each arm", "Tricep overhead stretch: 30 sec each arm"]'::jsonb,
 '60-90 seconds between sets',
 '[{"id":"push_ups","sets":3,"reps":"8-12","notes":"Modify on knees if needed"},{"id":"incline_dumbbell_press","sets":3,"reps":"10-12"},{"id":"chest_flyes","sets":3,"reps":"12-15"},{"id":"tricep_dips","sets":3,"reps":"8-12"},{"id":"overhead_tricep_extension","sets":3,"reps":"10-12"},{"id":"diamond_push_ups","sets":2,"reps":"5-8"}]'::jsonb);

-- Back & Biceps Battle
INSERT INTO workout_templates (id, name, objective, difficulty, type, preparation_time, preparation_activities, recovery_time, recovery_activities, rest_timer, exercises) VALUES
('back_biceps', 'BACK & BICEPS BATTLE', 'Conquer back and bicep challenges', 2, 'strength',
 '5-8 min',
 '["Light cardio warmup: 5 minutes", "Arm swings: 10 each direction", "Cat-cow stretches: 8 reps"]'::jsonb,
 '5 min',
 '["Upper trap stretch: 30 sec each side", "Cross-body shoulder stretch: 30 sec each arm", "Child''s pose: 60 seconds"]'::jsonb,
 '60-90 seconds between sets',
 '[{"id":"bent_over_rows","sets":3,"reps":"10-12"},{"id":"lat_pulldowns","sets":3,"reps":"8-12"},{"id":"single_arm_rows","sets":3,"reps":"10","notes":"each arm"},{"id":"bicep_curls","sets":3,"reps":"12-15"},{"id":"hammer_curls","sets":3,"reps":"10-12"},{"id":"face_pulls","sets":3,"reps":"15"}]'::jsonb);

-- Shoulders & Legs Raid
INSERT INTO workout_templates (id, name, objective, difficulty, type, preparation_time, preparation_activities, recovery_time, recovery_activities, rest_timer, exercises) VALUES
('shoulders_legs', 'SHOULDERS & LEGS RAID', 'Dominate shoulders and leg territory', 3, 'strength',
 '8-10 min',
 '["Light cardio warmup: 5 minutes", "Leg swings: 10 each direction, each leg", "Arm circles: 10 each direction", "Bodyweight squats: 10 reps"]'::jsonb,
 '5 min',
 '["Quad stretch: 30 sec each leg", "Hamstring stretch: 30 sec each leg", "Shoulder rolls and arm stretches"]'::jsonb,
 '60-90 seconds between sets',
 '[{"id":"goblet_squats","sets":3,"reps":"12-15"},{"id":"overhead_press","sets":3,"reps":"10-12"},{"id":"walking_lunges","sets":3,"reps":"10","notes":"each leg"},{"id":"lateral_raises","sets":3,"reps":"12-15"},{"id":"romanian_deadlifts","sets":3,"reps":"10-12"},{"id":"front_raises","sets":3,"reps":"10-12"},{"id":"calf_raises","sets":3,"reps":"15-20"}]'::jsonb);

-- Chest & Biceps Strike
INSERT INTO workout_templates (id, name, objective, difficulty, type, preparation_time, preparation_activities, recovery_time, recovery_activities, rest_timer, exercises) VALUES
('chest_biceps', 'CHEST & BICEPS STRIKE', 'Second strike on chest and biceps', 2, 'strength',
 '5-8 min',
 '["Light cardio warmup: 5 minutes", "Arm circles and shoulder rolls", "Light push-ups: 5-8 reps"]'::jsonb,
 '5 min',
 '["Chest stretches in doorway", "Bicep stretches against wall"]'::jsonb,
 '60-90 seconds between sets',
 '[{"id":"dumbbell_bench_press","sets":3,"reps":"10-12"},{"id":"incline_push_ups","sets":3,"reps":"10-15"},{"id":"concentration_curls","sets":3,"reps":"10-12","notes":"each arm"},{"id":"chest_press_machine","sets":3,"reps":"12-15"},{"id":"bicep_21s","sets":2,"reps":"7 bottom + 7 top + 7 full"},{"id":"pec_deck","sets":3,"reps":"12-15"}]'::jsonb);

-- Full Body Circuit Gauntlet
INSERT INTO workout_templates (id, name, objective, difficulty, type, preparation_time, preparation_activities, recovery_time, recovery_activities, rest_timer, exercises) VALUES
('full_body_circuit', 'FULL BODY CIRCUIT GAUNTLET', 'Survive the ultimate circuit challenge', 4, 'cardio',
 '5 min',
 '["Dynamic movements: high knees, butt kickers, arm swings"]'::jsonb,
 '8-10 min',
 '["Full body stretching routine"]'::jsonb,
 '1-2 minutes between rounds',
 '[{"id":"circuit_round","sets":1,"reps":"45s work / 15s rest each:"},{"id":"burpees","sets":1,"reps":"Modified if needed"},{"id":"mountain_climbers","sets":1,"reps":"Keep core tight"},{"id":"jump_squats","sets":1,"reps":"Land softly"},{"id":"push_ups","sets":1,"reps":"Any variation"},{"id":"plank_hold","sets":1,"reps":"Strong position"},{"id":"jumping_jacks","sets":1,"reps":"Full body movement"},{"id":"lunges","sets":1,"reps":"Controlled movement"},{"id":"high_knees","sets":1,"reps":"Running in place"}]'::jsonb);

-- Recovery Mission
INSERT INTO workout_templates (id, name, objective, difficulty, type, preparation_time, preparation_activities, recovery_time, recovery_activities, rest_timer, exercises, options, notes) VALUES
('recovery', 'RECOVERY MISSION', 'Active recovery to restore HP', 1, 'recovery',
 NULL, NULL, NULL, NULL, NULL, NULL,
 '["30-45 minute brisk walk outdoors", "Light bike ride (20-30 minutes)", "Swimming (20-30 minutes)", "Recreational sports (light intensity)", "Easy hiking"]'::jsonb,
 '["Keep heart rate in Zone 1-2 (conversational pace)", "Focus on movement and recovery", "Enjoy the activity - this restores HP!"]'::jsonb);

-- Zen Mode
INSERT INTO workout_templates (id, name, objective, difficulty, type, preparation_time, preparation_activities, recovery_time, recovery_activities, rest_timer, exercises, options, notes) VALUES
('zen', 'OPTIONAL ZEN MODE', 'Flexibility and mindfulness training', 1, 'zen',
 NULL, NULL, NULL, NULL, NULL, NULL,
 '["YOGA SESSION (30-45 min): Gentle flow or restorative yoga", "LEISURELY WALK (30-60 min): Nature walk or neighborhood stroll", "REST DAY: Complete rest with light stretching (10-15 min)"]'::jsonb,
 '["Focus on flexibility and relaxation", "Meditation or breathing exercises welcome", "This quest restores mental HP!"]'::jsonb);

-- ==================== QUEST MAPPING ====================
-- All 24 levels follow the same pattern

DO $$
BEGIN
  FOR level_num IN 1..24 LOOP
    INSERT INTO quest_mapping (level, quest_index, template_id) VALUES
      (level_num, 0, 'chest_triceps'),
      (level_num, 1, 'back_biceps'),
      (level_num, 2, 'shoulders_legs'),
      (level_num, 3, 'chest_biceps'),
      (level_num, 4, 'full_body_circuit'),
      (level_num, 5, 'recovery'),
      (level_num, 6, 'zen');
  END LOOP;
END $$;

-- ==================== ACHIEVEMENTS ====================

INSERT INTO achievements (id, name, description, icon, bonus, sort_order) VALUES
('first-quest', 'First Quest Complete', 'Complete your first quest', '⚔️', 0, 1),
('level-1', 'Level 1 Champion', 'Complete all 7 quests in Level 1', '🏅', 1, 2),
('level-5', 'Rising Warrior', 'Reach Level 5', '⭐', 2, 3),
('level-10', 'Veteran Fighter', 'Reach Level 10', '🌟', 3, 4),
('level-15', 'Elite Champion', 'Reach Level 15', '💫', 5, 5),
('streak-7', 'Week Warrior', '7-day quest streak', '🔥', 2, 6),
('streak-14', 'Fortnight Hero', '14-day quest streak', '💪', 3, 7),
('streak-30', 'Month Legend', '30-day quest streak', '👑', 5, 8),
('half-way', 'Halfway Hero', 'Complete Level 12', '🎖️', 5, 9),
('ultimate-warrior', 'ULTIMATE WARRIOR', 'Complete all 24 levels!', '👑', 10, 10);

-- Success message
SELECT 'Seed data loaded successfully!' as status,
       (SELECT COUNT(*) FROM exercises) as exercises_count,
       (SELECT COUNT(*) FROM workout_templates) as templates_count,
       (SELECT COUNT(*) FROM quest_mapping) as quest_mappings_count,
       (SELECT COUNT(*) FROM achievements) as achievements_count;
