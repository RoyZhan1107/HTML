// 載入題庫 json 檔
let questions = [];
let currentIndex = 0;
// 根據職類名稱正確載入
function loadExam(){
    const category = document.getElementById("JobCategory").value;

    fetch(`question/${category}.json`)
    .then(res => res.json())
    .then(data => {
        /*
        questions = data;
        renderQuestion(currentIndex);
        */
       console.log("載入前:", data.length);
       console.log("題庫長度:", data.length);
       questions = Random(data, 80);
       console.log("隨機後 question 長度:", questions.length);
       console.log("抽題後:", selected.length);
    //    currentIndex = 0;
       loadExam();
    })
    .catch(err => {
        console.error("讀到 JSON 但顯示失敗:", err);
    });
}

// 載入題目
function renderQuestion(index){
    const q = questions[currentIndex];
    document.getElementById("question").textContent = q.question;
    document.getElementById("label1").textContent = q.option[0];

    // 顯示圖片 (如果有)
    const imgEl = document.getElementById("que-img");
    if(q.image){
        imgEl.src = q.image;
        imgEl.style.display = "block";
    }else{
        imgEl.style.display = "none";
    }
    // 顯示選項
    for (let i = 0; i < 4; i++) {
    const option = q.options[i];
    const radio = document.getElementById(`option${i + 1}`);
    const label = document.getElementById(`label${i + 1}`);

    if (!radio || !label) continue;

    radio.value = option;

        if (/\.(jpg|jpeg|png|gif)$/i.test(option.trim())) {
            // 如果是圖片選項
            label.innerHTML = `<img src="${option}" alt="選項${i + 1}" style="max-width: 250px; vertical-align: middle;">`;
        } else {
            // 如果是文字選項
            label.textContent = option;
        }
    }
}
// 亂數出題
function shuffleArray(array){
    // 
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j] = [array[j], array[i]]];
    }
    return array;
}

function Random(allQuestions, count = 80){
    const shuffled = shuffleArray([...allQuestions]);
    return shuffled.slice(0, count);
}
// 下一題
function Next(){
    if(currentIndex < questions.length - 1){
        currentIndex++;
        loadExam();
    }
}
// 上一題
function Previous(){
        if(currentIndex > 0){
        currentIndex--;
        loadExam();
    }
}
// 取消作答
function clear(){
    const options = document.getElementById("options");
    options.innerText = 0;
}
let userAnswers = new Array(80).fill(""); //記錄用戶答題，共計 80 題
// 儲存答案
function saveAnswer(){
    userAnswers[index] = value;
    renderQueTotal();
}
// 答題紀錄
function renderQueTotal(){
    const table = document.getElementById("que-total");
    table.innerHTML = "";
    let index = 0;

    for(let i = 0; i < 8; i++){
        const row = document.createElement("tr");
        for(let j = 0; j < 10; j++){
            const cell = document.createElement("td");
            const btn = document.createElement("button");
            btn.textContent = String(index + 1).padStart(2, '0');
            btn.onclick = function(){
                loadExam();
                queTotal();
            };
            
            const ansDiv = document.createElement("div");
            ansDiv.className = "user-answer";
            ansDiv.style.fontSize = "18px";
            ansDiv.style.color = "#666";
            ansDiv.textContent = userAnswers[index] || "";

            cell.appendChild(btn);
            cell.appendChild(ansDiv);
            row.appendChild(cell);
            index++;
        }
        table.appendChild(row);
    }
}
document.querySelectorAll("input[name='options']").forEach((radio, i) => {
    radio.onclick = () => {
        const selectedValue = radio.value;
        saveAnswer(currentIndex, selectedValue);
    };
});
// 顯示作答總覽
function queTotal(event){
    event.preventDefault();
    const queTotal = document.getElementById("que-total");
    const queTable = document.getElementById("que-table");
    const isTrue = queTotal.style.display === "block";

    if(isTrue){
        queTotal.style.display = "none";
        queTable.style.display = "table";
    }else{
        queTotal.style.display = "block";
        queTable.style.display = "none";
        renderQueTotal();
    }
}
// 確定按鈕
function ok(){
    const clear = document.getElementById("right-click-msg");
    clear.style.display = "none";
}
// 定義兩個倒計時
let cdEnd1, cdEnd2, timer1, timer2;
// 
document.getElementById('JobCategory').addEventListener('change', function(){
    const selected = this.value;

    if(selected != ""){
        // 設定 1 小時 40 分鐘倒計時總秒數
        const cd1 = 100 * 60 * 1000;
        // 計時倒計時結束時間
        cdEnd1 = Date.now() + cd1;
        if(timer1) clearInterval(timer1);
        timer1 = setInterval(updatecd1, 1000);
        updatecd1();
        // 設定 15 分鐘倒計時總秒數
        const cd2 = 15 * 60 * 1000;
        cdEnd2 = Date.now() + cd2;
        if(timer2) clearInterval(timer2);
        timer2 = setInterval(updatecd2, 1000);
        updatecd2();
    }else{
        document.getElementById('countdown').innerText = "請選擇測試職類級別以開始倒計時";
        document.getElementById('countdownBtn').innerText = "請選擇測試職類級別以開始倒計時";
    }
});
// 顯示倒計時 1 小時 40 分鐘
function updatecd1(){
    const now = Date.now();
    const remaining = cdEnd1 - now;

    if(remaining <= 0){
        document.getElementById('countdown').innerText = "時間到!系統自動收卷評分!";
        document.getElementById('time-msg').textContent = "時間到!系統自動收卷評分!";
        clearInterval(timer1);
        return;
    }
    const h = Math.floor((remaining / 1000 / 60 / 60) % 24);
    const m = Math.floor((remaining / 1000 / 60) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    // 更新倒計時顯示
    document.getElementById('countdown').innerText = `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')}: ${String(s).padStart(2, '0')} `;
}
// 顯示倒計時 15 分鐘
function updatecd2(){
    const now = Date.now();
    const remaining = cdEnd2 - now;

    if(remaining <= 0){
        document.getElementById('countdownBtn').innerText = "提前結束測試";
        clearInterval(timer2);
        return;
    }

    const m = Math.floor((remaining / 1000 / 60) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    document.getElementById('countdownBtn').innerText = `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
}
// 變更職類時變化背景
const jobTypeSelect = document.getElementById('JobCategory');
const dttable = document.getElementById('dataTable');
// 監聽 select 變化
jobTypeSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    if(selectedValue === "11800"){
        dttable.style.backgroundColor = "#9AED9A";   
    }
    else if(selectedValue === "02800"){
        dttable.style.backgroundColor = "#9AED9A";
    }else if(selectedValue === "11900"){
        dttable.style.backgroundColor = "#9AED9A";
    }else if(selectedValue === "12000"){
        dttable.style.backgroundColor = "#9AED9A";
    }else if(selectedValue === "11700"){
        dttable.style.backgroundColor = "#FAF768";
    }else if(selectedValue === "12001"){
        dttable.style.backgroundColor = "#FAF768";
    }
});
// 禁止右鍵
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
    const msg = document.getElementById("right-click-msg");
    msg.style.display = ("flex");
    msg.style.flexDirection = ("column");
    msg.style.justifyContent = ("center");
})