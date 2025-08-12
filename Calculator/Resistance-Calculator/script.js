const path = window.location.pathname.split('/');
const folder = path.filter(Boolean)[4]; // 取第一層資料夾名稱

const langData = {
    "us-en": {
        "band":  "band",
        "multiplier": "multiplier",
        "tolerance": "tolerance",
        "copy": "Copy Success"
    },
    "tw-zh": {
        "band":  "色環",
        "multiplier": "乘冪",
        "tolerance": "公差",
        "copy": "已複製"
    }
}
const data = langData[folder] || langData["tw-zh"];

// 電阻顏色阻值
const colorDigits = {
    "black": 0, "brown": 1, "red": 2, "orange": 3, "yellow": 4, "green": 5, "blue": 6, "violet": 7, "gray": 8, "white": 9
};
const multiplier = {
    "pink": 1e-3,
    "silver": 1e-2,
    "gold": 1e-1,
    "black": 1,
    "brown": 1e1,
    "red": 1e2,
    "orange": 1e3,
    "yellow": 1e4,
    "green": 1e5,
    "blue": 1e6,
    "violet": 1e7,
    "gray": 1e8,
    "white": 1e9
};
const toleranceMap = {
    "brown": "±1%",
    "red": "±2%",
    "gold": "±5%",
    "silver": "±10%",
    "none": "±20%",
    "green": "±0.5%",
    "blue": "±0.25%",
    "violet": "±0.1%",
    "gray": "±0.05%"
};
const colorToCss = {
    black: "#000000",
    brown: "#8b4513",
    red: "#b91c1c",
    orange: "#ff6a00",
    yellow: "#ffd200",
    green: "#1e9b37",
    blue: "#0b74d1",
    violet: "#6f3bd7",
    gray: "#7a7a7a",
    white: "#e6e6e6",
    gold: "#d4af37",
    silver: "#c0c0c0",
    pink: "#ffb6c1"
};
// 可選色清單
const digitColors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white"];
const multiplierColors = ["pink", "silver", "gold", "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white"];
const toleranceColors = ["brown", "red", "green", "blue", "violet", "gray", "gold", "silver", "none"];

// DOM
const bandCountEl = document.getElementById("bandCount");
const bandsContainer = document.getElementById("bandsContainer");
const resValueEl = document.getElementById("resValue");
const resOhmEl = document.getElementById("resOhm");
const toleranceEl = document.getElementById("tolerance");
const calcBtn = document.getElementById("calcBtn");
const preset = document.getElementById("preset");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");

function createSelect(options, id, onChange){
    const sel = document.createElement("select");
    sel.id = id;
    options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt === "none" ? "無" : opt.charAt(0).toUpperCase() + opt.slice(1);
        sel.appendChild(o);
    });
    sel.addEventListener("change", () => {
        updateSwatch(id);
        if(onChange) onChange(sel.value);
    });
    return sel;
}

function swatchEl(color){
    const sp = document.createElement("span");
    sp.className = "swatch";
    sp.style.background = color ? (colorToCss[color] || color) : "transparent";
    return sp;
}

function buildBands(){
    bandsContainer.innerHTML = "";
    const count = parseInt(bandCountEl.value,10);

    const digitCount = count === 4 ? 2 : 3;
    for(let i = 1; i <= digitCount; i++){
        const container = document.createElement("div");
        container.className = "band";
        container.innerHTML = `<label>${data[`band${i}`]}</label>`;
        const sel = createSelect(digitColors, `band${i}`);
        container.appendChild(sel);
        const sw = document.createElement("div");
        sw.id = `swatch-band${i}`;
        sw.style.marginTop = "6px";
        sw.appendChild(swatchEl(sel.value));
        container.appendChild(sw);
        bandsContainer.appendChild(container);
    }

    const mult = document.createElement("div");
    mult.className = "band";
    mult.innerHTML = `<label>${data["multiplier"]}:</label>`;
    const multSel = createSelect(multiplierColors, "multiplier");
    mult.appendChild(multSel);
    const swM = document.createElement("div");
    swM.id = "swatch-multiplier";
    swM.style.marginTop = "6px";
    swM.appendChild(swatchEl(multSel.value));
    mult.appendChild(swM);
    bandsContainer.appendChild(mult);

    const tol = document.createElement("div");
    tol.className = "band";
    tol.innerHTML = `<label>${data["tolerance"]}:</label>`;
    const tolSel = createSelect(toleranceColors, "tolerance");
    tol.appendChild(tolSel);
    const swT = document.createElement("div");
    swT.id = "swatch-tolerance";
    swT.style.marginTop = "6px";
    swT.appendChild(swatchEl(tolSel.value));
    tol.appendChild(swT);
    bandsContainer.appendChild(tol);

    Array.from(bandsContainer.querySelectorAll("select")).forEach(s => updateSwatch(s.id));
}

