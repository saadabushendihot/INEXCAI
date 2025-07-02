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

    // التمرير السلس (Smooth Scrolling) وتفعيل حالة "active" للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // إزالة حالة "active" من جميع الروابط
                navItems.forEach(link => link.classList.remove('active'));
                // إضافة حالة "active" للرابط الذي تم النقر عليه
                this.classList.add('active');

                // إغلاق قائمة التنقل بعد النقر على الرابط (في وضع الجوال)
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            }
        });
    });

    // إضافة أو إزالة حالة active للروابط عند التمرير
    // تأكد من أن جميع IDs للأقسام التي في الروابط موجودة في هذه القائمة
    const sections = document.querySelectorAll('section, header'); // كل الأقسام بما في ذلك الhero
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // نسبة ظهور القسم لتفعيله (70% من القسم ظاهر)
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // تحديد الرابط النشط عند تحميل الصفحة لأول مرة (للحالة التي يكون فيها المستخدم في منتصف الصفحة)
    const currentPath = window.location.hash.substring(1); // احصل على الهاش بدون #
    if (currentPath) {
        navItems.forEach(link => {
            if (link.getAttribute('href') === '#' + currentPath) {
                link.classList.add('active');
            }
        });
    } else {
        // إذا لم يكن هناك هاش، قم بتفعيل أول رابط (عادةً "من نحن" أو "الرئيسية")
        const firstLink = document.querySelector('.nav-links li a');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
});
