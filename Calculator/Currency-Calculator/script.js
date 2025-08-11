// 定義原本貨幣、換算貨幣與歷史紀錄
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const historyList = document.getElementById("history");
// 常見貨幣選單
const currencies = ["新台幣(TWD)", "美金(USD)", "日圓(JPY)", "歐元(EUR)", "人民幣(CNY)", "港元(HKD)"]
// 初始化貨幣選單
currencies.forEach(curr => {
    const option1 = document.createElement("option");
    option1.value = curr;
    option1.textContent = curr;
    fromSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = curr;
    option2.textContent = curr;
    toSelect.appendChild(option2);
});
fromSelect.value = "美金(USD)";
toSelect.value = "新台幣(TWD)";

function convert(){
    const amount = parseFloat(document.getElementById("amount").value);
    const from = fromSelect.value;
    const to = toSelect.value;
    const rate = parseFloat(document.getElementById("rate").value);

    if(isNaN(amount) || isNaN(rate)){
        alert("請輸入有效金額和匯率");
        return;
    }

    const converted = (amount * rate).toFixed(2);
    document.getElementById("result").textContent = `${amount} ${from} = ${converted} ${to}`;
}
/*
async function convert(){
    const amount = parseFloat(document.getElementById("amount").value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if(isNaN(amount)){
        alert("請輸入有效金額");
        return;
    }

    const apikey = ""; // 更換匯率 API 金鑰
    const url = `https://v6.exchangerate-api.com/v6/${apikey}/pair/${from}/${to}`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        if(data.result === "success"){
            const rate = data.conversion_rate;
            const converted = (amount * rate).toFixed(2);
            document.getElementById("result").textContent = `${amount} ${from} = ${converted} ${to}`;
            saveHistory(`${amount} ${from} → ${converted} ${to}`);
        }else{
            throw new Error("API 無法取得匯率");
        }
    }
    catch(error){
        document.getElementById("result").textContent = "無法取得匯率資訊。";
        console.error(error);
    }
}
*/
/*
// 儲存歷史紀錄
function saveHistory(text){
    const li = document.createElement("li");
    li.textContent = text;
    historyList.prepend(li);

    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.unshift(text);
    localStorage.setItem("history", JSON.stringify(history.slice(0, 10)));
}
// 載入歷史紀錄
window.onload = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);   
    });
};  
*/