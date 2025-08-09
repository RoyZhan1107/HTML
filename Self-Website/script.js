// 偵測語言
const pathParts = window.location.pathname.split('/');
const folder = pathParts.filter(Boolean)[4]; // 取第一層資料夾名稱
// 依照語言切換打字內容
const langData = {
    "tw-zh": {
        "text": "一位喜歡開發程式且對英語很有興趣的開發者🚀",
        "email": "zi.qi.zhan.1107@gmail.com",
        "subject": "哈囉！",
        "body": "嗨，我想與你聯絡..."
    },
    "us-en": {
        "text": "A developer passionate about coding and English 🚀",
        "email": "zi.qi.zhan.1107@gmail.com",
        "subject": "Hello!",
        "body": "Hi, I would like to contact you..."
    }
};
// 預設中文資料
const data = langData[folder] || langData["tw-zh"];
// 打字機效果
let i = 0;
function typing(){
    if(i < data.text.length){
        document.getElementById("typing").innerHTML += data.text.charAt(i);
        i++;
        setTimeout(typing, 100);
    }
}
typing();
// 滾動顯示動畫
window.addEventListener("scroll", () => {
    document.querySelectorAll("section").forEach(sec => {
        if(sec.getBoundingClientRect().top < window.innerHeight - 100){
            sec.classList.add("show");
        }
    });
});
// 粒子背景
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw(){
        ctx.fillStyle = "#00ff99";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function init(){
    particlesArray = [];
    for(let i = 0; i < 100; i++){
        particlesArray.push(new particle());
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}
init();
animate();

// Emial
document.getElementById("email").addEventListener("click", function(e) {
    e.preventDefault();
    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}&su=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`,
        "_blank");
});
// 限制右鍵
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
});