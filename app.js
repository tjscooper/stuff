// ==================== QUEST PROGRAM GENERATOR ====================
// Generates quest program from templates (loaded from quest-data.js)

function generateQuestProgram() {
    const program = {};

    for (let level = 1; level <= 24; level++) {
        const phase = Math.floor((level - 1) / 4);
        const intensity = phase < 2 ? "Moderate" : phase < 4 ? "Heavy" : "Maximum";
        const difficultyMod = Math.min(Math.floor(level / 5), 2);

        program[level] = {
            title: `LEVEL ${level}`,
            subtitle: "7 QUESTS TO COMPLETE THIS LEVEL",
            description: level % 4 === 0
                ? "Recovery level - restore your HP and prepare for the next challenge!"
                : level === 1
                    ? "Welcome, warrior! Begin your epic journey to ultimate fitness."
                    : `${intensity} intensity training - push your limits and grow stronger!`,
            quests: []
        };

        // Generate 7 quests for this level
        for (let questIdx = 0; questIdx < 7; questIdx++) {
            const templateId = questMapping[level][questIdx];
            const template = workoutTemplates[templateId];
            const questNumber = `${level}.${questIdx + 1}`;

            // Check for user customizations
            const customTemplate = getCustomTemplate(templateId);
            const activeTemplate = customTemplate || template;

            const quest = {
                questNumber: questNumber,
                templateId: templateId, // Store template ID for editing
                name: activeTemplate.name,
                objective: activeTemplate.objective,
                difficulty: activeTemplate.difficulty + difficultyMod,
                xpReward: 1,
                type: activeTemplate.type
            };

            if (activeTemplate.type === 'recovery' || activeTemplate.type === 'zen') {
                quest.options = activeTemplate.options;
                quest.notes = activeTemplate.notes;
            } else {
                quest.preparation = activeTemplate.preparation;
                quest.recovery = activeTemplate.recovery;
                quest.restTimer = activeTemplate.restTimer;

                // Convert exercises from template format to display format
                const library = getExerciseLibrary();
                quest.battleSequence = activeTemplate.exercises.map(ex => {
                    const exerciseData = library[ex.id];
                    const sets = ex.sets + (level > 12 ? 1 : 0); // Add 1 set after level 12
                    const name = exerciseData ? exerciseData.name : ex.id;
                    const notes = ex.notes ? ` (${ex.notes})` : '';

                    return {
                        id: ex.id,
                        name: name,
                        specs: `${sets} sets × ${ex.reps} reps${notes}`,
                        bodyweight: exerciseData ? exerciseData.bodyweight : false
                    };
                });
            }

            program[level].quests.push(quest);
        }

        // Strategy guide
        program[level].strategyGuide = {
            intensity: level % 4 === 0 ? "Light recovery - 4-5/10" : `${intensity} - ${7 + Math.floor(level/4)}/10`,
            hpManagement: "7-9 hours sleep required",
            powerUps: "Hydration and nutrition critical",
            focus: level % 4 === 0 ? "Recovery and form refinement" : "Progressive overload"
        };
    }

    return program;
}

// Helper to get custom template from localStorage
function getCustomTemplate(templateId) {
    const customizations = JSON.parse(localStorage.getItem('workoutCustomizations') || '{}');
    return customizations[templateId];
}

// Helper to save custom template
function saveCustomTemplate(templateId, customTemplate) {
    const customizations = JSON.parse(localStorage.getItem('workoutCustomizations') || '{}');
    customizations[templateId] = customTemplate;
    localStorage.setItem('workoutCustomizations', JSON.stringify(customizations));
}

// ==================== EXERCISE LIBRARY HELPERS ====================

// Get merged exercise library (default + custom)
function getExerciseLibrary() {
    const customExercises = JSON.parse(localStorage.getItem('customExercises') || '{}');
    return { ...exerciseLibrary, ...customExercises };
}

// Get custom exercises only
function getCustomExercises() {
    return JSON.parse(localStorage.getItem('customExercises') || '{}');
}

// Save custom exercise
function saveCustomExercise(exerciseId, exerciseData) {
    const customExercises = getCustomExercises();
    customExercises[exerciseId] = exerciseData;
    localStorage.setItem('customExercises', JSON.stringify(customExercises));
}

// Delete custom exercise
function deleteCustomExercise(exerciseId) {
    const customExercises = getCustomExercises();
    delete customExercises[exerciseId];
    localStorage.setItem('customExercises', JSON.stringify(customExercises));
}

