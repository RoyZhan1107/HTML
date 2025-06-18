// rules
function toggle(id){
    const menu = document.getElementById(id);
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// generate
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
}

// right button eliminate
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
});