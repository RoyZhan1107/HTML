function startCountdown(targetDate) {
    const target = new Date(targetDate).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
            document.getElementById("countdown").innerText = "時間已到！";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerText =
            `${days} Day ${hours} : ${minutes} : ${seconds} `;
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // 立即更新一次
}
// 設定目標日期
//const targetDate = document.getElementById("targetDate").innerText;
const targetDate = "2026-01-23 00:00:00";
startCountdown(targetDate);