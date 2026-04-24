const ALLOWED_EMAIL = 'info@rikus.me';

// 認証チェック
function checkAccess() {
    const emailInput = document.getElementById('emailInput').value.toLowerCase();
    const gate = document.getElementById('gate');
    const content = document.getElementById('content');
    const error = document.getElementById('errorMessage');

    if (emailInput === ALLOWED_EMAIL) {
        // ゲートを隠し、コンテンツを表示
        gate.style.display = 'none';
        content.style.display = 'block';
        
        // ユーザー情報を表示
        if (document.getElementById('userDisplay')) {
            document.getElementById('userDisplay').innerText = `Authorized Access: ${emailInput}`;
        }
        
        // セッション保存
        sessionStorage.setItem('is_authorized', 'true');

        // コンテンツが表示された後にアニメーション監視を開始
        setTimeout(initScrollObserver, 100);
    } else {
        error.style.display = 'block';
    }
}

// スクロール監視の初期化
function initScrollObserver() {
    const observerOptions = {
        threshold: 0.3 // 30%見えたら発火
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => observer.observe(slide));
}

// ページ読み込み時の処理
window.onload = () => {
    // 既に認証済みの場合はゲートをスキップ
    if (sessionStorage.getItem('is_authorized') === 'true') {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        if (document.getElementById('userDisplay')) {
            document.getElementById('userDisplay').innerText = `Authorized Access: ${ALLOWED_EMAIL}`;
        }
        initScrollObserver();
    }
};
