// Prevent right-click context menu
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

// Equipment Service Worker Registration
document.addEventListener("DOMContentLoaded", function() {
    checkMaintenanceTime();
});

function checkMaintenanceTime(){
    const now = new Date();
    const hours = now.getHours();

    if(hours >= 1 && hours < 6){
        document.body.innerHTML = `
            <div style="display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        flex-direction: column;
                        background: #000;
                        color: #fff;
                        text-align: center;">
            <header> 系統維護中
                <p>系統維護時間: 01:00(A.M.) - 05:59(A.M.)</p>
                    <p>目前時間為系統正在維護中，造成您的不便，敬請見諒</p>
            </header>
            </div>`;
    }
}