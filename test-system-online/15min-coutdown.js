//設定倒計時總秒數
const countdown = 60 * 15; // 15 分鐘的秒數
// 計數倒計時結束時間
const cdEnd = Date.now() + countdown * 1000;

function upCountdown(){
    const now = Date.now();
    const remainingTime = cdEnd - now;

    if(remainingTime <= 0){
        document.getElementById('countdownBtn').textContent = '提前交卷';
        clearInterval(timer);
        return;
    }
    // 計算小時、分鐘和秒                        
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);       // 分鐘
    const seconds = Math.floor((remainingTime / 1000) % 60);            // 秒鐘

    // 更新倒計時顯示
    document.getElementById('countdownBtn').textContent = `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`;
}

// 每秒更新一次倒計時
const timer = setInterval(upCountdown, 1000);
// 初始顯示
upCountdown();