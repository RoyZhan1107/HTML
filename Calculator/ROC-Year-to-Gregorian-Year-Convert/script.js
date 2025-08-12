const path = window.location.pathname.split('/');
const folder = path.filter(Boolean)[4]; // 取第四層資料夾名稱

const RTG = document.getElementById("RTG");
const GTR = document.getElementById("GTR");
const s = document.getElementById("year");
const i = document.getElementById("input");
const r = document.getElementById("result");


const langData = {
    "us-en": {
        "result1": "Gregorian Year:",
        "result2": "ROC Year:",
        "error1": "Please enter a valid ROC Year.",
        "error2": "Please enter a valid Gregorian Year."
    },
    "tw-zh": {
        "result1": "西元年: ",
        "result2": "民國年: ",
        "error1": "請輸入正確的民國年",
        "error2": "請輸入正確的西元年"
    }
}

const data = langData[folder] || langData["tw-zh"]; // 使用繁體中文資料

function convert(){
    if(s.value === "RTG"){
        r.innerHTML = `<label>${data["result1"]}</label> ${parseInt(i.value) + 1911}`;
    }
    else{
        r.innerHTML = data["result2"] + (parseInt(i.value) - 1911);
    }
    if(s.value === "RTG" && i.value >= 1911){
        alert(data["error1"]);
        r.innerHTML = "";
    }
    else if(s.value === "GTR" && (i.value < 1 || i.value < 1911)){
        alert(data["error2"]);
        r.innerHTML = "";
    }
    if(isNaN(i.value) || i.value === "") {
        alert(s.value === "RTG" ? data["error1"] : data["error2"]);
        r.innerHTML = "";
    }
}