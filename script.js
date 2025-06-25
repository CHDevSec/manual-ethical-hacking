// Matrix Effect
class MatrixEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];

        this.init();
        this.animate();

        // Resize handler
        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        // Semi-transparent background for trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Matrix characters
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(text, x, y);

            // Reset drop randomly or when it reaches bottom
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Fade In Animation Observer
class FadeInObserver {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.init();
    }

    init() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => this.observer.observe(el));
    }
}

// Countdown Timer
class CountdownTimer {
    constructor() {
        this.targetDate = new Date();
        this.targetDate.setDate(this.targetDate.getDate() + 7); // 7 days from now
        this.init();
    }

    init() {
        this.updateTimer();
        setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;

        if (distance < 0) {
            // Timer expired, reset to 7 days
            this.targetDate = new Date();
            this.targetDate.setDate(this.targetDate.getDate() + 7);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
}

// Modal Handler
class ModalHandler {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalContent = document.getElementById('modal-content-text');
        this.closeBtn = document.querySelector('.modal-close');

        this.projectDetails = {
            hardening: {
                title: 'Hardening Linux: Automações e E-book',
                content: `
                    <h4>O que você vai receber:</h4>
                    <br>
                    <ul>
<ul class="project-benefits">
    <li><strong>Projeto Automatizado:</strong> Hardening completo de sistemas Linux 100% baseado no benchmark CIS, com foco em padronização e segurança.</li>
    
    <li><strong>Auditoria Automatizada:</strong> Scripts prontos para verificar cada item do CIS Benchmark, com resultados precisos e rastreáveis.</li>
    
    <li><strong>Remediação Inteligente:</strong> Aplicação automática e segura das correções exigidas pelo CIS, reduzindo falhas humanas.</li>
    
    <li><strong>Relatório Web Interativo:</strong> Interface clara com status em tempo real de cada controle, facilitando a visualização e exportação de resultados.</li>
    
    <li><strong>Manual Completo:</strong> E-book detalhado explicando cada controle do CIS aplicado, os comandos utilizados e boas práticas recomendadas.</li>
</ul>

                    </ul>
                    <br>
<h4>Conteúdo Abordado:</h4>
<ul>
    <li>Hardening Linux 100% baseado no CIS Benchmark</li>
    <li>Configurações seguras do sistema operacional</li>
    <li>Gerenciamento de usuários e permissões</li>
    <li>Auditoria e logs de segurança</li>
    <li>Automação de auditoria e remediação</li>
    <li>Backup e recuperação com segurança</li>
</ul>
<br>
<p><strong>Ideal para:</strong> Profissionais de Infra, DevOps e Segurança que atuam com ambientes Linux.</p>

                `
            },
            tools: {
                title: 'Ferramentas de Hacking (Em Desenvolvimento)',
                content: `
                    <h4>O que estará incluído:</h4>
                    <br>
                    <ul>
                        <li><strong>Ferramentas Customizadas:</strong> Conjunto de ferramentas desenvolvidas especificamente para pentest</li>
                        <li><strong>Scripts de Automação:</strong> Automatização de tarefas comuns em testes de penetração</li>
                        <li><strong>Guias de Uso:</strong> Documentação detalhada de cada ferramenta</li>
                        <li><strong>Casos de Uso:</strong> Exemplos práticos de aplicação</li>
                    </ul>
                    <br>
                    <h4>Ferramentas Planejadas:</h4>
                    <br>
                    <ul>
                        <li>Scanner de vulnerabilidades personalizado</li>
                        <li>Ferramentas de enumeração avançada</li>
                        <li>Scripts para pós-exploração</li>
                        <li>Utilitários para análise de malware</li>
                        <li>Gerenciador de payloads</li>
                        <li>cracking de senhas</li>
                        <li>Ferramentas de OSINT</li>
                    </ul>
                    
                    <p><strong>Status:</strong> Em desenvolvimento ativo. Previsão de lançamento: Q2 2024</p>
                    <p><strong>Ideal para:</strong> Pentesters, ethical hackers e profissionais de Red Team.</p>
                `
            },
            scripts: {
                title: 'Automações e Scripts (Em Desenvolvimento)',
                content: `
                    <h4>O que estará incluído:</h4>
                    <br>
                    <ul>
                        <li><strong>Scripts de Automação:</strong> Automatização de tarefas repetitivas em segurança</li>
                        <li><strong>Monitoramento Automatizado:</strong> Scripts para monitoramento contínuo</li>
                        <li><strong>Análise de Logs:</strong> Ferramentas para análise automatizada de logs</li>
                        <li><strong>Relatórios Automáticos:</strong> Geração automática de relatórios de segurança</li>
                    </ul>
                    <br>
                    <h4>Categorias de Scripts:</h4>
                    <ul>
                        <li>Automação de reconhecimento</li>
                        <li>Scripts de monitoramento de rede</li>
                        <li>Análise automatizada de vulnerabilidades</li>
                        <li>Geração de relatórios</li>
                        <li>Backup e sincronização segura</li>
                        <li>Alertas e notificações</li>
                    </ul>
                    <br>
                    <p><strong>Status:</strong> Em desenvolvimento. Previsão de lançamento: Q3 2024</p>
                    <p><strong>Ideal para:</strong> Administradores de sistema, analistas de segurança e profissionais de Blue Team.</p>
                `
            },
            che: {
                title: 'E-book Profissional de Ethical Hacking (CH|E)',
                content: `
                    <h4>O que estará incluído:</h4>
                    <br>
                    <ul>
                        <li><strong>Conteúdo Avançado:</strong> Material baseado na certificação CH|E (Certified Ethical Hacker)</li>
                        <li><strong>Laboratórios Práticos:</strong> Exercícios hands-on com cenários reais</li>
                        <li><strong>Estudos de Caso:</strong> Análises detalhadas de ataques e defesas</li>
                        <li><strong>Preparação para Certificação:</strong> Material específico para o exame CH|E</li>
                    </ul>
                    <br>
                    <h4>Tópicos Avançados:</h4>
                    <ul>
                        <li>Técnicas avançadas de penetration testing</li>
                        <li>Exploração de vulnerabilidades complexas</li>
                        <li>Análise forense digital</li>
                        <li>Engenharia social avançada</li>
                        <li>Testes em ambientes corporativos</li>
                        <li>Metodologias profissionais de pentest</li>
                    </ul>
                    <br>
                    <p><strong>Status:</strong> Em desenvolvimento. Previsão de lançamento: Q3 2024</p>
                    <p><strong>Ideal para:</strong> Profissionais experientes que buscam certificação CH|E e conhecimento avançado em ethical hacking.</p>
                `
            }
        };

        this.init();
    }

    init() {
        // Close modal events
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Details button events
        const detailsButtons = document.querySelectorAll('.btn-details');
        detailsButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const project = e.target.closest('.btn-details').dataset.project;
                this.openModal(project);
            });
        });
    }

    openModal(projectKey) {
        const project = this.projectDetails[projectKey];
        if (project && this.modal && this.modalTitle && this.modalContent) {
            this.modalTitle.textContent = project.title;
            this.modalContent.innerHTML = project.content;
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Terminal Typing Effect
class TerminalTyping {
    constructor() {
        this.commands = [
            'nmap -sV target.com',
            'sqlmap -u "http://target.com?id=1"',
            'hydra -l admin -P wordlist.txt ssh://target.com',
            'burpsuite --target=target.com',
            'metasploit -r exploit.rc'
        ];
        this.currentCommandIndex = 0;
        this.init();
    }

    init() {
        const commandElement = document.querySelector('.terminal-line .command');
        if (commandElement) {
            setInterval(() => {
                this.typeCommand(commandElement);
            }, 5000);
        }
    }

    typeCommand(element) {
        const command = this.commands[this.currentCommandIndex];
        element.textContent = '';

        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += command[i];
            i++;

            if (i >= command.length) {
                clearInterval(typeInterval);
                this.currentCommandIndex = (this.currentCommandIndex + 1) % this.commands.length;
            }
        }, 100);
    }
}

