// ==================== GAINZ QUEST PROGRAM DATA ====================

const questProgram = {
    1: {
        title: "LEVEL 1",
        subtitle: "7 QUESTS TO COMPLETE THIS LEVEL",
        description: "Welcome, warrior! Begin your epic journey to ultimate fitness.",
        quests: [
            {
                questNumber: "1.1",
                name: "CHEST & TRICEPS BATTLE",
                objective: "Defeat chest and tricep enemies",
                difficulty: 2,
                xpReward: 1,
                preparation: {
                    time: "5-8 min",
                    activities: [
                        "Light cardio warmup: 5 minutes",
                        "Arm circles: 10 forward, 10 backward",
                        "Push-up to downward dog: 8 reps"
                    ]
                },
                battleSequence: [
                    { name: "Push-ups", specs: "3 sets × 8-12 reps (Modify on knees if needed)" },
                    { name: "Incline Dumbbell Press", specs: "3 sets × 10-12 reps" },
                    { name: "Chest Flyes", specs: "3 sets × 12-15 reps" },
                    { name: "Tricep Dips", specs: "3 sets × 8-12 reps" },
                    { name: "Overhead Tricep Extension", specs: "3 sets × 10-12 reps" },
                    { name: "Diamond Push-ups", specs: "2 sets × 5-8 reps" }
                ],
                recovery: {
                    time: "5 min",
                    activities: [
                        "Chest doorway stretch: 30 sec each arm",
                        "Tricep overhead stretch: 30 sec each arm"
                    ]
                },
                restTimer: "60-90 seconds between sets"
            },
            {
                questNumber: "1.2",
                name: "BACK & BICEPS BATTLE",
                objective: "Conquer back and bicep challenges",
                difficulty: 2,
                xpReward: 1,
                preparation: {
                    time: "5-8 min",
                    activities: [
                        "Light cardio warmup: 5 minutes",
                        "Arm swings: 10 each direction",
                        "Cat-cow stretches: 8 reps"
                    ]
                },
                battleSequence: [
                    { name: "Bent-over Dumbbell Rows", specs: "3 sets × 10-12 reps" },
                    { name: "Lat Pulldowns (or Assisted Pull-ups)", specs: "3 sets × 8-12 reps" },
                    { name: "Single-arm Dumbbell Rows", specs: "3 sets × 10 reps each arm" },
                    { name: "Bicep Curls", specs: "3 sets × 12-15 reps" },
                    { name: "Hammer Curls", specs: "3 sets × 10-12 reps" },
                    { name: "Face Pulls", specs: "3 sets × 15 reps" }
                ],
                recovery: {
                    time: "5 min",
                    activities: [
                        "Upper trap stretch: 30 sec each side",
                        "Cross-body shoulder stretch: 30 sec each arm",
                        "Child's pose: 60 seconds"
                    ]
                },
                restTimer: "60-90 seconds between sets"
            },
            {
                questNumber: "1.3",
                name: "SHOULDERS & LEGS RAID",
                objective: "Dominate shoulders and leg territory",
                difficulty: 3,
                xpReward: 1,
                preparation: {
                    time: "8-10 min",
                    activities: [
                        "Light cardio warmup: 5 minutes",
                        "Leg swings: 10 each direction, each leg",
                        "Arm circles: 10 each direction",
                        "Bodyweight squats: 10 reps"
                    ]
                },
                battleSequence: [
                    { name: "Goblet Squats", specs: "3 sets × 12-15 reps" },
                    { name: "Overhead Press", specs: "3 sets × 10-12 reps" },
                    { name: "Walking Lunges", specs: "3 sets × 10 reps each leg" },
                    { name: "Lateral Raises", specs: "3 sets × 12-15 reps" },
                    { name: "Romanian Deadlifts", specs: "3 sets × 10-12 reps" },
                    { name: "Front Raises", specs: "3 sets × 10-12 reps" },
                    { name: "Calf Raises", specs: "3 sets × 15-20 reps" }
                ],
                recovery: {
                    time: "5 min",
                    activities: [
                        "Quad stretch: 30 sec each leg",
                        "Hamstring stretch: 30 sec each leg",
                        "Shoulder rolls and arm stretches"
                    ]
                },
                restTimer: "60-90 seconds between sets"
            },
            {
                questNumber: "1.4",
                name: "CHEST & BICEPS STRIKE",
                objective: "Second strike on chest and biceps",
                difficulty: 2,
                xpReward: 1,
                preparation: {
                    time: "5-8 min",
                    activities: [
                        "Light cardio warmup: 5 minutes",
                        "Arm circles and shoulder rolls",
                        "Light push-ups: 5-8 reps"
                    ]
                },
                battleSequence: [
                    { name: "Dumbbell Bench Press", specs: "3 sets × 10-12 reps" },
                    { name: "Incline Push-ups", specs: "3 sets × 10-15 reps" },
                    { name: "Concentration Curls", specs: "3 sets × 10-12 reps each arm" },
                    { name: "Chest Press Machine (or Push-ups)", specs: "3 sets × 12-15 reps" },
                    { name: "21s Bicep Curls", specs: "2 sets (7 bottom + 7 top + 7 full)" },
                    { name: "Pec Deck (or Chest Flyes)", specs: "3 sets × 12-15 reps" }
                ],
                recovery: {
                    time: "5 min",
                    activities: [
                        "Chest stretches in doorway",
                        "Bicep stretches against wall"
                    ]
                },
                restTimer: "60-90 seconds between sets"
            },
            {
                questNumber: "1.5",
                name: "FULL BODY CIRCUIT GAUNTLET",
                objective: "Survive the ultimate circuit challenge",
                difficulty: 4,
                xpReward: 1,
                preparation: {
                    time: "5 min",
                    activities: [
                        "Dynamic movements: high knees, butt kickers, arm swings"
                    ]
                },
                battleSequence: [
                    { name: "CIRCUIT (3-4 rounds)", specs: "45s work / 15s rest each:" },
                    { name: "Burpees", specs: "Modified if needed" },
                    { name: "Mountain Climbers", specs: "Keep core tight" },
                    { name: "Jump Squats", specs: "Land softly" },
                    { name: "Push-ups", specs: "Any variation" },
                    { name: "Plank Hold", specs: "Strong position" },
                    { name: "Jumping Jacks", specs: "Full body movement" },
                    { name: "Alternating Lunges", specs: "Controlled movement" },
                    { name: "High Knees", specs: "Running in place" }
                ],
                recovery: {
                    time: "8-10 min",
                    activities: [
                        "Full body stretching routine"
                    ]
                },
                restTimer: "1-2 minutes between rounds"
            },
            {
                questNumber: "1.6",
                name: "RECOVERY MISSION",
                objective: "Active recovery to restore HP",
                difficulty: 1,
                xpReward: 1,
                type: "recovery",
                options: [
                    "30-45 minute brisk walk outdoors",
                    "Light bike ride (20-30 minutes)",
                    "Swimming (20-30 minutes)",
                    "Recreational sports (light intensity)",
                    "Easy hiking"
                ],
                notes: [
                    "Keep heart rate in Zone 1-2 (conversational pace)",
                    "Focus on movement and recovery",
                    "Enjoy the activity - this restores HP!"
                ]
            },
            {
                questNumber: "1.7",
                name: "OPTIONAL ZEN MODE",
                objective: "Flexibility and mindfulness training",
                difficulty: 1,
                xpReward: 1,
                type: "zen",
                options: [
                    "YOGA SESSION (30-45 min): Gentle flow or restorative yoga",
                    "LEISURELY WALK (30-60 min): Nature walk or neighborhood stroll",
                    "REST DAY: Complete rest with light stretching (10-15 min)"
                ],
                notes: [
                    "Focus on flexibility and relaxation",
                    "Meditation or breathing exercises welcome",
                    "This quest restores mental HP!"
                ]
            }
        ],
        strategyGuide: {
            intensity: "Start at 6-7/10 difficulty",
            hpManagement: "7-9 hours sleep for recovery",
            powerUps: "Stay hydrated throughout quests",
            focus: "Master movement patterns this level"
        }
    }
};

