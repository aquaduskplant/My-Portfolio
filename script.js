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

// ---------- Smooth anchor scroll with exact header offset ----------
(function () {
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.links a[href^="#"]');

  // keep a CSS var in sync with current header height
  function setOffsetVar() {
    if (!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-offset', (h + 16) + 'px');
  }
  setOffsetVar();
  window.addEventListener('resize', setOffsetVar);

  // intercept clicks for buttery anchor scroll + precise offset
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const h = header ? header.getBoundingClientRect().height : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - h - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

// ---------- Minimal reveal-on-scroll ----------
(function () {
  const candidates = [
    document.querySelector('.right-con'),
    document.querySelector('.left-con img'),
    ...document.querySelectorAll('.subcontainer > div'),
    ...document.querySelectorAll('.certificate-series img'),
    document.querySelector('.contactme'),
    document.querySelector('.info')
  ].filter(Boolean);

  candidates.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add('show');
    }
  }, { threshold: 0.12 });

  candidates.forEach(el => io.observe(el));
})();



// ---------- Typing animation ----------
(function () {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const roles = [
    "I'm an Affiliate Marketer",
    "I'm a Project Manager"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let typing = true;

  function type() {
    const current = roles[roleIndex];
    
    if (typing) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        typing = false;
        setTimeout(type, 1200); 
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        typing = true;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(type, typing ? 100 : 60); 
  }

  type();
})();

