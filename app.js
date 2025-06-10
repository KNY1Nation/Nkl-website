// Variables globales
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
let currentDemo = null;
let currentDemoScreen = 0;

// Données des démos
const demoData = {
  example1: {
    title: "Participation aux Coutumes",
    screens: [
      {
        title: "Notification",
        content: {
          type: "notification",
          icon: "🎯",
          title: "Cérémonie traditionnelle",
          message: "Une cérémonie importante a lieu dans votre tribu. Participez symboliquement en envoyant un geste de respect.",
          location: "Tribu de Hienghène"
        }
      },
      {
        title: "Sélection du geste",
        content: {
          type: "gesture_selection",
          icon: "🤲",
          title: "Choisissez votre geste",
          message: "Sélectionnez le geste qui exprime le mieux votre participation:",
          gestures: [
            { emoji: "🙏", text: "Respect", value: "respect" },
            { emoji: "❤️", text: "Gratitude", value: "gratitude" },
            { emoji: "🤝", text: "Soutien", value: "soutien" }
          ]
        }
      },
      {
        title: "Confirmation",
        content: {
          type: "success",
          icon: "✅",
          title: "Geste envoyé !",
          message: "Votre participation a été transmise à la communauté. Merci pour votre respect des traditions.",
          details: "Votre geste contribue symboliquement à cette cérémonie importante."
        }
      }
    ]
  },
  example2: {
    title: "Scanner QR Sentier",
    screens: [
      {
        title: "Scanner QR",
        content: {
          type: "qr_scanner",
          icon: "📱",
          title: "Scanner le QR Code",
          message: "Pointez votre caméra vers le QR code sur le sentier pour découvrir la communauté locale."
        }
      },
      {
        title: "Informations tribu",
        content: {
          type: "tribe_info",
          icon: "🏛️",
          title: "Tribu de Pouébo",
          message: "Vous êtes sur les terres coutumières de la tribu de Pouébo. Cette région est riche en traditions et en histoire kanak.",
          info: "Population: ~800 habitants\nChef: Marie Tjibaou\nSpécialité: Sculpture sur bois"
        }
      },
      {
        title: "Geste de respect",
        content: {
          type: "respect_gesture",
          icon: "🌿",
          title: "Envoyer un geste de respect",
          message: "En tant que visiteur, vous pouvez contribuer respectueusement à cette communauté.",
          amount: "5 NKL"
        }
      },
      {
        title: "Merci",
        content: {
          type: "success",
          icon: "🙏",
          title: "Merci pour votre respect !",
          message: "Votre contribution sera redistribuée équitablement à la communauté locale selon les principes coutumiers.",
          details: "Profitez de votre randonnée en respectant la nature et les traditions."
        }
      }
    ]
  }
};

// Fonction pour gérer le menu mobile
function toggleMobileMenu() {
  if (!document.querySelector('.mobile-nav')) {
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    const links = document.querySelector('.nav-links').cloneNode(true);
    mobileNav.appendChild(links);
    document.body.appendChild(mobileNav);
    
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  const mobileNav = document.querySelector('.mobile-nav');
  mobileNav.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
  
  if (mobileNav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Défilement fluide vers les sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav && mobileNav.classList.contains('active')) {
      toggleMobileMenu();
    }
    
    const navHeight = navbar.offsetHeight;
    const sectionPosition = section.offsetTop - navHeight;
    
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    });
  }
}

