/* ============================================================
   Portfolio — client-side behaviour (Astro bundled module)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initScrollReveal();
  initProjectFilter();
  initBackToTop();
  initContactForm();
});

/* ---------- Theme toggle (dark mode) ---------- */
function initThemeToggle(): void {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const icon = toggle.querySelector('i');
  const syncIcon = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (icon) {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    toggle.setAttribute('aria-pressed', String(isDark));
  };
  syncIcon();

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      /* storage unavailable — ignore */
    }
    syncIcon();
  });
}

/* ---------- Mobile navigation ---------- */
function initMobileNav(): void {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (!navToggle || !navMenu) return;

  const close = () => navMenu.classList.remove('active');
  const open = () => navMenu.classList.add('active');

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.contains('active') ? close() : open();
  });

  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navMenu.classList.contains('active') ? close() : open();
    }
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target as Node) && !navToggle.contains(e.target as Node)) {
      close();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) close();
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Project filtering ---------- */
function initProjectFilter(): void {
  const filters = document.getElementById('projectFilters');
  const grid = document.getElementById('projectsGrid');
  if (!filters || !grid) return;

  const cards = Array.from(grid.querySelectorAll<HTMLElement>('.project-card'));
  const noResults = document.getElementById('noResults');

  filters.querySelectorAll<HTMLButtonElement>('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter ?? 'all';
      filters
        .querySelectorAll('.filter-btn')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      let visible = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      if (noResults) noResults.hidden = visible > 0;
    });
  });
}

/* ---------- Back to top ---------- */
function initBackToTop(): void {
  const button = document.createElement('button');
  button.id = 'backToTop';
  button.setAttribute('aria-label', 'Back to top');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: '999',
  } as CSSStyleDeclaration);
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const onScroll = () => {
    const show = window.pageYOffset > 300;
    button.style.opacity = show ? '1' : '0';
    button.style.visibility = show ? 'visible' : 'hidden';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Contact form ---------- */
function initContactForm(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    /* NOTE: This template only validates client-side. To actually receive
       messages, POST to a service (e.g. Formspree/Web3Forms) here, or wire a
       backend endpoint. Example:
         await fetch('https://formspree.io/f/your-id', {
           method: 'POST', body: new FormData(form)
         }); */
    showAlert('Thank you! Your message has been sent successfully.', 'success');
    form.reset();
  });
}

/* ---------- Alert helper ---------- */
function showAlert(message: string, type: 'error' | 'success'): void {
  const existing = document.querySelector('.alert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  Object.assign(alert.style, {
    position: 'fixed',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '1rem 2rem',
    borderRadius: '5px',
    color: '#fff',
    fontWeight: '500',
    zIndex: '2000',
    animation: 'fadeIn 0.3s ease',
    backgroundColor: type === 'error' ? '#e74c3c' : '#27ae60',
  } as CSSStyleDeclaration);
  alert.textContent = message;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.opacity = '0';
    alert.style.transition = 'opacity 0.5s ease';
    setTimeout(() => alert.remove(), 500);
  }, 3000);
}
