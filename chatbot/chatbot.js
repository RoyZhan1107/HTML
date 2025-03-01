const messagesContainer = document.getElementById("messages");
const chatLog = document.getElementById("chat-log");
// 預設回答邏輯
const responses = {
    "你好": "您好!有什麼可以幫助您的嗎?",
    "你是誰": "我是您的聊天機器人!",
    "天氣如何": "您可以查詢當地的天氣網站，我建議使用 windy，<a href='https://www.windy.com/' target='_blank'>點擊這裡查看天氣</a>",
    "中和區的天氣如何": "您可以查詢當地的天氣網站，我建議使用 windy，<a href='https://www.windy.com/24.999/121.499?24.858,121.499,10/' target='_blank'>點擊這裡查看天氣</a>",
    "現在時間": () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const secods = String(now.getSeconds()).padStart(2, "0");
        return `當前時間是${hours}:${minutes}:${secods}`;
    },
    "今日日期": () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const week = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
        const Week = week[now.getDay()];
        return `當前日期是${year}年${month}月${day}日，${Week}`;
    },
    "知道瑞芳高工嗎": "當然知道，這是瑞芳高工的連結 <a href='https://web.jfvs.ntpc.edu.tw/' target='_blank'>瑞芳高工校網</a>",
    "知道曾柏翔嗎": "當然知道，這是曾柏翔(糯米糰子🍡)的哀居連結。<a href='https://www.instagram.com/xx.nn_17/' target='_blank'>哀居</a>",
    "知道張育嘉嗎": "當然知道，這是張育嘉的哀居連結。<a href='https://www.instagram.com/jiajia_126/' target='_blank'>哀居</a>",
    "知道黃名謙嗎": "當然知道，這是黃銘謙的哀居連結。<a href='https://www.instagram.com/mingqian514/' target='_blank'>哀居</a>",
    "知道黃雅蕙嗎": "當然知道，這是黃雅蕙的哀居連結。<a href='https://www.instagram.com/yahui960824/' target='_blank'>哀居</a>",
    "知道胡語晨嗎": "當然知道，這是胡語晨的哀居連結。<a href='https://www.instagram.com/huyc_.7/' target='_blank'>哀居</a>",
    "知道黃淑芬嗎": "當然知道，這是黃淑芬的哀居連結。<a href='https://www.instagram.com/070_poq/' target='_blank'>哀居</a>",
    "知道沈靜宜嗎": "當然知道，這是沈靜宜的哀居連結。<a href='https://www.instagram.com/jingyishen1218/' target='_blank'>哀居</a>",
    "知道黃柏勳嗎": "不知道，他是誰?",
    "知道周子景嗎": "當然知道，這是周子景的哀居連結。<a href='https://www.instagram.com/chou.zijing_1122/' target='_blank'>哀居</a>",
    "知道江竣翰嗎": "當然知道，這是江竣翰的哀居連結。<a href='https://www.instagram.com/harryhan_0603/' target='_blank'>哀居</a>",
    "知道陳佳希嗎": "當然知道，這是陳佳希的哀居連結。<a href='https://www.instagram.com/_.cc_16/' target='_blank'>哀居</a>",
    "知道呂玉龍嗎": "當然知道，這是呂玉龍的哀居連結。<a href='https://www.instagram.com/lyl_819_/' target='_blank'>哀居</a>",
    "知道連粟同嗎": "當然知道，這是連粟同的哀居連結。<a href='https://www.instagram.com/lian._.st0729/' target='_blank'>哀居</a>",
    "知道廖振媐嗎": "當然知道，這是廖振媐的哀居連結。<a href='https://www.instagram.com/jessie_916.star_bling/' target='_blank'>哀居</a>",
    "知道陳俊瑋嗎": "當然知道，這是陳俊瑋的哀居連結。<a href='https://www.instagram.com/weiwei_96525/' target='_blank'>哀居</a>",
    "知道藍心妤嗎": "當然知道，這是藍心妤的哀居連結。<a href='https://www.instagram.com/xinyu.0311/' target='_blank'>哀居</a>",
    "知道游易鑫嗎": "當然知道，這是游易鑫的哀居連結。<a href='https://www.instagram.com/zt_ubiysta/' target='_blank'>哀居</a>",
    "聽過boyfriend嗎": "有的，這是 boyfrined 的 youtube music 連結<a href='https://music.youtube.com/watch?v=7GOFTXLSvMI' target='_blank'> youtube msuic</a>",
    "聽過bet on me嗎": "有的，這是 bet on me 的 youtube music 連結<a href='https://music.youtube.com/watch?v=lav3ImWcvAA' target='_blank'> youtube music</a>",
    "聽過peaches嗎": "有的，這是 peaches 的 youtube music 連結<a href='https://music.youtube.com/watch?v=5rnawnfK2sQ' target='_blank'> youtube music</a>",
    "": "",
    "知道芊芊龍嗎": "當然知道，這是芊芊龍的哀居連結。<a href='https://www.instagram.com/xxxchainx2/' target='_blank'>哀居</a>",
    "知道邱致綸嗎": "當然知道，這是邱致綸的哀居連結。<a href='https://www.instagram.com/qi.ll18/' target='_blank'>哀居</a><br>同時他也是創作我的小小工程師，他還有 youtube 頻道<a href ='https://www.youtube.com/@zhanziqi' target='_blank'>youtube</a>",
    "知道嚴浩軒嗎": "當然知道，這是嚴浩軒的哀居連結。<a href='https://www.instagram.com/qi.ll18/' target='_blank'>哀居</a><br>同時他也是創作我的小小工程師，他還有 youtube 頻道<a href ='https://www.youtube.com/@zhanziqi' target='_blank'>youtube</a>",
    "知道展亓嗎": "當然知道，這是展亓的哀居連結。<a href='https://www.instagram.com/qi.ll18/' target='_blank'>哀居</a><br>同時他也是創作我的小小工程師，他還有 youtube 頻道<a href ='https://www.youtube.com/@zhanziqi' target='_blank'>youtube</a>",
    "知道芊芊龍嗎": "當然知道，這是芊芊龍的哀居連結。<a href='https://www.instagram.com/xxxchainx2/' target='_blank'>哀居</a>",
    "瑞芳高工的電話號碼是多少" : "這是瑞芳高工的電話號碼: 2497-2516",
    "瑞芳高工宿舍的電話號碼是多少" : "這是瑞芳高工的電話號碼一覽表 <img src='D:/Program/PC/HTML/chatbot/247109796.jpg' width='100%'></img>",
    "你知道什麼是愛情嗎": "關於愛情方面有很多話題可以聊，您想了解什麼?",
    "我想知道我的愛情是有用的嗎": "愛情這種東西一般來說是有用的，只要有付出都有結果，就像是給一束花澆水都能開花結果，我相信你的愛情也能像一束花一樣開花結果",
    "謝謝你的安慰": "不會~這都是我該做的，有需要歡迎找我~",
    "再見": "再見!希望很快能夠與您再次聊天!",
    "default": "抱歉，我不明白您的問題",
};

