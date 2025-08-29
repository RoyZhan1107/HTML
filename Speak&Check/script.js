// Helpers
const el = sel => document.querySelector(sel);
const els = sel => Array.from(document.querySelectorAll(sel));

function splitIntoSentences(text) {
    //  粗略分句:以 . ! ? 或換行分割
    return text
        .replace(/\s+/g,' ')    // 正規化空白
        .split(/(?<=[.!?])\s+|\n+/)
        .map(s => s.trim())
        .filter(Boolean);
}

function tokenize(s){
    return s
        .toLowerCase()
        .replace(/[^a-zA-Z'\-\s]/g,'') // 移除標點(保留縮寫符號)
        .split(/\s+/)
        .filter(Boolean);
}

function levenshtein(a, b){
    const dp = Array.from({length: a.length + 1}, () => Array(b.length + 1).fill(0));
    for(let i = 0; i <= a.length; i++){
        dp[i][0] = i;
    }
    for(let j = 0; j <= b.length; j++){
        dp[0][j] = j;
    }
    for(let i = 1; i <= a.length; i++){
        for(let j = 1; j <= b.length; j++){
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
            );
        }
    }
    return dp[a.length][b.length];
}

function wordScore(target, said){
    // 0: 錯 1:接近 2:正確
    if(!said) return 0;
    if(target === said) return 2;
    const d = levenshtein(target, said);
    return d <= 1 ? 1 : 0;  // 一個編輯距離以內算接近
}
function highlightCompare(targetStr, saidStr){
    const tks = tokenize(targetStr);
    const sks = tokenize(saidStr);

    const used = Array(sks.length).fill(false);
    let ok = 0, near = 0, bad = 0;
    const html = tks.map((t, i) => {
        // 嘗試與同位置或附近的詞比較
        const candIdx = [i, i - 1, i + 1].filter(k => k >= 0 && k < sks.length && !used[k]);
        let bestIdx = -1, bestScore = -1;
        for(const k of candIdx){
            const s = wordScore(t, sks[k]);
            if(s > bestScore){
                bestScore = s;
                bestIdx = k;
            }
        }
            let cls = 'miss';
            if(bestScore == 2){
                cls = 'ok';
                ok++;
                used[bestIdx] = true;
            }
            else if(bestScore === 1){
                cls = 'near';
                near++;
                used[bestIdx] = true;
            }
            else{
                bad++;
            }
            return `<span class="word ${cls}" data-word="${t}">${t}</span>`;
    }).join('  ');
    return{
        html,
        stats: {ok, near, bad}
    };
}
// State
let sentences = [];
let idx = 0;

// TTS
const voiceSel = el('#voiceSel');
let voices = [];
function loadVoices(){
    voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    voiceSel.innerHTML = '<option value="">系統預設</option>' + voices.map((v, i) => `<option value="${i}">${v.lang} - ${v.name}</option>`).join('');
}
if('speechSynthesis' in window){
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}
function speak(text){
    if(!('speechSynthesis' in window)) return alert('此瀏覽器不支援語音朗讀。');
    const u = new SpeechSynthesisUtterance(text);
    const sel = voiceSel.value;
    if(sel){
        u.voice = voices[+ sel];
    }
    u.rate = parseFloat(el('#rate').value || '1');
    u.lang = (voices[ + sel]?.lang) || el('#lang').value || 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}
// ASR
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
if(Rec){
    rec = new Rec();
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => el('#status').textContent = '錄音中...';
    rec.onend = () => el('#status').textContent = '待機';
    rec.onerror = (e) => el('#status').textContent = '錯誤:' + (e.error || 'unknown');
    rec.onresult = (e) => {
        const text = Array.from(e.results).map(r => r[0].transcript).join(' ');
        showResult(text);
    };
}
function startRec(){
    if(!rec) return alert('此瀏覽器不支援語音識別(建議桌面版 Chrome/Edge)。');
    try{
        rec.lang = el('#lang').value || 'en-US';
        rec.start();
    }catch(err){
        console.warn(err);
    }
}
function stopRec(){
    if(rec) try{
        rec.stop();
    }catch{

    }
}
function renderSentence(){
    const s = sentences[idx] || '';
    const words = tokenize(s);
    const html = words.map(w => `<span class="word" title="點我朗讀">${w}</span>`).join('  ');
    el('#targetSentence').innerHTML = html || '<span class="muted">尚未載入句子，請先分句</span>';
    els('#targetSentence .word').forEach(sp => {
        sp.addEventListener('click', () => speak(sp.textContent));
    });
    el('#recResult').innerHTML = '';
    el('#statOK').textContent = el('#statNear').textContent = el('#statBad').textContent = '0';
    el('#score').textContent = '分數: -';
    el('#sentCount').textContent = `${sentences.length} 句(目前第${Math.min(idx + 1, Math.max(1, sentences.length))}句)`;
}

function showResult(text){
    const s = sentences[idx] || '';
    const {html, stats} = highlightCompare(s, text);
    el('#recResult').innerHTML = html;
    el('#statOk').textContent = stats.ok;
    el('#statNear').textContent = stats.near;
    el('#statBad').textContent = stats.bad;
    const total = stats.ok + stats.near + stats.bad;
    const score = total ? Math.round((stats.ok + 0.5 * stats.near) / total * 100) : 0;
    el('#score').textContent = `分數:${score}`;
    // 允許點擊識別結果中的每個字進行朗讀
    els('#recResult .word').forEach(sp => sp.addEventListener('click', () => speak(sp.dataset.word || sp.textContent)));
}
// Events
el('#btnSplit').addEventListener('click', () => {
    sentences = splitIntoSentences(el('#textInput').value || '');
    idx = 0;
    renderSentence();
});
el('#btnClear').addEventListener('click', () => {
    el('#textInput').value = '';
    sentences = [];
    idx = 0;
    renderSentence();
});
el('#btnPrev').addEventListener('click', () => {
    if(idx > 0){
        idx--;
        renderSentence();
    }
});
el('#btnNext').addEventListener('click', () => {
    if(idx < sentences.length - 1){
        idx++;
        renderSentence();
    }
});
el('#btnSpeak').addEventListener('click', () => speak(sentences[idx] || ''));
el('#btnRecStart').addEventListener('click', startRec);
el('#btnRecStop').addEventListener('click', stopRec);

// 初始渲染
sentences = splitIntoSentences(el('#textInput').value);
renderSentence();