// Generate levels 2-24 with progressive difficulty
for (let level = 2; level <= 24; level++) {
    const phase = Math.floor((level - 1) / 4);
    const intensity = phase < 2 ? "Moderate" : phase < 4 ? "Heavy" : "Maximum";
    const sets = Math.min(3 + phase, 5);
    const difficulty = Math.min(2 + Math.floor(level / 5), 5);

    questProgram[level] = {
        title: `LEVEL ${level}`,
        subtitle: "7 QUESTS TO COMPLETE THIS LEVEL",
        description: level % 4 === 0
            ? "Recovery level - restore your HP and prepare for the next challenge!"
            : `${intensity} intensity training - push your limits and grow stronger!`,
        quests: [
            {
                questNumber: `${level}.1`,
                name: "CHEST & TRICEPS ASSAULT",
                objective: "Conquer chest and tricep challenges",
                difficulty: difficulty,
                xpReward: 1,
                preparation: { time: "5-8 min", activities: ["Cardio warmup: 5 minutes", "Dynamic stretches"] },
                battleSequence: [
                    { name: "Push-ups (Weighted if able)", specs: `${sets} sets × 10-12 reps` },
                    { name: "Bench Press", specs: `${sets} sets × 8-10 reps` },
                    { name: "Chest Flyes", specs: `${sets} sets × 12 reps` },
                    { name: "Tricep Dips", specs: `${sets} sets × 10-12 reps` },
                    { name: "Overhead Extension", specs: `${sets} sets × 10 reps` }
                ],
                recovery: { time: "5 min", activities: ["Upper body stretches"] },
                restTimer: "60-90 seconds between sets"
            },
            {
                questNumber: `${level}.2`,
                name: "BACK & BICEPS CAMPAIGN",
                objective: "Dominate back and bicep territory",
                difficulty: difficulty,
                xpReward: 1,
                preparation: { time: "5-8 min", activities: ["Light cardio", "Arm swings and stretches"] },
                battleSequence: [
                    { name: "Pull-ups/Assisted", specs: `${sets} sets × 8-10 reps` },
                    { name: "Bent-over Rows", specs: `${sets} sets × 10-12 reps` },
                    { name: "Single-arm Rows", specs: `${sets} sets × 10 reps each` },
                    { name: "Bicep Curls", specs: `${sets} sets × 12 reps` },
                    { name: "Hammer Curls", specs: `${sets} sets × 10 reps` }
                ],
                recovery: { time: "5 min", activities: ["Back and arm stretches"] },
                restTimer: "60-90 seconds between sets"
            },
            {
                questNumber: `${level}.3`,
                name: "SHOULDERS & LEGS CONQUEST",
                objective: "Ultimate lower body and shoulder power",
                difficulty: difficulty + 1,
                xpReward: 1,
                preparation: { time: "8-10 min", activities: ["Dynamic warmup", "Leg swings", "Arm circles"] },
                battleSequence: [
                    { name: "Squats", specs: `${sets} sets × 10-12 reps` },
                    { name: "Overhead Press", specs: `${sets} sets × 8-10 reps` },
                    { name: "Walking Lunges", specs: `${sets} sets × 12 reps each leg` },
                    { name: "Lateral Raises", specs: `${sets} sets × 12-15 reps` },
                    { name: "Romanian Deadlifts", specs: `${sets} sets × 10 reps` },
                    { name: "Calf Raises", specs: `${sets} sets × 15-20 reps` }
                ],
                recovery: { time: "5 min", activities: ["Lower body and shoulder stretches"] },
                restTimer: "90-120 seconds between sets"
            },
            {
                questNumber: `${level}.4`,
                name: "TOTAL UPPER BODY WAR",
                objective: "All-out upper body destruction",
                difficulty: difficulty,
                xpReward: 1,
                preparation: { time: "5-8 min", activities: ["Warmup", "Mobility work"] },
                battleSequence: [
                    { name: "Dumbbell Bench Press", specs: `${sets} sets × 10 reps` },
                    { name: "Seated Rows", specs: `${sets} sets × 10-12 reps` },
                    { name: "Arnold Press", specs: `${sets} sets × 8-10 reps` },
                    { name: "Concentration Curls", specs: `${sets} sets × 10 reps each` },
                    { name: "Skull Crushers", specs: `${sets} sets × 10 reps` }
                ],
                recovery: { time: "5 min", activities: ["Upper body stretches"] },
                restTimer: "60-90 seconds between sets"
            },
            {
                questNumber: `${level}.5`,
                name: "CIRCUIT GAUNTLET CHALLENGE",
                objective: "Survive the brutal circuit challenge",
                difficulty: difficulty + 1,
                xpReward: 1,
                preparation: { time: "5 min", activities: ["Full body dynamic warmup"] },
                battleSequence: [
                    { name: "CIRCUIT (3-4 rounds)", specs: "45s work / 15s rest:" },
                    { name: "Burpees", specs: "Maximum effort" },
                    { name: "Mountain Climbers", specs: "Fast pace" },
                    { name: "Jump Squats", specs: "Explosive power" },
                    { name: "Push-ups", specs: "Good form" },
                    { name: "Plank Hold", specs: "Solid core" },
                    { name: "High Knees", specs: "Sprint pace" }
                ],
                recovery: { time: "10 min", activities: ["Full cooldown and stretching"] },
                restTimer: "2 minutes between rounds"
            },
            {
                questNumber: `${level}.6`,
                name: "RECOVERY MISSION",
                objective: "Active recovery to restore HP",
                difficulty: 1,
                xpReward: 1,
                type: "recovery",
                options: [
                    "30-45 minute walk/light jog",
                    "Swimming or cycling (easy pace)",
                    "Recreational activity",
                    "Light yoga or stretching"
                ],
                notes: ["Low intensity", "Focus on recovery", "Stay active but don't push hard"]
            },
            {
                questNumber: `${level}.7`,
                name: "ZEN MODE BONUS QUEST",
                objective: "Mental and physical flexibility",
                difficulty: 1,
                xpReward: 1,
                type: "zen",
                options: [
                    "Yoga session (30-45 min)",
                    "Meditation and stretching",
                    "Leisurely walk in nature",
                    "Complete rest day"
                ],
                notes: ["Optional but recommended", "Restore mental HP", "Prepare for next level"]
            }
        ],
        strategyGuide: {
            intensity: level % 4 === 0 ? "Light recovery - 4-5/10" : `${intensity} - ${7 + Math.floor(level/4)}/10`,
            hpManagement: "7-9 hours sleep required",
            powerUps: "Hydration and nutrition critical",
            focus: level % 4 === 0 ? "Recovery and form refinement" : "Progressive overload"
        }
    };
}

