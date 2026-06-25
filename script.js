// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem('theme') || 'dark';

// Initialize theme on page load
function initializeTheme() {
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('light-theme');
        themeToggle.textContent = '🌙';
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const isLightTheme = body.classList.toggle('light-theme');
    
    if (isLightTheme) {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙';
    }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Smooth scroll behavior for anchor links (fallback for older browsers)
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

// Add active nav link styling based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Handle download button clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Check if this is a download button
        if (this.textContent.includes('⬇')) {
            // Placeholder - will be replaced with actual download links
            console.log('Download initiated for:', this.closest('.download-card')?.querySelector('h3')?.textContent);
        }
    });
});
