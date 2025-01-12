
function onJobTypeChange() {
    const select = document.getElementById('jobTypeSelect');
    const selectedFile = select.value;

    // 如果未選擇檔案，清空表格
    if (!selectedFile) {
        const table = document.getElementById('question table');
        table.innerHTML = '<tr><td colspan="5">請選擇上方選單以載入資料</td></tr>';
        return;
    }

    // 調用函數讀取選定的 Excel 檔案
    fetchExcelFile(selectedFile);
}

function fetchExcelFile(fileName) {
    // 使用 Fetch API 加載本地 Excel 文件
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`無法加載檔案：${fileName}`);
            }
            return response.arrayBuffer();
        })
        .then(data => {
            // 使用 SheetJS 解析 Excel 數據
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // 取得第一個工作表名稱
            const sheet = workbook.Sheets[sheetName];

            // 將數據轉換為 JSON 格式
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            displayData(jsonData);
        })
        .catch(error => {
            console.error(error);
            alert('讀取 Excel 檔案失敗');
        });
}

function displayData(data) {
    const table = document.getElementById('question table');
    table.innerHTML = ''; // 清空表格內容

    // 如果沒有數據，顯示提示
    if (data.length === 0) {
        table.innerHTML = '<tr><td colspan="5">無數據可顯示</td></tr>';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result;
    const question = jsonData[1].B;
    const option1 = jsonData[1].C;
    const option2 = jsonData[1].D;
    const option3 = jsonData[1].E;
    const option4 = jsonData[1].F;

    document.getElementById('question').innerHTML = question;
    document.getElementById('option1').nextElementSibling.textContent = option1;
    document.getElementById('option2').nextElementSibling.textContent = option2;
    document.getElementById('option3').nextElementSibling.textContent = option3;
    document.getElementById('option4').nextElementSibling.textContent = option4;
    };
}
// 變更職類時變化背景
const jobTypeSelect = document.getElementById('jobTypeSelect');
const dttable = document.getElementById('dataTable');
// 監聽 select 變化
jobTypeSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    if(selectedValue === "11800電腦軟體應用"){
        dttable.style.backgroundColor = "#27FF26";   
    }
    else if(selectedValue === "02800工業電子"){
        dttable.style.backgroundColor = "#27FF26";
    }else if(selectedValue === "11900電腦軟體設計"){
        dttable.style.backgroundColor = "#27FF26";
    }else if(selectedValue === "12000電腦硬體裝修"){
        dttable.style.backgroundColor = "#27FF26";
    }else if(selectedValue === "11700數位電子乙級"){
        dttable.style.backgroundColor = "yellow";
    }else if(selectedValue === "12000電腦硬體裝修乙級"){
        dttable.style.backgroundColor = "yellow";
    }
});
