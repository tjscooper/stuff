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
  { id: 'other',   label: 'News',            icon: 'skull' },
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
// ASTEROID BACKGROUND
// =====================
function seededRand(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;  s >>>= 0;
    return s / 4294967296;
  };
}

function generateAsteroid() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const W = canvas.width  = window.innerWidth;
  const H = canvas.height = window.innerHeight;
  const CELL = 10;

  const cols = Math.ceil(W / CELL) + 1;
  const rows = Math.ceil(H / CELL) + 1;

  // Seed from today's date — same asteroid all day, new one tomorrow
  const rand = seededRand(parseInt(todayDate().replace(/-/g, '')));

  // Init grid ~48% rock, force border shell
  let grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) =>
      (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) ? 1
      : rand() < 0.48 ? 1 : 0
    )
  );

  // 4 CA smoothing passes (standard cave rule: ≥5 rock neighbors → rock)
  for (let gen = 0; gen < 4; gen++) {
    grid = grid.map((row, r) =>
      row.map((_, c) => {
        let n = 0;
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            n += (nr < 0 || nr >= rows || nc < 0 || nc >= cols) ? 1 : grid[nr][nc];
          }
        return n >= 5 ? 1 : 0;
      })
    );
  }

  // Parchment base
  ctx.fillStyle = '#f0eee8';
  ctx.fillRect(0, 0, W, H);

  // Asteroid cells — draw the empty (cave) regions as rock, leave solid as parchment
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c]) continue; // skip background (solid CA cells)
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          n += (nr < 0 || nr >= rows || nc < 0 || nc >= cols) ? 1 : grid[nr][nc];
        }
      // n = number of solid neighbors; low n = deep inside asteroid = darker
      const t = Math.max(0, 1 - n / 6); // 1 = deep interior, 0 = surface
      const v = Math.round(237 - t * 8);
      ctx.fillStyle = `rgb(${v},${Math.round(v * 0.97)},${Math.round(v * 0.93)})`;
      ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
    }
  }

  // Graph paper grid lines
  ctx.strokeStyle = 'rgba(0,0,0,0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += CELL) {
    ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += CELL) {
    ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke();
  }
}

let _asteroidResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_asteroidResizeTimer);
  _asteroidResizeTimer = setTimeout(generateAsteroid, 150);
});

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

  // Featured posts first
  filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

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
    const featuredBadge = post.featured ? '<span class="featured-badge">&#11088; Featured</span>' : '';
    const excerptHtml = post.excerpt ? '<p class="post-card-excerpt">' + post.excerpt + '</p>' : '';
    return '<article class="post-card ' + (!post.published ? 'draft' : '') + (post.featured ? ' featured' : '') + '" data-slug="' + post.slug + '">'
      + imgHtml
      + '<div class="post-card-body">'
      + '<div class="post-card-meta">'
      + '<span class="cat-badge cat-' + post.category + '">' + (CATEGORY_LABELS[post.category] || post.category) + '</span>'
      + featuredBadge + draftBadge
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
  showView('post', { slug: post.slug });
}

