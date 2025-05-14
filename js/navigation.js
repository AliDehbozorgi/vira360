// فعالسازی منوی Bootstrap
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
});

// اسکرول نرم برای لینک‌های منو
document.querySelectorAll('.navbar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        if (targetId === 'blog/') {
            window.location.href = 'blog/index.html';
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // بستن منوی همبرگر در حالت موبایل
            navbarCollapse.classList.remove('show');

            // اسکرول نرم با افکت GSAP
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: targetElement,
                    offsetY: 70 // فاصله از بالای صفحه برای منوی ثابت
                },
                ease: "power3.inOut"
            });
        }
    });
});