// Check if exercise ID is used in any templates
function isExerciseUsedInTemplates(exerciseId) {
    for (const templateId in workoutTemplates) {
        const template = workoutTemplates[templateId];
        if (template.exercises) {
            if (template.exercises.some(ex => ex.id === exerciseId)) {
                return true;
            }
        }
    }

    // Also check custom templates
    const customizations = JSON.parse(localStorage.getItem('workoutCustomizations') || '{}');
    for (const templateId in customizations) {
        const template = customizations[templateId];
        if (template.exercises) {
            if (template.exercises.some(ex => ex.id === exerciseId)) {
                return true;
            }
        }
    }

    return false;
}

// Generate the program
const questProgram = generateQuestProgram();

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
        // Per-set weight tracking - stores weight used for each set
        this.setWeights = {};
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
            setWeights: this.setWeights,
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
            this.setWeights = state.setWeights || {};
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
            document.getElementById('floating-timer-widget').style.display = 'none';

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
            document.getElementById('floating-timer-widget').style.display = 'block';
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
                    if (!ex.bodyweight) {
                        const currentWeight = this.getExerciseWeight(ex.name);

                        weightHTML = `
                            <div class="exercise-weight">
                                <div class="weight-controls">
                                    <button class="weight-btn weight-minus" data-exercise="${ex.name}" data-exercise-idx="${exerciseIndex}">−</button>
                                    <div class="weight-display">
                                        <span class="weight-value" data-exercise="${ex.name}" data-exercise-idx="${exerciseIndex}">${currentWeight}</span>
                                        <span class="weight-unit">lbs</span>
                                    </div>
                                    <button class="weight-btn weight-plus" data-exercise="${ex.name}" data-exercise-idx="${exerciseIndex}">+</button>
                                    <button class="weight-btn weight-graph" data-exercise="${ex.name}" title="View progression graph">📈</button>
                                </div>
                            </div>
                        `;
                    }

                    setsHTML = `
                        <div class="exercise-sets">
                            ${Array.from({length: numSets}, (_, i) => `
                                <div class="set-checkbox-wrapper">
                                    <input type="checkbox" class="set-checkbox" id="set-${exerciseIndex}-${i}" data-exercise-idx="${exerciseIndex}" data-exercise-name="${ex.name}" data-set="${i}">
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
                    checkbox.addEventListener('change', (e) => {
                        this.updateProgress();
                        this.saveSetProgress();

                        // Capture weight when checkbox is checked (for weighted exercises only)
                        const exerciseIdx = e.target.dataset.exerciseIdx;
                        const exerciseName = e.target.dataset.exerciseName;
                        const setNum = e.target.dataset.set;

                        if (exerciseIdx !== undefined && exerciseName) {
                            // Get current weight from the weight display
                            const weightDisplay = document.querySelector(`.weight-value[data-exercise-idx="${exerciseIdx}"]`);
                            if (weightDisplay) {
                                const currentWeight = parseFloat(weightDisplay.textContent);

                                // Initialize structures if needed
                                if (!this.setWeights[this.currentQuestId]) {
                                    this.setWeights[this.currentQuestId] = {};
                                }
                                if (!this.setWeights[this.currentQuestId][exerciseIdx]) {
                                    this.setWeights[this.currentQuestId][exerciseIdx] = {};
                                }

                                // Store the weight for this set
                                this.setWeights[this.currentQuestId][exerciseIdx][setNum] = currentWeight;

                                // Also update weight history
                                this.recordWeightHistory(exerciseName, currentWeight);

                                this.saveState();
                            }
                        }
                    });
                });

                // Add weight button listeners
                document.querySelectorAll('.weight-minus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const exerciseName = e.target.dataset.exercise;
                        const exerciseIdx = e.target.dataset.exerciseIdx;
                        this.changeWeight(exerciseName, exerciseIdx, -2.5);
                    });
                });

                document.querySelectorAll('.weight-plus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const exerciseName = e.target.dataset.exercise;
                        const exerciseIdx = e.target.dataset.exerciseIdx;
                        this.changeWeight(exerciseName, exerciseIdx, 2.5);
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

        // Show/hide edit button
        const editBtn = document.getElementById('edit-template-btn');
        if (quest.type === 'recovery' || quest.type === 'zen' || !quest.templateId) {
            editBtn.style.display = 'none';
        } else {
            editBtn.style.display = 'inline-block';
            editBtn.onclick = () => this.openTemplateEditor(quest.templateId);
        }

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

    // ==================== TEMPLATE EDITOR ====================

    openTemplateEditor(templateId) {
        this.editingTemplateId = templateId;
        const customTemplate = getCustomTemplate(templateId);
        const template = customTemplate || workoutTemplates[templateId];

        document.getElementById('template-editor-title').textContent = `✏️ Edit: ${template.name}`;

        // Clone template exercises for editing
        this.editingExercises = JSON.parse(JSON.stringify(template.exercises || []));

        this.renderExerciseEditor();
        document.getElementById('template-editor-modal').classList.add('active');
    }

    renderExerciseEditor() {
        const listDiv = document.getElementById('exercise-editor-list');
        listDiv.innerHTML = '';

        const library = getExerciseLibrary();

        this.editingExercises.forEach((ex, idx) => {
            const exerciseData = library[ex.id];
            const div = document.createElement('div');
            div.className = 'exercise-item';
            div.innerHTML = `
                <div class="exercise-item-controls">
                    <button class="move-up" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''}>↑</button>
                    <button class="move-down" data-idx="${idx}" ${idx === this.editingExercises.length - 1 ? 'disabled' : ''}>↓</button>
                </div>
                <div class="exercise-item-fields">
                    <div class="exercise-field">
                        <label>Exercise</label>
                        <select class="exercise-select" data-idx="${idx}">
                            ${Object.keys(library).map(key =>
                                `<option value="${key}" ${key === ex.id ? 'selected' : ''}>${library[key].name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="exercise-field">
                        <label>Sets</label>
                        <input type="number" class="sets-input" data-idx="${idx}" value="${ex.sets}" min="1" max="10">
                    </div>
                    <div class="exercise-field">
                        <label>Reps</label>
                        <input type="text" class="reps-input" data-idx="${idx}" value="${ex.reps}" placeholder="8-12">
                    </div>
                </div>
                <button class="exercise-item-delete" data-idx="${idx}">🗑️</button>
            `;
            listDiv.appendChild(div);
        });

        // Add event listeners
        listDiv.querySelectorAll('.move-up').forEach(btn => {
            btn.addEventListener('click', (e) => this.moveExercise(parseInt(e.target.dataset.idx), -1));
        });
        listDiv.querySelectorAll('.move-down').forEach(btn => {
            btn.addEventListener('click', (e) => this.moveExercise(parseInt(e.target.dataset.idx), 1));
        });
        listDiv.querySelectorAll('.exercise-select').forEach(select => {
            select.addEventListener('change', (e) => this.updateExercise(parseInt(e.target.dataset.idx), 'id', e.target.value));
        });
        listDiv.querySelectorAll('.sets-input').forEach(input => {
            input.addEventListener('change', (e) => this.updateExercise(parseInt(e.target.dataset.idx), 'sets', parseInt(e.target.value)));
        });
        listDiv.querySelectorAll('.reps-input').forEach(input => {
            input.addEventListener('change', (e) => this.updateExercise(parseInt(e.target.dataset.idx), 'reps', e.target.value));
        });
        listDiv.querySelectorAll('.exercise-item-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteExercise(parseInt(e.target.dataset.idx)));
        });
    }

    moveExercise(idx, direction) {
        const newIdx = idx + direction;
        if (newIdx < 0 || newIdx >= this.editingExercises.length) return;

        // Swap exercises
        [this.editingExercises[idx], this.editingExercises[newIdx]] =
        [this.editingExercises[newIdx], this.editingExercises[idx]];

        this.renderExerciseEditor();
    }

    updateExercise(idx, field, value) {
        this.editingExercises[idx][field] = value;
    }

    deleteExercise(idx) {
        if (!confirm('Delete this exercise?')) return;
        this.editingExercises.splice(idx, 1);
        this.renderExerciseEditor();
    }

    addExercise() {
        const newEx = {
            id: 'push_ups',
            sets: 3,
            reps: '10-12'
        };
        this.editingExercises.push(newEx);
        this.renderExerciseEditor();
    }

    saveTemplateEdits() {
        if (this.editingExercises.length === 0) {
            alert('❌ Template must have at least one exercise');
            return;
        }

        const template = JSON.parse(JSON.stringify(workoutTemplates[this.editingTemplateId]));
        template.exercises = this.editingExercises;

        saveCustomTemplate(this.editingTemplateId, template);

        // Regenerate quest program
        Object.assign(questProgram, generateQuestProgram());

        // Re-render current level
        this.renderLevel();

        alert('✅ Template saved! Changes apply to all levels using this workout.');
        this.closeTemplateEditor();
    }

    resetTemplate() {
        if (!confirm('⚠️ Reset to default template? This will delete all customizations.')) return;

        const customizations = JSON.parse(localStorage.getItem('workoutCustomizations') || '{}');
        delete customizations[this.editingTemplateId];
        localStorage.setItem('workoutCustomizations', JSON.stringify(customizations));

        // Regenerate quest program
        Object.assign(questProgram, generateQuestProgram());

        // Re-render current level
        this.renderLevel();

        alert('✅ Template reset to default!');
        this.closeTemplateEditor();
    }

    closeTemplateEditor() {
        document.getElementById('template-editor-modal').classList.remove('active');
        this.editingTemplateId = null;
        this.editingExercises = [];
    }

    // ==================== EXERCISE LIBRARY MANAGER ====================

    openExerciseLibrary() {
        this.renderExerciseLibrary();
        document.getElementById('exercise-library-modal').classList.add('active');
    }

    renderExerciseLibrary(searchTerm = '') {
        const library = getExerciseLibrary();
        const customExercises = getCustomExercises();
        const listDiv = document.getElementById('exercise-library-list');
        listDiv.innerHTML = '';

        // Convert to array and filter by search term
        const exercises = Object.keys(library)
            .filter(key => {
                if (!searchTerm) return true;
                const term = searchTerm.toLowerCase();
                return key.toLowerCase().includes(term) ||
                       library[key].name.toLowerCase().includes(term);
            })
            .map(key => ({
                id: key,
                ...library[key],
                isCustom: customExercises.hasOwnProperty(key)
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

        if (exercises.length === 0) {
            listDiv.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No exercises found.</p>';
            return;
        }

        exercises.forEach(exercise => {
            const div = document.createElement('div');
            div.className = `library-exercise-item ${exercise.isCustom ? 'custom' : ''}`;

            const badges = `
                <span class="library-exercise-badge ${exercise.bodyweight ? 'bodyweight' : 'weighted'}">
                    ${exercise.bodyweight ? '🤸 BODYWEIGHT' : '🏋️ WEIGHTED'}
                </span>
                ${exercise.isCustom ? '<span class="library-exercise-badge custom-badge">✨ CUSTOM</span>' : ''}
            `;

            div.innerHTML = `
                <div class="library-exercise-info">
                    <div class="library-exercise-name">${exercise.name}</div>
                    <div class="library-exercise-id">${exercise.id}</div>
                    <div>${badges}</div>
                </div>
                <div class="library-exercise-actions">
                    <button class="btn-edit" data-id="${exercise.id}">✏️ Edit</button>
                    <button class="btn-delete" data-id="${exercise.id}" ${!exercise.isCustom ? 'disabled' : ''}>
                        🗑️ Delete
                    </button>
                </div>
            `;
            listDiv.appendChild(div);
        });

        // Add event listeners
        listDiv.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => this.editExercise(e.target.dataset.id));
        });
        listDiv.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteExercise(e.target.dataset.id));
        });
    }

    openAddExercise() {
        this.editingExerciseId = null;
        document.getElementById('exercise-edit-title').textContent = '➕ Add Exercise';
        document.getElementById('exercise-id-input').value = '';
        document.getElementById('exercise-id-input').disabled = false;
        document.getElementById('exercise-name-input').value = '';
        document.getElementById('exercise-bodyweight-input').checked = false;
        document.getElementById('exercise-edit-modal').classList.add('active');
    }

    editExercise(exerciseId) {
        const library = getExerciseLibrary();
        const exercise = library[exerciseId];

        if (!exercise) {
            alert('❌ Exercise not found');
            return;
        }

        this.editingExerciseId = exerciseId;
        document.getElementById('exercise-edit-title').textContent = '✏️ Edit Exercise';
        document.getElementById('exercise-id-input').value = exerciseId;
        document.getElementById('exercise-id-input').disabled = true; // Can't change ID when editing
        document.getElementById('exercise-name-input').value = exercise.name;
        document.getElementById('exercise-bodyweight-input').checked = exercise.bodyweight;
        document.getElementById('exercise-edit-modal').classList.add('active');
    }

    saveExercise() {
        const idInput = document.getElementById('exercise-id-input');
        const nameInput = document.getElementById('exercise-name-input');
        const bodyweightInput = document.getElementById('exercise-bodyweight-input');

        const exerciseId = idInput.value.trim().toLowerCase().replace(/\s+/g, '_');
        const exerciseName = nameInput.value.trim();
        const isBodyweight = bodyweightInput.checked;

        // Validation
        if (!exerciseId || !exerciseName) {
            alert('❌ Please fill in both ID and name');
            return;
        }

        if (!/^[a-z0-9_]+$/.test(exerciseId)) {
            alert('❌ Exercise ID must be lowercase letters, numbers, and underscores only');
            return;
        }

        // Check if ID already exists (only when adding new)
        if (!this.editingExerciseId) {
            const library = getExerciseLibrary();
            if (library[exerciseId]) {
                alert('❌ An exercise with this ID already exists. Use a different ID or edit the existing exercise.');
                return;
            }
        }

        // Save exercise
        saveCustomExercise(exerciseId, {
            name: exerciseName,
            bodyweight: isBodyweight
        });

        // Regenerate quest program to pick up changes
        Object.assign(questProgram, generateQuestProgram());

        // Re-render current level
        this.renderLevel();

        alert(`✅ Exercise "${exerciseName}" saved!`);
        this.closeExerciseEdit();
        this.renderExerciseLibrary();
    }

    deleteExercise(exerciseId) {
        // Check if it's a custom exercise
        const customExercises = getCustomExercises();
        if (!customExercises[exerciseId]) {
            alert('❌ Cannot delete default exercises. You can only delete custom exercises.');
            return;
        }

        // Check if used in templates
        if (isExerciseUsedInTemplates(exerciseId)) {
            alert(`⚠️ This exercise is currently used in workout templates. Remove it from all templates before deleting.`);
            return;
        }

        if (!confirm(`⚠️ Delete exercise "${getExerciseLibrary()[exerciseId].name}"?\n\nThis cannot be undone.`)) {
            return;
        }

        deleteCustomExercise(exerciseId);

        // Regenerate quest program
        Object.assign(questProgram, generateQuestProgram());

        // Re-render
        this.renderLevel();
        this.renderExerciseLibrary();

        alert('✅ Exercise deleted!');
    }

    closeExerciseEdit() {
        document.getElementById('exercise-edit-modal').classList.remove('active');
        this.editingExerciseId = null;
    }

    closeExerciseLibrary() {
        document.getElementById('exercise-library-modal').classList.remove('active');
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

    recordWeightHistory(exerciseName, weight) {
        // Record weight in history for this level
        if (!this.weightHistory[exerciseName]) {
            this.weightHistory[exerciseName] = [];
        }

        // Check if we already have an entry for this level
        const existingEntry = this.weightHistory[exerciseName].find(
            entry => entry.level === this.currentLevel
        );

        if (existingEntry) {
            // Update to the latest/heaviest weight for this level
            existingEntry.weight = Math.max(existingEntry.weight, weight);
        } else {
            // Add new entry
            this.weightHistory[exerciseName].push({
                level: this.currentLevel,
                weight: weight
            });
        }

        // Sort by level
        this.weightHistory[exerciseName].sort((a, b) => a.level - b.level);
    }

    saveWeights() {
        // Read all current weight displays and save them
        document.querySelectorAll('.weight-value').forEach(display => {
            const exerciseName = display.dataset.exercise;
            const weight = parseFloat(display.textContent);
            if (exerciseName && !isNaN(weight)) {
                this.exerciseWeights[exerciseName] = weight;
            }
        });
        this.saveState();
    }

    changeWeight(exerciseName, exerciseIdx, delta) {
        const currentWeight = this.getExerciseWeight(exerciseName);
        const newWeight = Math.max(0, currentWeight + delta); // Don't go below 0
        this.updateExerciseWeight(exerciseName, newWeight);

        // Update the display
        const display = document.querySelector(`.weight-value[data-exercise-idx="${exerciseIdx}"]`);
        if (display) {
            display.textContent = newWeight;
        }

        this.saveState();
    }

    // ==================== WEIGHT GRAPH ====================

    showWeightGraph(exerciseName) {
        // Build data points from per-set weights
        const dataPoints = [];

        // Iterate through all recorded quests
        for (const questId in this.setWeights) {
            // Parse questId to get level (e.g., "1-0" or "1.1" -> level 1)
            const level = parseInt(questId.split(/[-.]/) [0]);

            // Find the quest data
            const questData = questProgram[level];
            if (!questData || !questData.quests) continue;

            // Try to find the specific quest
            let quest = questData.quests.find(q => q.questNumber === questId);

            // If not found by questNumber, try finding by index (for backwards compatibility)
            if (!quest) {
                const questIndex = parseInt(questId.split(/[-.]/) [1]);
                quest = questData.quests[questIndex];
            }

            if (!quest || !quest.battleSequence) continue;

            // Check each exercise in this quest
            for (const exerciseIdx in this.setWeights[questId]) {
                const exercise = quest.battleSequence[parseInt(exerciseIdx)];

                // If this exercise matches the one we're graphing
                if (exercise && exercise.name === exerciseName) {
                    // Get all sets for this exercise
                    const sets = this.setWeights[questId][exerciseIdx];

                    // Add each set as a data point
                    for (const setNum in sets) {
                        dataPoints.push({
                            label: `L${level}-${parseInt(setNum) + 1}`,
                            weight: sets[setNum],
                            level: level,
                            setNum: parseInt(setNum)
                        });
                    }
                }
            }
        }

        // Sort by level, then by set number
        dataPoints.sort((a, b) => {
            if (a.level !== b.level) return a.level - b.level;
            return a.setNum - b.setNum;
        });

        // Fallback to old weightHistory if no per-set data
        if (dataPoints.length === 0 && this.weightHistory[exerciseName]) {
            const oldHistory = this.weightHistory[exerciseName];
            oldHistory.forEach(entry => {
                dataPoints.push({
                    label: `L${entry.level}`,
                    weight: entry.weight,
                    level: entry.level,
                    setNum: 0
                });
            });
        }

        if (dataPoints.length === 0) {
            alert('No weight history yet for this exercise. Complete a workout first!');
            return;
        }

        document.getElementById('graph-title').textContent = `📈 ${exerciseName} Progression`;
        document.getElementById('graph-modal').classList.add('active');

        // Draw the graph
        setTimeout(() => this.drawWeightGraph(exerciseName, dataPoints), 100);
    }

    drawWeightGraph(exerciseName, dataPoints) {
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
        const weights = dataPoints.map(d => d.weight);
        const minWeight = Math.max(0, Math.floor(Math.min(...weights) / 10) * 10 - 10);
        const maxWeight = Math.ceil(Math.max(...weights) / 10) * 10 + 10;
        const numPoints = dataPoints.length;

        // Helper functions
        const getX = (index) => padding + (index / (numPoints - 1)) * (width - padding * 2);
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

        // Draw line connecting points
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3;
        ctx.beginPath();

        dataPoints.forEach((point, index) => {
            const x = getX(index);
            const y = getY(point.weight);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw points and labels
        dataPoints.forEach((point, index) => {
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
            ctx.fillText(point.weight + ' lbs', x, y - 15);

            // Set label below x-axis (L1-1, L1-2, etc)
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.save();
            ctx.translate(x, height - padding + 15);
            ctx.rotate(-Math.PI / 4); // 45 degree angle
            ctx.fillText(point.label, 0, 0);
            ctx.restore();
        });

        // Update stats
        this.updateGraphStats(exerciseName, dataPoints, minWeight, maxWeight);
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
                <div class="stat-value">${history.length} sets</div>
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

    // ==================== EXPORT/IMPORT DATA ====================

    exportData() {
        const data = {
            version: '2.4', // Updated for per-set weight tracking
            exportDate: new Date().toISOString(),
            data: {
                currentLevel: this.currentLevel,
                totalXP: this.totalXP,
                streak: this.streak,
                completedQuests: Array.from(this.completedQuests),
                unlockedAchievements: Array.from(this.unlockedAchievements),
                lastQuestDate: this.lastQuestDate,
                exerciseWeights: this.exerciseWeights,
                weightHistory: this.weightHistory,
                questSetProgress: this.questSetProgress,
                setWeights: this.setWeights,
                bodyWeightHistory: this.bodyWeightHistory,
                workoutCustomizations: JSON.parse(localStorage.getItem('workoutCustomizations') || '{}'),
                customExercises: JSON.parse(localStorage.getItem('customExercises') || '{}')
            }
        };

        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `gainz-quest-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('✅ Data exported successfully! Save this file somewhere safe.');
    }

    importData() {
        document.getElementById('import-file-input').click();
    }

    handleImportFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);

                if (!imported.data) {
                    alert('❌ Invalid backup file format');
                    return;
                }

                // Confirm before overwriting
                if (!confirm('⚠️ This will replace all your current data. Continue?')) {
                    return;
                }

                // Restore data
                const data = imported.data;
                this.currentLevel = data.currentLevel || 1;
                this.totalXP = data.totalXP || 0;
                this.streak = data.streak || 0;
                this.completedQuests = new Set(data.completedQuests || []);
                this.unlockedAchievements = new Set(data.unlockedAchievements || []);
                this.lastQuestDate = data.lastQuestDate;
                this.exerciseWeights = data.exerciseWeights || {};
                this.weightHistory = data.weightHistory || {};
                this.questSetProgress = data.questSetProgress || {};
                this.setWeights = data.setWeights || {};
                this.bodyWeightHistory = data.bodyWeightHistory || [];

                // Restore workout customizations (v2.0+)
                if (data.workoutCustomizations) {
                    localStorage.setItem('workoutCustomizations', JSON.stringify(data.workoutCustomizations));
                }

                // Restore custom exercises (v2.1+)
                if (data.customExercises) {
                    localStorage.setItem('customExercises', JSON.stringify(data.customExercises));
                }

                // Regenerate quest program to pick up custom exercises
                Object.assign(questProgram, generateQuestProgram());

                this.saveState();
                this.renderStats();
                this.renderAchievements();
                this.renderLevel();
                this.renderBodyWeight();

                alert('✅ Data imported successfully! Your progress has been restored.');
            } catch (error) {
                alert('❌ Error reading backup file. Make sure it\'s a valid Gainz Quest backup.');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);

        // Reset file input
        event.target.value = '';
    }

    // ==================== TIMER FUNCTIONS ====================

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    updateTimerDisplay() {
        const display = document.getElementById('timer-display');
        const floatingDisplay = document.getElementById('floating-timer-display');
        const timeText = this.formatTime(this.timerRemaining);

        display.textContent = timeText;
        floatingDisplay.textContent = timeText;

        // Add visual feedback
        display.classList.remove('warning', 'done');
        if (this.timerRemaining === 0) {
            display.classList.add('done');
        } else if (this.timerRemaining <= 10) {
            display.classList.add('warning');
        }

        // Update progress bars (main and floating)
        const progress = (this.timerRemaining / this.timerSeconds) * 100;
        document.getElementById('timer-progress').style.width = `${progress}%`;
        document.getElementById('floating-timer-progress').style.width = `${progress}%`;
    }

    startTimer() {
        if (this.timerRunning) return;

        // Don't start if timer is at 0
        if (this.timerRemaining <= 0) {
            this.resetTimer();
        }

        this.timerRunning = true;
        document.getElementById('timer-start').textContent = '⏸ Pause';
        document.getElementById('floating-timer-start').textContent = '⏸';

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
        document.getElementById('floating-timer-start').textContent = '▶';
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
        const logBtn = document.getElementById('log-weight-btn');
        if (logBtn) {
            logBtn.addEventListener('click', () => this.logBodyWeight());
        }

        const historyBtn = document.getElementById('view-weight-history-btn');
        if (historyBtn) {
            historyBtn.addEventListener('click', () => this.showBodyWeightHistory());
        }

        const closeBtn = document.getElementById('close-body-weight');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeBodyWeightModal());
        }

        const modal = document.getElementById('body-weight-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'body-weight-modal') {
                    this.closeBodyWeightModal();
                }
            });
        }

        // Allow Enter key to log weight
        const weightInput = document.getElementById('weight-input');
        if (weightInput) {
            weightInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.logBodyWeight();
                }
            });
        }

        // Export/Import listeners
        const exportBtn = document.getElementById('export-data-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        const importBtn = document.getElementById('import-data-btn');
        if (importBtn) {
            importBtn.addEventListener('click', () => this.importData());
        }

        const importFileInput = document.getElementById('import-file-input');
        if (importFileInput) {
            importFileInput.addEventListener('change', (e) => this.handleImportFile(e));
        }

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

        // Scroll navigation buttons
        document.getElementById('scroll-to-exercises').addEventListener('click', () => {
            const exercisesDiv = document.getElementById('modal-exercises');
            exercisesDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        // Floating timer widget controls
        document.getElementById('floating-timer-start').addEventListener('click', () => {
            if (this.timerRunning) {
                this.stopTimer();
            } else {
                this.startTimer();
            }
        });

        document.getElementById('floating-timer-reset').addEventListener('click', () => {
            this.resetTimer();
        });

        document.querySelectorAll('.floating-preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seconds = parseInt(e.target.dataset.seconds);
                this.resetTimer(seconds);

                // Visual feedback for selected preset
                document.querySelectorAll('.floating-preset-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeQuestModal();
                this.closeLevelUpNotification();
                this.closeBodyWeightModal();
                this.closeGraphModal();
                this.closeTemplateEditor();
                this.closeExerciseLibrary();
                this.closeExerciseEdit();
            }
        });

        // Template editor listeners
        const addExerciseBtn = document.getElementById('add-exercise-btn');
        if (addExerciseBtn) {
            addExerciseBtn.addEventListener('click', () => this.addExercise());
        }

        const resetTemplateBtn = document.getElementById('reset-template-btn');
        if (resetTemplateBtn) {
            resetTemplateBtn.addEventListener('click', () => this.resetTemplate());
        }

        const saveTemplateBtn = document.getElementById('save-template-btn');
        if (saveTemplateBtn) {
            saveTemplateBtn.addEventListener('click', () => this.saveTemplateEdits());
        }

        const cancelTemplateBtn = document.getElementById('cancel-template-edit');
        if (cancelTemplateBtn) {
            cancelTemplateBtn.addEventListener('click', () => this.closeTemplateEditor());
        }

        const closeTemplateEditorBtn = document.getElementById('close-template-editor');
        if (closeTemplateEditorBtn) {
            closeTemplateEditorBtn.addEventListener('click', () => this.closeTemplateEditor());
        }

        const templateEditorModal = document.getElementById('template-editor-modal');
        if (templateEditorModal) {
            templateEditorModal.addEventListener('click', (e) => {
                if (e.target.id === 'template-editor-modal') {
                    this.closeTemplateEditor();
                }
            });
        }

        // Exercise library listeners
        const manageExercisesBtn = document.getElementById('manage-exercises-btn');
        if (manageExercisesBtn) {
            manageExercisesBtn.addEventListener('click', () => this.openExerciseLibrary());
        }

        const exerciseSearchInput = document.getElementById('exercise-search');
        if (exerciseSearchInput) {
            exerciseSearchInput.addEventListener('input', (e) => {
                this.renderExerciseLibrary(e.target.value);
            });
        }

        const addNewExerciseBtn = document.getElementById('add-new-exercise-btn');
        if (addNewExerciseBtn) {
            addNewExerciseBtn.addEventListener('click', () => this.openAddExercise());
        }

        const closeLibraryBtn = document.getElementById('close-library-btn');
        if (closeLibraryBtn) {
            closeLibraryBtn.addEventListener('click', () => this.closeExerciseLibrary());
        }

        const closeExerciseLibraryBtn = document.getElementById('close-exercise-library');
        if (closeExerciseLibraryBtn) {
            closeExerciseLibraryBtn.addEventListener('click', () => this.closeExerciseLibrary());
        }

        const exerciseLibraryModal = document.getElementById('exercise-library-modal');
        if (exerciseLibraryModal) {
            exerciseLibraryModal.addEventListener('click', (e) => {
                if (e.target.id === 'exercise-library-modal') {
                    this.closeExerciseLibrary();
                }
            });
        }

        // Exercise edit modal listeners
        const saveExerciseBtn = document.getElementById('save-exercise-btn');
        if (saveExerciseBtn) {
            saveExerciseBtn.addEventListener('click', () => this.saveExercise());
        }

        const cancelExerciseEditBtn = document.getElementById('cancel-exercise-edit');
        if (cancelExerciseEditBtn) {
            cancelExerciseEditBtn.addEventListener('click', () => this.closeExerciseEdit());
        }

        const closeExerciseEditBtn = document.getElementById('close-exercise-edit');
        if (closeExerciseEditBtn) {
            closeExerciseEditBtn.addEventListener('click', () => this.closeExerciseEdit());
        }

        const exerciseEditModal = document.getElementById('exercise-edit-modal');
        if (exerciseEditModal) {
            exerciseEditModal.addEventListener('click', (e) => {
                if (e.target.id === 'exercise-edit-modal') {
                    this.closeExerciseEdit();
                }
            });
        }
    }
}

// ==================== INITIALIZE APP ====================

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GainzQuest();
});