function readingTime(content) {
  const words = (content || '').trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return mins + ' min read';
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
  const postUrl = location.origin + location.pathname + '#/post/' + post.slug;
  const shareHtml = '<div class="post-share">'
    + '<span class="post-share-label">// SHARE</span>'
    + '<button class="share-btn" id="share-copy" title="Copy link">&#128279; Copy Link</button>'
    + '<a class="share-btn" href="https://x.com/intent/post?url=' + encodeURIComponent(postUrl) + '&text=' + encodeURIComponent(post.title) + '" target="_blank" rel="noopener">&#10006; Post on X</a>'
    + '<a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(postUrl) + '" target="_blank" rel="noopener">&#x1F426; Share on Facebook</a>'
    + '</div>';

  container.innerHTML = '<div class="post-nav"><button class="btn btn-ghost" id="back-to-blog">&larr; Back</button>' + adminHtml + '</div>'
    + coverHtml
    + '<div class="post-page">'
    + '<div class="post-content-wrap">'
    + '<div class="post-meta">'
    + '<span class="cat-badge cat-' + post.category + '">' + (CATEGORY_LABELS[post.category] || post.category) + '</span>'
    + (!post.published ? '<span class="draft-badge">Draft</span>' : '')
    + '<span class="post-date">' + formatDate(post.created_at) + '</span>'
    + '<span class="post-reading-time"><img src="images/icons/hourglass.png" class="reading-time-icon" alt=""> ' + readingTime(post.content) + '</span>'
    + '</div>'
    + '<h1 class="post-title">' + post.title + '</h1>'
    + (post.excerpt ? '<p class="post-excerpt">' + post.excerpt + '</p>' : '')
    + '<div class="post-body">' + marked.parse(post.content || '') + '</div>'
    + galleryHtml
    + shareHtml
    + '</div>'
    + '</div>';

  document.getElementById('back-to-blog').addEventListener('click', () => history.back());

  attachLightboxToPost();

  document.getElementById('share-copy').addEventListener('click', () => {
    const url = location.origin + location.pathname + '#/post/' + post.slug;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('share-copy');
      btn.textContent = '✓ Copied!';
      setTimeout(() => { btn.innerHTML = '&#128279; Copy Link'; }, 2000);
    });
  });

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
  document.getElementById('post-featured').checked = post ? !!post.featured : false;
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
    featured: document.getElementById('post-featured').checked,
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
function showView(view, { slug, pushState = true } = {}) {
  document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
  document.getElementById('view-' + view).classList.remove('hidden');
  state.currentView = view;

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (view === 'blog' || view === 'post') {
    document.getElementById('nav-blog-link').classList.add('active');
  } else if (view === 'habits') {
    document.getElementById('nav-habits-link').classList.add('active');
  }

  document.getElementById('stats-open-btn').classList.toggle('hidden', view !== 'habits');

  // Update URL hash
  if (pushState) {
    if (view === 'post' && slug) {
      history.pushState({ view, slug }, '', '#/post/' + slug);
    } else if (view === 'blog') {
      history.pushState({ view }, '', '#/');
    } else {
      history.pushState({ view }, '', '#/' + view);
    }
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

// =====================
// LIGHTBOX
// =====================
const lightbox = {
  images: [],
  index: 0,

  open(imgs, startIndex) {
    this.images = imgs;
    this.index = startIndex;
    this.render();
    document.getElementById('lightbox').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  close() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = '';
  },

  go(delta) {
    this.index = (this.index + delta + this.images.length) % this.images.length;
    this.render();
  },

  render() {
    document.getElementById('lightbox-img').src = this.images[this.index];
    const counter = document.getElementById('lightbox-counter');
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');
    if (this.images.length > 1) {
      counter.textContent = (this.index + 1) + ' / ' + this.images.length;
      prev.classList.remove('hidden');
      next.classList.remove('hidden');
    } else {
      counter.textContent = '';
      prev.classList.add('hidden');
      next.classList.add('hidden');
    }
  },
};

function initLightbox() {
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
  document.getElementById('lightbox-prev').addEventListener('click', () => lightbox.go(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => lightbox.go(1));
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('lightbox-img-wrap')) lightbox.close();
  });
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').classList.contains('hidden')) return;
    if (e.key === 'Escape') lightbox.close();
    if (e.key === 'ArrowLeft') lightbox.go(-1);
    if (e.key === 'ArrowRight') lightbox.go(1);
  });
}

