// 載入題庫 json 檔
let questions = [];
let currentIndex = 0;
// 根據職類名稱正確載入
function loadQuestion(category){
    fetch(`question/${category}.json`)
        .then(res => {
            if(!res.ok) throw new Error('載入失敗');
            return res.json();
        })
        .then(data => {
            questions = data;
            currentIndex = 0;
            displayQuestion();
        })
        .catch(err => console.error('讀到 JSON 但顯示失敗:', err));
}

// 載入題目
function displayQuestion(){
    const q = questions[currentIndex];
    document.getElementById("question").textContent = q.question;

    document.querySelector("label[for='option1']").textContent = q.options[0];
    document.querySelector("label[for='option2']").textContent = q.options[1];
    document.querySelector("label[for='option3']").textContent = q.options[2];
    document.querySelector("label[for='option4']").textContent = q.options[3];

    ['option1', 'option2', 'option3', 'option4'].forEach(id => {
        document.getElementById(id).checked = false;
    });
}

function Next(){
    if(currentIndex < questions.length - 1){
        currentIndex++;
        displayQuestion();
    }
}

function Previous(){
        if(currentIndex > 0){
        currentIndex++;
        displayQuestion();
    }
}