// Karate belt level (3 = Yellow Stripe - White, Yellow, Yellow Stripe active)
let beltLevel = 3;

// Preloader
window.addEventListener('load', function () {
  setTimeout(function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(function () {
        preloader.style.display = 'none';
      }, 600);
    }
  }, 1000);
});

const clickSound = new Audio('button-click.mp3');
document.addEventListener('click', function() {
  clickSound.currentTime = 0;
  clickSound.play().catch(e => console.log('Audio play failed:', e));
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
  });
});

// Sticky Header
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 100);
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', function () {
  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Calculate age
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

const ageElement = document.getElementById('age');
if (ageElement) ageElement.textContent = calculateAge('2009-04-03'); // Updated to match original (2010)

// Set current year in footer
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Updated Particles.js Configuration - BLUE THEME
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#0066ff', '#3385ff', '#00aaff', '#00d4ff']
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.2,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: '#0066ff',
        opacity: 0.25,
        width: 1.2
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'bounce',
        bounce: true,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 600
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.8,
            color: '#3385ff'
          }
        },
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 3
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true,
    background: {
      color: 'transparent'
    }
  });
}

// Scroll animations
const animateElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Get animation class from data attribute or default to fade-in
      const animationClass = entry.target.classList.contains('fade-in') ? 'fade-in' :
                            (entry.target.classList.contains('slide-in-left') ? 'slide-in-left' :
                            (entry.target.classList.contains('slide-in-right') ? 'slide-in-right' : 'fade-in'));
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function () {
  let current = '';
  const scrollPos = pageYOffset + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});

// Karate belt active highlight
function updateKarateBelt(level) {
  const beltLevels = document.querySelectorAll('.karate-level');
  // First remove all active classes
  beltLevels.forEach(belt => belt.classList.remove('active'));
  // Add active class up to the current level (index 0-based)
  for (let i = 0; i < level && i < beltLevels.length; i++) {
    beltLevels[i].classList.add('active');
  }
}

// Initialize karate belt display
if (typeof beltLevel !== 'undefined') {
  updateKarateBelt(beltLevel);
}

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      // Trigger reflow to restart animation
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Dynamic year update for copyright
const copyrightYear = document.getElementById('year');
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

// Initial load complete - ensure animations trigger
document.addEventListener('DOMContentLoaded', function() {
  // Trigger any initial animations
  setTimeout(() => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.style.opacity = '1';
  }, 100);
});

// Fix for any missing back-to-top functionality
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Preloader fallback - ensure it disappears even if something fails
setTimeout(function() {
  const preloader = document.querySelector('.preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 600);
  }
}, 3000);