
    // Utility: throttle
    const throttle = (fn, wait = 100) => {
      let t = 0;
      return (...args) => {
        const now = Date.now();
        if (now - t >= wait) {
          t = now;
          fn(...args);
        }
      };
    };
    function getEmotion(message) {
  if (message.includes("sad") || message.includes("depressed")) return "sad";
  if (message.includes("anxious") || message.includes("frustated") || message.includes("stress")) return "anxious";
  if (message.includes("happy") || message.includes("good")) return "happy";
  if (message.includes("angry")) return "angry";
  return "neutral";
}
function getResponse(emotion) {
  const responses = {
    sad: [
      "I'm really sorry you're feeling this way 💙",
      "Would you like to talk about what's making you feel sad?",
      "Writing your thoughts in a journal can help."
    ],
    anxious: [
      "Take a deep breath. You're safe.",
      "Try the 4-7-8 breathing technique.",
      "Want me to guide you through a calming exercise?"
    ],
    happy: [
      "That’s great to hear 😊",
      "Keep doing what makes you feel good!"
    ],
    angry: [
      "It's okay to feel angry sometimes.",
      "Try stepping away and taking deep breaths."
    ],
    neutral: [
      "I'm here to listen. Tell me more.",
      "How has your day been so far?"
    ]
  };

  const list = responses[emotion];
  return list[Math.floor(Math.random() * list.length)];
}
    function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBody = document.getElementById("chat-body");

  const message = input.value.toLowerCase();
  if (!message) return;

  // user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = message;
  chatBody.appendChild(userMsg);

  // AI logic
  const emotion = getEmotion(message);
  const reply = getResponse(emotion);

  // bot message
  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = reply;
  chatBody.appendChild(botMsg);

  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
}

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile nav (progressive — show toggle below 720px)
    const navToggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('menu');
    const updateNavLayout = () => {
      if (window.matchMedia('(max-width: 719px)').matches) {
        navToggle.style.display = 'inline-flex';
        menu.classList.remove('mobile-open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navToggle.style.display = 'none';
        menu.classList.remove('mobile-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    };
    updateNavLayout();
    window.addEventListener('resize', throttle(updateNavLayout, 150));
    navToggle?.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('mobile-open', !expanded);
    });
    
    // Close mobile menu when clicking on a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('mobile-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Button ripple
    const addRipple = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    };
    document.querySelectorAll('[data-ripple]').forEach(el => {
      el.addEventListener('click', addRipple);
    });

    // Scroll progress
    const progress = document.querySelector('.scroll-progress');
    const setProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    };
    setProgress();
    window.addEventListener('scroll', throttle(setProgress, 50), { passive: true });

    // Scroll reveal
    const revealEls = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    revealEls.forEach(el => io.observe(el));

    // Active nav link on scroll
    const sections = [...document.querySelectorAll('main section[id]')];
    const links = [...document.querySelectorAll('.nav-links a')];
    const setActiveLink = () => {
      let current = sections[0]?.id || '';
      const fromTop = window.scrollY + 120; // account for header height
      sections.forEach(sec => {
        if (sec.offsetTop <= fromTop) current = sec.id;
      });
      links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    };
    setActiveLink();
    window.addEventListener('scroll', throttle(setActiveLink, 100), { passive: true });

     // Hero parallax accent
     const accent = document.querySelector('.hero-accent');
     const parallax = () => {
       const y = (window.scrollY || 0) * 0.15;
       accent.style.transform = `translateY(${y}px)`;
     };
     parallax();
     window.addEventListener('scroll', throttle(parallax, 50), { passive: true });

     // Manual theme toggle functionality
     const themeToggle = document.querySelector('.theme-toggle');
     const body = document.body;
     let currentTheme = 1;
     const totalThemes = 6;

     // Load saved theme from localStorage
     const savedTheme = localStorage.getItem('psychevidhya-theme');
     if (savedTheme) {
       currentTheme = parseInt(savedTheme);
       body.setAttribute('data-theme', `theme${currentTheme}`);
     }

     // Function to change theme
     const changeTheme = () => {
       currentTheme = currentTheme >= totalThemes ? 1 : currentTheme + 1;
       body.setAttribute('data-theme', `theme${currentTheme}`);
       
       // Save theme preference
       localStorage.setItem('psychevidhya-theme', currentTheme.toString());
       
       // Add visual feedback to button
       const scale = window.innerWidth > 768 ? 'translateY(-50%) scale(1.15)' : 'scale(1.15)';
       const normal = window.innerWidth > 768 ? 'translateY(-50%)' : 'none';
       
       themeToggle.style.transform = scale;
       setTimeout(() => {
         themeToggle.style.transform = normal;
       }, 200);
     };

     // Manual theme toggle handler
     themeToggle.addEventListener('click', () => {
       changeTheme();
     });

     // Keyboard accessibility for theme toggle
     themeToggle.addEventListener('keydown', (e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         themeToggle.click();
       }
     });
     function saveMood() {
  const mood = document.getElementById("moodSelect").value;
  const date = new Date().toLocaleDateString();

  const moodData = JSON.parse(localStorage.getItem("moods")) || [];

  moodData.push({ mood, date });

  localStorage.setItem("moods", JSON.stringify(moodData));

  alert("Mood saved!");
}
function showMoodChart() {
  const data = JSON.parse(localStorage.getItem("moods")) || [];

  const moodCount = {
    happy: 0,
    neutral: 0,
    sad: 0,
    anxious: 0
  };

  data.forEach(entry => {
    moodCount[entry.mood]++;
  });

  new Chart(document.getElementById("moodChart"), {
    type: "bar",
    data: {
      labels: ["Happy", "Neutral", "Sad", "Anxious"],
      datasets: [{
        label: "Mood Count",
        data: Object.values(moodCount)
      }]
    }
  });
}
window.onload = showMoodChart;
function startBreathing() {
  const text = document.getElementById("breathingText");

  let steps = ["Inhale...", "Hold...", "Exhale..."];
  let i = 0;

  setInterval(() => {
    text.innerText = steps[i];
    i = (i + 1) % steps.length;
  }, 3000);
}
function calculateScore() {
  const score = parseInt(document.getElementById("q1").value);

  let resultText = "";

  if (score <= 1) resultText = "Minimal symptoms 😊";
  else if (score == 2) resultText = "Mild symptoms ⚠️";
  else resultText = "Consider seeking support 💙";

  document.getElementById("result").innerText = resultText;
}
  