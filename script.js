const ALLOWED_EMAIL = 'info@rikus.me';
let currentSlideIndex = 0; // 現在のスライド番号を記憶

// 🌟 マウス追従ロジック
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// 🔒 認証チェック
function checkAccess() {
    const input = document.getElementById('emailInput').value.toLowerCase();
    const gate = document.getElementById('gate');
    const content = document.getElementById('content');
    const error = document.getElementById('errorMessage');
    const slideNav = document.getElementById('slideNav');

    if (input === ALLOWED_EMAIL) {
        gate.style.opacity = '0';
        setTimeout(() => {
            gate.style.display = 'none';
            content.style.display = 'block';
            if(slideNav) slideNav.style.display = 'flex'; // ナビボタンを表示
            sessionStorage.setItem('ta_auth_token', 'active');
            initObserver();
        }, 500);
    } else {
        error.style.display = 'block';
    }
}

// 👁️ アニメーション監視 & 現在のスライド番号の同期
function initObserver() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // スクロールされたら、現在のスライド番号を更新する
                currentSlideIndex = slides.indexOf(entry.target);
            }
        });
    }, { threshold: 0.5 }); // 画面の半分以上見えたらカレントと判定

    slides.forEach(slide => observer.observe(slide));
}

// ⌨️ キーボード ＆ ボタンナビゲーション
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= 0 && index < slides.length) {
        currentSlideIndex = index;
        slides[currentSlideIndex].scrollIntoView({ behavior: 'smooth' });
    }
}

// キーボードの矢印キー入力イベント
document.addEventListener('keydown', (e) => {
    // ゲート表示中は無効
    if (document.getElementById('gate').style.display !== 'none') return;
    
    // 「→(右)」「↓(下)」「スペース」「PageDown」で次へ
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        goToSlide(currentSlideIndex + 1);
    } 
    // 「←(左)」「↑(上)」「PageUp」で前へ
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
        if(document.getElementById('slideNav')) document.getElementById('slideNav').style.display = 'flex';
        initObserver();
    }
};
