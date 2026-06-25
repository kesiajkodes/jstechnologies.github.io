// Smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Light/dark theme toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'jstech-theme';

function applyTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', theme === 'light');
    }
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
    });
}

// Sticky top bar elevation on scroll
const topbar = document.getElementById('topbar');
if (topbar) {
    const updateTopbar = () => topbar.classList.toggle('scrolled', window.scrollY > 8);
    updateTopbar();
    window.addEventListener('scroll', updateTopbar, { passive: true });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fade/slide elements in as they enter the viewport
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => revealObserver.observe(el));
    }
}

// Highlight the nav link for the section currently in view
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (navLinks.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-40% 0px -50% 0px' });

    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) navObserver.observe(section);
    });
}
