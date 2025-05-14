// تنظیمات GSAP و ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
// فعالسازی tilt.js برای کارت‌ها
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// انیمیشن شماره‌های آماری
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(counter);
                stat.textContent = target;
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// فیلتر پورتفولیو
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // آپدیت دکمه فعال
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // فیلتر آیتم‌ها
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                gsap.from(item, { opacity: 0, y: 20, duration: 0.5 });
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// مشاهده اسکرول برای انیمیشن‌ها
ScrollTrigger.batch(".service-card, .portfolio-item, .team-member", {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1 }),
    start: "top 80%"
});
// انیمیشن ذرات پس‌زمینه
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // تنظیمات موقعیت و اندازه تصادفی
        gsap.set(particle, {
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(0, window.innerHeight),
            width: gsap.utils.random(2, 6),
            height: gsap.utils.random(2, 6),
            background: `rgba(255, 110, 0, ${gsap.utils.random(0.1, 0.4)})`,
            borderRadius: '50%',
            position: 'absolute'
        });

        // انیمیشن حرکت ذرات
        gsap.to(particle, {
            y: `+=${gsap.utils.random(50, 200)}`,
            x: `+=${gsap.utils.random(-50, 50)}`,
            duration: gsap.utils.random(10, 20),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        particlesContainer.appendChild(particle);
    }
}

// انیمیشن تایپینگ
function initTypeAnimation() {
    const text = "WE SUPPORT YOU";
    const element = document.querySelector('.typing-text');

    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

// انیمیشن اسکرول پارالاکس
function initParallax() {
    gsap.utils.toArray('.parallax-layer').forEach(layer => {
        const depth = layer.dataset.depth || 0.5;

        gsap.to(layer, {
            y: -(window.innerHeight * depth),
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// افکت‌های hover برای کارت‌ها
function initHoverEffects() {
    gsap.utils.toArray('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(card, {
                '--mouse-x': `${x}px`,
                '--mouse-y': `${y}px`,
                duration: 0.3
            });
        });
    });
}

// انیمیشن‌های صفحه
function initPageAnimations() {
    // انیمیشن هیرو
    gsap.from('.hero-content', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power4.out'
    });

    // انیمیشن اسکرول برای بخش‌ها
    gsap.utils.toArray('.section').forEach((section, i) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: i * 0.1,
            ease: "back.out(1.7)"
        });
    });

    // انیمیشن منو
    gsap.from('.navbar-nav .nav-item', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "power3.out"
    });
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypeAnimation();
    initParallax();
    initHoverEffects();
    initPageAnimations();

    // تغییر تم با اسکرول
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const doc = document.documentElement;

        // تغییر تاری پس‌زمینه با اسکرول
        doc.style.setProperty('--scroll-opacity', Math.min(scrollY / 500, 0.8));
    });
});





// slick carousel




$('.autoplay').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});







