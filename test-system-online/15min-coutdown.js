let cdEnd;

document.getElementById('JobCategory').addEventListener('change', function(){
    const selected = this.value;
    
    if(selected !== ""){
        //設定倒計時總秒數
        const countdown = 60 * 15; // 15 分鐘的秒數
        // 計數倒計時結束時間
        cdEnd = Date.now() + countdown * 1000;
        // 若已經有 timerInterval，先清除再重新啟動
        if(timerInterval) clearInterval(timerInterval);
        // 啟動倒數
        timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // 立即更新畫面
    }else{
        document.getElementById('countdownBtn').innerText = "請選擇測試職類級別以開始倒計時";
    }
});

function updateCountdown(){
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