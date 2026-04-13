// =====================
// CONSTANTS
// =====================
const CATEGORIES = [
  { id: 'all',     label: 'All',             icon: 'star' },
  { id: 'art',     label: 'Art',             icon: 'flower' },
  { id: 'gamedev', label: 'Game Dev',        icon: 'cartridge' },
  { id: '3dprint', label: '3D Printing',     icon: 'rocket' },
  { id: 'cnc',     label: 'CNC',             icon: 'swords' },
  { id: 'laser',   label: 'Laser Engraving', icon: 'flame' },
  { id: 'other',   label: 'Other',           icon: 'skull' },
];

const GROUP_ICONS = { Chore: 'tools', Tim: 'crown', Work: 'computer' };

const HABIT_IDEAS = {
  Chore: [
    'Clean kitchen', 'Do laundry', 'Vacuum floors', 'Take out trash',
    'Wipe down counters', 'Clean bathroom', 'Water plants', 'Grocery shopping',
    'Meal prep', 'Organize a drawer', 'Wash dishes', 'Sweep porch',
    'Pay a bill', 'File paperwork', 'Change bed sheets', 'Clean fridge',
    'Mop floors', 'Scrub toilets', 'Clean mirrors', 'Wipe light switches',
    'Declutter a shelf', 'Donate old stuff', 'Clean out car', 'Wash windows',
    'Take recycling out', 'Deep clean oven', 'Organize pantry', 'Fix something broken',
    'Check smoke detectors', 'Clean dryer lint trap', 'Sharpen kitchen knives',
    'Descale coffee maker', 'Wash throw blankets', 'Sanitize door handles',
  ],
  Tim: [
    'Sketch something', 'Work on pixel art', 'Try a new art technique',
    'Design a character', 'Build a game mechanic', 'Model something in 3D',
    'Write in journal', 'Read a chapter', 'Learn a new tool',
    'Prototype a game idea', 'Record a timelapse', 'Experiment with shaders',
    'Plan a project', 'Go for a walk', 'Meditate 10 minutes', 'Listen to a podcast',
    'Finish a 3D print', 'Design something for the CNC', 'Try a laser engraving',
    'Paint or ink something', 'Make a short animation', 'Write a game design doc',
    'Watch a tutorial', 'Build a prop or diorama', 'Post something to the blog',
    'Photograph recent work', 'Organize project files', 'Back up creative work',
    'Revisit an old project', 'Brainstorm 10 ideas', 'Find a new reference artist',
    'Stretch or exercise', 'Cook something new', 'Call a friend or family member',
  ],
  Work: [
    'Clear email inbox', 'Update project status', 'Write documentation',
    'Plan the week', 'Do a code review', 'Refactor something messy',
    'Fix a lingering bug', 'Write tests', 'Update dependencies',
    'Prep for a meeting', 'Research a topic', 'Draft a proposal',
    'Review open PRs', 'Update README', 'Set weekly goals', 'Follow up on blockers',
    'Close stale tickets', 'Audit error logs', 'Improve a slow query',
    'Write a post-mortem', 'Update your bio or portfolio', 'Learn a keyboard shortcut',
    'Automate something repetitive', 'Improve CI pipeline', 'Add logging',
    'Sketch a system diagram', 'Review recent deploys', 'Update team wiki',
    'Write a status update', 'Read an industry article', 'Schedule a 1:1',
    'Triage the backlog', 'Profile app performance', 'Document an API endpoint',
  ],
};

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map(c => [c.id, c.label]));
const GROUPS = ['Chore', 'Tim', 'Work'];

// =====================
// STATE
// =====================
const state = {
  user: null,
  posts: [],
  habitItems: [],
  overdueItems: [],
  habitDate: todayDate(),
  activeCategory: 'all',
  currentView: 'blog',
  editingPost: null,
  currentPost: null,
};

// =====================
// UTILS
// =====================
function todayDate() {
  const d = new Date();
  return d.getFullYear() + '-'
    + String(d.getMonth() + 1).padStart(2, '0') + '-'
    + String(d.getDate()).padStart(2, '0');
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function formatDateShort(dateStr) {
  return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric'
  });
}

function offsetDate(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

function daysAgo(dateStr) {
  const diff = Math.round((new Date(todayDate()) - new Date(dateStr)) / 86400000);
  if (diff === 1) return 'yesterday';
  return diff + ' days ago';
}

function formatMinutes(mins) {
  if (!mins) return '';
  if (mins < 60) return mins + 'm';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? h + 'h ' + m + 'm' : h + 'h';
}

// =====================
// AUTH
// =====================
async function initAuth() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session?.user) setUser(session.user);

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null);
  });
}

