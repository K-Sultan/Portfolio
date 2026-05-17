// ── Typed Text Effect ──────────────────────────────────────────
const strings = ["Backend-focused developer", "RESTful API architect", "Full-Stack systems builder"];
const typeElement = document.querySelector('.type-text');
let stringIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const current = strings[stringIndex];
    typeElement.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

    isDeleting ? charIndex-- : charIndex++;

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}
document.addEventListener('DOMContentLoaded', typeEffect);

// ── Scroll Progress Bar ────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
}

// ── Reveal on Scroll ───────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

// ── Active Nav Link on Scroll ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ── Header scroll style ────────────────────────────────────────
const header = document.getElementById('header');

function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
}

// ── Back to Top button ─────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Consolidated scroll handler ────────────────────────────────
window.addEventListener('scroll', () => {
    updateScrollProgress();
    revealOnScroll();
    updateActiveNav();
    updateHeader();
    updateBackToTop();
}, { passive: true });

revealOnScroll();
updateActiveNav();

// ── Mobile Menu ────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksEl = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
    navLinksEl.classList.remove('active');
    navOverlay.classList.remove('active');
    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('active');
    navOverlay.classList.toggle('active', isOpen);
    mobileMenuBtn.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navOverlay.addEventListener('click', closeMenu);

navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

mobileMenuBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') mobileMenuBtn.click();
});

// ── Particles ─────────────────────────────────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particlesArray = [];

function initParticles() {
    particlesArray = [];
    const count = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < count; i++) particlesArray.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resizeCanvas(); initParticles(); }, 150);
}, { passive: true });

// ── Copy Email with Toast ──────────────────────────────────────
function copyEmail() {
    const email = 'kareemhanysultan2004@gmail.com';

    // Create toast if not present
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = '✓ Email copied to clipboard!';
        document.body.appendChild(toast);
    }

    navigator.clipboard.writeText(email).then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }).catch(() => {
        // Fallback for older browsers
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    });
}

// ── Page fade in ───────────────────────────────────────────────
document.body.style.opacity = 0;
window.addEventListener('load', () => {
    document.body.style.transition = '0.5s';
    document.body.style.opacity = 1;
});
