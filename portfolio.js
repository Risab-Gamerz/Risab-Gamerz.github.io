let beltLevel = 3;

// Preloader
window.addEventListener('load', function () {
  setTimeout(function () {
    document.querySelector('.preloader').classList.add('fade-out');
    setTimeout(function () {
      document.querySelector('.preloader').style.display = 'none';
    }, 600);
  }, 1000);
});

// Simple click sound with music.mp3
const clickSound = new Audio('button-click.mp3');

// Play sound on any click
document.addEventListener('click', function() {
  clickSound.currentTime = 0; // Restart from beginning if clicked multiple times
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
    menuBtn.classList.remove('active');
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
    if (targetId === '#') return;
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
if (ageElement) ageElement.textContent = calculateAge('2009-01-01');

// Set current year in footer
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Enhanced Particles.js Configuration
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
      value: ['#ff0000', '#ff4d4d', '#ff3333', '#ff6666']
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
      color: '#ff4444',
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
          color: '#ff6666'
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

// Scroll animations
const animateElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const animation = entry.target.dataset.animation || 'fade-in';
      entry.target.classList.add(animation);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(element => {
  observer.observe(element);
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function () {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});

// Karate belt active highlight (if beltLevel is defined)
if (typeof beltLevel !== 'undefined') {
  const beltLevels = document.querySelectorAll('.karate-level');
  for (let i = 0; i < beltLevel && i < beltLevels.length; i++) {
    beltLevels[i].classList.add('active');
  }
}