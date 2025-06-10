// Variables
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

// Fonction pour gérer le menu mobile
function toggleMobileMenu() {
    // Création du menu mobile s'il n'existe pas encore
    if (!document.querySelector('.mobile-nav')) {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Copier les liens de navigation
        const links = document.querySelector('.nav-links').cloneNode(true);
        mobileNav.appendChild(links);
        
        // Ajouter au DOM
        document.body.appendChild(mobileNav);
        
        // Ajouter des événements aux liens
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
    
    // Empêcher le défilement de la page quand le menu est ouvert
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
        // Fermer le menu mobile s'il est ouvert
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Calculer la position avec un offset pour la navbar
        const navHeight = navbar.offsetHeight;
        const sectionPosition = section.offsetTop - navHeight;
        
        // Défilement fluide
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// Fonction pour rejoindre la communauté
function joinCommunity() {
    // Création d'une modale simple
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
    
    // Afficher la modale
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
    
    // Fermeture de la modale
    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    // Fermer la modale en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Gestion du formulaire
    const form = document.getElementById('joinForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const userName = formData.get('userName');
        const userEmail = formData.get('userEmail');
        const userInterest = formData.get('userInterest');
        
        // Validation simple
        if (!userName.trim() || !userEmail.trim()) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Afficher message de confirmation
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
        
        // Fermer la modale après 4 secondes
        setTimeout(() => {
            closeModal();
        }, 4000);
    });
}

// Animations des éléments au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .example-card, .benefit-card, .feature-item, .value-item');
    
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

// Gestionnaire d'événements pour afficher/masquer la navbar au scroll
function handleNavbarOnScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si on défile vers le bas et qu'on n'est pas tout en haut
    if (currentScrollTop > lastScrollTop && currentScrollTop > navbar.offsetHeight) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Si on défile vers le haut ou tout en haut
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

// Fonction pour gérer les erreurs d'images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Image failed to load: ${this.src}`);
            
            // Créer un placeholder avec du CSS
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            
            // Déterminer le type d'image et définir la taille appropriée
            let width = this.offsetWidth || 200;
            let height = this.offsetHeight || 200;
            
            // Cas spéciaux pour les images d'exemples
            if (this.classList.contains('example-img')) {
                width = '100%';
                height = '200px';
                placeholder.style.cssText = `
                    width: ${width};
                    height: ${height};
                    background: linear-gradient(135deg, var(--color-secondary), var(--color-border));
                    border-radius: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                    text-align: center;
                    border: 2px dashed var(--color-border);
                    flex-direction: column;
                    gap: var(--space-8);
                `;
            } else {
                placeholder.style.cssText = `
                    width: ${typeof width === 'number' ? width + 'px' : width};
                    height: ${typeof height === 'number' ? height + 'px' : height};
                    background: linear-gradient(135deg, var(--color-secondary), var(--color-border));
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                    text-align: center;
                    border: 2px dashed var(--color-border);
                    flex-direction: column;
                    gap: var(--space-4);
                `;
            }
            
            // Déterminer le contenu du placeholder
            if (this.alt.includes('personnage') || this.alt.includes('kanak') || this.alt.includes('Membre')) {
                placeholder.innerHTML = '<div style="font-size: 2em;">👤</div><div>Personnage<br>Kanak</div>';
            } else if (this.alt.includes('logo') || this.alt.includes('Logo')) {
                placeholder.innerHTML = '<div style="font-size: 2em;">🏠</div><div>Logo<br>Newkal</div>';
            } else if (this.alt.includes('coutume') || this.alt.includes('Participation')) {
                placeholder.innerHTML = '<div style="font-size: 2em;">🎯</div><div>Participation<br>aux coutumes</div>';
            } else if (this.alt.includes('tourisme') || this.alt.includes('QR') || this.alt.includes('sentiers')) {
                placeholder.innerHTML = '<div style="font-size: 2em;">🥾</div><div>Tourisme<br>respectueux</div>';
            } else {
                placeholder.innerHTML = '<div style="font-size: 2em;">🖼️</div><div>Image<br>indisponible</div>';
            }
            
            // Remplacer l'image par le placeholder
            this.style.display = 'none';
            this.parentNode.insertBefore(placeholder, this);
        });
    });
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter du CSS dynamique pour le menu mobile et autres éléments
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
            animation: slideInUp 0.5s var(--ease-standard);
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
        
        .about-card, .example-card, .benefit-card, .feature-item, .value-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s var(--ease-standard), transform 0.6s var(--ease-standard);
        }
        
        .about-card.animate, .example-card.animate, .benefit-card.animate, .feature-item.animate, .value-item.animate {
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
        
        @keyframes bounceIn {
            0% { 
                opacity: 0;
                transform: scale(0.3);
            }
            50% { 
                opacity: 1;
                transform: scale(1.05);
            }
            70% { 
                transform: scale(0.9);
            }
            100% { 
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Gestion des erreurs d'images
    handleImageErrors();
    
    // Attachement des événements
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Ajouter des événements de défilement aux liens de navigation
    const navLinksElements = document.querySelectorAll('.nav-link');
    navLinksElements.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            scrollToSection(section);
        });
    });
    
    // Initialisation des animations au scroll
    animateOnScroll();
    
    // Gestionnaire du comportement de la navbar au scroll
    window.addEventListener('scroll', handleNavbarOnScroll);
    
    // Gérer l'événement de fermeture de la modal avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.active');
            if (modal) {
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
