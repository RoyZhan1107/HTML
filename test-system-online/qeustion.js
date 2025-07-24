// 載入題庫 json 檔
let questions = [];
let currentIndex = 0;
// 根據職類名稱正確載入
function loadExam(){
    const category = document.getElementById("JobCategory").value;

    fetch(`question/${category}.json`)
    .then(res => res.json())
    .then(data => {
        questions = data;
        renderQuestion(currentIndex);
    })
    .catch(err => {
        console.error("讀到 JSON 但顯示失敗:", err);
    });
}

// 載入題目
function renderQuestion(index){
    const q = questions[index];
    document.getElementById("question").textContent = q.question;

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
        total.appendChild(row);
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
    const msg = document.getElementById("msg");
    msg.style.display = ("flex");
    msg.style.flexDirection = ("column");
    msg.style.justifyContent = ("center");
})