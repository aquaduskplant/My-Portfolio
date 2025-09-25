(function () {
  const container = document.getElementById('theme-container');
  const btn = document.getElementById('toggle');
  const btn1 = document.getElementById('toggle1');
  const sun = document.querySelector('.sun');
  const moon = document.querySelector('.moon');
  const KEY = 'pref-theme';

  // Load saved preference
  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') {
    container.setAttribute('data-theme', saved);
  }

  function syncLabel() {
    const isDark = container.getAttribute('data-theme') === 'dark';
    if (isDark) {
      sun.style.display = 'none';
      moon.style.display = 'inline-block';
    } else {
      sun.style.display = 'inline-block';
      moon.style.display = 'none';
    }
  }

  function toggleTheme() {
    const next = container.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    container.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
    syncLabel();
  }

  syncLabel();
  btn.addEventListener('click', toggleTheme);
  btn1.addEventListener('click', toggleTheme);
})();



//edit button
(function () {
  const titleEl = document.querySelector('.right-con h1');
  const editBtn = document.getElementById('editTitle');

  if (!titleEl || !editBtn) return;

  function enableEditing() {
    titleEl.setAttribute('contenteditable', 'true');
    titleEl.focus();
    editBtn.textContent = 'Save';
    editBtn.setAttribute('aria-pressed', 'true');
  }

  function disableEditing() {
    titleEl.setAttribute('contenteditable', 'false');
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('aria-pressed', 'false');
  }

  function toggleEditing() {
    const isEditing = titleEl.getAttribute('contenteditable') === 'true';
    if (isEditing) {
      disableEditing();
    } else {
      enableEditing();
    }
  }

  editBtn.addEventListener('click', toggleEditing);

  // optional: pressing Escape exits editing without saving
  titleEl.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && titleEl.getAttribute('contenteditable') === 'true') {
      e.preventDefault();
      disableEditing();
    }
  });
})();

//mobile toggle

// Drawer menu (mobile only)
(function () {
  const navToggle   = document.getElementById('navToggle');
  const navClose    = document.getElementById('navClose');
  const navBackdrop = document.getElementById('navBackdrop');
  const nav         = document.getElementById('primaryNav') || document.querySelector('.links');

  if (!navToggle || !nav || !navBackdrop || !navClose) return;

  const openMenu = () => {
    nav.classList.add('open');
    navBackdrop.hidden = false;
  };
  const closeMenu = () => {
    nav.classList.remove('open');
    navBackdrop.hidden = true;
  };

  navToggle.addEventListener('click', openMenu);
  navClose.addEventListener('click', closeMenu);
  navBackdrop.addEventListener('click', closeMenu);

  // close when clicking a nav link (mobile)
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });
})();
