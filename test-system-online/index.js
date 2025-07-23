function openFashionWinow(){
    const selectedOption = document.querySelector('input[name="fashion"]:checked');

    if(!selectedOption){
        alert("請選擇一個選項!");
        return;
    }

    // 根據選擇打開對應的視窗
    if(selectedOption.nextSibling.textContent.includes("檢定測驗")){
        window.open("test.html",'_blank');
    }
    if(selectedOption.nextSibling.textContent.includes("職業安全與衛生共同科目")){
        window.open("general-subject.html",'_blank');
    }
}

// 設備維護時間
document.addEventListener("DOMContentLoaded", function(){
    checkMaintenanceTime();
});

function checkMaintenanceTime(){
    const now = new Date();
    const hours = now.getHours();
    if(hours >= 1 && hours < 6){
        document.body.innerHTML = 
        `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; background: #1d1d1d; color: #fff; text-align: center;">
	<header style="position: absolute; top: 0; width: 100%; background-color: #333; color: #fff; padding: 10px 0 ; text-align: center;">系統維護中</header>
	<p>系統維護時間: 01:00(A.M.) - 06:00(A.M.)</p>
	<p>目前時間為系統正在維護中，造成您的不便，敬請見諒</p>
</div>`;
    }
}