// 定義 API 金鑰和 API URL
const API_KEY = "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";
const API_URL = "https://api.ChatGPT.com";

// 發送請求函數
function fetchData(query){
    fetch(`${API_URL}?key=${API_KEY}&q=${query}`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${API_KEY}`, // 使用 Bearer Token 
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP 錯誤! 狀態碼: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("API 回應:", data);
    })
    .then(error => {
        console.error("錯誤:", error.message);
        alert("發生錯誤，請稍後再試!");
    });

}

// 測試函數
fetchData("test-query");

// 發送訊息函數
function sendMessage(){
    const userInput = document.getElementById("userInput").value.trim();
    if(userInput === "") return;

    // 顯示使用者訊息
    displayMessage(userInput, "user");

    // 取得機器人回應
    const botResponse = getBotResponse(userInput);   

    // 模擬機器人延遲回應
    setTimeout(() => {
        displayMessage(botResponse, "bot", true);
    }, 500);

    // 清空輸入框
    document.getElementById("userInput").value = "";
}

// 顯示訊息在畫面上
function displayMessage(message, sender, isHTML = false){
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    if(typeof message === "function"){
        message = message();
    }
    if(isHTML){
        messageElement.innerHTML= message;
    }
    
    else{
        messageElement.textContent = message;
    }
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // 自動捲動到底部
    
}

// 根據使用者輸入取的回應
function getBotResponse(input){
    return responses[input] || responses["default"];
}

function saveChatLog(){
    const chatLog = messagesContainer.innerText;
    const blob = new Blob([chatLog], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "聊天紀錄.txt";
    link.click();
}
function clearMessage(){
    messagesContainer.innerHTML = "";
}
// 監聽輸入框按鍵事件
document.getElementById("userInput").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});
// 設備維護時間
document.addEventListener("DOMContentLoaded", function(){
    checkMaintenanceTime();
});

function checkMaintenanceTime(){
    const now = new Date();
    const hours = now.getHours();

    if(hours >= 1 && hours < 6){
        document.body.innerHTML = 
        `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; background: black; color: white; text-align: center;">
    <header> 系統維護中
        <p>系統維護時間: 01:00(A.M.) - 05:59(A.M.)
            <p>目前時間為系統正在維護中，造成您的不便，敬請見諒</p>
        </p>
    </header>
</div>`;
    }
}