function setUser(user) {
  state.user = user;
  updateAuthUI();
}

function updateAuthUI() {
  const loggedIn = !!state.user;
  document.querySelectorAll('.auth-only').forEach(el => {
    el.classList.toggle('hidden', !loggedIn);
  });
  document.getElementById('nav-login-btn').classList.toggle('hidden', loggedIn);
  if (state.currentView === 'blog') loadPosts();
  if (!loggedIn && (state.currentView === 'habits' || state.currentView === 'editor')) {
    showView('blog');
  }
}

async function login(email, password) {
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  return error;
}

async function logout() {
  await supabaseClient.auth.signOut();
}

// =====================
// POSTS
// =====================
async function loadPosts() {
  let query = supabaseClient.from('posts').select('*').order('created_at', { ascending: false });
  if (!state.user) query = query.eq('published', true);

  const { data, error } = await query;
  if (error) { console.error('Error loading posts:', error); return; }
  state.posts = data || [];
  renderBlog();
}

async function loadPost(slug) {
  const { data, error } = await supabaseClient.from('posts').select('*').eq('slug', slug).single();
  if (error) { console.error('Error loading post:', error); return null; }
  return data;
}

async function savePost(post) {
  if (post.id) {
    const { error } = await supabaseClient.from('posts').update(post).eq('id', post.id);
    return error;
  } else {
    const { error } = await supabaseClient.from('posts').insert(post);
    return error;
  }
}

async function deletePost(id) {
  const { error } = await supabaseClient.from('posts').delete().eq('id', id);
  return error;
}

// =====================
// HABITS
// =====================
async function loadHabits() {
  const [{ data: todayData, error }, { data: overdueData }] = await Promise.all([
    supabaseClient.from('habit_items').select('*')
      .eq('date', state.habitDate)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
    state.habitDate === todayDate()
      ? supabaseClient.from('habit_items').select('*')
          .lt('date', state.habitDate)
          .eq('completed', false)
          .order('date', { ascending: true })
          .order('sort_order', { ascending: true })
      : Promise.resolve({ data: [] }),
  ]);

  if (error) { console.error('Error loading habits:', error); return; }
  state.habitItems = todayData || [];
  state.overdueItems = overdueData || [];
  renderHabits();
}

async function addHabitItem(group, text, timeboxMinutes) {
  const item = {
    date: state.habitDate,
    group_name: group,
    text: text.trim(),
    completed: false,
    timebox_minutes: timeboxMinutes || null,
    sort_order: state.habitItems.filter(i => i.group_name === group).length,
  };
  const { error } = await supabaseClient.from('habit_items').insert(item);
  if (!error) await loadHabits();
}

async function toggleHabitItem(id, completed) {
  await supabaseClient.from('habit_items').update({ completed }).eq('id', id);
  const item = state.habitItems.find(i => i.id === id);
  if (item) item.completed = completed;
  renderHabits();
}

async function deleteHabitItem(id) {
  await supabaseClient.from('habit_items').delete().eq('id', id);
  state.habitItems = state.habitItems.filter(i => i.id !== id);
  renderHabits();
}

// =====================
// RENDER: BLOG
// =====================
function renderBlog() {
  renderCategoryTabs();
  renderPostGrid();
}

function renderCategoryTabs() {
  const container = document.getElementById('category-tabs');
  container.innerHTML = CATEGORIES.map(cat =>
    '<button class="cat-tab ' + (cat.id === state.activeCategory ? 'active' : '') + '" data-cat="' + cat.id + '">'
    + '<img src="images/icons/' + cat.icon + '.png" class="tab-icon" alt="">'
    + cat.label + '</button>'
  ).join('');

  container.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.cat;
      renderBlog();
    });
  });
}

