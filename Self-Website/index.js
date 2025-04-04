document.addEventListener('DOMContentLoaded', function() {
    const frontPaper = document.querySelector('.front-paper');
    const backPaper = document.querySelector('.back-paper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // 鍵盤控制事件
    prevBtn.addEventListener('click', () => {
        backPaper.style.transform = 'rotateY(360deg)';
    });

    nextBtn.addEventListener('click', () => {
        frontPaper.style.transform = 'rotateY(180deg)';
    });
});