// ==================== ACHIEVEMENTS SYSTEM ====================

const achievements = [
    { id: 'first-quest', name: 'First Quest Complete', description: 'Complete your first quest', icon: '⚔️', bonus: 0 },
    { id: 'level-1', name: 'Level 1 Champion', description: 'Complete all 7 quests in Level 1', icon: '🏅', bonus: 1 },
    { id: 'level-5', name: 'Rising Warrior', description: 'Reach Level 5', icon: '⭐', bonus: 2 },
    { id: 'level-10', name: 'Veteran Fighter', description: 'Reach Level 10', icon: '🌟', bonus: 3 },
    { id: 'level-15', name: 'Elite Champion', description: 'Reach Level 15', icon: '💫', bonus: 5 },
    { id: 'streak-7', name: 'Week Warrior', description: '7-day quest streak', icon: '🔥', bonus: 2 },
    { id: 'streak-14', name: 'Fortnight Hero', description: '14-day quest streak', icon: '💪', bonus: 3 },
    { id: 'streak-30', name: 'Month Legend', description: '30-day quest streak', icon: '👑', bonus: 5 },
    { id: 'half-way', name: 'Halfway Hero', description: 'Complete Level 12', icon: '🎖️', bonus: 5 },
    { id: 'ultimate-warrior', name: 'ULTIMATE WARRIOR', description: 'Complete all 24 levels!', icon: '👑', bonus: 10 }
];

// ==================== STATE MANAGEMENT ====================

class GainzQuest {
    constructor() {
        this.currentLevel = 1;
        this.totalXP = 0;
        this.streak = 0;
        this.completedQuests = new Set();
        this.unlockedAchievements = new Set();
        this.lastQuestDate = null;

        // Timer state
        this.timerInterval = null;
        this.timerSeconds = 90;
        this.timerRemaining = 90;
        this.timerRunning = false;

        // Weight tracking - stores current weight per exercise name
        this.exerciseWeights = {};
        // Weight history - stores array of {level, weight} for each exercise
        this.weightHistory = {};
        // Set progress - stores completed sets per quest
        this.questSetProgress = {};
        // Body weight tracking - stores array of {date, weight}
        this.bodyWeightHistory = [];

        this.loadState();
        this.init();
    }

    init() {
        this.renderStats();
        this.renderAchievements();
        this.renderLevel();
        this.renderBodyWeight();
        this.setupEventListeners();
    }

    // ==================== LOCAL STORAGE ====================

    saveState() {
        const state = {
            currentLevel: this.currentLevel,
            totalXP: this.totalXP,
            streak: this.streak,
            completedQuests: Array.from(this.completedQuests),
            unlockedAchievements: Array.from(this.unlockedAchievements),
            lastQuestDate: this.lastQuestDate,
            exerciseWeights: this.exerciseWeights,
            weightHistory: this.weightHistory,
            questSetProgress: this.questSetProgress,
            bodyWeightHistory: this.bodyWeightHistory
        };
        localStorage.setItem('gainzQuestState', JSON.stringify(state));
    }

