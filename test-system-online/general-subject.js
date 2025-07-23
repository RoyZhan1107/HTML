let excelData = null;

	//當選擇 Excel 檔案時觸發
	document.getElementById('excelFileInput').addEventListener('change', function(e){
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = function(event){
			const data = new Uint8Array(event.target.result);
			const workbook = XLSX.read(Data, { type: 'array'});

			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			excelData = XLSX.sheet_to_json(worksheet, {Headers :1});

			matchFileNameWithJobType(selectedJobType);
		};
		reader.readAsArrayBuffer(file);
	});

	function onJobTypeChange(selectedJobType){
		// 顯示 Excel 題目到表格裡
		const tableBody = document.querySelector("#questionTable tbody");
		tableBody.innerHTML = ""; // 清空表格內容
		
		for(let i = 2; i < excelData.length; i++){ //假設題目從第三行開始
			const row = excelData[i];
			if(row){
				const tr = document.createElement("tr");
				const tdNumber = document.createElement("td");
				const tdQuestion = document.createElement("td");
				const tdOptions = document.createElement("td");

				tdNumber.textContent = i - 1; //題號
				tdQuestion.textContent = row[1] || "無內容"; // 題目內容(假設題目在第二欄)
				const optionHtml = `
					<input type="radio" name="question_${i}" value="${row[2]}"> ${row[2]}
					<input type="radio" name="question_${i}" value="${row[3]}"> ${row[3]}
					<input type="radio" name="question_${i}" value="${row[4]}"> ${row[4]}
					<input type="radio" name="question_${i}" value="${row[5]}"> ${row[5]}
					`;
					tdOptions.innerHTML = optionHtml;
				
				tr.appendChild(tdNumber);
				tr.appendChild(tdQuestion);
				tr.appendChild(tdOptions);
				tableBody.appendChild(tr);
			}
		}
	}