function updateSwatch(id){
    const el = document.getElementById(id);
    const val = el ? el.value : null;
    const sw = document.getElementById("swatch-" + id);
    if(sw){
        sw.innerHTML = "";
        sw.appendChild(swatchEl(val));
    }
}

function calculate(){
    const count = parseInt(bandCountEl.value, 10);
    const digitCount = count === 4 ? 2 : 3;
    let digits = "";
    for(let i = 1; i <= digitCount; i++){
        const v = document.getElementById(`band${i}`).value;
        if(!(v in colorDigits)){
            digits += "0";
        }
        else{
            digits += String(colorDigits[v]);
        }
    }

    const mulColor = document.getElementById("multiplier").value;
    const tolColor = document.getElementById("tolerance").value;

    const base = Number(digits);
    const mult = (mulColor in multiplier) ? multiplier[mulColor] : 1;
    const ohm = base * mult;
    const formatted = formatResistance(ohm);

    resValueEl.textContent = formatted;
    resOhmEl.textContent = (isFinite(ohm) ? ohm.toLocaleString() : "-") + "Ω";
    toleranceEl.textContent = toleranceMap[tolColor] || toleranceMap["none"];
}

function formatResistance(ohm){
    if(!isFinite(ohm)) return "-";
    const abs = Math.abs(ohm);
    if(abs >= 1e9) return (ohm / 1e9).toFixed(3).replace(/\.?0+$/, "") + "GΩ";
    if(abs >= 1e6) return (ohm / 1e6).toFixed(3).replace(/\.?0+$/, "") + "MΩ";
    if(abs >= 1e3) return (ohm / 1e3).toFixed(3).replace(/\.?0+$/, "") + "kΩ";
    if(abs >= 1) return ohm.toFixed(3).replace(/\.?0+$/, "") + "Ω";
    return ohm.toFixed(3).replace(/\.?0+$/, "") + "Ω";
}

function setPreset(key){
    const presets = {
    redvioletbrown:  {bands:["red","violet","brown"],mult:"black",tol:"gold"},
    yellowvioletred: {bands:["yellow","violet","red"],mult:"black",tol:"gold"},
    brownbrownred:   {bands:["brown","black","brown"],mult:"red",tol:"gold"},
    brownblackred:   {bands:["brown","black","red"],mult:"brown",tol:"gold"},
    greenbrownblack: {bands:["green","brown","black"],mult:"black",tol:"gold"}
    };

    const p = presets[key];
    if(!p) return;
    const count = parseInt(bandCountEl.value, 10);
    const digits = count === 4 ? 2 : 3;
    for(let i = 1; i <= digits; i++){
        const v = p.bands[i - 1] || p.bands[p.bands.length - 1];
        const sel = document.getElementById(`band${i}`);
        if(sel) sel.value = v;
        updateSwatch(`band${i}`);
    }
    document.getElementById("multiplier").value = p.mult;
    updateSwatch("multiplier");
    document.getElementById("tolerance").value = p.tol;
    updateSwatch("tolerance");
    calculate();
}
function resetAll(){
    bandCountEl.value = "5";
    buildBands();
    document.getElementById("band1").value = "brown";
    updateSwatch("band1");
    document.getElementById("band2").value = "black";
    updateSwatch("band2");
    if(document.getElementById("band3")){
        document.getElementById("band3").value = "black";
        updateSwatch("band3");
    }
    document.getElementById("multiplier").value = "red";
    updateSwatch("multiplier");
    document.getElementById("tolerance").value = "gold";
    updateSwatch("tolerance");
    calculate();
}

bandCountEl.addEventListener("change", () => {
    buildBands();
});
calcBtn.addEventListener("click", calculate);
preset.addEventListener("change", () => 
    setPreset(preset.value)
);
copyBtn.addEventListener("click", () => {
    const text = `${resValueEl.textContent} ${toleranceEl.textContent} (${resOhmEl.textContent})`;
    navigator.clipboard.writeText(text).then(() => 
        alert(`${data["copy"]} ${text}`)
    );
});
resetBtn.addEventListener("click", resetAll);

buildBands();
resetAll();

document.addEventListener("keydown", e => {
    if(e.key === "Enter"){
        calculate();
    }
});
// 禁止右鍵
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});