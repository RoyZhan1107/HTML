const nt1 = document.getElementById("nt1");
const nt5 = document.getElementById("nt5");
const nt10 = document.getElementById("nt10");
const nt50 = document.getElementById("nt50");
const nt100 = document.getElementById("nt100");
const nt500 = document.getElementById("nt500");
const nt1000 = document.getElementById("nt1000");
const result = document.getElementById("result");

const path = window.location.pathname.split('/');
const folder = path.filter(Boolean)[4]; // 取第四層資料夾名稱

const langData = {
    "us-en": {
        "error": "Quantity cannot be empty",
        "total": "Total Amount: ",
        "dollar": "Dollars"
    },
    "tw-zh": {
        "error": "數量不能為空值",
        "total": "總金額: ",
        "dollar": "元"
    }
};
const data = langData[folder] || langData["tw-zh"];
function calculateBtn(){
    const total = (nt1.value * 1) + (nt5.value * 5) + (nt10.value * 10) + (nt50.value * 50) + (nt100.value * 100) + (nt500.value * 500) + (nt1000.value * 1000);
    if(nt1.value === "" && nt5.value === "" && nt10.value === "" && nt50.value === "" && nt100.value === "" && nt500.value === "" && nt1000.value === ""){
        alert(data["error"]);
    } else {
        result.innerHTML = `${data["total"]} ${data["dollar"]}`;
    }
}
function resetBtn(){
    nt1.value = "";
    nt5.value = "";
    nt10.value = "";
    nt50.value = "";
    nt100.value = "";
    nt500.value = "";
    nt1000.value = "";
    result.innerHTML = "";
}
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});