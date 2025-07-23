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
    for(let i = 0; i < 4; i++){
        document.getElementById(`label${i + 1}`).textContent = q.options[i];
        document.getElementById(`option${i + 1}`).value = q.options[i];
    }

    // 清空 label 內容
    labelEl.innerHTML = "";

    // 判斷是否為圖片路徑
    if (/\.(jpg|jpeg|png|gif|svg)$/i.test(optionVal.trim())) {
    const img = document.createElement("img");
    img.src = optionVal.trim();
    img.alt = `選項 ${i + 1}`;
    img.style.maxHeight = "80px"; // 你可自行調整大小
    labelEl.appendChild(img);
    } else {
    labelEl.textContent = optionVal;
    }

}
function Next(){
    if(currentIndex < questions.length - 1){
        currentIndex++;
        loadExam();
    }
}

function Previous(){
        if(currentIndex > 0){
        currentIndex--;
        loadExam();
    }
}