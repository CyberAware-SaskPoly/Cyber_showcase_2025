// Enhanced CyberAware Website JavaScript with Mobile Optimization

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
});

// Enhanced Mobile burger menu toggle with proper ARIA and background
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-navigation');

  if (!toggle || !menu) return;

  const navLinks = menu.querySelectorAll('a');

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    // Prevent body scroll when menu is open on mobile
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    }
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking a link
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !toggle.contains(e.target) && 
        !menu.contains(e.target) && 
        menu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Reset menu state on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});

// Initialize Swiper Carousel - Without navigation buttons
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Swiper !== 'undefined') {
    const infoSwiper = new Swiper('.info-carousel', {
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // Removed navigation completely
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 40
        }
      }
    });
  }
});

// Password Strength Checker
function checkPasswordStrength() {
  const password = document.getElementById('passwordInput').value;
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  let score = 0;
  let feedback = '';

  if (password.length === 0) {
    score = 0;
    feedback = 'Enter a password';
  } else if (password.length < 6) {
    score = 1;
    feedback = 'Very Weak - Too short';
  } else {
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (/123|abc|password|qwerty/i.test(password)) score -= 1;

    if (score <= 2) feedback = 'Weak - Add more variety';
    else if (score <= 4) feedback = 'Fair - Getting better';
    else if (score <= 5) feedback = 'Good - Almost there';
    else feedback = 'Strong - Excellent!';
  }

  const percentage = Math.min((score / 6) * 100, 100);
  strengthBar.style.width = percentage + '%';

  if (score <= 2) {
    strengthBar.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
  } else if (score <= 4) {
    strengthBar.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
  } else {
    strengthBar.style.background = 'linear-gradient(45deg, #10b981, #059669)';
  }

  strengthText.textContent = feedback;
}

// Listen for password input
document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('passwordInput');
  if (passwordInput) {
    passwordInput.addEventListener('input', checkPasswordStrength);
  }
});

// Toggle password visibility
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('passwordInput');
  const eyeIcon = document.getElementById('eyeIcon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.className = 'fas fa-eye-slash';
  } else {
    passwordInput.type = 'password';
    eyeIcon.className = 'fas fa-eye';
  }
}

// Email Examples
function showEmail(type) {
  const emailDisplay = document.getElementById('emailDisplay');

  if (type === 'legit') {
    emailDisplay.innerHTML = `
      <div style="border: 2px solid #10b981; padding: 1rem; border-radius: 10px; background: rgba(16, 185, 129, 0.1);">
        <div style="margin-bottom: 1rem;">
          <strong>From:</strong> notifications@yourbank.com<br>
          <strong>Subject:</strong> Monthly Statement Available
        </div>
        <div>
          <p>Dear Customer,</p>
          <p>Your monthly statement for account ending in 1234 is now available in your online banking.</p>
          <p>To view your statement, please log in through our official website.</p>
          <p>Thank you for banking with us.</p>
          <p>Customer Service Team</p>
        </div>
        <div style="margin-top: 1rem; color: #10b981; font-weight: bold;">
          ✅ LEGITIMATE - Official domain, no urgent action required
        </div>
      </div>
    `;
  } else if (type === 'phishing') {
    emailDisplay.innerHTML = `
      <div style="border: 2px solid #ef4444; padding: 1rem; border-radius: 10px; background: rgba(239, 68, 68, 0.1);">
        <div style="margin-bottom: 1rem;">
          <strong>From:</strong> security-alert@banksupport-verify.com<br>
          <strong>Subject:</strong> URGENT: Account Suspended - Verify Now!
        </div>
        <div>
          <p>ATTENTION!</p>
          <p>Your account has been temporarily suspended due to suspicious activity. You have 24 hours to verify your information or your account will be permanently closed.</p>
          <p><a href="#" style="color: #ef4444;">CLICK HERE TO VERIFY NOW</a></p>
          <p>Provide your username, password, and SSN to restore access.</p>
        </div>
        <div style="margin-top: 1rem; color: #ef4444; font-weight: bold;">
          🚨 PHISHING - Suspicious domain, urgent language, requests sensitive info
        </div>
      </div>
    `;
  }
}

// Security Score Calculator
let securityScore = 0;
let currentSecurityQuestion = 0;

const securityQuestions = [
  { 
    question: "Do you use two-factor authentication on your important accounts?", 
    options: ["Always","Sometimes","Never"], 
    scores: [2,1,0] 
  },
  { 
    question: "How often do you update your passwords?", 
    options: ["Every 3 months","Once a year","Never"], 
    scores: [2,1,0] 
  },
  { 
    question: "Do you use the same password for multiple accounts?", 
    options: ["Never","Sometimes","Always"], 
    scores: [2,1,0] 
  },
  { 
    question: "How do you handle suspicious emails?", 
    options: ["Delete immediately","Check sender first","Click to investigate"], 
    scores: [2,1,0] 
  },
  { 
    question: "Do you keep your software updated?", 
    options: ["Automatic updates","Update monthly","Only when problems occur"], 
    scores: [2,1,0] 
  }
];

