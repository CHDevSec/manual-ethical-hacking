document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("brand-text");
    if (!target) return;

    const text = "CHDEVSEC_";
    let i = 0;
    const speed = 120;

    target.textContent = ""; // reset seguro

    function typeBrand() {
        if (i < text.length) {
            target.textContent += text[i];
            i++;
            setTimeout(typeBrand, speed);
        }
    }

    // Start immediately - no font waiting to prevent hanging
    setTimeout(typeBrand, 100);

    // 2. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('SYSTEM READY: CHDEVSEC_ NODE ACTIVE');

    // ============================================================
    // PROFESSIONAL ANIMATIONS ENGINE
    // ============================================================

    // 3. SCROLL REVEAL OBSERVER
    // Automatically add 'active' class when elements enter viewport
    const revealElements = document.querySelectorAll(
        '.value-prop, .pain-solution, .how-it-works, .benefits, ' +
        '.creator-terminal, .unlock-section, .guarantee-section, .faq-section, ' +
        '.slot-card, .step, .benefit-item, .faq-item, .unlock-card, .guarantee-box'
    );

    // Add reveal classes to elements
    revealElements.forEach((el, index) => {
        if (!el.classList.contains('reveal') &&
            !el.classList.contains('reveal-left') &&
            !el.classList.contains('reveal-right') &&
            !el.classList.contains('reveal-scale')) {
            el.classList.add('reveal');
        }

        // Add stagger delays to repeated elements
        if (el.classList.contains('slot-card') ||
            el.classList.contains('step') ||
            el.classList.contains('benefit-item') ||
            el.classList.contains('faq-item')) {
            const siblings = document.querySelectorAll('.' + el.classList[0]);
            const siblingIndex = Array.from(siblings).indexOf(el);
            if (siblingIndex < 5) {
                el.classList.add(`stagger-${siblingIndex + 1}`);
            }
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after reveal for performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. ANIMATED NUMBER COUNTER
    // Counts up numbers when they enter viewport
    const animateCounter = (element, target, duration = 2000) => {
        const startTime = performance.now();
        const startValue = 0;

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth end
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    // Observe stat values for counter animation
    const statVals = document.querySelectorAll('.stat-val');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const text = entry.target.textContent;
                const match = text.match(/(\d+)/);
                if (match) {
                    const number = parseInt(match[1]);
                    const suffix = text.replace(match[1], '').trim();
                    entry.target.textContent = '0';

                    // Animate the number
                    const startTime = performance.now();
                    const duration = 1500;

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(number * easeOut);

                        entry.target.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            entry.target.textContent = number + suffix;
                        }
                    };

                    requestAnimationFrame(animate);
                }
            }
        });
    }, { threshold: 0.5 });

    statVals.forEach(el => counterObserver.observe(el));

    // 5. PARALLAX EFFECT ON HERO
    // Subtle depth movement on scroll
    const hero = document.querySelector('.hero');
    const manualContainer = document.querySelector('.manual-container');
    const heroText = document.querySelector('.hero-text');

    if (hero && manualContainer) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = hero.offsetHeight;

                    if (scrolled < heroHeight) {
                        const parallaxAmount = scrolled * 0.15;
                        const opacity = 1 - (scrolled / heroHeight) * 0.5;

                        manualContainer.style.transform = `translateY(${parallaxAmount * 0.5}px)`;

                        if (heroText) {
                            heroText.style.transform = `translateY(${parallaxAmount * 0.2}px)`;
                            heroText.style.opacity = opacity;
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // 6. MAGNETIC HOVER EFFECT FOR CTA BUTTONS
    // Buttons slightly follow cursor on hover
    const ctaButtons = document.querySelectorAll('.pixel-btn, .unlock-btn');

    ctaButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // 7. ENHANCED TOOL CAROUSEL - Pause on hover with smooth resume
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        const marqueeParent = marqueeTrack.parentElement;

        marqueeParent.addEventListener('mouseenter', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });

        marqueeParent.addEventListener('mouseleave', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });
    }

    // 8. GLITCH TEXT RANDOM INTENSITY
    // Randomly trigger more intense glitch
    const glitchElements = document.querySelectorAll('.glitch');

    setInterval(() => {
        glitchElements.forEach(el => {
            if (Math.random() > 0.85) {
                el.classList.add('glitch-intense');
                setTimeout(() => el.classList.remove('glitch-intense'), 200);
            }
        });
    }, 3000);

    // 9. SECTION GLOW ON SCROLL
    // Add glow effect to sections as they become visible
    const sections = document.querySelectorAll('section');

    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--section-glow', '1');
            } else {
                entry.target.style.setProperty('--section-glow', '0');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => glowObserver.observe(section));

    // 10. CURSOR TRAIL EFFECT (Subtle for cyber feel)
    // Only on desktop
    if (window.innerWidth > 1024) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--accent-green);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.3s ease;
            mix-blend-mode: screen;
            box-shadow: 0 0 10px var(--accent-green);
        `;
        document.body.appendChild(trail);

        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            trail.style.opacity = '0.6';
        });

        document.addEventListener('mouseleave', () => {
            trail.style.opacity = '0';
        });

        function animateTrail() {
            const dx = mouseX - trailX;
            const dy = mouseY - trailY;

            trailX += dx * 0.15;
            trailY += dy * 0.15;

            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';

            requestAnimationFrame(animateTrail);
        }
        animateTrail();
    }

    // 11. TILT EFFECT ON CARDS
    // 3D tilt effect on hover for cards
    const tiltCards = document.querySelectorAll('.slot-card, .unlock-card, .crt-monitor');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    console.log('ANIMATION ENGINE: All systems operational');
});
