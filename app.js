// ==================== WORKOUT PROGRAM DATA ====================

const workoutProgram = {
    1: {
        title: "Week 1: Foundation Building",
        description: "Welcome to your fitness journey! This week focuses on establishing proper form and building a solid foundation.",
        days: [
            { type: "Full Body", exercises: [
                { name: "Push-ups", specs: "3 sets of 8-10 reps" },
                { name: "Bodyweight Squats", specs: "3 sets of 12-15 reps" },
                { name: "Plank", specs: "3 sets of 20-30 seconds" },
                { name: "Walking Lunges", specs: "3 sets of 10 reps per leg" }
            ]},
            { type: "Cardio", exercises: [
                { name: "Brisk Walking", specs: "20 minutes" },
                { name: "Jumping Jacks", specs: "3 sets of 30 seconds" },
                { name: "High Knees", specs: "3 sets of 30 seconds" }
            ]},
            { type: "rest" },
            { type: "Upper Body", exercises: [
                { name: "Incline Push-ups", specs: "3 sets of 10 reps" },
                { name: "Dumbbell Rows", specs: "3 sets of 10 reps per arm" },
                { name: "Shoulder Taps", specs: "3 sets of 20 taps" },
                { name: "Bicep Curls", specs: "3 sets of 12 reps" }
            ]},
            { type: "Core", exercises: [
                { name: "Crunches", specs: "3 sets of 15 reps" },
                { name: "Russian Twists", specs: "3 sets of 20 reps" },
                { name: "Dead Bug", specs: "3 sets of 10 reps per side" },
                { name: "Mountain Climbers", specs: "3 sets of 30 seconds" }
            ]},
            { type: "Lower Body", exercises: [
                { name: "Goblet Squats", specs: "3 sets of 12 reps" },
                { name: "Romanian Deadlifts", specs: "3 sets of 10 reps" },
                { name: "Calf Raises", specs: "3 sets of 15 reps" },
                { name: "Glute Bridges", specs: "3 sets of 15 reps" }
            ]},
            { type: "rest" }
        ]
    },
    2: {
        title: "Week 2: Building Momentum",
        description: "Great start! This week we increase the volume slightly and continue perfecting form.",
        days: [
            { type: "Full Body", exercises: [
                { name: "Push-ups", specs: "3 sets of 10-12 reps" },
                { name: "Bodyweight Squats", specs: "3 sets of 15-18 reps" },
                { name: "Plank", specs: "3 sets of 30-40 seconds" },
                { name: "Walking Lunges", specs: "3 sets of 12 reps per leg" }
            ]},
            { type: "Cardio", exercises: [
                { name: "Jogging/Running", specs: "20 minutes" },
                { name: "Burpees", specs: "3 sets of 8 reps" },
                { name: "Jump Rope", specs: "3 sets of 45 seconds" }
            ]},
            { type: "rest" },
            { type: "Upper Body", exercises: [
                { name: "Standard Push-ups", specs: "3 sets of 10-12 reps" },
                { name: "Bent Over Rows", specs: "3 sets of 12 reps" },
                { name: "Pike Push-ups", specs: "3 sets of 8 reps" },
                { name: "Hammer Curls", specs: "3 sets of 12 reps" }
            ]},
            { type: "Core", exercises: [
                { name: "Bicycle Crunches", specs: "3 sets of 20 reps" },
                { name: "Plank to Down Dog", specs: "3 sets of 10 reps" },
                { name: "Leg Raises", specs: "3 sets of 10 reps" },
                { name: "Side Plank", specs: "3 sets of 20 seconds per side" }
            ]},
            { type: "Lower Body", exercises: [
                { name: "Bulgarian Split Squats", specs: "3 sets of 10 reps per leg" },
                { name: "Single Leg Deadlifts", specs: "3 sets of 10 reps per leg" },
                { name: "Jump Squats", specs: "3 sets of 10 reps" },
                { name: "Hip Thrusts", specs: "3 sets of 15 reps" }
            ]},
            { type: "rest" }
        ]
    },
    3: {
        title: "Week 3: Strength Development",
        description: "Your body is adapting! Time to challenge yourself with increased intensity.",
        days: [
            { type: "Full Body Power", exercises: [
                { name: "Push-ups", specs: "4 sets of 10-12 reps" },
                { name: "Jump Squats", specs: "4 sets of 12 reps" },
                { name: "Plank Variations", specs: "4 sets of 40 seconds" },
                { name: "Reverse Lunges", specs: "4 sets of 12 reps per leg" }
            ]},
            { type: "HIIT Cardio", exercises: [
                { name: "Sprint Intervals", specs: "30s sprint / 30s rest × 10" },
                { name: "Burpees", specs: "4 sets of 10 reps" },
                { name: "Mountain Climbers", specs: "4 sets of 45 seconds" }
            ]},
            { type: "rest" },
            { type: "Upper Body Strength", exercises: [
                { name: "Decline Push-ups", specs: "4 sets of 10 reps" },
                { name: "Pull-ups/Assisted", specs: "4 sets of 6-8 reps" },
                { name: "Overhead Press", specs: "4 sets of 10 reps" },
                { name: "Diamond Push-ups", specs: "3 sets of 8 reps" }
            ]},
            { type: "Core Strength", exercises: [
                { name: "Weighted Crunches", specs: "4 sets of 15 reps" },
                { name: "Plank with Arm Lift", specs: "3 sets of 10 reps per side" },
                { name: "V-ups", specs: "3 sets of 12 reps" },
                { name: "Windshield Wipers", specs: "3 sets of 10 reps" }
            ]},
            { type: "Lower Body Power", exercises: [
                { name: "Barbell Squats", specs: "4 sets of 10 reps" },
                { name: "Deadlifts", specs: "4 sets of 8 reps" },
                { name: "Box Jumps", specs: "4 sets of 10 reps" },
                { name: "Walking Lunges", specs: "3 sets of 15 reps per leg" }
            ]},
            { type: "rest" }
        ]
    },
    4: {
        title: "Week 4: Recovery & Adaptation",
        description: "Deload week! Let your body recover while maintaining movement. Quality over quantity.",
        days: [
            { type: "Light Full Body", exercises: [
                { name: "Push-ups", specs: "3 sets of 8 reps (easy pace)" },
                { name: "Bodyweight Squats", specs: "3 sets of 12 reps" },
                { name: "Plank", specs: "3 sets of 30 seconds" },
                { name: "Yoga Flow", specs: "10 minutes" }
            ]},
            { type: "Active Recovery", exercises: [
                { name: "Walking", specs: "30 minutes" },
                { name: "Stretching", specs: "15 minutes" },
                { name: "Foam Rolling", specs: "10 minutes" }
            ]},
            { type: "rest" },
            { type: "Light Upper", exercises: [
                { name: "Incline Push-ups", specs: "3 sets of 10 reps" },
                { name: "Light Rows", specs: "3 sets of 12 reps" },
                { name: "Shoulder Mobility", specs: "10 minutes" },
                { name: "Band Pull-aparts", specs: "3 sets of 15 reps" }
            ]},
            { type: "Yoga/Stretching", exercises: [
                { name: "Yoga Flow", specs: "30 minutes" },
                { name: "Deep Stretching", specs: "15 minutes" },
                { name: "Breathing Exercises", specs: "10 minutes" }
            ]},
            { type: "Light Lower", exercises: [
                { name: "Goblet Squats", specs: "3 sets of 10 reps (light)" },
                { name: "Glute Bridges", specs: "3 sets of 12 reps" },
                { name: "Leg Swings", specs: "3 sets of 15 per leg" },
                { name: "Calf Stretches", specs: "5 minutes" }
            ]},
            { type: "rest" }
        ]
    }
};