function renderPostGrid() {
  const grid = document.getElementById('posts-grid');
  let filtered = state.posts;
  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  if (filtered.length === 0) {
    const hint = state.user ? ' &mdash; hit <strong>+ New Post</strong> to write one!' : '.';
    grid.innerHTML = '<div class="empty-state">No posts yet' + hint + '</div>';
    return;
  }

  grid.innerHTML = filtered.map(post => {
    const imgHtml = post.cover_image
      ? '<div class="post-card-image" style="background-image: url(\'' + post.cover_image + '\')"></div>'
      : '<div class="post-card-image post-card-image--empty"></div>';
    const draftBadge = !post.published ? '<span class="draft-badge">Draft</span>' : '';
    const excerptHtml = post.excerpt ? '<p class="post-card-excerpt">' + post.excerpt + '</p>' : '';
    return '<article class="post-card ' + (!post.published ? 'draft' : '') + '" data-slug="' + post.slug + '">'
      + imgHtml
      + '<div class="post-card-body">'
      + '<div class="post-card-meta">'
      + '<span class="cat-badge cat-' + post.category + '">' + (CATEGORY_LABELS[post.category] || post.category) + '</span>'
      + draftBadge
      + '<span class="post-date">' + formatDate(post.created_at) + '</span>'
      + '</div>'
      + '<h2 class="post-card-title">' + post.title + '</h2>'
      + excerptHtml
      + '</div></article>';
  }).join('');

  grid.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', () => openPost(card.dataset.slug));
  });
}

// =====================
// RENDER: POST DETAIL
// =====================
async function openPost(slug) {
  const post = await loadPost(slug);
  if (!post) return;
  state.currentPost = post;
  renderPostDetail(post);
  showView('post');
}

function renderPostDetail(post) {
  const container = document.getElementById('post-detail');
  const images = (post.image_urls || []).filter(Boolean);
  const coverHtml = post.cover_image
    ? '<div class="post-cover" style="background-image: url(\'' + post.cover_image + '\')"></div>'
    : '';
  const adminHtml = state.user
    ? '<div class="post-nav-actions"><button class="btn btn-sm btn-outline" id="edit-post-btn">Edit</button><button class="btn btn-sm btn-danger" id="delete-post-btn">Delete</button></div>'
    : '';
  const galleryHtml = images.length > 0
    ? '<div class="post-gallery">' + images.map(url => '<img src="' + url + '" alt="" loading="lazy" class="gallery-img">').join('') + '</div>'
    : '';

  container.innerHTML = '<div class="post-nav"><button class="btn btn-ghost" id="back-to-blog">&larr; Back</button>' + adminHtml + '</div>'
    + coverHtml
    + '<div class="post-content-wrap">'
    + '<div class="post-meta">'
    + '<span class="cat-badge cat-' + post.category + '">' + (CATEGORY_LABELS[post.category] || post.category) + '</span>'
    + (!post.published ? '<span class="draft-badge">Draft</span>' : '')
    + '<span class="post-date">' + formatDate(post.created_at) + '</span>'
    + '</div>'
    + '<h1 class="post-title">' + post.title + '</h1>'
    + (post.excerpt ? '<p class="post-excerpt">' + post.excerpt + '</p>' : '')
    + '<div class="post-body">' + marked.parse(post.content || '') + '</div>'
    + galleryHtml
    + '</div>';

  document.getElementById('back-to-blog').addEventListener('click', () => showView('blog'));

  if (state.user) {
    document.getElementById('edit-post-btn').addEventListener('click', () => openEditor(post));
    document.getElementById('delete-post-btn').addEventListener('click', async () => {
      if (confirm('Delete this post?')) {
        await deletePost(post.id);
        await loadPosts();
        showView('blog');
      }
    });
  }
}

