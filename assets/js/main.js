/**
 * GOURI SHANKAR REDDY - PORTFOLIO INTERACTIVITY
 * Clean, lightweight, modular JavaScript for smooth animations and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initSkillsFilter();
  initProjectModals();
  initCopyButtons();
  initContactForm();
  initResumeModal();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Navbar & Scroll Behavior
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section indicator
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link && scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Dynamic Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const roleElement = document.querySelector('.role-text');
  if (!roleElement) return;

  const roles = [
    'Java Backend Developer',
    'Oracle Certified Java SE 21 Pro',
    'Spring Boot & REST API Engineer',
    'Full-Stack Web Enthusiast',
    'FastAPI & MySQL Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Interactive Skills Filter
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Project Details Modals
   -------------------------------------------------------------------------- */
const projectData = {
  collegeData: {
    title: 'College Data Management System',
    category: 'Backend Architecture & Database Engineering',
    tags: ['FastAPI', 'MySQL', 'RESTful APIs', 'Python', 'Pydantic', 'Relational DB'],
    githubUrl: 'https://github.com/shankarreddy1438',
    summary: 'A robust, high-performance academic management backend designed to streamline administration of students, faculty, courses, departments, and semester enrollments.',
    architecture: [
      '**Backend Framework:** FastAPI with asynchronous request handling for lightweight and high-throughput execution.',
      '**Database Tier:** MySQL relational database designed with 3NF normalization, foreign key cascades, and composite indexing on student IDs and course codes.',
      '**Data Validation & Serialization:** Pydantic schemas enforcing strict input sanitization, type safety, and automatic documentation via OpenAPI/Swagger.',
      '**CRUD Operations:** Modular endpoints for student lifecycle tracking, professor-course assignments, and prerequisite verification before course registration.'
    ],
    features: [
      'Automated enrollment verification preventing double bookings and capacity overflows.',
      'Comprehensive error handling with consistent JSON status responses for 400, 404, and 500 scenarios.',
      'Query optimization for instant retrieval of enrolled cohorts and departmental summaries.',
      'Extensible design ready for JWT authentication and role-based access control (Admin, Faculty, Student).'
    ]
  },
  mockInterview: {
    title: 'Mock Interview Test Portal with Compiler',
    category: 'Full-Stack Web Application & Educational Platform',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Compiler Subprocess', 'Agile'],
    githubUrl: 'https://github.com/shankarreddy1438',
    summary: 'An all-in-one interview readiness platform combining rigorous technical MCQ assessments with an integrated live browser-based code compiler for C, C++, and Python.',
    architecture: [
      '**Server Backend:** PHP 8.x with modular MVC structure handling auth, test state, and compilation pipelines.',
      '**Database Architecture:** MySQL database storing user credentials, question banks, category tags, session tokens, and historical test evaluations.',
      '**Compiler Subprocess:** Sandboxed script execution for compiling and running C, C++, and Python code with input stream piping and timeout watchdogs.',
      '**Frontend Experience:** Vanilla JavaScript client with interactive code editor, real-time output terminal, dynamic countdown timer, and auto-submit.'
    ],
    features: [
      'User authentication with session-based security and password hashing.',
      'Timed assessment mode simulating actual company technical rounds.',
      'Automated grading engine calculating instantaneous scores and category-wise performance breakdown.',
      'Historical performance analytics highlighting areas requiring practice.'
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const detailButtons = document.querySelectorAll('[data-project-target]');

  if (!modalOverlay) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetKey = btn.getAttribute('data-project-target');
      const data = projectData[targetKey];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalContent.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
          ${data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.7; margin-bottom: 20px;">
          ${data.summary}
        </p>

        <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--cyan);">⚡</span> Architecture & Technical Implementation
        </h4>
        <ul style="list-style: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; color: #cbd5e1; font-size: 0.925rem; margin-bottom: 24px;">
          ${data.architecture.map(item => `<li>${item.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>')}</li>`).join('')}
        </ul>

        <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--emerald);">✓</span> Key Engineering Highlights
        </h4>
        <ul style="list-style: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; color: #cbd5e1; font-size: 0.925rem; margin-bottom: 28px;">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 14px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>View on GitHub</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeProjectModal()">Close</button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  window.closeProjectModal = function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeProjectModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Copy to Clipboard with Toast Notification
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard!';

      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`✓ ${label}`);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`✓ ${label}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* --------------------------------------------------------------------------
   6. Contact Form Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim() || 'Portfolio Inquiry';
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    // Compose mailto link
    const mailtoUrl = `mailto:gowrisankarreddy@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\nMessage:\n' + message)}`;

    showToast('✉️ Opening email client...');
    window.location.href = mailtoUrl;

    form.reset();
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Resume Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const openButtons = document.querySelectorAll('[data-open-resume]');
  const closeBtn = document.getElementById('resumeClose');
  const printBtn = document.getElementById('resumePrintBtn');

  if (!resumeModal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  window.closeResumeModal = function() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeResumeModal);
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   8. Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
