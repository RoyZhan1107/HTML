function parseTime(timeStr){
    const parts = timeStr.split(":").map(Number);
    if(parts.length !== 3) return null;
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
}

function formatTime(totalSeconds){
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
}

function calculateTime(){
    const start = document.getElementById("startTime").value.trim();
    const end = document.getElementById("endTime").value.trim();

    const startSec = parseTime(start);
    const endSec = parseTime(end);

    if(startSec === null || endSec === null){
        document.getElementById("result").textContent = "請輸入正確的時間格式。 (HH:MM:SS)";
        return;
    }

    const totalSec = endSec - startSec;
    const resultTime = formatTime(totalSec % 86400); // 超過一天會重設
    document.getElementById("result").textContent = `計算結果: ${resultTime}`;
}

// Prevent right-click context menu
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
});