function updateSecurityScore(points) {
  securityScore += points;
  currentSecurityQuestion++;
  if (currentSecurityQuestion < securityQuestions.length) {
    showNextSecurityQuestion();
  } else {
    showSecurityResults();
  }
}

function showNextSecurityQuestion() {
  const q = securityQuestions[currentSecurityQuestion];
  const el = document.getElementById('securityQuestion');
  el.innerHTML = `
    <p>${q.question}</p>
    <div class="security-options">
      ${q.options.map((opt,i)=>`<button class="security-btn" onclick="updateSecurityScore(${q.scores[i]})">${opt}</button>`).join('')}
    </div>`;
}

function showSecurityResults() {
  const scoreEl = document.getElementById('scoreValue');
  const qEl = document.getElementById('securityQuestion');
  const maxScore = securityQuestions.length * 2;
  scoreEl.textContent = securityScore;

  let msg = '';
  if (securityScore <= maxScore * 0.3) {
    msg = 'Your security needs improvement. Consider stronger practices.';
  } else if (securityScore <= maxScore * 0.7) {
    msg = 'Good practices! There\'s room for improvement.';
  } else {
    msg = 'Excellent practices! Well protected.';
  }

  qEl.innerHTML = `<p style="color: white; text-align: center; font-size: 1.1rem; margin-top: 1rem;">${msg}</p>`;
}

// Quiz System
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizQuestions = [
  { 
    question: "What is the most common type of cyber attack?", 
    options: ["Malware", "Phishing", "DDoS", "SQL Injection"], 
    correct: 1, 
    explanation: "Phishing attacks account for most successful breaches." 
  },
  { 
    question: "Which of the following is an example of strong authentication?", 
    options: ["Password only", "Password + SMS", "Password + App authenticator", "Security questions"], 
    correct: 2, 
    explanation: "App-based authenticators are stronger than SMS." 
  },
  { 
    question: "What does the 'S' in HTTPS stand for?", 
    options: ["Safe", "Secure", "Standard", "Simple"], 
    correct: 1, 
    explanation: "HTTPS is Hypertext Transfer Protocol Secure." 
  },
  { 
    question: "Which attack exploits unsanitized input to run database commands?", 
    options: ["Cross-Site Scripting", "SQL Injection", "Clickjacking", "Man-in-the-middle"], 
    correct: 1, 
    explanation: "SQL injection happens when input isn't validated or parameterized." 
  },
  { 
    question: "How often should you backup your important data?", 
    options: ["Never","Once a year","Monthly","Regularly (weekly or daily)"], 
    correct: 3, 
    explanation: "Frequent backups enable recovery from incidents." 
  },
  { 
    question: "What should you do if you receive a suspicious email?", 
    options: ["Click links to investigate","Forward to friends","Delete and report","Reply asking if it's real"], 
    correct: 2, 
    explanation: "Delete and report suspicious messages." 
  },
  { 
    question: "Which password is strongest?", 
    options: ["password123","P@ssw0rd!","MyDog'sName2021!","Tr0ub4dor&3"], 
    correct: 3, 
    explanation: "Long, complex passphrases are harder to guess." 
  },
  { 
    question: "What is social engineering?", 
    options: ["Building social networks","Manipulating people for information","Engineering social apps","Social media management"], 
    correct: 1, 
    explanation: "It tricks people into revealing data." 
  },
  { 
    question: "What should you do on public WiFi?", 
    options: ["Avoid sensitive activities","Use a VPN","Both A and B","Nothing special"], 
    correct: 2, 
    explanation: "Avoid sensitive tasks and use VPN when possible." 
  },
  { 
    question: "What is ransomware?", 
    options: ["Free software","Malware that encrypts files for money","A type of firewall","Password manager"], 
    correct: 1, 
    explanation: "It encrypts files and demands payment." 
  }
];

function startQuiz() {
  currentQuestion = 0; 
  score = 0; 
  selectedAnswer = null;
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'inline-block';
  document.getElementById('quizResults').style.display = 'none';
  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[currentQuestion];
  const qText = document.getElementById('questionText');
  const options = document.getElementById('optionsContainer');
  const progressBar = document.getElementById('progressBar');
  const currentQ = document.getElementById('currentQ');
  const totalQ = document.getElementById('totalQ');

  qText.textContent = q.question;
  currentQ.textContent = currentQuestion + 1;
  totalQ.textContent = quizQuestions.length;
  progressBar.style.width = ((currentQuestion + 1) / quizQuestions.length) * 100 + '%';

  options.innerHTML = '';
  q.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'option';
    b.textContent = opt;
    b.onclick = () => selectAnswer(i);
    options.appendChild(b);
  });

  selectedAnswer = null;
  document.getElementById('nextBtn').style.display = 'none';
}

