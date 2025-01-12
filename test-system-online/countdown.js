//設定倒計時總秒數
const countdownDuration = 60 * 60 + 2400 // 1 小時 40 分鐘 = 100 分鐘的秒數
// 計數倒計時結束時間
const countdownEnd = Date.now() + countdownDuration * 1000;

function updateCountdown(){
    const now = Date.now();
    const remainingTime = countdownEnd - now;

    if(remainingTime <= 0){
        document.getElementById('countdown').innerText = '時間到!';
        alert('時間到，系統自動交卷!');
        clearInterval(timerInterval);
        return;
    }
    // 計算小時、分鐘和秒
    const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);    // 小時
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);       // 分鐘
    const seconds = Math.floor((remainingTime / 1000) % 60);            // 秒鐘

    // 更新倒計時顯示
    document.getElementById('countdown').innerText = `${String(hours).padStart(2, '0')} 小時` + `${String(minutes).padStart(2, '0')}分 ${String(seconds).padStart(2, '0')} 秒`;
}

// 每秒更新一次倒計時
const timerInterval = setInterval(updateCountdown, 1000);
// 初始顯示
updateCountdown();