// Fonction pour rejoindre la communauté
function joinCommunity() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <h3>Rejoindre la communauté Newkal</h3>
      <p>Merci pour votre intérêt! Nous vous contacterons bientôt.</p>
      <form id="joinForm">
        <div class="form-group">
          <label for="userName" class="form-label">Nom complet *</label>
          <input type="text" id="userName" name="userName" class="form-control" required placeholder="Votre nom complet">
        </div>
        <div class="form-group">
          <label for="userEmail" class="form-label">Adresse email *</label>
          <input type="email" id="userEmail" name="userEmail" class="form-control" required placeholder="votre@email.com">
        </div>
        <div class="form-group">
          <label for="userInterest" class="form-label">Votre intérêt pour Newkal</label>
          <select id="userInterest" name="userInterest" class="form-control">
            <option value="">Sélectionnez votre intérêt principal</option>
            <option value="culture">Préservation de la culture</option>
            <option value="community">Renforcement communautaire</option>
            <option value="tourism">Tourisme respectueux</option>
            <option value="technology">Innovation technologique</option>
            <option value="other">Autre</option>
          </select>
        </div>
        <button type="submit" class="btn btn--primary btn--full-width">
          Rejoindre la communauté
        </button>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  setTimeout(() => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 10);
  
  const closeBtn = modal.querySelector('.modal-close');
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.remove();
    }, 300);
  };
  
  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  const form = document.getElementById('joinForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const userName = formData.get('userName');
    const userEmail = formData.get('userEmail');
    const userInterest = formData.get('userInterest');
    
    if (!userName.trim() || !userEmail.trim()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    form.innerHTML = `
      <div class="success-message">
        <div class="success-icon">✓</div>
        <h4>Inscription réussie!</h4>
        <p>Merci <strong>${userName}</strong>!</p>
        <p>Vous êtes maintenant inscrit à la communauté Newkal. Nous vous contacterons prochainement à <strong>${userEmail}</strong>.</p>
        <div class="success-details">
          ${userInterest ? `<p><em>Votre intérêt : ${document.querySelector(`option[value="${userInterest}"]`).textContent}</em></p>` : ''}
        </div>
      </div>
    `;
    
    setTimeout(() => {
      closeModal();
    }, 4000);
  });
}

