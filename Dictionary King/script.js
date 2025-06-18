// rules
function toggle(){
    const menu = document.getElementById("rules");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// generate
let history = [];
let words = [];
fetch('vocabulary.txt')
    .then(res => res.text())
    .then(text => {
        words = text.split('\n').map(w => w.trim()).filter(Boolean);
    });

function generate(){
    if(words.length === 0){
        document.getElementById("word").textContent = 'No Loading Vocabulary';
        return;
    }
    const randomWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("word").textContent = randomWord;
    history.push(randomWord);
    updatehistory();
}

function updatehistory(){
    const list = document.getElementById("history-list");
    list.innerHTML = "";
    history.slice(-10).reverse().forEach(word => {
        const li = document.createElement("li");
        li.textContent = word;
        list.appendChild(li);
    });
}

function history(){
    const list = document.getElementById("history-list");
    list.style.display = (list.style.display === "block") ?  "none" : "block";
}

// right button eliminate
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
});