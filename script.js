const ALLOWED_EMAIL = 'info@rikus.me';

function checkAccess() {
    const emailInput = document.getElementById('emailInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const gate = document.getElementById('gate');
    const content = document.getElementById('content');
    const userDisplay = document.getElementById('userDisplay');

    if (emailInput.toLowerCase() === ALLOWED_EMAIL.toLowerCase()) {
        // 認証成功
        gate.style.display = 'none';
        content.style.display = 'block';
        userDisplay.innerText = `Logged in as: ${emailInput}`;
        
        // セッションに保存（ブラウザを閉じない限り有効）
        sessionStorage.setItem('isAuthenticated', 'true');
    } else {
        // 認証失敗
        errorMessage.style.display = 'block';
    }
}

// ページ読み込み時に認証済みかチェック
window.onload = function() {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('userDisplay').innerText = `Logged in: ${ALLOWED_EMAIL}`;
    }
};