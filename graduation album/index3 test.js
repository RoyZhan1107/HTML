function goNextPage(){
    if(currentLocation < maxLoacation){
        switch(currentLocation){
        case 1:
            openBook();
            paper1.classList.add("flipped");
            paper1.style.zIndex = 1;
            break;
        case 2:
            paper2.classList.add("flipped");
            paper2.style.zIndex = 2;
            break;
        case 3:
            paper3.classList.add("flipped");
            paper3.style.zIndex = 3;
            break;
        case 4:
            paper4.classList.add("flipped");
            paper4.style.zIndex = 4;
            break;
        case 5:
            paper5.classList.add("flipped");
            paper5.style.zIndex = 5;
            break;
        case 6:
            paper6.classList.add("flipped");
            paper6.style.zIndex = 6;
            closeBook();
        default:
            throw new Error("unknow state");
        }
        currentLocation++;
    }
}

function goPreviousPage(){
    if(currentLocation > 1){
        switch(currentLocation){
            case 2:
                closeBook();
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 1;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 3;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 4;
                break;
            case 6:
                closeBook();
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 5;
                break;
            default:
                 throw new Error("unkown state");
        }
        currentLocation--;
    }
}
function openBook(){
    book.style.transform = "translateX(50%)";
    previous.style.transform = "translateX(-180px)";
    next.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning){
    if(!isAtBeginning) {
        book.style.transform = "translateX(100%)";
    } else {
        book.style.transform = "translateX(0%)";
    }
    previous.style.transform = "translateX(0px)";
    next.style.transform = "translateX(0px)";
}
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
previous.addEventListener("click", goPreviousPage);
next.addEventListener("click", goNextPage);