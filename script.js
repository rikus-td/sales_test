const ALLOWED_EMAIL = 'info@rikus.me';
let currentSlideIndex = 0;

// マウスの座標を取得してCSS変数に渡す（光の追従効果）
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// 認証チェック処理
function checkAccess() {
    const input = document.getElementById('emailInput').value.toLowerCase();
    const gate = document.getElementById('gate');
    const content = document.getElementById('content');
    const error = document.getElementById('errorMessage');
    const slideNav = document.getElementById('slideNav');

    if (input === ALLOWED_EMAIL) {
        // フェードアウト効果
        gate.style.opacity = '0';
        setTimeout(() => {
            gate.style.display = 'none';
            content.style.display = 'block';
            if (slideNav) slideNav.style.display = 'flex';
            sessionStorage.setItem('ta_auth_token', 'active');
            initObserver();
        }, 500);
    } else {
        error.style.display = 'block';
    }
}

// スクロール監視と現在地の同期
function initObserver() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // カレントスライドのインデックスを更新
                currentSlideIndex = slides.indexOf(entry.target);
            }
        });
    }, { threshold: 0.5 }); // 画面の50%に入ったら発火

    slides.forEach(slide => observer.observe(slide));
}

// スライド遷移処理（ボタン・キーボード用）
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= 0 && index < slides.length) {
        currentSlideIndex = index;
        slides[currentSlideIndex].scrollIntoView({ behavior: 'smooth' });
    }
}

// キーボードイベントの登録
document.addEventListener('keydown', (e) => {
    // 認証ゲート表示中はキーボード操作を無効化
    if (document.getElementById('gate').style.display !== 'none') return;
    
    // 次へ進むキー
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        goToSlide(currentSlideIndex + 1);
    } 
    // 前へ戻るキー
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goToSlide(currentSlideIndex - 1);
    }
});

// 初期ロード処理
window.onload = () => {
    if (sessionStorage.getItem('ta_auth_token') === 'active') {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        const slideNav = document.getElementById('slideNav');
        if (slideNav) slideNav.style.display = 'flex';
        initObserver();
    }
};