// =====================
// RENDER: HABITS
// =====================
function renderHabits() {
  document.getElementById('habit-date-display').textContent = formatDateShort(state.habitDate);

  const isToday = state.habitDate === todayDate();
  document.getElementById('habit-today').classList.toggle('hidden', isToday);
  document.getElementById('habit-next').disabled = isToday;

  GROUPS.forEach(group => {
    const items = state.habitItems.filter(i => i.group_name === group);
    const list = document.getElementById('habit-list-' + group);
    const timeEl = document.getElementById('habit-time-' + group.toLowerCase());

    const totalMins = items.reduce((sum, i) => sum + (i.timebox_minutes || 0), 0);
    const done = items.filter(i => i.completed).length;
    const parts = [];
    if (totalMins > 0) parts.push(formatMinutes(totalMins));
    if (items.length > 0) parts.push(done + '/' + items.length + ' done');
    timeEl.textContent = parts.join(' · ');

    const overdue = state.overdueItems.filter(i => i.group_name === group);

    if (items.length === 0 && overdue.length === 0) {
      list.innerHTML = '<div class="habit-empty">No tasks yet</div>';
      return;
    }

    function renderItem(item, isOverdue) {
      const timeboxHtml = item.timebox_minutes
        ? '<span class="timebox-badge">&#9201; ' + formatMinutes(item.timebox_minutes) + '</span>'
        : '';
      const ageBadge = isOverdue
        ? '<span class="overdue-badge">' + daysAgo(item.date) + '</span>'
        : '';
      return '<div class="habit-item ' + (item.completed ? 'completed' : '') + (isOverdue ? ' overdue' : '') + '" data-id="' + item.id + '">'
        + '<label class="habit-check">'
        + '<input type="checkbox" ' + (item.completed ? 'checked' : '') + ' data-id="' + item.id + '">'
        + '<span class="habit-text">' + item.text + '</span>'
        + '</label>'
        + '<div class="habit-item-right">' + ageBadge + timeboxHtml
        + '<button class="habit-delete" data-id="' + item.id + '" title="Delete">&times;</button>'
        + '</div></div>';
    }

    const overdueHtml = overdue.length > 0
      ? '<div class="overdue-divider">Carried over</div>' + overdue.map(i => renderItem(i, true)).join('')
      : '';

    list.innerHTML = items.map(i => renderItem(i, false)).join('') + overdueHtml;

    list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => toggleHabitItem(cb.dataset.id, cb.checked));
    });
    list.querySelectorAll('.habit-delete').forEach(btn => {
      btn.addEventListener('click', () => deleteHabitItem(btn.dataset.id));
    });
  });

  // Render idea chips for each group
  GROUPS.forEach(group => {
    const col = document.getElementById('habit-col-' + group.toLowerCase());
    const existing = col.querySelector('.habit-ideas');
    if (existing) existing.remove();

    const ideas = HABIT_IDEAS[group] || [];
    const div = document.createElement('div');
    div.className = 'habit-ideas';
    div.innerHTML = '<div class="habit-ideas-label">// IDEAS</div>'
      + ideas.map(idea =>
          '<button class="idea-chip" data-group="' + group + '" data-idea="' + idea + '">' + idea + '</button>'
        ).join('');
    col.appendChild(div);

    div.querySelectorAll('.idea-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const form = col.querySelector('.habit-add-form');
        form.querySelector('.habit-add-text').value = chip.dataset.idea;
        form.querySelector('.habit-add-text').focus();
      });
    });
  });
}

// =====================
// EDITOR
// =====================
function openEditor(post) {
  state.editingPost = post || null;
  document.getElementById('editor-title').textContent = post ? 'Edit Post' : 'New Post';
  document.getElementById('post-title').value = post ? post.title : '';
  document.getElementById('post-slug').value = post ? post.slug : '';
  document.getElementById('post-excerpt').value = post ? (post.excerpt || '') : '';
  document.getElementById('post-category').value = post ? post.category : 'other';
  document.getElementById('post-cover').value = post ? (post.cover_image || '') : '';
  document.getElementById('post-content').value = post ? (post.content || '') : '';
  document.getElementById('post-images').value = post ? (post.image_urls || []).join('\n') : '';
  showView('editor');
}

async function submitPost(publish) {
  const title = document.getElementById('post-title').value.trim();
  if (!title) { alert('Title is required.'); return; }

  const slug = document.getElementById('post-slug').value.trim() || slugify(title);
  const imageUrls = document.getElementById('post-images').value
    .split('\n').map(s => s.trim()).filter(Boolean);

  const post = {
    title,
    slug,
    excerpt: document.getElementById('post-excerpt').value.trim(),
    category: document.getElementById('post-category').value,
    cover_image: document.getElementById('post-cover').value.trim(),
    content: document.getElementById('post-content').value,
    image_urls: imageUrls,
    published: publish,
  };

  if (state.editingPost) post.id = state.editingPost.id;

  const error = await savePost(post);
  if (error) { alert('Error saving post: ' + error.message); return; }

  await loadPosts();
  showView('blog');
}

// =====================
// VIEWS
// =====================
function showView(view) {
  document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
  document.getElementById('view-' + view).classList.remove('hidden');
  state.currentView = view;

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (view === 'blog' || view === 'post') {
    document.getElementById('nav-blog-link').classList.add('active');
  } else if (view === 'habits') {
    document.getElementById('nav-habits-link').classList.add('active');
  }

  window.scrollTo(0, 0);
}

