const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const historyList = document.getElementById("history");

// 中文名稱與對應 key
const units = {
    "磅(pound)": "pound",
    "公斤(kilogram)": "kilogram",
    "公克(gram)": "gram",
    "毫克(milligram)": "milligram",
    "盎司(ounce)": "ounce",
    "公噸(ton)": "ton",
    "臺斤(tai jin)": "tai jin",
    "斤(jin)": "jin"
};

const factors = {
    gram: 1,
    kilogram: 1000,
    milligram: 0.001,
    pound: 453.592,
    ounce: 28.3495,
    ton: 1000000,
    tai_jin: 600,
    jin: 500
};

// 載入下拉選單
Object.keys(units).forEach(name => {
    const option1 = document.createElement("option");
    option1.value = name;
    option1.textContent = name;
    fromSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = name;
    option2.textContent = name;
    toSelect.appendChild(option2);
});

// 預設選擇磅轉公斤
fromSelect.value = "磅(pound)";
toSelect.value = "公斤(kilogram)";

function convert() {
    const weight = parseFloat(document.getElementById("weight").value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isNaN(weight)) {
        alert("請輸入有效數值");
        return;
    }

    const fromKey = units[from];
    const toKey = units[to];

    const grams = weight * factors[fromKey];
    const converted = grams / factors[toKey];

    const resultText = `${weight} ${from} = ${converted.toFixed(4)} ${to}`;
    document.getElementById("result").textContent = resultText;

    saveHistory(resultText);
}

function saveHistory(text) {
    const li = document.createElement("li");
    li.textContent = text;
    historyList.prepend(li);

    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.unshift(text);
    localStorage.setItem("history", JSON.stringify(history.slice(0, 10)));
}

// window.onload = () => {
//     const history = JSON.parse(localStorage.getItem("history") || "[]");
//     history.forEach(entry => {
//         const li = document.createElement("li");
//         li.textContent = entry;
//         historyList.appendChild(li);
//     });
// };

// function clear(){
//     const historyList = document.getElementById("history");
//     historyList.textContent = "";
//     localStorage.removeItem("history");
// }