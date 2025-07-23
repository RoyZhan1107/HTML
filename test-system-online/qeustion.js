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