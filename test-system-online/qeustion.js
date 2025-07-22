// 載入題庫 json 檔
let questions = [];
let currentQuestionIndex = 0;
// 根據職類名稱正確載入
document.getElementById("JobCategory").addEventListener("change", function(){
    const category = this.value;
    if(category){
        fetch(`question/${category}.json`)
            .then(res => {
            console.log("fetch 回應狀態:", res.status, res.ok);
            if (!res.ok) throw new Error(`fetch 錯誤: ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log("讀到 JSON:", data);
            // 處理題庫
        })
        .catch(err => {
            console.error("Q 檔載入失敗:", err);
            alert("題庫載入失敗，請開發者查看 console");
        });
    }
});
// 載入題目
function loadQuestion(index){
    const q = questions[index];
    if(!q) return;

    document.getElementById("question").innerText = q.question;
    document.getElementById("que-img").src = q.image;

    for(let i = 0; i < 4; i++){
        const opt = document.getElementById(`opetion${i + 1}`);
        const label = document.getElementById(`label${i + 1}`);
        if(opt && label){
            opt.checked = false;
            opt.value = q.options[i]
            label.innerText = q.options[i];
        }
    }
}

function nextQuestion(){
    if(currentQuestionIndex < question.length - 1){
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }else{
        alert("已經是最後一題")
    }
}