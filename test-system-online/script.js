let questions = [];

fetch("question/11700.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    renderQuestion(0); // 顯示第一題
  })
  .catch(err => {
    console.error("題目載入失敗:", err);
  });


function renderQuestion(index) {
  const q = questions[index];
  document.getElementById("question").textContent = q.question;

  // 顯示圖片（如果有）
  const imgEl = document.getElementById("que-img");
  if (q.image) {
    imgEl.src = q.image;
    imgEl.style.display = "block";
  } else {
    imgEl.style.display = "none";
  }

  // 顯示選項
  for (let i = 0; i < 4; i++) {
    document.getElementById(`label${i + 1}`).textContent = q.options[i];
  }
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