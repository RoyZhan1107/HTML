let currentPage = 1;
const pages = document.querySelectorAll('.paper');

function goPreviousPage() {
    pages[currentPage - 1].classList.add('flipped');
    if (currentPage > 1) {
        currentPage--;
    } else {
        currentPage = pages.length;
    }
}

function goNextPage() {
    pages[currentPage - 1].classList.add('flipped');
    currentPage++;
    if (currentPage > pages.length) {
        currentPage = 1;
    }
}
