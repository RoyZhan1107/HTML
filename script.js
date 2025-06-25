// Prevent right-click context menu
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
// change luanguage
function language(lang){
    if(lang === "en"){
        document.getElementById("header").textContent = "HTML Website Home";
        document.getElementById("home").textContent = "Home";
        document.getElementById("clock").textContent = "Clock";
        document.getElementById("Digital-Clock").textContent = "Digital-Clock";
        document.getElementById("TUEE-Countdown").textContent = "TUEE-Countdown";
        document.getElementById("GSAT-Countdown").textContent = "GSAT-Countdown";
        document.getElementById("calculator").textContent = "Calculator";
        document.getElementById("BMI-Calculator").textContent = "BMI-Calculator";
        document.getElementById("Time-Calculator").textContent = "Time-Calculator";
        document.getElementById("photo").textContent = "Photo";
        document.getElementById("Auto-Photo-Scroll").textContent = "Auto-Photo-Scroll";
        document.getElementById("Graduation-Album").textContent = "Graduation-Album-Electronics";
        document.getElementById("Time-Calculator").textContent = "Time-Calculator";
        document.getElementById("other").textContent = "Ohter";
        document.getElementById("piano").textContent = "Piano";
        document.getElementById("chatbot").textContent = "ChatBot";
        document.getElementById("music-player").textContent = "Music-Player";
        document.getElementById("dictionary-king").textContent = "Dictionary-King";
        document.getElementById("content").textContent = "These websites are all beta versions.";
        document.getElementById("TSO").textContent = "Test-System-Online";
        document.getElementById("OOXX").textContent = "Tic-Tac-Toe";
        document.getElementById("footer").innerHTML = "&copy; Writer: Roy Zhan<br> Our beta websites are still in active development.<br> They're available now to help us test if everything <br> works as intended.<br>Some fetures are still missing, and we appreciate your <br> patience and understanding!";
    }
    else if(lang === "zh"){
        document.getElementById("header").textContent = "HTML 網站首頁";
        document.getElementById("home").textContent = "首頁";
        document.getElementById("clock").textContent = "時鐘";
        document.getElementById("Digital-Clock").textContent = "電子鐘";
        document.getElementById("TUEE-Countdown").textContent = "統測倒計時";
        document.getElementById("GSAT-Countdown").textContent = "學測倒計時";
        document.getElementById("calculator").textContent = "計算機";
        document.getElementById("BMI-Calculator").textContent = "BMI計算機";
        document.getElementById("Time-Calculator").textContent = "時間計算機";
        document.getElementById("photo").textContent = "照片";
        document.getElementById("Auto-Photo-Scroll").textContent = "自動照片滾動";
        document.getElementById("other").textContent = "其他";
        document.getElementById("piano").textContent = "鋼琴";
        document.getElementById("chatbot").textContent = "聊天機器人";
        document.getElementById("music-player").textContent = "音樂播放器";
        document.getElementById("dictionary-king").textContent = "字典王";
        document.getElementById("content").textContent = "以下網站皆為 Beta 測試版";
        document.getElementById("TSO").textContent = "線上測驗系統";
        document.getElementById("OOXX").textContent = "井字遊戲";
        document.getElementById("footer").innerHTML = "&copy; 作者: 嚴浩軒<br> Beta 測試版網站目前都正在盡全力開發當中<br>為了測試網站是否能正常運作，因此上架測試<br>但功能目前還不完整，敬請見諒";
    }
}