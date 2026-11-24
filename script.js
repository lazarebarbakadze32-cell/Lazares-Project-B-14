document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page-section');
    const navButtons = document.querySelectorAll('.nav-btn');
    const links = document.querySelectorAll('a[href^="#"]');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    const bgClasses = {
        'home': 'bg-home',
        'm3': 'bg-m3',
        'm5f90': 'bg-m5f90',
        'm5f10': 'bg-m5f10'
    };

    function switchPage(pageId) {
        if (!bgClasses[pageId]) {
            pageId = 'home';
        }

        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === `#${pageId}`) {
                btn.classList.add('active');
            }
        });

        document.body.className = bgClasses[pageId];

        if (navLinks) navLinks.classList.remove('open');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            if (window.location.hash !== `#${targetId}`) {
                window.location.hash = targetId;
            }
            switchPage(targetId);
        });
    });

    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash.replace('#', '');
        switchPage(currentHash);
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && bgClasses[initialHash]) {
        switchPage(initialHash);
    }

    // Register / Log in & Contact Us ფორმების დამუშავება
    const forms = document.querySelectorAll('.form-card');
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = form.querySelector('h3')?.textContent?.trim() || 'Form';
            const clickedBtn = e.submitter?.textContent?.trim();

            let msgText = `${title} — წარმატებით გაიგზავნა!`;
            if (clickedBtn === 'Register') {
                msgText = 'რეგისტრაცია (Register) წარმატებით შესრულდა!';
            } else if (clickedBtn === 'Log in') {
                msgText = 'შესვლა (Log in) წარმატებით შესრულდა!';
            } else if (clickedBtn === 'Send Message') {
                msgText = 'შეტყობინება (Contact Us) წარმატებით გაიგზავნა!';
            }

            let statusEl = form.querySelector('.form-status');
            if (!statusEl) {
                statusEl = document.createElement('p');
                statusEl.className = 'form-status';
                statusEl.style.marginTop = '8px';
                statusEl.style.fontSize = '0.92rem';
                statusEl.style.color = '#7dd3fc';
                form.appendChild(statusEl);
            }

            statusEl.textContent = msgText;
            form.reset();
        });
    });
});