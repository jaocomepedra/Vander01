// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initLoader();
    initCursor();
    initNavbar();
    initAnimations();
    initSkills();
    initProjects();
    initContactForm();
    initBackToTop();
    initScrollAnimations();
    
    console.log('Portfólio Felipe Iori Nogaroli carregado com sucesso!');
    console.log('Desenvolvedor: Felipe Iori Nogaroli');
    console.log('Idade: 18 anos');
    console.log('Localização: Campo Mourão, PR');
    console.log('Nascimento: 20/11/2007');
});

// ===== LOADER =====
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Simular tempo de carregamento
    setTimeout(() => {
        loader.classList.add('loaded');
        
        // Remover loader do DOM após animação
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
}

// ===== CURSOR PERSONALIZADO =====
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Efeitos ao passar em elementos interativos
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .project-card, .skill-item, .stat-card, .info-card'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'var(--primary)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.borderColor = 'var(--primary)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'var(--primary)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'rgba(124, 58, 237, 0.3)';
            });
        });
    } else {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

// ===== NAVBAR =====
function initNavbar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu mobile
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Ativar link clicado
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Ativar link ativo baseado na seção visível
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== ANIMAÇÕES =====
function initAnimations() {
    // Animar estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observerStats.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observerStats.observe(stat));
    
    // Typewriter effect
    const typeText = document.querySelector('.type-text');
    const texts = [
        'Desenvolvedor Web & UI/UX',
        'Criador de Soluções Digitais',
        'Apaixonado por Tecnologia',
        'Focado em Resultados'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            typeText.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && charIndex >= 0) {
            typeText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(typeWriter, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Iniciar typewriter após 2 segundos
    setTimeout(typeWriter, 2000);
}

// ===== HABILIDADES =====
function initSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const level = skillItem.getAttribute('data-level');
                const progressBar = skillItem.querySelector('.skill-progress');
                
                // Animar barra de progresso
                setTimeout(() => {
                    progressBar.style.width = `${level}%`;
                }, 300);
                
                observerSkills.unobserve(skillItem);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(skill => observerSkills.observe(skill));
}

// ===== PROJETOS =====
function initProjects() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Filtro de projetos
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar active ao botão clicado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrar projetos
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animar cards ao aparecer
    const observerProjects = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observerProjects.observe(card);
    });
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validar formulário
        if (!name || !email || !message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Simular envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular tempo de envio
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Mostrar mensagem de sucesso
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            
            // Limpar formulário
            contactForm.reset();
        }, 2000);
    });
    
    // Validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Mostrar notificação
    function showNotification(message, type) {
        // Remover notificação anterior se existir
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Adicionar estilo CSS para notificação
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--dark-light);
                    border: 1px solid;
                    border-color: var(--success);
                    border-radius: var(--radius-md);
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                }
                
                .notification.error {
                    border-color: var(--error);
                }
                
                .notification .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .notification .notification-content i {
                    font-size: 1.25rem;
                }
                
                .notification.success .notification-content i {
                    color: var(--success);
                }
                
                .notification.error .notification-content i {
                    color: var(--error);
                }
                
                .notification .notification-content span {
                    color: var(--light);
                    font-size: 0.875rem;
                }
                
                .notification .notification-close {
                    background: none;
                    border: none;
                    color: var(--gray);
                    cursor: pointer;
                    padding: 0.25rem;
                    transition: var(--transition-fast);
                }
                
                .notification .notification-close:hover {
                    color: var(--light);
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Fechar notificação
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Remover automaticamente após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMAÇÕES AO SCROLL =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-visual, .about-text, .about-stats, ' +
        '.timeline-item, .category-card, .project-card, .info-card, ' +
        '.contact-form'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== FUNÇÕES UTILITÁRIAS =====
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

// ===== DADOS PESSOAIS =====
const personalData = {
    nome: 'Felipe Iori Nogaroli',
    idade: 18,
    nascimento: '20/11/2007',
    localizacao: 'Campo Mourão, PR',
    email: 'contato@felipeiori.dev',
    
    habilidades: ['JavaScript', 'React', 'Node.js', 'UI/UX Design', 'Figma', 'Git'],
    
    sobre: function() {
        return `Desenvolvedor de ${this.idade} anos, nascido em ${this.nascimento} em ${this.localizacao}. 
                Apaixonado por tecnologia e desenvolvimento web.`;
    },
    
    contato: function() {
        return `Entre em contato: ${this.email}`;
    }
};

// Exibir dados no console
console.log('=== DADOS PESSOAIS ===');
console.log(personalData.sobre());
console.log(personalData.contato());
console.log('Habilidades:', personalData.habilidades.join(', '));