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
});
