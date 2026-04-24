const ALLOWED_EMAIL = 'info@rikus.me';
let currentSlideIndex = 0;

document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

function checkAccess() {
    const input = document.getElementById('emailInput').value.toLowerCase();
    if (input === ALLOWED_EMAIL) {
        document.getElementById('gate').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('gate').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            document.getElementById('slideNav').style.display = 'flex';
            sessionStorage.setItem('auth', 'true');
            init();
        }, 500);
    } else {
        alert('Access Denied');
    }
}

function init() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                currentSlideIndex = slides.indexOf(entry.target);
            }
        });
    }, { threshold: 0.5 });
    slides.forEach(s => observer.observe(s));
}

function goToSlide(idx) {
    const slides = document.querySelectorAll('.slide');
    if (idx >= 0 && idx < slides.length) {
        slides[idx].scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) goToSlide(currentSlideIndex + 1);
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) goToSlide(currentSlideIndex - 1);
});

window.onload = () => {
    if (sessionStorage.getItem('auth') === 'true') {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('slideNav').style.display = 'flex';
        init();
    }
};
