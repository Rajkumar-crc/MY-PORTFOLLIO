// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Project Modal
const modal = document.getElementById('project-modal');
const viewButtons = document.querySelectorAll('.view-project');
const closeModal = document.querySelector('.close-modal');

// Sample project data (replace with your actual projects)
const projects = {
    1: {
        title: 'Project 1',
        description: 'A detailed description of Project 1. This project demonstrates my skills in web development and design.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        image: 'https://via.placeholder.com/800x400',
        link: '#'
    },
    2: {
        title: 'Project 2',
        description: 'A detailed description of Project 2. This project showcases my ability to create interactive web applications.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        image: 'https://via.placeholder.com/800x400',
        link: '#'
    }
};

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projects[projectId];
        
        const modalContent = `
            <h2>${project.title}</h2>
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <p>${project.description}</p>
            <h3>Technologies Used:</h3>
            <ul>
                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
            <a href="${project.link}" class="cta-button" target="_blank">Visit Project</a>
        `;
        
        document.querySelector('.modal-body').innerHTML = modalContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    contactForm.reset();
});

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add hover effect to certification cards
document.querySelectorAll('.certification-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add scroll-based navbar background change
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(30, 30, 46, 0.95)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        if (body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(30, 30, 46, 0.8)';
        }
    }
});

// === Solar System Motion Graphic for Services Section ===
(function() {
  const canvas = document.getElementById('solarSystem');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const planets = [
    { r: 40, orbit: 0, speed: 0.01, color: '#FFD700', size: 18 }, // Sun
    { r: 80, orbit: Math.random()*Math.PI*2, speed: 0.018, color: '#b0b0b0', size: 4 }, // Mercury
    { r: 110, orbit: Math.random()*Math.PI*2, speed: 0.014, color: '#e6c200', size: 6 }, // Venus
    { r: 150, orbit: Math.random()*Math.PI*2, speed: 0.012, color: '#3fa7d6', size: 7 }, // Earth
    { r: 190, orbit: Math.random()*Math.PI*2, speed: 0.010, color: '#e07a5f', size: 6 }, // Mars
    { r: 250, orbit: Math.random()*Math.PI*2, speed: 0.008, color: '#f4d35e', size: 12 }, // Jupiter
    { r: 320, orbit: Math.random()*Math.PI*2, speed: 0.006, color: '#b5ead7', size: 10 }, // Saturn
    { r: 390, orbit: Math.random()*Math.PI*2, speed: 0.004, color: '#5f4b8b', size: 8 }, // Uranus
    { r: 450, orbit: Math.random()*Math.PI*2, speed: 0.002, color: '#577590', size: 8 }, // Neptune
  ];

  function drawStars() {
    for (let i = 0; i < 120; i++) {
      ctx.save();
      ctx.globalAlpha = Math.random() * 0.5 + 0.2;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.2 + 0.2, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    drawStars();

    // Sun
    ctx.save();
    ctx.beginPath();
    ctx.arc(w/2, h/2, planets[0].size, 0, 2 * Math.PI);
    ctx.fillStyle = planets[0].color;
    ctx.shadowColor = planets[0].color;
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.restore();

    // Planets
    for (let i = 1; i < planets.length; i++) {
      const p = planets[i];
      p.orbit += p.speed;
      const x = w/2 + Math.cos(p.orbit) * p.r;
      const y = h/2 + Math.sin(p.orbit) * p.r;

      // Orbit path
      ctx.save();
      ctx.beginPath();
      ctx.arc(w/2, h/2, p.r, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Planet
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// === Realistic Hero Motion Graphic (Particles/Light) ===
(function() {
  const canvas = document.getElementById('heroMotionCanvas');
  if (!canvas) return;
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  // Particle system
  const particles = Array.from({length: 18}, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 38 + 32,
    color: [
      'rgba(13,148,136,0.13)',
      'rgba(34,197,94,0.11)',
      'rgba(255,255,255,0.09)',
      'rgba(13,148,136,0.18)'
    ][i % 4],
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    pulse: Math.random() * Math.PI * 2
  }));

  function drawParticles() {
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      p.pulse += 0.01 + Math.random() * 0.01;
      const pr = p.r + Math.sin(p.pulse) * 8;
      if (p.x < -pr) p.x = w + pr;
      if (p.x > w + pr) p.x = -pr;
      if (p.y < -pr) p.y = h + pr;
      if (p.y > h + pr) p.y = -pr;
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, pr, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 32;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.restore();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    drawParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

// === Dotted Weavy Animation for Contact Section ===
(function() {
  const canvas = document.getElementById('contactDotsCanvas');
  if (!canvas) return;
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = canvas.parentElement.offsetHeight || 400;
  const ctx = canvas.getContext('2d');

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = canvas.parentElement.offsetHeight || 400;
  }
  window.addEventListener('resize', resize);

  const dotRows = 7;
  const dotCols = 18;
  const dotGapX = w / (dotCols + 1);
  const dotGapY = h / (dotRows + 1);
  const dots = [];
  for (let r = 0; r < dotRows; r++) {
    for (let c = 0; c < dotCols; c++) {
      dots.push({
        baseX: (c + 1) * dotGapX,
        baseY: (r + 1) * dotGapY,
        phase: Math.random() * Math.PI * 2,
        color: [
          '#0d9488', '#22c55e', '#fff', '#0f172a'
        ][(r + c) % 4],
        radius: Math.random() * 1.2 + 1.2
      });
    }
  }

  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, w, h);
    t += 0.012;
    for (const dot of dots) {
      const wave = Math.sin(t * 1.2 + dot.phase + dot.baseX * 0.01) * 12 + Math.cos(t * 0.8 + dot.phase + dot.baseY * 0.01) * 8;
      ctx.save();
      ctx.beginPath();
      ctx.arc(dot.baseX, dot.baseY + wave, dot.radius, 0, 2 * Math.PI);
      ctx.fillStyle = dot.color;
      ctx.globalAlpha = 0.7;
      ctx.shadowColor = dot.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// === Particle Animation for Contact Section ===
(function() {
  const canvas = document.getElementById('contactParticles');
  if (!canvas) return;
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = canvas.parentElement.offsetHeight || 400;
  const ctx = canvas.getContext('2d');

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = canvas.parentElement.offsetHeight || 400;
  }
  window.addEventListener('resize', resize);

  const colors = [
    'rgba(13,148,136,0.7)', // teal
    'rgba(34,197,94,0.7)',  // green
    'rgba(255,255,255,0.7)', // white
    'rgba(15,23,42,0.7)'    // dark accent
  ];
  const particles = Array.from({length: 28}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.8 + 1.7,
    color: colors[Math.floor(Math.random() * colors.length)],
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    pulse: Math.random() * Math.PI * 2
  }));

  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, w, h);
    t += 0.012;
    for (const p of particles) {
      p.x += p.dx + Math.sin(t + p.pulse) * 0.08;
      p.y += p.dy + Math.cos(t + p.pulse) * 0.08;
      p.pulse += 0.008 + Math.random() * 0.01;
      if (p.x < -p.r) p.x = w + p.r;
      if (p.x > w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
      if (p.y > h + p.r) p.y = -p.r;
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + Math.sin(p.pulse) * 0.7, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(animate);
  }
  animate();
})(); 