// =====================
// EVENTS
// =====================
// =====================
// IMAGE UPLOAD
// =====================
async function uploadImage(file) {
  const ext = file.type.split('/')[1]?.replace('jpeg', 'jpg') || 'png';
  const filename = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;

  const { error } = await supabaseClient.storage
    .from('blog-images')
    .upload(filename, file, { contentType: file.type });

  if (error) { alert('Upload failed: ' + error.message); return null; }

  const { data } = supabaseClient.storage.from('blog-images').getPublicUrl(filename);
  return data.publicUrl;
}

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = textarea.value.slice(0, start) + text + textarea.value.slice(end);
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  textarea.focus();
}

function initPasteUpload() {
  const content = document.getElementById('post-content');
  const cover   = document.getElementById('post-cover');

  // Paste image into content area → uploads and inserts markdown
  content.addEventListener('paste', async (e) => {
    const image = [...(e.clipboardData?.items || [])].find(i => i.type.startsWith('image/'));
    if (!image) return;
    e.preventDefault();

    content.disabled = true;
    const placeholder = '\n![Uploading...]()\n';
    const start = content.selectionStart;
    insertAtCursor(content, placeholder);

    const url = await uploadImage(image.getAsFile());
    content.disabled = false;

    if (url) {
      content.value = content.value.replace(placeholder, '\n![image](' + url + ')\n');
    } else {
      content.value = content.value.replace(placeholder, '');
    }
  });

  // Paste image into cover image field → uploads and puts URL in field
  cover.addEventListener('paste', async (e) => {
    const image = [...(e.clipboardData?.items || [])].find(i => i.type.startsWith('image/'));
    if (!image) return;
    e.preventDefault();

    cover.value = 'Uploading...';
    cover.disabled = true;
    const url = await uploadImage(image.getAsFile());
    cover.disabled = false;
    cover.value = url || '';
  });
}

function initEvents() {
  document.getElementById('nav-home').addEventListener('click', () => showView('blog'));
  document.getElementById('nav-blog-link').addEventListener('click', (e) => { e.preventDefault(); showView('blog'); });
  document.getElementById('nav-habits-link').addEventListener('click', (e) => {
    e.preventDefault();
    if (!state.user) return;
    showView('habits');
    loadHabits();
  });

  // Auth
  document.getElementById('nav-login-btn').addEventListener('click', () => {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('auth-email').focus();
  });
  document.getElementById('auth-cancel').addEventListener('click', () => {
    document.getElementById('auth-modal').classList.add('hidden');
  });
  document.getElementById('auth-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden');
  });
  document.getElementById('auth-submit').addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const errEl = document.getElementById('auth-error');
    errEl.classList.add('hidden');
    const error = await login(email, password);
    if (error) {
      errEl.textContent = error.message;
      errEl.classList.remove('hidden');
    } else {
      document.getElementById('auth-modal').classList.add('hidden');
      document.getElementById('auth-password').value = '';
    }
  });
  document.getElementById('auth-password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('auth-submit').click();
  });
  document.getElementById('nav-logout-btn').addEventListener('click', logout);

  // Editor
  document.getElementById('new-post-btn').addEventListener('click', () => openEditor());
  document.getElementById('editor-cancel').addEventListener('click', () => showView('blog'));
  document.getElementById('editor-save-draft').addEventListener('click', () => submitPost(false));
  document.getElementById('editor-publish').addEventListener('click', () => submitPost(true));
  document.getElementById('post-title').addEventListener('input', (e) => {
    if (!state.editingPost) {
      document.getElementById('post-slug').value = slugify(e.target.value);
    }
  });

  // Habits
  document.getElementById('habit-prev').addEventListener('click', () => {
    state.habitDate = offsetDate(state.habitDate, -1);
    loadHabits();
  });
  document.getElementById('habit-next').addEventListener('click', () => {
    if (state.habitDate < todayDate()) {
      state.habitDate = offsetDate(state.habitDate, 1);
      loadHabits();
    }
  });
  document.getElementById('habit-today').addEventListener('click', () => {
    state.habitDate = todayDate();
    loadHabits();
  });

  document.querySelectorAll('.habit-add-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const group = form.dataset.group;
      const text = form.querySelector('.habit-add-text').value;
      const time = parseInt(form.querySelector('.habit-add-time').value) || null;
      await addHabitItem(group, text, time);
      form.reset();
      form.querySelector('.habit-add-text').focus();
    });
  });
}

// =====================
// INIT
// =====================
async function init() {
  await initAuth();
  initEvents();
  initPasteUpload();
  await loadPosts();
}

init();
