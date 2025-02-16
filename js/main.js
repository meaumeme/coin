// Mobile Menu Toggle with animation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('show');
    mobileMenuBtn.innerHTML = isMenuOpen ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-container')) {
        isMenuOpen = false;
        navLinks.classList.remove('show');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Enhanced Smooth Scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768 && isMenuOpen) {
                isMenuOpen = false;
                navLinks.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Enhanced Newsletter Form with validation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (validateEmail(email)) {
            // Success animation
            emailInput.style.borderColor = '#4ECDC4';
            showToast('Thanks for subscribing! 🎉');
            newsletterForm.reset();
        } else {
            // Error animation
            emailInput.style.borderColor = '#FF6B6B';
            showToast('Please enter a valid email 📧');
        }
    });
}

// Email validation helper
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Toast notification system
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after animation
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Enhanced animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .timeline-item, .token-detail, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
document.querySelectorAll('.feature-card, .timeline-item, .token-detail, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Scroll event listener with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            animateOnScroll();
            scrollTimeout = null;
        }, 50);
    }
});

// Back to Top Button with smooth animation
const backToTopButton = document.getElementById('backToTop');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initial check for elements in view
animateOnScroll();

// Particle Effect for Hero Section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', `${Math.random() * 100}%`);
        particle.style.setProperty('--y', `${Math.random() * 100}%`);
        particle.style.setProperty('--duration', `${Math.random() * 20 + 10}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        hero.appendChild(particle);
    }
}

// Enhanced scroll animations with intersection observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('stat-item')) {
                startCountAnimation(entry.target);
            }
        }
    });
}, observerOptions);

// Animate numbers in stats
function startCountAnimation(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement || numberElement.dataset.animated === 'true') return;
    
    const finalNumber = parseInt(numberElement.dataset.value) || 0;
    const duration = 2000;
    const steps = 60;
    const increment = finalNumber / steps;
    let currentNumber = 0;
    
    numberElement.dataset.animated = 'true';
    
    const updateNumber = () => {
        currentNumber = Math.min(currentNumber + increment, finalNumber);
        numberElement.textContent = Math.round(currentNumber).toLocaleString();
        
        if (currentNumber < finalNumber) {
            requestAnimationFrame(updateNumber);
        }
    };
    
    updateNumber();
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .timeline-item, .token-detail, .stat-item').forEach(element => {
        observer.observe(element);
    });
    
    // Enhanced hover effects for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
