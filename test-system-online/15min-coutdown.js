let cdEnd;

document.getElementById('JobCategory').addEventListener('change', function(){
    const selected = this.value;
    
    if (selected !== "") {
        const countdown = 60 * 15; // 15 分鐘
        cdEnd = Date.now() + countdown * 1000;

        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(upCountdown, 1000);
        upCountdown(); // 立即更新顯示
    } else {
        document.getElementById('countdownBtn').innerText = "請選擇職類以開始倒計時";
    }
});

function upCountdown() {
    const now = Date.now();
    const remainingTime = cdEnd - now;

    if (remainingTime <= 0) {
        document.getElementById('countdownBtn').textContent = '時間到，交卷！';
        clearInterval(timerInterval);
        return;
    }

    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    document.getElementById('countdownBtn').textContent = `${String(minutes).padStart(2, '0')}分 ${String(seconds).padStart(2, '0')}秒`;
}