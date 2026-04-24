const ALLOWED_EMAIL = 'info@rikus.me';

// 🌟 マウス追従ロジック
document.addEventListener('mousemove', (e) => {
    // マウスのX, Y座標を取得してCSS変数にセット
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// 認証チェック
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
            sessionStorage.setItem('ta_auth_token', 'active');
            initObserver();
        }, 500);
    } else {
        error.style.display = 'block';
    }
}

// アニメーション監視
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));
}

// 初期ロード処理
window.onload = () => {
    if (sessionStorage.getItem('ta_auth_token') === 'active') {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        initObserver();
    }
};