// Generate weeks 5-24 with progressive difficulty
for (let week = 5; week <= 24; week++) {
    const phase = Math.floor((week - 1) / 4);
    const weekInPhase = ((week - 1) % 4) + 1;
    const isDeloadWeek = weekInPhase === 4;

    let title, description;

    if (isDeloadWeek) {
        title = `Week ${week}: Recovery Week`;
        description = "Active recovery week to allow your body to adapt and grow stronger.";
    } else if (phase < 3) {
        title = `Week ${week}: Hypertrophy Phase`;
        description = "Building muscle mass with moderate weight and higher volume.";
    } else if (phase < 5) {
        title = `Week ${week}: Strength Phase`;
        description = "Increasing strength with heavier weights and lower reps.";
    } else {
        title = `Week ${week}: Power & Conditioning`;
        description = "Advanced training combining strength, power, and endurance.";
    }

    const sets = isDeloadWeek ? 3 : Math.min(4 + Math.floor(phase / 2), 5);
    const intensity = isDeloadWeek ? "Light" : phase < 3 ? "Moderate" : "Heavy";

    workoutProgram[week] = {
        title: title,
        description: description,
        days: [
            { type: `${intensity} Full Body`, exercises: [
                { name: "Push-ups/Weighted", specs: `${sets} sets of ${isDeloadWeek ? '8' : '10-12'} reps` },
                { name: "Squats", specs: `${sets} sets of ${isDeloadWeek ? '10' : '12-15'} reps` },
                { name: "Plank Holds", specs: `${sets} sets of ${isDeloadWeek ? '40' : '60'} seconds` },
                { name: "Lunges", specs: `${sets} sets of ${isDeloadWeek ? '10' : '12'} reps per leg` }
            ]},
            { type: isDeloadWeek ? "Light Cardio" : "HIIT", exercises: [
                { name: isDeloadWeek ? "Walking" : "Running", specs: `${isDeloadWeek ? '30' : '25'} minutes` },
                { name: isDeloadWeek ? "Light Intervals" : "Burpees", specs: `${sets} sets of ${isDeloadWeek ? '5' : '12'} reps` },
                { name: isDeloadWeek ? "Stretching" : "Jump Rope", specs: `${isDeloadWeek ? '15' : '5'} minutes` }
            ]},
            { type: "rest" },
            { type: `${intensity} Upper Body`, exercises: [
                { name: "Pull-ups", specs: `${sets} sets of ${isDeloadWeek ? '5' : '8-10'} reps` },
                { name: "Dips", specs: `${sets} sets of ${isDeloadWeek ? '6' : '10-12'} reps` },
                { name: "Overhead Press", specs: `${sets} sets of ${isDeloadWeek ? '8' : '10'} reps` },
                { name: "Bicep Curls", specs: `${sets} sets of ${isDeloadWeek ? '10' : '12'} reps` }
            ]},
            { type: `${intensity} Core`, exercises: [
                { name: "Weighted Sit-ups", specs: `${sets} sets of ${isDeloadWeek ? '12' : '15'} reps` },
                { name: "Russian Twists", specs: `${sets} sets of ${isDeloadWeek ? '20' : '30'} reps` },
                { name: "Leg Raises", specs: `${sets} sets of ${isDeloadWeek ? '10' : '15'} reps` },
                { name: "Ab Wheel", specs: `${sets} sets of ${isDeloadWeek ? '8' : '12'} reps` }
            ]},
            { type: `${intensity} Lower Body`, exercises: [
                { name: "Deadlifts", specs: `${sets} sets of ${isDeloadWeek ? '6' : '8-10'} reps` },
                { name: "Front Squats", specs: `${sets} sets of ${isDeloadWeek ? '8' : '10'} reps` },
                { name: "Bulgarian Splits", specs: `${sets} sets of ${isDeloadWeek ? '8' : '10'} reps per leg` },
                { name: "Calf Raises", specs: `${sets} sets of ${isDeloadWeek ? '15' : '20'} reps` }
            ]},
            { type: "rest" }
        ]
    };
}