// Fonction pour ouvrir une démo
function openDemo(demoId) {
  currentDemo = demoId;
  currentDemoScreen = 0;
  
  const demo = demoData[demoId];
  if (!demo) return;
  
  const modal = document.createElement('div');
  modal.className = 'demo-modal';
  modal.innerHTML = `
    <div class="demo-phone">
      <div class="demo-screen">
        <div class="demo-screen-content">
          <div class="demo-header">
            <div class="demo-title">${demo.title}</div>
            <button class="demo-close">&times;</button>
          </div>
          <div class="demo-content" id="demoContent">
            <!-- Le contenu sera généré dynamiquement -->
          </div>
        </div>
        <div class="demo-navigation">
          <button class="btn btn--secondary demo-btn" id="demoPrev" onclick="prevDemoScreen()" disabled>
            Précédent
          </button>
          <button class="btn btn--primary demo-btn" id="demoNext" onclick="nextDemoScreen()">
            Suivant
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  setTimeout(() => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 10);
  
  const closeBtn = modal.querySelector('.demo-close');
  const closeDemo = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.remove();
      currentDemo = null;
      currentDemoScreen = 0;
    }, 300);
  };
  
  closeBtn.addEventListener('click', closeDemo);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeDemo();
    }
  });
  
  // Afficher le premier écran
  updateDemoScreen();
}

// Fonction pour mettre à jour l'écran de démo
function updateDemoScreen() {
  if (!currentDemo) return;
  
  const demo = demoData[currentDemo];
  const screen = demo.screens[currentDemoScreen];
  const content = document.getElementById('demoContent');
  const prevBtn = document.getElementById('demoPrev');
  const nextBtn = document.getElementById('demoNext');
  
  if (!content) return;
  
  // Mettre à jour les boutons de navigation
  prevBtn.disabled = currentDemoScreen === 0;
  
  if (currentDemoScreen === demo.screens.length - 1) {
    nextBtn.textContent = 'Fermer';
    nextBtn.onclick = () => {
      document.querySelector('.demo-modal').classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        document.querySelector('.demo-modal').remove();
        currentDemo = null;
        currentDemoScreen = 0;
      }, 300);
    };
  } else {
    nextBtn.textContent = 'Suivant';
    nextBtn.onclick = nextDemoScreen;
  }
  
  // Générer le contenu selon le type d'écran
  let html = '';
  
  switch (screen.content.type) {
    case 'notification':
      html = `
        <div class="demo-notification">
          <div class="demo-icon">${screen.content.icon}</div>
          <h3>${screen.content.title}</h3>
          <p>${screen.content.message}</p>
          <div style="margin-top: var(--space-16); font-size: var(--font-size-sm); opacity: 0.8;">
            📍 ${screen.content.location}
          </div>
        </div>
      `;
      break;
      
    case 'gesture_selection':
      html = `
        <div class="demo-content">
          <div class="demo-icon">${screen.content.icon}</div>
          <h3>${screen.content.title}</h3>
          <p>${screen.content.message}</p>
          <div class="demo-gesture-buttons">
            ${screen.content.gestures.map(gesture => `
              <div class="demo-gesture-btn" onclick="selectGesture('${gesture.value}')">
                <span class="demo-gesture-emoji">${gesture.emoji}</span>
                <span class="demo-gesture-text">${gesture.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
      
    case 'qr_scanner':
      html = `
        <div class="demo-content">
          <div class="demo-icon">${screen.content.icon}</div>
          <h3>${screen.content.title}</h3>
          <p>${screen.content.message}</p>
          <div class="demo-camera">
            <div class="demo-camera-overlay">
              <div class="demo-qr-code">
                ${Array.from({length: 100}, (_, i) => `<div class="demo-qr-pixel"></div>`).join('')}
              </div>
            </div>
          </div>
          <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
            🎯 Centrez le QR code dans le cadre
          </p>
        </div>
      `;
      break;
      
    case 'tribe_info':
      html = `
        <div class="demo-content">
          <div class="demo-icon">${screen.content.icon}</div>
          <h3>${screen.content.title}</h3>
          <p>${screen.content.message}</p>
          <div style="background: var(--color-secondary); padding: var(--space-16); border-radius: var(--radius-lg); margin: var(--space-16) 0; text-align: left;">
            <pre style="font-family: inherit; margin: 0; white-space: pre-line; font-size: var(--font-size-sm);">${screen.content.info}</pre>
          </div>
        </div>
      `;
      break;
      
    case 'respect_gesture':
      html = `
        <div class="demo-content">
          <div class="demo-icon">${screen.content.icon}</div>
          <h3>${screen.content.title}</h3>
          <p>${screen.content.message}</p>
          <div style="background: linear-gradient(135deg, var(--color-primary), #FF6B6B); color: white; padding: var(--space-20); border-radius: var(--radius-lg); margin: var(--space-16) 0;">
            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8);">
              ${screen.content.amount}
            </div>
            <div style="font-size: var(--font-size-sm); opacity: 0.9;">
              Contribution suggérée
            </div>
          </div>
        </div>
      `;
      break;
      
    case 'success':
      html = `
        <div class="demo-success">
          <div class="demo-success-icon">${screen.content.icon}</div>
          <h3>${screen.content.title}</h3>
          <p>${screen.content.message}</p>
          ${screen.content.details ? `
            <div style="background: var(--color-secondary); padding: var(--space-12); border-radius: var(--radius-base); margin-top: var(--space-16); font-size: var(--font-size-sm);">
              ${screen.content.details}
            </div>
          ` : ''}
        </div>
      `;
      break;
  }
  
  content.innerHTML = html;
}

// Fonction pour sélectionner un geste
function selectGesture(value) {
  const buttons = document.querySelectorAll('.demo-gesture-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  
  const selectedBtn = Array.from(buttons).find(btn => 
    btn.onclick.toString().includes(`'${value}'`)
  );
  
  if (selectedBtn) {
    selectedBtn.classList.add('selected');
  }
  
  // Activer le bouton suivant après une sélection
  setTimeout(() => {
    nextDemoScreen();
  }, 500);
}

// Navigation dans les démos
function nextDemoScreen() {
  if (!currentDemo) return;
  
  const demo = demoData[currentDemo];
  if (currentDemoScreen < demo.screens.length - 1) {
    currentDemoScreen++;
    updateDemoScreen();
  }
}

function prevDemoScreen() {
  if (!currentDemo || currentDemoScreen === 0) return;
  
  currentDemoScreen--;
  updateDemoScreen();
}

// Gestion du scroll pour la navbar
function handleNavbarOnScroll() {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollTop > lastScrollTop && currentScrollTop > navbar.offsetHeight) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

// Animations au scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.about-card, .example-card, .benefit-card, .value-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Gestion des erreurs d'images
function handleImageErrors() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.warn(`Image failed to load: ${this.src}`);
      this.style.display = 'none';
      
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.style.cssText = `
        width: ${this.offsetWidth || 200}px;
        height: ${this.offsetHeight || 200}px;
        background: linear-gradient(135deg, var(--color-secondary), var(--color-border));
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
        text-align: center;
        border: 2px dashed var(--color-border);
      `;
      
      if (this.alt.includes('Logo') || this.alt.includes('logo')) {
        placeholder.innerHTML = '🏠<br>Logo<br>Newkal';
      } else if (this.alt.includes('personnage') || this.alt.includes('kanak') || this.alt.includes('Membre')) {
        placeholder.innerHTML = '👤<br>Personnage<br>Kanak';
      } else {
        placeholder.innerHTML = '🖼️<br>Image<br>indisponible';
      }
      
      this.parentNode.insertBefore(placeholder, this);
    });
  });
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter les styles CSS dynamiques
  const style = document.createElement('style');
  style.textContent = `
    .mobile-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--color-surface);
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translateY(-100%);
      transition: transform var(--duration-normal) var(--ease-standard);
    }
    
    .mobile-nav.active {
      transform: translateY(0);
    }
    
    .mobile-nav .nav-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-24);
    }
    
    .mobile-nav .nav-link {
      font-size: var(--font-size-xl);
      padding: var(--space-12) var(--space-24);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity var(--duration-normal) var(--ease-standard);
      padding: var(--space-16);
    }
    
    .modal.active {
      opacity: 1;
    }
    
    .modal-content {
      background-color: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: var(--space-32);
      max-width: 90%;
      width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      transform: translateY(20px);
      transition: transform var(--duration-normal) var(--ease-standard);
      position: relative;
      box-shadow: var(--shadow-lg);
    }
    
    .modal.active .modal-content {
      transform: translateY(0);
    }
    
    .modal-close {
      position: absolute;
      top: var(--space-16);
      right: var(--space-16);
      font-size: var(--font-size-2xl);
      cursor: pointer;
      color: var(--color-text-secondary);
      transition: color var(--duration-fast) var(--ease-standard);
    }
    
    .modal-close:hover {
      color: var(--color-error);
    }
    
    .success-message {
      text-align: center;
      padding: var(--space-16);
    }
    
    .success-icon {
      font-size: 48px;
      color: var(--color-success);
      margin-bottom: var(--space-16);
      animation: bounceIn 0.6s var(--ease-standard);
    }
    
    .success-details {
      margin-top: var(--space-16);
      padding: var(--space-12);
      background: var(--color-secondary);
      border-radius: var(--radius-base);
    }
    
    .about-card, .example-card, .benefit-card, .value-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s var(--ease-standard), transform 0.6s var(--ease-standard);
    }
    
    .about-card.animate, .example-card.animate, .benefit-card.animate, .value-item.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .navbar {
      transition: transform var(--duration-normal) var(--ease-standard);
    }
    
    .image-placeholder {
      transition: all var(--duration-normal) var(--ease-standard);
    }
    
    .image-placeholder:hover {
      background: linear-gradient(135deg, var(--color-secondary-hover), var(--color-border));
    }
  `;
  
  document.head.appendChild(style);
  
  // Gestion des erreurs d'images
  handleImageErrors();
  
  // Attachement des événements
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Navigation par liens
  const navLinksElements = document.querySelectorAll('.nav-link');
  navLinksElements.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('href').substring(1);
      scrollToSection(section);
    });
  });
  
  // Animations au scroll
  animateOnScroll();
  
  // Navbar au scroll
  window.addEventListener('scroll', handleNavbarOnScroll);
  
  // Gestion des touches
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.active');
      const demoModal = document.querySelector('.demo-modal.active');
      
      if (demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
          demoModal.remove();
          currentDemo = null;
          currentDemoScreen = 0;
        }, 300);
      } else if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
          modal.remove();
        }, 300);
      }
    }
  });
});

// Rendre les fonctions disponibles globalement
window.scrollToSection = scrollToSection;
window.joinCommunity = joinCommunity;
window.openDemo = openDemo;
window.nextDemoScreen = nextDemoScreen;
window.prevDemoScreen = prevDemoScreen;
window.selectGesture = selectGesture;
