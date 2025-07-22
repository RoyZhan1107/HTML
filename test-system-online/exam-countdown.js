let timerInterval;
let countdownEnd;

document.getElementById('JobCategory').addEventListener('change', function(){
    const selected = this.value;
    
    if(selected !== ""){
        //設定倒計時總秒數
        const countdownDuration = 60 * 60 + 2400; // 1 小時 40 分鐘 = 100 分鐘的秒數
        // 計數倒計時結束時間
        countdownEnd = Date.now() + countdownDuration * 1000;
        // 若已經有 timerInterval，先清除再重新啟動
        if(timerInterval) clearInterval(timerInterval);
        // 啟動倒數
        timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // 立即更新畫面
    }else{
        document.getElementById('countdown').innerText = "請選擇職類以開始倒計時";
    }
});

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