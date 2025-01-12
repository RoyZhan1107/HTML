document.getElementById('fileInput').addEventListener('change', function(event) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = function(e) {
		const data = new Uint8Array(e.target.result);
		const workbook = XLSX.read(data, { type: 'array' });

		// 假設只讀取第一個工作表
		const firstSheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[firstSheetName];

		// 將工作表轉換為 JSON 格式
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		// 清空表格並填入資料
		const table = document.getElementById('excelTable');
		table.innerHTML = '';

		jsonData.forEach((row, rowIndex) => {
			const tr = document.createElement('tr');
			row.forEach(cell => {
				const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
				td.textContent = cell || '';
				tr.appendChild(td);
			});
			table.appendChild(tr);
		});
	};

	reader.readAsArrayBuffer(file);
});