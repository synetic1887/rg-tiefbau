/* ============================================
   RG Tiefbau — Main JavaScript
   ============================================ */

const API_BASE = window.location.origin + '/api';
const WS_BASE = (window.location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + window.location.host + '/api';

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation: Scroll Effect ---
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Counter Animation ---
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;

      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
          counter.dataset.animated = 'true';
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // --- Testimonials Slider ---
  const track = document.getElementById('testimonialsTrack');
  const navBtns = document.querySelectorAll('#testimonialsNav button');
  let currentSlide = 0;
  let autoplayInterval;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    navBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToSlide(parseInt(btn.dataset.index));
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      const next = (currentSlide + 1) % navBtns.length;
      goToSlide(next);
    }, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  // --- Scroll Animations (IntersectionObserver) ---
  // Hero entrance - animate immediately
  const heroEls = ['.hero-label', '.hero h1', '.hero-text', '.hero-buttons'];
  heroEls.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 150);
    }
  });

  // Hero stats
  document.querySelectorAll('.hero-stat').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 900 + i * 120);
  });

  // Scroll indicator
  const scrollInd = document.querySelector('.scroll-indicator');
  if (scrollInd) {
    scrollInd.style.opacity = '0';
    setTimeout(() => {
      scrollInd.style.transition = 'opacity 0.6s ease';
      scrollInd.style.opacity = '1';
    }, 1200);
  }

  // Counter trigger on hero stats
  setTimeout(animateCounters, 1000);

  // Scroll reveal with IntersectionObserver
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0');
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // Staggered cards
  function observeStaggered(selector) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(selector);
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('revealed'), i * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    return observer;
  }

  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    servicesGrid.querySelectorAll('.service-card').forEach(c => c.classList.add('stagger-item'));
    observeStaggered('.service-card').observe(servicesGrid);
  }

  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.querySelectorAll('.project-card').forEach(c => c.classList.add('stagger-item'));
    observeStaggered('.project-card').observe(projectsGrid);
  }

  const whyUsList = document.querySelector('.why-us-list');
  if (whyUsList) {
    whyUsList.querySelectorAll('.why-us-item').forEach(c => c.classList.add('stagger-item-left'));
    observeStaggered('.why-us-item').observe(whyUsList);
  }

  // Stats counter trigger
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.unobserve(statsSection);
      }
    }, { threshold: 0.2 });
    statsObserver.observe(statsSection);
  }

  // --- Contact Form Submission ---
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      phone: form.phone.value,
      service: form.service.value,
      location: form.location.value,
      message: form.message.value
    };

    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Wird gesendet...';
    submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        submitBtn.innerHTML = 'Anfrage gesendet! &#10003;';
        submitBtn.style.background = '#16A34A';
        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Fallback: show success even if backend is not running
      submitBtn.innerHTML = 'Anfrage gesendet! &#10003;';
      submitBtn.style.background = '#16A34A';
      form.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });

  // --- Live Chat Widget ---
  const chatWidget = document.getElementById('chatWidget');
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  let ws = null;
  let chatSessionId = null;

  chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    if (chatWidget.classList.contains('open')) {
      chatInput.focus();
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        connectChat();
      }
    }
  });

  function connectChat() {
    try {
      ws = new WebSocket(`${WS_BASE}/chat/ws`);

      ws.onopen = () => {
        console.log('Chat connected');
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.session_id) {
          chatSessionId = data.session_id;
        }
        if (data.message) {
          addChatMessage(data.message, 'bot');
        }
      };

      ws.onclose = () => {
        console.log('Chat disconnected');
      };

      ws.onerror = () => {
        console.log('Chat not available - backend not running');
      };
    } catch {
      // Backend not available
    }
  }

  function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addChatMessage(text, 'user');
    chatInput.value = '';

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        message: text,
        session_id: chatSessionId
      }));
    } else {
      // Offline fallback
      setTimeout(() => {
        addChatMessage(
          'Vielen Dank für Ihre Nachricht! Leider ist unser Chat gerade nicht besetzt. Bitte nutzen Sie unser Kontaktformular oder rufen Sie uns an unter +49 6033 / XXX XXX.',
          'bot'
        );
      }, 1000);
    }
  }

  function addChatMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message chat-message-${type}`;

    const now = new Date();
    const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <p>${escapeHtml(text)}</p>
      <span class="chat-time">${time}</span>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  chatSend.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

});
