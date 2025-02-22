let currentPage = 0;
const pages = document.querySelectorAll('.page');
const rightPages = document.querySelectorAll(".right-page");
const leftPages = document.querySelector(".left-page");

function showPage(index){
    pages.forEach((page, i) => {
        page.style.zIndex = pages.length - i;
        page.classList.toggle("hidden", i < index);
    });
    leftPages.forEach((page, i) => {
        page.classList.toggle("up", i < index);
    });
}

function flipPage(direction){
    if(direction === 1 && currentPage < pages.length - 1){
        pages[currentPage].classList.add('flipped');
        currentPage++;
    }
    else if(direction === -1 && currentPage > 0){
        currentPage--;
        pages[currentPage].classList.remove('flipped');
    }
    
}
showPage(0 + i++);