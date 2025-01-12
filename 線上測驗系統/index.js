function openFashionWinow(){
    const selectedOption = document.querySelector('input[name="fashion"]:checked');

    if(!selectedOption){
        alert("請選擇一個選項!");
        return;
    }

    // 根據選擇打開對應的視窗
    if(selectedOption.nextSibling.textContent.includes("檢定測驗")){
        window.open("002.html",'_blank');
    }
    if(selectedOption.nextSibling.textContent.includes("Excel 檔上傳測驗")){
        window.open("001.html",'_blank');
    }
}