// ==================== ACHIEVEMENTS SYSTEM ====================

const achievements = [
    { id: 'first-workout', name: 'First Steps', description: 'Complete your first workout', icon: '🎯', xp: 50 },
    { id: 'week-1', name: 'Week Warrior', description: 'Complete Week 1', icon: '⭐', xp: 100 },
    { id: 'streak-3', name: 'Consistency', description: '3-day streak', icon: '🔥', xp: 75 },
    { id: 'streak-7', name: 'Dedicated', description: '7-day streak', icon: '💪', xp: 150 },
    { id: 'level-5', name: 'Rising Star', description: 'Reach Level 5', icon: '🌟', xp: 200 },
    { id: 'level-10', name: 'Champion', description: 'Reach Level 10', icon: '🏆', xp: 300 },
    { id: 'half-way', name: 'Half Way There', description: 'Complete 12 weeks', icon: '🎖️', xp: 500 },
    { id: 'complete-program', name: 'Ultimate Warrior', description: 'Complete all 24 weeks', icon: '👑', xp: 1000 },
    { id: '25-workouts', name: 'Committed', description: 'Complete 25 workouts', icon: '💯', xp: 250 },
    { id: '50-workouts', name: 'Unstoppable', description: 'Complete 50 workouts', icon: '⚡', xp: 400 }
];

// ==================== STATE MANAGEMENT ====================

class WorkoutApp {
    constructor() {
        this.currentWeek = 1;
        this.level = 1;
        this.xp = 0;
        this.streak = 0;
        this.completedWorkouts = new Set();
        this.unlockedAchievements = new Set();
        this.lastWorkoutDate = null;

        this.loadState();
        this.init();
    }

