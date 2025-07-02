// ===== THEME TOGGLE FUNCTIONALITY =====
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = this.themeToggle.querySelector('i');
    this.init();
  }

  init() {
    // Load saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    
    // Add event listener for theme toggle
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    if (theme === 'dark') {
      this.themeIcon.className = 'fas fa-sun';
    } else {
      this.themeIcon.className = 'fas fa-moon';
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// ===== SCROLL REVEAL ANIMATIONS =====
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in');
    this.observer = null;
    this.init();
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    // Observe all fade-in elements
    this.elements.forEach((element, index) => {
      element.style.setProperty('--delay', `${index * 0.1}s`);
      this.observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once element is visible
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ===== NAVIGATION FUNCTIONALITY =====
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.sections = document.querySelectorAll('section[id]');
    
    this.init();
  }

  init() {
    // Handle smooth scrolling
    this.setupSmoothScrolling();
    
    // Handle active nav link highlighting
    this.setupActiveNavigation();
    
    // Handle hamburger menu (mobile)
    this.setupMobileMenu();
    
    // Handle navbar background on scroll
    this.setupNavbarScroll();
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupActiveNavigation() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 100;

      this.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Remove active class from all links
          this.navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to current section link
          const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    });
  }

  setupMobileMenu() {
    this.hamburger.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
      });
    });
  }

  setupNavbarScroll() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove scrolled class for styling
      if (scrollTop > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  }
}

// ===== CONTACT FORM FUNCTIONALITY =====
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (this.validateForm(data)) {
      this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
      this.form.reset();
    } else {
      this.showMessage('Please fill in all required fields.', 'error');
    }
  }

  validateForm(data) {
    return data.name && data.email && data.subject && data.message;
  }

  showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    // Add to form
    this.form.appendChild(messageEl);
    
    // Fade in
    setTimeout(() => messageEl.style.opacity = '1', 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
      messageEl.style.opacity = '0';
      setTimeout(() => messageEl.remove(), 300);
    }, 5000);
  }
}

// ===== TYPING ANIMATION =====
class TypingAnimation {
  constructor() {
    this.element = document.querySelector('.hero-subtitle');
    this.texts = [
      'Full-Stack Developer & UI/UX Enthusiast',
      'Frontend Developer & React Specialist',
      'Backend Developer & API Expert',
      'Mobile App Developer & Cross-Platform Expert'
    ];
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.typeSpeed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 2000;
    
    if (this.element) {
      this.init();
    }
  }

  init() {
    setTimeout(() => this.type(), 1000);
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===== PARTICLE BACKGROUND =====
class ParticleBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.animate();
    this.handleResize();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.1;
    `;
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  createParticles() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-color');
      this.ctx.fill();
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particles = [];
      this.createParticles();
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  new ThemeManager();
  new ScrollReveal();
  new Navigation();
  new ContactForm();
  new TypingAnimation();
  
  // Initialize particle background (optional - can be resource intensive)
  // Uncomment the line below if you want particle background
  // new ParticleBackground();
  
  // Add loading animation
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }, 1000);
  }
  
  // Prevent FOUC (Flash of Unstyled Content)
  document.body.style.visibility = 'visible';
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Preload critical resources
function preloadCriticalResources() {
  const criticalImages = [
    'assets/imgs/profile-placeholder.jpg',
    'assets/imgs/about-placeholder.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}