// ==================== EXERCISE LIBRARY ====================

const exerciseLibrary = {
    // Push exercises
    'push_ups': { name: 'Push-ups', bodyweight: true },
    'incline_push_ups': { name: 'Incline Push-ups', bodyweight: true },
    'diamond_push_ups': { name: 'Diamond Push-ups', bodyweight: true },
    'pike_push_ups': { name: 'Pike Push-ups', bodyweight: true },
    'decline_push_ups': { name: 'Decline Push-ups', bodyweight: true },
    'bench_press': { name: 'Bench Press', bodyweight: false },
    'incline_dumbbell_press': { name: 'Incline Dumbbell Press', bodyweight: false },
    'dumbbell_bench_press': { name: 'Dumbbell Bench Press', bodyweight: false },
    'chest_flyes': { name: 'Chest Flyes', bodyweight: false },
    'pec_deck': { name: 'Pec Deck (or Chest Flyes)', bodyweight: false },
    'chest_press_machine': { name: 'Chest Press Machine (or Push-ups)', bodyweight: false },

    // Triceps
    'tricep_dips': { name: 'Tricep Dips', bodyweight: true },
    'overhead_tricep_extension': { name: 'Overhead Tricep Extension', bodyweight: false },
    'skull_crushers': { name: 'Skull Crushers', bodyweight: false },

    // Pull exercises
    'pull_ups': { name: 'Pull-ups/Assisted', bodyweight: true },
    'chin_ups': { name: 'Chin-ups', bodyweight: true },
    'lat_pulldowns': { name: 'Lat Pulldowns (or Assisted Pull-ups)', bodyweight: false },
    'bent_over_rows': { name: 'Bent-over Dumbbell Rows', bodyweight: false },
    'single_arm_rows': { name: 'Single-arm Dumbbell Rows', bodyweight: false },
    'seated_rows': { name: 'Seated Rows', bodyweight: false },
    'face_pulls': { name: 'Face Pulls', bodyweight: false },

    // Biceps
    'bicep_curls': { name: 'Bicep Curls', bodyweight: false },
    'hammer_curls': { name: 'Hammer Curls', bodyweight: false },
    'concentration_curls': { name: 'Concentration Curls', bodyweight: false },
    'bicep_21s': { name: '21s Bicep Curls', bodyweight: false },

    // Shoulders
    'overhead_press': { name: 'Overhead Press', bodyweight: false },
    'arnold_press': { name: 'Arnold Press', bodyweight: false },
    'lateral_raises': { name: 'Lateral Raises', bodyweight: false },
    'front_raises': { name: 'Front Raises', bodyweight: false },

    // Legs
    'squats': { name: 'Squats', bodyweight: false },
    'goblet_squats': { name: 'Goblet Squats', bodyweight: false },
    'walking_lunges': { name: 'Walking Lunges', bodyweight: true },
    'lunges': { name: 'Alternating Lunges', bodyweight: true },
    'romanian_deadlifts': { name: 'Romanian Deadlifts', bodyweight: false },
    'calf_raises': { name: 'Calf Raises', bodyweight: true },
    'jump_squats': { name: 'Jump Squats', bodyweight: true },

    // Circuit/Cardio
    'burpees': { name: 'Burpees', bodyweight: true },
    'mountain_climbers': { name: 'Mountain Climbers', bodyweight: true },
    'jumping_jacks': { name: 'Jumping Jacks', bodyweight: true },
    'high_knees': { name: 'High Knees', bodyweight: true },
    'plank_hold': { name: 'Plank Hold', bodyweight: true },
    'circuit_round': { name: 'CIRCUIT (3-4 rounds)', bodyweight: true }
};

// ==================== WORKOUT TEMPLATES ====================

