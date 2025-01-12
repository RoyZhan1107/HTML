document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('請選擇檔案');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        displayData(jsonData);
    };
    reader.readAsArrayBuffer(file);
});

const fs = require('fs');
const XLSX = require('xlsx');
const filePaths = 'D:/Program/PC/HTML/線上測驗系統/11800電腦軟體應用.xlsx';
const fileBuffer = fs.readFileSync(filePaths);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet);
console.log(jsonData);