    init() {
        this.renderStats();
        this.renderAchievements();
        this.renderWeek();
        this.setupEventListeners();
    }

    // ==================== LOCAL STORAGE ====================

    saveState() {
        const state = {
            currentWeek: this.currentWeek,
            level: this.level,
            xp: this.xp,
            streak: this.streak,
            completedWorkouts: Array.from(this.completedWorkouts),
            unlockedAchievements: Array.from(this.unlockedAchievements),
            lastWorkoutDate: this.lastWorkoutDate
        };
        localStorage.setItem('workoutAppState', JSON.stringify(state));
    }

    loadState() {
        const saved = localStorage.getItem('workoutAppState');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentWeek = state.currentWeek || 1;
            this.level = state.level || 1;
            this.xp = state.xp || 0;
            this.streak = state.streak || 0;
            this.completedWorkouts = new Set(state.completedWorkouts || []);
            this.unlockedAchievements = new Set(state.unlockedAchievements || []);
            this.lastWorkoutDate = state.lastWorkoutDate;

            this.updateStreak();
        }
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem('workoutAppState');
            location.reload();
        }
    }

    // ==================== STREAK MANAGEMENT ====================

    updateStreak() {
        if (!this.lastWorkoutDate) return;

        const lastDate = new Date(this.lastWorkoutDate);
        const today = new Date();

        lastDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = today - lastDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays > 1) {
            this.streak = 0;
        }
    }

    incrementStreak() {
        const today = new Date().toDateString();

        if (this.lastWorkoutDate !== today) {
            this.streak++;
            this.lastWorkoutDate = today;

            // Check streak achievements
            if (this.streak === 3) this.unlockAchievement('streak-3');
            if (this.streak === 7) this.unlockAchievement('streak-7');
        }
    }

    // ==================== XP AND LEVELING ====================

    addXP(amount) {
        this.xp += amount;
        const xpForNextLevel = this.getXPForLevel(this.level + 1);

        if (this.xp >= xpForNextLevel) {
            this.levelUp();
        }

        this.renderStats();
        this.saveState();
    }

    getXPForLevel(level) {
        return Math.floor(100 * Math.pow(1.2, level - 1));
    }

    levelUp() {
        this.level++;
        this.showLevelUpNotification();

        // Check level achievements
        if (this.level === 5) this.unlockAchievement('level-5');
        if (this.level === 10) this.unlockAchievement('level-10');
    }

    // ==================== ACHIEVEMENTS ====================

    unlockAchievement(achievementId) {
        if (this.unlockedAchievements.has(achievementId)) return;

        this.unlockedAchievements.add(achievementId);
        const achievement = achievements.find(a => a.id === achievementId);

        if (achievement) {
            this.addXP(achievement.xp);
            this.showAchievementNotification(achievement);
            this.renderAchievements();
            this.saveState();
        }
    }

    checkAchievements() {
        const completedCount = this.completedWorkouts.size;

        if (completedCount >= 1) this.unlockAchievement('first-workout');
        if (completedCount >= 25) this.unlockAchievement('25-workouts');
        if (completedCount >= 50) this.unlockAchievement('50-workouts');

        // Check week completions
        if (this.isWeekCompleted(1)) this.unlockAchievement('week-1');
        if (this.currentWeek >= 12) this.unlockAchievement('half-way');
        if (this.currentWeek >= 24 && this.completedWorkouts.size >= 72) {
            this.unlockAchievement('complete-program');
        }
    }

    isWeekCompleted(week) {
        for (let day = 0; day < 7; day++) {
            const workout = workoutProgram[week].days[day];
            if (workout.type !== 'rest' && !this.completedWorkouts.has(`${week}-${day}`)) {
                return false;
            }
        }
        return true;
    }

    // ==================== RENDERING ====================

    renderStats() {
        document.getElementById('level').textContent = this.level;
        document.getElementById('current-xp').textContent = this.xp;
        document.getElementById('next-level-xp').textContent = this.getXPForLevel(this.level + 1);
        document.getElementById('streak').textContent = this.streak;
        document.getElementById('completed').textContent = this.completedWorkouts.size;

        const xpProgress = (this.xp / this.getXPForLevel(this.level + 1)) * 100;
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

    renderWeek() {
        const week = workoutProgram[this.currentWeek];

        document.getElementById('current-week').textContent = this.currentWeek;
        document.getElementById('week-title').textContent = week.title;
        document.getElementById('week-description').textContent = week.description;

        const grid = document.getElementById('workouts-grid');
        grid.innerHTML = '';

        week.days.forEach((day, index) => {
            const workoutId = `${this.currentWeek}-${index}`;
            const isCompleted = this.completedWorkouts.has(workoutId);
            const isRest = day.type === 'rest';

            const card = document.createElement('div');
            card.className = `workout-card ${isCompleted ? 'completed' : ''} ${isRest ? 'rest-day' : ''}`;

            if (isRest) {
                card.innerHTML = `
                    <div class="workout-header">
                        <div class="workout-day">Day ${index + 1}</div>
                        <div class="workout-status">😌</div>
                    </div>
                    <div class="workout-type">Rest Day</div>
                    <p class="rest-message">Take it easy, your muscles are growing!</p>
                `;
            } else {
                card.innerHTML = `
                    <div class="workout-header">
                        <div class="workout-day">Day ${index + 1}</div>
                        <div class="workout-status">${isCompleted ? '✅' : '⭕'}</div>
                    </div>
                    <div class="workout-type">${day.type}</div>
                    <div class="workout-exercises">
                        ${day.exercises.slice(0, 3).map(ex => `
                            <div class="exercise-item">${ex.name}</div>
                        `).join('')}
                        ${day.exercises.length > 3 ? '<div class="exercise-item">+ more...</div>' : ''}
                    </div>
                `;

                card.addEventListener('click', () => this.openWorkoutModal(this.currentWeek, index));
            }

            grid.appendChild(card);
        });

        // Update navigation buttons
        document.getElementById('prev-week').disabled = this.currentWeek === 1;
        document.getElementById('next-week').disabled = this.currentWeek === 24;
    }

    openWorkoutModal(week, day) {
        const workout = workoutProgram[week].days[day];
        const workoutId = `${week}-${day}`;
        const isCompleted = this.completedWorkouts.has(workoutId);

        document.getElementById('modal-day').textContent = `Day ${day + 1}: ${workout.type}`;

        const exercisesDiv = document.getElementById('modal-exercises');
        exercisesDiv.innerHTML = workout.exercises.map(ex => `
            <div class="exercise-detail">
                <div class="exercise-name">${ex.name}</div>
                <div class="exercise-specs">${ex.specs}</div>
            </div>
        `).join('');

        const completeBtn = document.getElementById('complete-workout');
        completeBtn.textContent = isCompleted ? 'Already Completed ✓' : 'Complete Workout (+50 XP)';
        completeBtn.disabled = isCompleted;

        completeBtn.onclick = () => this.completeWorkout(workoutId);

        document.getElementById('workout-modal').classList.add('active');
    }

    closeWorkoutModal() {
        document.getElementById('workout-modal').classList.remove('active');
    }

    completeWorkout(workoutId) {
        if (this.completedWorkouts.has(workoutId)) return;

        this.completedWorkouts.add(workoutId);
        this.addXP(50);
        this.incrementStreak();
        this.checkAchievements();

        this.closeWorkoutModal();
        this.renderWeek();
        this.renderStats();
        this.saveState();
    }

    // ==================== NOTIFICATIONS ====================

    showLevelUpNotification() {
        document.getElementById('new-level').textContent = this.level;
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
        // Week navigation
        document.getElementById('prev-week').addEventListener('click', () => {
            if (this.currentWeek > 1) {
                this.currentWeek--;
                this.renderWeek();
                this.saveState();
            }
        });

        document.getElementById('next-week').addEventListener('click', () => {
            if (this.currentWeek < 24) {
                this.currentWeek++;
                this.renderWeek();
                this.saveState();
            }
        });

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => this.closeWorkoutModal());
        document.getElementById('cancel-workout').addEventListener('click', () => this.closeWorkoutModal());

        // Click outside modal to close
        document.getElementById('workout-modal').addEventListener('click', (e) => {
            if (e.target.id === 'workout-modal') {
                this.closeWorkoutModal();
            }
        });

        // Level up notification
        document.getElementById('close-level-up').addEventListener('click', () => this.closeLevelUpNotification());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeWorkoutModal();
                this.closeLevelUpNotification();
            }
        });
    }
}

// ==================== INITIALIZE APP ====================

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new WorkoutApp();

    // Add reset button (for development/testing)
    // Uncomment the line below to add a reset button
    // document.body.insertAdjacentHTML('beforeend', '<button style="position:fixed;bottom:20px;right:20px;padding:10px;background:red;color:white;border:none;border-radius:5px;cursor:pointer;z-index:9999;" onclick="app.resetProgress()">Reset Progress</button>');
});