function attachLightboxToPost() {
  const imgs = [...document.querySelectorAll('.post-body img, .gallery-img')]
    .map(img => img.src)
    .filter(Boolean);
  if (!imgs.length) return;

  document.querySelectorAll('.post-body img, .gallery-img').forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => lightbox.open(imgs, i));
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
  document.getElementById('new-post-btn-inline').addEventListener('click', () => openEditor());
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

  document.getElementById('stats-open-btn').addEventListener('click', openStats);
  document.getElementById('stats-close-btn').addEventListener('click', closeStats);
  document.getElementById('stats-overlay').addEventListener('click', closeStats);

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
// STATS
// =====================
async function loadStats() {
  const body = document.getElementById('stats-body');
  body.innerHTML = '<div class="loading">Computing stats...</div>';

  const { data, error } = await supabaseClient
    .from('habit_items')
    .select('date, group_name, completed, timebox_minutes');

  if (error || !data) {
    body.innerHTML = '<div class="stats-error">Failed to load stats.</div>';
    return;
  }

  const total = data.length;
  const done = data.filter(i => i.completed).length;
  const rate = total > 0 ? Math.round((done / total) * 100) : 0;

  const timeLogged = data
    .filter(i => i.completed && i.timebox_minutes)
    .reduce((sum, i) => sum + i.timebox_minutes, 0);

  // Streak calculation
  const completedDates = [...new Set(
    data.filter(i => i.completed).map(i => i.date)
  )].sort();

  let currentStreak = 0, bestStreak = 0, streak = 0;
  const today = todayDate();
  const yesterday = offsetDate(today, -1);
  for (let i = 0; i < completedDates.length; i++) {
    if (i === 0) { streak = 1; }
    else {
      const prev = completedDates[i - 1];
      const curr = completedDates[i];
      streak = offsetDate(prev, 1) === curr ? streak + 1 : 1;
    }
    bestStreak = Math.max(bestStreak, streak);
  }
  const lastDay = completedDates[completedDates.length - 1];
  currentStreak = (lastDay === today || lastDay === yesterday) ? streak : 0;

  // Days with any activity
  const activeDays = new Set(data.map(i => i.date)).size;

  // Best day of week
  const dayCounts = {};
  completedDates.forEach(d => {
    const dow = new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long' });
    dayCounts[dow] = (dayCounts[dow] || 0) + 1;
  });
  const bestDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0];

  // Per-group stats
  const groupStats = GROUPS.map(g => {
    const items = data.filter(i => i.group_name === g);
    const gdone = items.filter(i => i.completed).length;
    const gtime = items.filter(i => i.completed && i.timebox_minutes)
      .reduce((s, i) => s + i.timebox_minutes, 0);
    return { group: g, total: items.length, done: gdone, time: gtime };
  });

  // This week
  const weekStart = offsetDate(today, -((new Date().getDay() + 6) % 7));
  const thisWeekDone = data.filter(i => i.completed && i.date >= weekStart).length;

  body.innerHTML = `
    <div class="stats-section">
      <div class="stats-section-label">// OVERVIEW</div>
      <div class="stats-grid">
        <div class="stat-block">
          <div class="stat-value">${done}</div>
          <div class="stat-label">Tasks Done</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${rate}%</div>
          <div class="stat-label">Completion Rate</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${activeDays}</div>
          <div class="stat-label">Days Active</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${thisWeekDone}</div>
          <div class="stat-label">Done This Week</div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stats-section-label">// STREAKS</div>
      <div class="stats-grid">
        <div class="stat-block stat-block--accent">
          <div class="stat-value">${currentStreak}</div>
          <div class="stat-label">Current Streak</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${bestStreak}</div>
          <div class="stat-label">Best Streak</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${formatMinutes(timeLogged) || '—'}</div>
          <div class="stat-label">Time Logged</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${bestDay ? bestDay[0].slice(0, 3).toUpperCase() : '—'}</div>
          <div class="stat-label">Best Day</div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stats-section-label">// BY GROUP</div>
      ${groupStats.map(g => `
        <div class="stat-group-row">
          <img src="images/icons/${GROUP_ICONS[g.group]}.png" class="group-icon" alt="">
          <span class="stat-group-name">${g.group}</span>
          <div class="stat-group-bar-wrap">
            <div class="stat-group-bar" style="width:${g.total > 0 ? Math.round((g.done/g.total)*100) : 0}%"></div>
          </div>
          <span class="stat-group-nums">${g.done}/${g.total}</span>
          ${g.time ? `<span class="stat-group-time">${formatMinutes(g.time)}</span>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function openStats() {
  document.getElementById('stats-overlay').classList.remove('hidden');
  document.getElementById('stats-drawer').classList.remove('hidden');
  loadStats();
}

function closeStats() {
  document.getElementById('stats-overlay').classList.add('hidden');
  document.getElementById('stats-drawer').classList.add('hidden');
}

// =====================
// ROUTER
// =====================
async function handleRoute() {
  const hash = location.hash;
  const postMatch = hash.match(/^#\/post\/(.+)$/);

  if (postMatch) {
    const slug = postMatch[1];
    const post = await loadPost(slug);
    if (post) {
      state.currentPost = post;
      renderPostDetail(post);
      showView('post', { slug, pushState: false });
    } else {
      showView('blog', { pushState: false });
    }
  } else {
    showView('blog', { pushState: false });
  }
}

window.addEventListener('popstate', handleRoute);

// =====================
// INIT
// =====================
async function init() {
  generateAsteroid();
  await initAuth();
  initEvents();
  initLightbox();
  initPasteUpload();
  await loadPosts();
  await handleRoute();
}

init();