// CTA Button Click Handlers
class CTAHandlers {
    constructor() {
        this.init();
    }

    init() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);

                // Here you would integrate with your payment system
                // For now, just show an alert
                // alert('Redirecionando para o checkout... (Integração com sistema de pagamento)');
            });
        });

        // Buy buttons for projects
        const buyButtons = document.querySelectorAll('.btn-buy');
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // e.preventDefault(); // <--- comenta ou apaga essa linha
                // alert('Redirecionando para o checkout...');
            });
        });
    }
}

// Glitch Effect for Hero Title
class GlitchEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            setInterval(() => {
                this.applyGlitch(heroTitle);
            }, 8000);
        }
    }

    applyGlitch(element) {
        element.style.animation = 'none';
        element.style.textShadow = `
            2px 0 #ff00ff,
            -2px 0 #00ffff,
            0 2px #ffff00,
            0 -2px #ff0000
        `;

        setTimeout(() => {
            element.style.textShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        }, 200);
    }
}

// Particle System for Background
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';

        document.body.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff'
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix effect
    new MatrixEffect('matrix-canvas');

    // Initialize fade-in animations
    new FadeInObserver();

    // Initialize countdown timer
    new CountdownTimer();

    // Initialize modal handler
    new ModalHandler();

    // Initialize smooth scrolling
    new SmoothScroll();

    // Initialize navbar scroll effect
    new NavbarScroll();

    // Initialize terminal typing effect
    new TerminalTyping();

    // Initialize CTA handlers
    new CTAHandlers();

    // Initialize glitch effect
    new GlitchEffect();

    // Initialize particle system (commented out to avoid performance issues)
    // new ParticleSystem();

    console.log('🔥 CHDEVSEC Landing Page Loaded Successfully! 🔥');
    console.log('🚀 Ready to hack the world ethically! 🚀');
});


// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.init();
    }

    init() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }
}

// Modal Functions for Terms and Privacy
function openTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openPrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closePrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');

    if (e.target === termsModal) {
        closeTermsModal();
    }

    if (e.target === privacyModal) {
        closePrivacyModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTermsModal();
        closePrivacyModal();
    }
});

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQAccordion();
});