function selectAnswer(idx) {
  selectedAnswer = idx;
  const options = document.querySelectorAll('.option');
  const q = quizQuestions[currentQuestion];

  options.forEach((opt, i) => {
    opt.classList.remove('selected', 'correct', 'incorrect');
    if (i === idx) opt.classList.add('selected');
    if (i === q.correct) opt.classList.add('correct');
    else if (i === idx && i !== q.correct) opt.classList.add('incorrect');
    opt.disabled = true;
  });

  if (idx === q.correct) score++;
  document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('quizContent').style.display = 'none';
  document.getElementById('quizResults').style.display = 'block';
  const finalScore = document.getElementById('finalScore');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsMessage = document.getElementById('resultsMessage');

  finalScore.textContent = score;
  const pct = (score / quizQuestions.length) * 100;
  let title, message;
  if (pct >= 80) { 
    title = "Excellent!"; 
    message = "Strong cybersecurity knowledge. Keep it up!"; 
  } else if (pct >= 60) { 
    title = "Good Job!"; 
    message = "Good awareness; review missed topics."; 
  } else if (pct >= 40) { 
    title = "Getting There!"; 
    message = "Basics covered; keep learning."; 
  } else { 
    title = "Keep Learning!"; 
    message = "Cybersecurity matters; study the tips section."; 
  }
  resultsTitle.textContent = title;
  resultsMessage.textContent = message;
}

function restartQuiz() {
  document.getElementById('quizContent').style.display = 'block';
  document.getElementById('quizResults').style.display = 'none';
  document.getElementById('startBtn').style.display = 'inline-block';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('questionText').textContent = "Click 'Start Quiz' to begin!";
  document.getElementById('optionsContainer').innerHTML = '';
  document.getElementById('progressBar').style.width = '0%';
}

// Enhanced Threat card hover effects for mobile
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.threat-card');
  cards.forEach(card => {
    // Mouse events for desktop
    card.addEventListener('mouseenter', function () { 
      this.style.transform = 'translateY(-10px) scale(1.02)'; 
    });
    card.addEventListener('mouseleave', function () { 
      this.style.transform = 'translateY(0) scale(1)'; 
    });

    // Touch events for mobile
    card.addEventListener('touchstart', function(e) {
      this.style.transform = 'translateY(-5px) scale(1.01)';
    }, { passive: true });

    card.addEventListener('touchend', function(e) {
      setTimeout(() => {
        this.style.transform = 'translateY(0) scale(1)';
      }, 150);
    }, { passive: true });
  });
});

// Enhanced flip card interactions for mobile
document.addEventListener('DOMContentLoaded', function() {
  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(card => {
    let isFlipped = false;

    // Handle click/touch to flip
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const inner = this.querySelector('.flip-card-inner');

      if (!isFlipped) {
        inner.style.transform = 'rotateY(180deg)';
        isFlipped = true;
      } else {
        inner.style.transform = 'rotateY(0deg)';
        isFlipped = false;
      }
    });

    // Reset on touch outside (mobile)
    document.addEventListener('touchstart', function(e) {
      if (!card.contains(e.target) && isFlipped) {
        const inner = card.querySelector('.flip-card-inner');
        inner.style.transform = 'rotateY(0deg)';
        isFlipped = false;
      }
    }, { passive: true });
  });
});

// Enhanced game card interactions for mobile
document.addEventListener('DOMContentLoaded', function() {
  const gameCards = document.querySelectorAll('.game-card');

  gameCards.forEach(card => {
    // Touch events for mobile
    card.addEventListener('touchstart', function(e) {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    }, { passive: true });

    card.addEventListener('touchend', function(e) {
      setTimeout(() => {
        this.style.transform = 'translateY(0) scale(1)';
      }, 150);
    }, { passive: true });
  });
});

// Initialize security quiz first question
document.addEventListener('DOMContentLoaded', function () {
  if (typeof securityQuestions !== 'undefined' && securityQuestions.length > 0) {
    showNextSecurityQuestion();
  }
});

// Enhanced page load animation
window.addEventListener('load', function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  setTimeout(() => { 
    document.body.style.opacity = '1'; 
  }, 100);
});

// Performance optimization: Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    // Observe sections for staggered animations
    document.querySelectorAll('.section').forEach(section => {
      section.style.animationPlayState = 'paused';
      observer.observe(section);
    });
  }
});

// Enhanced mobile touch gestures
document.addEventListener('DOMContentLoaded', function() {
  // Improve touch responsiveness
  if ('touchstart' in window) {
    // Add touch-friendly class to body
    document.body.classList.add('touch-device');

    // Enhance button touch feedback
    const buttons = document.querySelectorAll('.btn, .email-btn, .security-btn, .option, .play-button');
    buttons.forEach(btn => {
      btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      }, { passive: true });

      btn.addEventListener('touchend', function() {
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }, { passive: true });
    });
  }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced keyboard navigation
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  // Add focus indicators for keyboard users
  focusableElements.forEach(element => {
    element.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        this.click();
      }
    });
  });

  // Announce page changes to screen readers
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', section.querySelector('h2')?.textContent || 'Section');
  });
});