const workoutTemplates = {
    'chest_triceps': {
        name: 'CHEST & TRICEPS BATTLE',
        objective: 'Defeat chest and tricep enemies',
        difficulty: 2,
        preparation: {
            time: '5-8 min',
            activities: [
                'Light cardio warmup: 5 minutes',
                'Arm circles: 10 forward, 10 backward',
                'Push-up to downward dog: 8 reps'
            ]
        },
        exercises: [
            { id: 'push_ups', sets: 3, reps: '8-12', notes: 'Modify on knees if needed' },
            { id: 'incline_dumbbell_press', sets: 3, reps: '10-12' },
            { id: 'chest_flyes', sets: 3, reps: '12-15' },
            { id: 'tricep_dips', sets: 3, reps: '8-12' },
            { id: 'overhead_tricep_extension', sets: 3, reps: '10-12' },
            { id: 'diamond_push_ups', sets: 2, reps: '5-8' }
        ],
        recovery: {
            time: '5 min',
            activities: [
                'Chest doorway stretch: 30 sec each arm',
                'Tricep overhead stretch: 30 sec each arm'
            ]
        },
        restTimer: '60-90 seconds between sets'
    },

    'back_biceps': {
        name: 'BACK & BICEPS BATTLE',
        objective: 'Conquer back and bicep challenges',
        difficulty: 2,
        preparation: {
            time: '5-8 min',
            activities: [
                'Light cardio warmup: 5 minutes',
                'Arm swings: 10 each direction',
                'Cat-cow stretches: 8 reps'
            ]
        },
        exercises: [
            { id: 'bent_over_rows', sets: 3, reps: '10-12' },
            { id: 'lat_pulldowns', sets: 3, reps: '8-12' },
            { id: 'single_arm_rows', sets: 3, reps: '10', notes: 'each arm' },
            { id: 'bicep_curls', sets: 3, reps: '12-15' },
            { id: 'hammer_curls', sets: 3, reps: '10-12' },
            { id: 'face_pulls', sets: 3, reps: '15' }
        ],
        recovery: {
            time: '5 min',
            activities: [
                'Upper trap stretch: 30 sec each side',
                'Cross-body shoulder stretch: 30 sec each arm',
                "Child's pose: 60 seconds"
            ]
        },
        restTimer: '60-90 seconds between sets'
    },

    'shoulders_legs': {
        name: 'SHOULDERS & LEGS RAID',
        objective: 'Dominate shoulders and leg territory',
        difficulty: 3,
        preparation: {
            time: '8-10 min',
            activities: [
                'Light cardio warmup: 5 minutes',
                'Leg swings: 10 each direction, each leg',
                'Arm circles: 10 each direction',
                'Bodyweight squats: 10 reps'
            ]
        },
        exercises: [
            { id: 'goblet_squats', sets: 3, reps: '12-15' },
            { id: 'overhead_press', sets: 3, reps: '10-12' },
            { id: 'walking_lunges', sets: 3, reps: '10', notes: 'each leg' },
            { id: 'lateral_raises', sets: 3, reps: '12-15' },
            { id: 'romanian_deadlifts', sets: 3, reps: '10-12' },
            { id: 'front_raises', sets: 3, reps: '10-12' },
            { id: 'calf_raises', sets: 3, reps: '15-20' }
        ],
        recovery: {
            time: '5 min',
            activities: [
                'Quad stretch: 30 sec each leg',
                'Hamstring stretch: 30 sec each leg',
                'Shoulder rolls and arm stretches'
            ]
        },
        restTimer: '60-90 seconds between sets'
    },

    'chest_biceps': {
        name: 'CHEST & BICEPS STRIKE',
        objective: 'Second strike on chest and biceps',
        difficulty: 2,
        preparation: {
            time: '5-8 min',
            activities: [
                'Light cardio warmup: 5 minutes',
                'Arm circles and shoulder rolls',
                'Light push-ups: 5-8 reps'
            ]
        },
        exercises: [
            { id: 'dumbbell_bench_press', sets: 3, reps: '10-12' },
            { id: 'incline_push_ups', sets: 3, reps: '10-15' },
            { id: 'concentration_curls', sets: 3, reps: '10-12', notes: 'each arm' },
            { id: 'chest_press_machine', sets: 3, reps: '12-15' },
            { id: 'bicep_21s', sets: 2, reps: '7 bottom + 7 top + 7 full' },
            { id: 'pec_deck', sets: 3, reps: '12-15' }
        ],
        recovery: {
            time: '5 min',
            activities: [
                'Chest stretches in doorway',
                'Bicep stretches against wall'
            ]
        },
        restTimer: '60-90 seconds between sets'
    },

    'full_body_circuit': {
        name: 'FULL BODY CIRCUIT GAUNTLET',
        objective: 'Survive the ultimate circuit challenge',
        difficulty: 4,
        preparation: {
            time: '5 min',
            activities: [
                'Dynamic movements: high knees, butt kickers, arm swings'
            ]
        },
        exercises: [
            { id: 'circuit_round', sets: 1, reps: '45s work / 15s rest each:' },
            { id: 'burpees', sets: 1, reps: 'Modified if needed' },
            { id: 'mountain_climbers', sets: 1, reps: 'Keep core tight' },
            { id: 'jump_squats', sets: 1, reps: 'Land softly' },
            { id: 'push_ups', sets: 1, reps: 'Any variation' },
            { id: 'plank_hold', sets: 1, reps: 'Strong position' },
            { id: 'jumping_jacks', sets: 1, reps: 'Full body movement' },
            { id: 'lunges', sets: 1, reps: 'Controlled movement' },
            { id: 'high_knees', sets: 1, reps: 'Running in place' }
        ],
        recovery: {
            time: '8-10 min',
            activities: [
                'Full body stretching routine'
            ]
        },
        restTimer: '1-2 minutes between rounds'
    },

    'recovery': {
        name: 'RECOVERY MISSION',
        objective: 'Active recovery to restore HP',
        difficulty: 1,
        type: 'recovery',
        options: [
            '30-45 minute brisk walk outdoors',
            'Light bike ride (20-30 minutes)',
            'Swimming (20-30 minutes)',
            'Recreational sports (light intensity)',
            'Easy hiking'
        ],
        notes: [
            'Keep heart rate in Zone 1-2 (conversational pace)',
            'Focus on movement and recovery',
            'Enjoy the activity - this restores HP!'
        ]
    },

    'zen': {
        name: 'OPTIONAL ZEN MODE',
        objective: 'Flexibility and mindfulness training',
        difficulty: 1,
        type: 'zen',
        options: [
            'YOGA SESSION (30-45 min): Gentle flow or restorative yoga',
            'LEISURELY WALK (30-60 min): Nature walk or neighborhood stroll',
            'REST DAY: Complete rest with light stretching (10-15 min)'
        ],
        notes: [
            'Focus on flexibility and relaxation',
            'Meditation or breathing exercises welcome',
            'This quest restores mental HP!'
        ]
    }
};

// ==================== QUEST MAPPING ====================
// Maps each quest (1.1, 2.1, etc.) to a workout template

const questMapping = {};

// Generate mapping for all 24 levels
for (let level = 1; level <= 24; level++) {
    questMapping[level] = [
        'chest_triceps',    // Quest X.1
        'back_biceps',      // Quest X.2
        'shoulders_legs',   // Quest X.3
        'chest_biceps',     // Quest X.4
        'full_body_circuit',// Quest X.5
        'recovery',         // Quest X.6
        'zen'               // Quest X.7
    ];
}
