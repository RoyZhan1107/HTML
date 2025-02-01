const tableContent = {
    "員工請假": ["姓名", "員工編號", "部門", "假別", "請假日期", "請假原因", "請假證明"],
    "在家上班": ["姓名", "員工編號", "部門", "理由", ""],
    "人事調動": ["姓名", "員工編號", "部門", ""],
    "入職申請": ["姓名", "員工編號", "部門", ""]
}

function showtableContent(){
    const tableContainer = document.getElementById("tbContent");
    tableContainer.innerHTML = "";

    if(tableContent){
        tableContent
    }
    /*
    const radioSeleted = document.getElementById();
    if(radioSeleted === "員工請假"){
        document.body.innerHTML = `<td>員工請假</td>`
    }
    */
}