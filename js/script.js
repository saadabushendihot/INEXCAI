document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a'); // كل روابط التنقل

    // تبديل قائمة التنقل في وضع الجوال
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // تبديل أيقونة الهامبرغر
            menuToggle.classList.toggle('open');
        });
    }

    // إغلاق قائمة التنقل عند النقر على رابط (في وضع الجوال)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });

    // التمرير السلس (Smooth Scrolling)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // إغلاق قائمة التنقل بعد النقر على الرابط (في وضع الجوال)
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });

    // إضافة تأثير تغيير الخلفية للHero Section عند التمرير
    // (يمكن تعديل هذا أو إزالته حسب الحاجة)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            let scrollPosition = window.scrollY;
            // يمكنك تغيير قوة التمرير أو إزالة هذا التأثير
            heroSection.style.backgroundPositionY = -scrollPosition * 0.2 + 'px';
        });
    }
});
