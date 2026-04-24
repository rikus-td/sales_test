const ALLOWED_EMAIL = 'info@rikus.me';

function checkAccess() {
    const input = document.getElementById('emailInput').value.toLowerCase();
    const gate = document.getElementById('gate');
    const content = document.getElementById('content');
    const error = document.getElementById('errorMessage');

    if (input === ALLOWED_EMAIL) {
        gate.style.opacity = '0';
        setTimeout(() => {
            gate.style.display = 'none';
            content.style.display = 'block';
            document.getElementById('userDisplay').innerText = `Authorized Session: ${input}`;
            sessionStorage.setItem('ta_auth_token', 'active');
            initObserver();
        }, 500);
    } else {
        error.style.display = 'block';
        error.animate([{ transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }], { duration: 100, iterations: 3 });
    }
}

function initObserver() {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));
}

window.onload = () => {
    if (sessionStorage.getItem('ta_auth_token') === 'active') {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('userDisplay').innerText = `Authorized Session: ${ALLOWED_EMAIL}`;
        initObserver();
    }
};
