(() => {
    const root = document.documentElement;

    // Apply theme immediately (prevents flash)
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';

    themeBtn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    });

    // PDF download (triggers print dialog)
    document.getElementById('pdf-download').addEventListener('click', () => {
        window.print();
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');

    menuBtn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open);
    });

    menu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
})();
