// 載入 Excel 資料
document.getElementById('excelFileInput').addEventListener('change',function(e){
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event){
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, {type: 'array'});

        console.log(workbook.SheetNames);

        //讀取第二個工作表
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];

        console.log(XLSX.utils.sheet_to_json(workbook, {header: 1 }));
        //讀取第二個工作表中的資料
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for(let rowNum = 1; rowNum <= 5; rowNum++){
            const cellAddress = XLSX.endcode_cell({r: rowNum, c: 1});
            const cell = worksheet[cellAddress];

            console.log(`Row${rowNum}:`, cell ? cell.v :"無資料");
            if(cell){
                document.getElementById(`item${rowNum}`).textContent = cell.v;
            }else{
                document.getElementById(`item${rowNum}`).textContent = "無資料";
            }
        }
    };
    reader.readAsArrayBuffer(file);
});

// 倒計時
//設定倒計時的總秒數
const countdownDuration = 60 * 60 + 2400 // 1 小時 40 分鐘 = 100 分鐘的秒數
//計算倒計時結束時間
const countdownEnd = Date.now() + countdownDuration * 1000;

function updateCountdown(){
    const now = Date.now();
    const remainingTime = countdownEnd - now;

    if(remainingTime <= 0){
        document.getElementById('countdown').innerText = '時間到!';
        clearInterval(timerInterval);
        return;
    }
    // 計算小時、分鐘和秒
    const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24); //小時
    const minutes = Math.floor((remainingTime / 1000  / 60) % 60);	// 分鐘
    const seconds = Math.floor((remainingTime / 1000) % 60);		// 秒鐘
    
    //更新倒計時顯示
    document.getElementById('countdown').innerText = `${String(hours).padStart(2, '0')} 小時` + `${String(minutes).padStart(2, '0')}分 ${String(seconds).padStart(2, '0')}秒`;
}

// 每秒更新一次倒計時
const timerInterval = setInterval(updateCountdown, 1000);
// 初始顯示
updateCountdown();
// combox 選項
document.getElementById('jobClassSelect').addEventListener('change', function(){
    const selectedValue = this.value;
    if(selectedValue){
        loadExcelData(selectedValue);
    }else{
        //清空表格
        for(let i = 1; i <= 5; i++){
            document.getElementById(`item${i}`).textContent = "尚未載入";
        }
    }
});

function loadExcelData(selectedValue){
    let filePath = '';
    
    if(selectedValue === "11800電腦軟體應用"){
        window.open("D:/Program/PC/HTML/線上測驗系統-測驗卷/11800-Computer Soft Applications.xlsx", '_blank');
    }else if(selectedValue === "11900電腦軟體設計"){
        window.open("D:/Program/PC/HTML/線上測驗系統-測驗卷/11900-Computer Soft Design.xlsx", "_balnk");
    }else{
        console.error("無效的職類選擇");
        return;
    }

    if(!filePath){
        console.error("檔案位置錯誤");
        return;
    }

    fetch(filePath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP 錯誤! 狀態馬: ${response.status}`);
        }
        return response.arrayBuffer();
    })
    .then(data => {
        const workbook = XLSX.read(data, {type: 'array'});

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const range = XLSX.utils.decode_range(worksheet['!ref']);

        for(let rowNum = 1; rowNum <= 5; rowNum++){
            const cellAddress = XLSX.utils.endcode_cell({r: rowNum, c: 1});
            const cell = worksheet[cellAddress];

            if(cell){
                document.getElementById(`item${rowNum}`).textContent = cell.v;
            }else{
                document.getElementById(`item${rowNum}`).textContent = "無資料";
            }
        }
    })
    .catch(error => {
        console.error("載入 Excel 檔案時發生錯誤:", error);
    })
}
/*
document.addEventListener('DOMContentLoaded', function(){
    // 確保你的代碼在 DOM 加載完成後執行
    const button = document.getElementById('yourButtonId');
    if(button){
        button.addEventListener('click', function(){
            // 你的事件處理邏輯
            console.log('Butoon clicked');
        });
    }else{
        console.error('Button not found');
    }
});
*/