    loadState() {
        const saved = localStorage.getItem('gainzQuestState');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentLevel = state.currentLevel || 1;
            this.totalXP = state.totalXP || 0;
            this.streak = state.streak || 0;
            this.completedQuests = new Set(state.completedQuests || []);
            this.unlockedAchievements = new Set(state.unlockedAchievements || []);
            this.lastQuestDate = state.lastQuestDate;
            this.exerciseWeights = state.exerciseWeights || {};
            this.weightHistory = state.weightHistory || {};
            this.questSetProgress = state.questSetProgress || {};
            this.bodyWeightHistory = state.bodyWeightHistory || [];

            this.updateStreak();
        }
    }

    resetProgress() {
        if (confirm('⚠️ RESET ALL PROGRESS? This cannot be undone, warrior!')) {
            localStorage.removeItem('gainzQuestState');
            location.reload();
        }
    }

    // ==================== STREAK MANAGEMENT ====================

    updateStreak() {
        if (!this.lastQuestDate) return;

        const lastDate = new Date(this.lastQuestDate);
        const today = new Date();
        lastDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            this.streak = 0;
        }
    }

    incrementStreak() {
        const today = new Date().toDateString();

        if (this.lastQuestDate !== today) {
            this.streak++;
            this.lastQuestDate = today;

            if (this.streak === 7) this.unlockAchievement('streak-7');
            if (this.streak === 14) this.unlockAchievement('streak-14');
            if (this.streak === 30) this.unlockAchievement('streak-30');
        }
    }

    // ==================== XP AND LEVELING ====================

    addXP(amount) {
        this.totalXP += amount;
        this.renderStats();
        this.saveState();
    }

    getCurrentLevelXP() {
        // Calculate how many quests completed in current level
        let questsInLevel = 0;
        for (let q = 0; q < 7; q++) {
            if (this.completedQuests.has(`${this.currentLevel}-${q}`)) {
                questsInLevel++;
            }
        }
        return questsInLevel;
    }

    // ==================== ACHIEVEMENTS ====================

    unlockAchievement(achievementId) {
        if (this.unlockedAchievements.has(achievementId)) return;

        this.unlockedAchievements.add(achievementId);
        const achievement = achievements.find(a => a.id === achievementId);

        if (achievement) {
            this.addXP(achievement.bonus);
            this.showAchievementNotification(achievement);
            this.renderAchievements();
            this.saveState();
        }
    }

    checkAchievements() {
        const totalCompleted = this.completedQuests.size;

        if (totalCompleted >= 1) this.unlockAchievement('first-quest');

        // Check level completions
        if (this.isLevelCompleted(1)) this.unlockAchievement('level-1');
        if (this.currentLevel >= 5) this.unlockAchievement('level-5');
        if (this.currentLevel >= 10) this.unlockAchievement('level-10');
        if (this.currentLevel >= 12) this.unlockAchievement('half-way');
        if (this.currentLevel >= 15) this.unlockAchievement('level-15');
        if (this.currentLevel >= 24 && this.isLevelCompleted(24)) {
            this.unlockAchievement('ultimate-warrior');
        }
    }

    isLevelCompleted(level) {
        for (let q = 0; q < 7; q++) {
            if (!this.completedQuests.has(`${level}-${q}`)) {
                return false;
            }
        }
        return true;
    }

    // ==================== RENDERING ====================

    renderStats() {
        const currentLevelXP = this.getCurrentLevelXP();
        const completedLevels = this.currentLevel - 1;

        document.getElementById('level').textContent = this.currentLevel;
        document.getElementById('current-xp').textContent = currentLevelXP;
        document.getElementById('next-level-xp').textContent = '7';
        document.getElementById('streak').textContent = this.streak;
        document.getElementById('completed').textContent = this.completedQuests.size;

        const xpProgress = (currentLevelXP / 7) * 100;
        document.getElementById('xp-bar').style.width = `${xpProgress}%`;
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = '';

        achievements.forEach(achievement => {
            const div = document.createElement('div');
            div.className = `achievement ${this.unlockedAchievements.has(achievement.id) ? 'unlocked' : ''}`;
            div.innerHTML = `
                <div class="achievement-badge">${achievement.icon}</div>
                <div class="achievement-title">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            `;
            grid.appendChild(div);
        });
    }

    renderLevel() {
        const level = questProgram[this.currentLevel];

        document.getElementById('current-week').textContent = this.currentLevel;
        document.getElementById('week-title').textContent = level.title;
        document.getElementById('week-description').textContent = level.description;

        const grid = document.getElementById('workouts-grid');
        grid.innerHTML = '';

        level.quests.forEach((quest, index) => {
            const questId = `${this.currentLevel}-${index}`;
            const isCompleted = this.completedQuests.has(questId);

            const card = document.createElement('div');
            const difficultyStars = '★'.repeat(quest.difficulty) + '☆'.repeat(5 - quest.difficulty);

            card.className = `workout-card quest-card ${isCompleted ? 'completed' : ''}`;

            if (quest.type === 'recovery' || quest.type === 'zen') {
                card.classList.add('special-quest');
            }

            card.innerHTML = `
                <div class="quest-header">
                    <div class="quest-number">QUEST ${quest.questNumber}</div>
                    <div class="quest-status">${isCompleted ? '✅' : '⚔️'}</div>
                </div>
                <div class="quest-name">${quest.name}</div>
                <div class="quest-objective">🎯 ${quest.objective}</div>
                <div class="quest-difficulty">
                    <span class="difficulty-label">DIFFICULTY:</span>
                    <span class="stars">${difficultyStars}</span>
                </div>
                <div class="quest-xp">🏆 +${quest.xpReward} XP</div>
            `;

            card.addEventListener('click', () => this.openQuestModal(this.currentLevel, index));
            grid.appendChild(card);
        });

        // Update navigation
        document.getElementById('prev-week').disabled = this.currentLevel === 1;
        document.getElementById('next-week').disabled = this.currentLevel === 24;
    }

    openQuestModal(level, questIndex) {
        const quest = questProgram[level].quests[questIndex];
        const questId = `${level}-${questIndex}`;
        const isCompleted = this.completedQuests.has(questId);

        const difficultyStars = '★'.repeat(quest.difficulty) + '☆'.repeat(5 - quest.difficulty);

        document.getElementById('modal-day').innerHTML = `
            <div class="modal-quest-header">
                <div>⚔️ QUEST ${quest.questNumber}: ${quest.name}</div>
                <div class="modal-difficulty">${difficultyStars}</div>
            </div>
        `;

        const exercisesDiv = document.getElementById('modal-exercises');

        // Show/hide timer and progress based on quest type
        const timerSection = document.getElementById('timer-section');
        const progressSection = document.getElementById('workout-progress');

        if (quest.type === 'recovery' || quest.type === 'zen') {
            timerSection.style.display = 'none';
            progressSection.style.display = 'none';

            exercisesDiv.innerHTML = `
                <div class="quest-objective-big">🎯 ${quest.objective}</div>
                <div class="quest-section">
                    <h3>${quest.type === 'recovery' ? '🚶 MISSION OPTIONS:' : '🧘 ZEN OPTIONS:'}</h3>
                    ${quest.options.map(opt => `<div class="quest-option">• ${opt}</div>`).join('')}
                </div>
                <div class="quest-section">
                    <h3>💡 NOTES:</h3>
                    ${quest.notes.map(note => `<div class="quest-note">• ${note}</div>`).join('')}
                </div>
            `;
        } else {
            timerSection.style.display = 'block';
            progressSection.style.display = 'block';
            this.resetTimer();

            let exerciseIndex = 0;
            let totalSets = 0;

            // Store current quest ID for saving set progress
            this.currentQuestId = questId;

            const exercisesHTML = quest.battleSequence.map((ex, idx) => {
                const setsMatch = ex.specs.match(/(\d+)\s*sets?/i);
                const numSets = setsMatch ? parseInt(setsMatch[1]) : 0;
                totalSets += numSets;

                let setsHTML = '';
                let weightHTML = '';

                if (numSets > 0) {
                    // Only add weight tracking if not a bodyweight exercise
                    if (!this.isBodyweightExercise(ex.name)) {
                        const currentWeight = this.getExerciseWeight(ex.name);

                        weightHTML = `
                            <div class="exercise-weight">
                                <div class="weight-label">💪 WEIGHT:</div>
                                <div class="weight-controls">
                                    <button class="weight-btn weight-minus" data-exercise="${ex.name}">−</button>
                                    <div class="weight-display">
                                        <span class="weight-input" data-exercise="${ex.name}">${currentWeight}</span>
                                        <span class="weight-unit">lbs</span>
                                    </div>
                                    <button class="weight-btn weight-plus" data-exercise="${ex.name}">+</button>
                                    <button class="weight-btn weight-graph" data-exercise="${ex.name}" title="View progression graph">📈</button>
                                </div>
                            </div>
                        `;
                    }

                    setsHTML = `
                        <div class="exercise-sets">
                            ${Array.from({length: numSets}, (_, i) => `
                                <div class="set-checkbox-wrapper">
                                    <input type="checkbox" class="set-checkbox" id="set-${exerciseIndex}-${i}" data-exercise="${exerciseIndex}" data-set="${i}">
                                    <label class="set-label" for="set-${exerciseIndex}-${i}">${i + 1}</label>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    exerciseIndex++;
                }

                return `
                    <div class="exercise-detail ${numSets > 0 ? 'has-sets' : ''}">
                        <div class="exercise-name">${ex.name}</div>
                        <div class="exercise-specs">${ex.specs}</div>
                        ${weightHTML}
                        ${setsHTML}
                    </div>
                `;
            }).join('');

            exercisesDiv.innerHTML = `
                <div class="quest-objective-big">🎯 ${quest.objective}</div>

                <div class="quest-section">
                    <h3>⏰ PREPARATION PHASE (${quest.preparation.time})</h3>
                    ${quest.preparation.activities.map(act => `<div class="phase-item">• ${act}</div>`).join('')}
                </div>

                <div class="quest-section battle-section">
                    <h3>⚔️ BATTLE SEQUENCE:</h3>
                    ${exercisesHTML}
                </div>

                <div class="quest-section">
                    <h3>💚 RECOVERY PHASE (${quest.recovery.time})</h3>
                    ${quest.recovery.activities.map(act => `<div class="phase-item">• ${act}</div>`).join('')}
                </div>

                <div class="rest-timer">⏱️ REST TIMER: ${quest.restTimer}</div>
            `;

            // Set up progress tracking
            document.getElementById('total-sets').textContent = totalSets;
            document.getElementById('completed-sets').textContent = '0';

            // Add checkbox change listeners
            setTimeout(() => {
                // Restore saved checkbox states
                this.restoreSetProgress(questId);

                document.querySelectorAll('.set-checkbox').forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        this.updateProgress();
                        this.saveSetProgress();
                    });
                });

                // Add weight button listeners
                document.querySelectorAll('.weight-minus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const exerciseName = e.target.dataset.exercise;
                        this.changeWeight(exerciseName, -2.5);
                    });
                });

                document.querySelectorAll('.weight-plus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const exerciseName = e.target.dataset.exercise;
                        this.changeWeight(exerciseName, 2.5);
                    });
                });

                document.querySelectorAll('.weight-graph').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const exerciseName = e.target.dataset.exercise;
                        this.showWeightGraph(exerciseName);
                    });
                });
            }, 0);
        }

        const completeBtn = document.getElementById('complete-workout');
        completeBtn.textContent = isCompleted ? '✅ QUEST COMPLETE' : `⚔️ COMPLETE QUEST (+${quest.xpReward} XP)`;
        completeBtn.disabled = isCompleted;
        completeBtn.onclick = () => this.completeQuest(questId, quest.xpReward);

        document.getElementById('workout-modal').classList.add('active');
    }

    updateProgress() {
        const total = document.querySelectorAll('.set-checkbox').length;
        const completed = document.querySelectorAll('.set-checkbox:checked').length;
        document.getElementById('completed-sets').textContent = completed;
    }

    saveSetProgress() {
        if (!this.currentQuestId) return;

        const checkboxes = document.querySelectorAll('.set-checkbox');
        const progress = [];

        checkboxes.forEach(checkbox => {
            progress.push(checkbox.checked);
        });

        this.questSetProgress[this.currentQuestId] = progress;
        this.saveState();
    }

    restoreSetProgress(questId) {
        const savedProgress = this.questSetProgress[questId];
        if (!savedProgress) return;

        const checkboxes = document.querySelectorAll('.set-checkbox');
        checkboxes.forEach((checkbox, index) => {
            if (savedProgress[index]) {
                checkbox.checked = true;
            }
        });

        // Update the progress counter
        this.updateProgress();
    }

    closeQuestModal() {
        this.stopTimer();
        this.saveWeights(); // Save weights when closing modal
        this.saveSetProgress(); // Save set progress when closing modal
        document.getElementById('workout-modal').classList.remove('active');
    }

    // ==================== WEIGHT TRACKING ====================

    isBodyweightExercise(exerciseName) {
        // List of exercises that don't use external weight
        const bodyweightKeywords = [
            'push-up', 'pushup', 'pull-up', 'pullup', 'chin-up', 'chinup',
            'plank', 'sit-up', 'situp', 'crunch', 'burpee', 'jumping jack',
            'mountain climber', 'high knee', 'jump squat', 'box jump',
            'bodyweight', 'lunge', 'leg raise', 'flutter kick', 'bicycle',
            'russian twist', 'dead bug', 'v-up', 'shoulder tap', 'dip',
            'pike push', 'diamond push', 'incline push', 'decline push',
            'side plank', 'bear crawl', 'crab walk', 'wall sit',
            'assisted', 'calf raise', 'glute bridge', 'hip thrust'
        ];

        const lowerName = exerciseName.toLowerCase();
        return bodyweightKeywords.some(keyword => lowerName.includes(keyword));
    }

    getExerciseWeight(exerciseName) {
        // Get stored weight or default to 10 lbs
        return this.exerciseWeights[exerciseName] || 10;
    }

    updateExerciseWeight(exerciseName, weight) {
        this.exerciseWeights[exerciseName] = weight;
    }

    saveWeights() {
        // Read all current weight inputs and save them
        document.querySelectorAll('.weight-input').forEach(input => {
            const exerciseName = input.dataset.exercise;
            const weight = parseFloat(input.textContent);
            this.exerciseWeights[exerciseName] = weight;

            // Record in history for this level
            if (!this.weightHistory[exerciseName]) {
                this.weightHistory[exerciseName] = [];
            }

            // Check if we already have an entry for this level
            const existingEntry = this.weightHistory[exerciseName].find(
                entry => entry.level === this.currentLevel
            );

            if (existingEntry) {
                // Update existing entry
                existingEntry.weight = weight;
            } else {
                // Add new entry
                this.weightHistory[exerciseName].push({
                    level: this.currentLevel,
                    weight: weight
                });
            }

            // Sort by level
            this.weightHistory[exerciseName].sort((a, b) => a.level - b.level);
        });
        this.saveState();
    }

    changeWeight(exerciseName, delta) {
        const currentWeight = this.getExerciseWeight(exerciseName);
        const newWeight = Math.max(0, currentWeight + delta); // Don't go below 0
        this.updateExerciseWeight(exerciseName, newWeight);

        // Update the display
        const input = document.querySelector(`.weight-input[data-exercise="${exerciseName}"]`);
        if (input) {
            input.textContent = newWeight;
        }

        this.saveState();
    }

    // ==================== WEIGHT GRAPH ====================

    showWeightGraph(exerciseName) {
        const history = this.weightHistory[exerciseName] || [];

        if (history.length === 0) {
            alert('No weight history yet for this exercise. Complete a workout first!');
            return;
        }

        document.getElementById('graph-title').textContent = `📈 ${exerciseName} Progression`;
        document.getElementById('graph-modal').classList.add('active');

        // Draw the graph
        setTimeout(() => this.drawWeightGraph(exerciseName, history), 100);
    }

    drawWeightGraph(exerciseName, history) {
        const canvas = document.getElementById('weight-graph');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;

        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate scales
        const weights = history.map(h => h.weight);
        const minWeight = Math.max(0, Math.floor(Math.min(...weights) / 10) * 10 - 10);
        const maxWeight = Math.ceil(Math.max(...weights) / 10) * 10 + 10;
        const levels = history.map(h => h.level);
        const minLevel = Math.min(...levels);
        const maxLevel = Math.max(...levels, minLevel + 1); // At least 2 levels spread

        // Helper functions
        const getX = (level) => padding + ((level - minLevel) / (maxLevel - minLevel)) * (width - padding * 2);
        const getY = (weight) => height - padding - ((weight - minWeight) / (maxWeight - minWeight)) * (height - padding * 2);

        // Draw grid
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);

        // Horizontal grid lines (weight)
        const weightStep = (maxWeight - minWeight) / 5;
        for (let i = 0; i <= 5; i++) {
            const weight = minWeight + i * weightStep;
            const y = getY(weight);

            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();

            // Weight labels
            ctx.fillStyle = '#94a3b8';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(weight.toFixed(0) + ' lbs', padding - 10, y + 4);
        }

        // Vertical grid lines (levels)
        const levelStep = Math.max(1, Math.floor((maxLevel - minLevel) / 6));
        for (let level = minLevel; level <= maxLevel; level += levelStep) {
            const x = getX(level);

            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();

            // Level labels
            ctx.fillStyle = '#94a3b8';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('L' + level, x, height - padding + 20);
        }

        // Draw line
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3;
        ctx.beginPath();

        history.forEach((point, index) => {
            const x = getX(point.level);
            const y = getY(point.weight);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw points
        history.forEach(point => {
            const x = getX(point.level);
            const y = getY(point.weight);

            // Outer glow
            ctx.fillStyle = 'rgba(236, 72, 153, 0.3)';
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();

            // Point
            ctx.fillStyle = '#ec4899';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Weight label on point
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(point.weight + ' lbs', x, y - 15);
        });

        // Update stats
        this.updateGraphStats(exerciseName, history, minWeight, maxWeight);
    }

    updateGraphStats(exerciseName, history, minWeight, maxWeight) {
        const statsDiv = document.getElementById('graph-stats');

        const currentWeight = history[history.length - 1].weight;
        const startWeight = history[0].weight;
        const totalGain = currentWeight - startWeight;
        const percentGain = startWeight > 0 ? ((totalGain / startWeight) * 100).toFixed(1) : 0;

        statsDiv.innerHTML = `
            <div class="stat-item">
                <div class="stat-label">Current</div>
                <div class="stat-value">${currentWeight} lbs</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Starting</div>
                <div class="stat-value">${startWeight} lbs</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Gain</div>
                <div class="stat-value ${totalGain >= 0 ? 'positive' : 'negative'}">${totalGain >= 0 ? '+' : ''}${totalGain} lbs (${percentGain}%)</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Data Points</div>
                <div class="stat-value">${history.length} levels</div>
            </div>
        `;
    }

    closeGraphModal() {
        document.getElementById('graph-modal').classList.remove('active');
    }

    // ==================== BODY WEIGHT TRACKING ====================

    renderBodyWeight() {
        const latestEntry = this.bodyWeightHistory[this.bodyWeightHistory.length - 1];
        const currentWeight = latestEntry ? latestEntry.weight : null;

        const weightDisplay = document.getElementById('current-body-weight');
        const changeDisplay = document.getElementById('weight-change');

        if (currentWeight) {
            weightDisplay.textContent = currentWeight.toFixed(1);

            // Calculate change from starting weight
            if (this.bodyWeightHistory.length > 1) {
                const startWeight = this.bodyWeightHistory[0].weight;
                const change = currentWeight - startWeight;
                const changePercent = ((change / startWeight) * 100).toFixed(1);

                changeDisplay.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)} lbs (${changePercent}%)`;
                changeDisplay.className = 'weight-change ' + (change >= 0 ? 'positive' : 'negative');
            } else {
                changeDisplay.textContent = '';
            }
        } else {
            weightDisplay.textContent = '--';
            changeDisplay.textContent = '';
        }
    }

    logBodyWeight() {
        const input = document.getElementById('weight-input');
        const weight = parseFloat(input.value);

        if (!weight || weight < 50 || weight > 500) {
            alert('Please enter a valid weight between 50 and 500 lbs');
            return;
        }

        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

        // Check if already logged today
        const existingEntry = this.bodyWeightHistory.find(entry => entry.date === today);

        if (existingEntry) {
            if (confirm('You already logged your weight today. Update it?')) {
                existingEntry.weight = weight;
            } else {
                return;
            }
        } else {
            this.bodyWeightHistory.push({ date: today, weight: weight });
        }

        // Sort by date
        this.bodyWeightHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

        this.saveState();
        this.renderBodyWeight();

        // Clear input and show feedback
        input.value = '';
        alert(`✅ Weight logged: ${weight} lbs`);
    }

    showBodyWeightHistory() {
        if (this.bodyWeightHistory.length === 0) {
            alert('No body weight history yet. Log your weight first!');
            return;
        }

        document.getElementById('body-weight-modal').classList.add('active');

        // Draw the graph
        setTimeout(() => this.drawBodyWeightGraph(), 100);
    }

    drawBodyWeightGraph() {
        const canvas = document.getElementById('body-weight-graph');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;

        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        const history = this.bodyWeightHistory;

        // Calculate scales
        const weights = history.map(h => h.weight);
        const minWeight = Math.max(0, Math.floor(Math.min(...weights) / 10) * 10 - 10);
        const maxWeight = Math.ceil(Math.max(...weights) / 10) * 10 + 10;

        // Helper functions for positioning
        const getX = (index) => padding + (index / (history.length - 1 || 1)) * (width - padding * 2);
        const getY = (weight) => height - padding - ((weight - minWeight) / (maxWeight - minWeight)) * (height - padding * 2);

        // Draw grid
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);

        // Horizontal grid lines (weight)
        const weightStep = (maxWeight - minWeight) / 5;
        for (let i = 0; i <= 5; i++) {
            const weight = minWeight + i * weightStep;
            const y = getY(weight);

            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();

            // Weight labels
            ctx.fillStyle = '#94a3b8';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(weight.toFixed(0) + ' lbs', padding - 10, y + 4);
        }

        // Draw line
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3;
        ctx.beginPath();

        history.forEach((point, index) => {
            const x = getX(index);
            const y = getY(point.weight);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw points with labels
        history.forEach((point, index) => {
            const x = getX(index);
            const y = getY(point.weight);

            // Outer glow
            ctx.fillStyle = 'rgba(236, 72, 153, 0.3)';
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();

            // Point
            ctx.fillStyle = '#ec4899';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Weight label on point
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(point.weight.toFixed(1) + ' lbs', x, y - 15);

            // Date label below
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px Arial';
            const date = new Date(point.date);
            const dateLabel = `${date.getMonth() + 1}/${date.getDate()}`;
            ctx.fillText(dateLabel, x, height - padding + 20);
        });

        // Update stats
        this.updateBodyWeightStats();
    }

    updateBodyWeightStats() {
        const statsDiv = document.getElementById('body-weight-stats');
        const history = this.bodyWeightHistory;

        const currentWeight = history[history.length - 1].weight;
        const startWeight = history[0].weight;
        const totalChange = currentWeight - startWeight;
        const percentChange = ((totalChange / startWeight) * 100).toFixed(1);

        const highWeight = Math.max(...history.map(h => h.weight));
        const lowWeight = Math.min(...history.map(h => h.weight));

        statsDiv.innerHTML = `
            <div class="stat-item">
                <div class="stat-label">Current</div>
                <div class="stat-value">${currentWeight.toFixed(1)} lbs</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Starting</div>
                <div class="stat-value">${startWeight.toFixed(1)} lbs</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Change</div>
                <div class="stat-value ${totalChange >= 0 ? 'positive' : 'negative'}">${totalChange >= 0 ? '+' : ''}${totalChange.toFixed(1)} lbs (${percentChange}%)</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Range</div>
                <div class="stat-value">${lowWeight.toFixed(1)} - ${highWeight.toFixed(1)} lbs</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Entries</div>
                <div class="stat-value">${history.length} days</div>
            </div>
        `;
    }

    closeBodyWeightModal() {
        document.getElementById('body-weight-modal').classList.remove('active');
    }

    // ==================== TIMER FUNCTIONS ====================

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    updateTimerDisplay() {
        const display = document.getElementById('timer-display');
        display.textContent = this.formatTime(this.timerRemaining);

        // Add visual feedback
        display.classList.remove('warning', 'done');
        if (this.timerRemaining === 0) {
            display.classList.add('done');
        } else if (this.timerRemaining <= 10) {
            display.classList.add('warning');
        }

        // Update progress bar
        const progress = (this.timerRemaining / this.timerSeconds) * 100;
        document.getElementById('timer-progress').style.width = `${progress}%`;
    }

    startTimer() {
        if (this.timerRunning) return;

        // Don't start if timer is at 0
        if (this.timerRemaining <= 0) {
            this.resetTimer();
        }

        this.timerRunning = true;
        document.getElementById('timer-start').textContent = '⏸ Pause';

        this.timerInterval = setInterval(() => {
            this.timerRemaining--;
            this.updateTimerDisplay();

            if (this.timerRemaining <= 0) {
                this.stopTimer();
                this.playTimerSound();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.timerRunning = false;
        document.getElementById('timer-start').textContent = '▶ Start';
    }

    resetTimer(seconds) {
        this.stopTimer();
        if (seconds !== undefined) {
            this.timerSeconds = seconds;
        }
        this.timerRemaining = this.timerSeconds;
        this.updateTimerDisplay();
    }

    playTimerSound() {
        // Create a simple beep using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);

        // Vibrate if available
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    }

    completeQuest(questId, xpReward) {
        if (this.completedQuests.has(questId)) return;

        this.completedQuests.add(questId);
        this.addXP(xpReward);
        this.incrementStreak();
        this.checkAchievements();

        // Check if level is complete
        if (this.isLevelCompleted(this.currentLevel)) {
            if (this.currentLevel < 24) {
                this.showLevelUpNotification();
                setTimeout(() => {
                    this.currentLevel++;
                    this.renderLevel();
                    this.renderStats();
                    this.saveState();
                }, 2000);
            }
        }

        this.closeQuestModal();
        this.renderLevel();
        this.renderStats();
        this.saveState();
    }

    // ==================== NOTIFICATIONS ====================

    showLevelUpNotification() {
        document.getElementById('new-level').textContent = this.currentLevel + 1;
        const notification = document.getElementById('level-up-notification');
        notification.classList.add('active');
    }

    closeLevelUpNotification() {
        document.getElementById('level-up-notification').classList.remove('active');
    }

    showAchievementNotification(achievement) {
        document.getElementById('achievement-icon').textContent = achievement.icon;
        document.getElementById('achievement-name').textContent = achievement.name;

        const notification = document.getElementById('achievement-notification');
        notification.classList.add('active');

        setTimeout(() => {
            notification.classList.remove('active');
        }, 4000);
    }

    // ==================== EVENT LISTENERS ====================

    setupEventListeners() {
        document.getElementById('prev-week').addEventListener('click', () => {
            if (this.currentLevel > 1) {
                this.currentLevel--;
                this.renderLevel();
                this.saveState();
            }
        });

        document.getElementById('next-week').addEventListener('click', () => {
            if (this.currentLevel < 24) {
                this.currentLevel++;
                this.renderLevel();
                this.saveState();
            }
        });

        document.getElementById('close-modal').addEventListener('click', () => this.closeQuestModal());
        document.getElementById('cancel-workout').addEventListener('click', () => this.closeQuestModal());

        document.getElementById('workout-modal').addEventListener('click', (e) => {
            if (e.target.id === 'workout-modal') {
                this.closeQuestModal();
            }
        });

        document.getElementById('close-level-up').addEventListener('click', () => this.closeLevelUpNotification());

        // Graph modal listeners
        document.getElementById('close-graph').addEventListener('click', () => this.closeGraphModal());
        document.getElementById('graph-modal').addEventListener('click', (e) => {
            if (e.target.id === 'graph-modal') {
                this.closeGraphModal();
            }
        });

        // Body weight tracking listeners
        document.getElementById('log-weight-btn').addEventListener('click', () => this.logBodyWeight());
        document.getElementById('view-weight-history-btn').addEventListener('click', () => this.showBodyWeightHistory());
        document.getElementById('close-body-weight').addEventListener('click', () => this.closeBodyWeightModal());
        document.getElementById('body-weight-modal').addEventListener('click', (e) => {
            if (e.target.id === 'body-weight-modal') {
                this.closeBodyWeightModal();
            }
        });

        // Allow Enter key to log weight
        document.getElementById('weight-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.logBodyWeight();
            }
        });

        // Timer event listeners
        document.getElementById('timer-start').addEventListener('click', () => {
            if (this.timerRunning) {
                this.stopTimer();
            } else {
                this.startTimer();
            }
        });

        document.getElementById('timer-reset').addEventListener('click', () => {
            this.resetTimer();
        });

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seconds = parseInt(e.target.dataset.seconds);
                this.resetTimer(seconds);

                // Visual feedback for selected preset
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeQuestModal();
                this.closeLevelUpNotification();
                this.closeBodyWeightModal();
                this.closeGraphModal();
            }
        });
    }
}

// ==================== INITIALIZE APP ====================

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GainzQuest();
});
