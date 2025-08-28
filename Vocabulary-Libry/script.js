// 預設儲存檔案名稱
const LS_KEY = 'wordbook.v1';

/** @type {{word:string, meaning:string, patterns:string[], fav:boolean}[]} */
// 儲存單字
let words = [];
// 預設單字
const defaults = [
    {word: 'significant', meaning: '重要的；顯著的', pos: 'adjective', synonym: 'none', antonym: 'none', derivatives: 'none', phrases: 'none', patterns: ['a significant increase in ~', 'be significant to sb/sth'], fav:true},
    {word: 'approach', meaning: '方法；接近', pos:"noun", synonym: 'none', antonym: 'none', derivatives: 'none', phrases: 'none', patterns: ['an approach to ~', 'approach + O(及物)'], fav:false},
    {word: 'despite', meaning: '儘管(介系詞)', pos: "preposition", synonym: 'none', antonym: 'none', derivatives: 'none', phrases: 'none', patterns: ['despite + N/V-ing', 'Despite the rain, ...'], fav:false},
    {word: 'participate', meaning: '參加；參與(不及物 + in)', pos: "verb", synonym: 'none', antonym: 'none', derivatives: 'none', phrases: 'none', patterns: ['participate in ~', 'be willing to participate in~'], fav:true},
];
// 載入檔案
function load(){
    try{
        words = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    }
    catch{
        words = [];
    }
    if(!Array.isArray(words) || words.length === 0){
        words = defaults;
        save();
    }
}
// 儲存功能紐
function save(){
    localStorage.setItem(LS_KEY, JSON.stringify(words));
}
// 功能表按鈕
const panels = {
    library: document.getElementById('panel-library'),
    type: document.getElementById('panel-type'),
    add: document.getElementById('panel-add'),
    quiz: document.getElementById('panel-quiz'),
    settings: document.getElementById('panel-settings')
};

function showPanel(name){
    for(const k in panels){
        panels[k].classList.toggle('hidden', k !== name);
    }
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.panel === name));
}

document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => showPanel(t.dataset.panel)));

const listEl = document.getElementById('list');
const searchEl = document.getElementById('search');
const filterFavEl = document.getElementById('filterFav');

function renderList(){
    const q = searchEl.value.trim().toLowerCase();
    const onlyFav = filterFavEl.value === 'fav';
    const filtered = words.filter(Boolean).filter(w => {
        if(onlyFav && !w.fav) return false;
        if(!q) return true;
        // const hay = [w.word, w.pos, w.meaning, ...(w.patterns || [])].join('\n').toLowerCase();
        const hay = [w.word, w.pos, w.meaning, (Array.isArray(w.synonym) ? w.synonym.map : []), w.derivatives, w.phrases, ...(Array.isArray(w.patterns) ? w.patterns : [])].join('\n').toLowerCase();
        return hay.includes(q);
    });
    listEl.innerHTML = filtered.map((w, i) => itemHTML(w, i)).join('') || '<div class="muted">沒有資料，請新增或放寬篩選</div>';

    listEl.querySelectorAll('[data-idx]').forEach(el => {
        const i = +el.dataset.idx;
        el.querySelector('.star').addEventListener('click', () => toggleFav(i));
        el.querySelector('.btn-add-pattern').addEventListener('click', () => addPattern(i));
    });
    
}

function itemHTML(w, i){
    
    const patterns = w.patterns && w.patterns.length ? w.patterns.map(p => `<div>${p}</div>`).join('') : '';

    return `
    <div class="word" data-idx="${i}">
        <div class="top">
            <strong>${(w.word)}</strong>
            <span class="pos">${w.pos || '未知詞性'}</span>
            <span class="star ${w.fav ? 'fav' : ''}"title="收藏">★</span>
        </div>
        <div class="synonym">${w.synonym || 'unknow'}</div>
        <div class="antonym">${w.antonym || 'unknow'}</div>
        <div class="derivatives">${w.derivatives || 'unknow'}</div>
        <div class="phrases">${w.phrases || 'unknow'}</div>
        <div class="muted">${escapeHtml(w.meaning || '')}</div>
        <div>${patterns || '<span class="muted">(尚無例句)</span>'}</div>
        <div class="flex">
            <input class="pattern-input" placeholder="新增例句/句型...(Enter)">
            <button class="btn-add-pattern ghost">新增</button>
            </div>
        </div>
    `;
}

function toggleFav(i){
    words[i].fav = !words[i].fav;
    save();
    renderList();
}
// 新增單字功能
function addPattern(i){
    const card = listEl.querySelector(`[data-idx="${i}"]`);
    const inp = card.querySelector('.pattern-input');
    const v = (inp.value || '').trim();
    if(!v) return;
    words[i].patterns = words[i].patterns || [];
    words[i].patterns.push(v);
    inp.value = '';
    save();
    renderList();
}
// 搜尋功能
searchEl.addEventListener('input', renderList);
filterFavEl.addEventListener('change', renderList);

document.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key === '/'){
        e.preventDefault();
        searchEl.focus();
    }
    if(e.key === '/' && document.activeElement === document.body){
        e.preventDefault();
        searchEl.focus();
    }
});

const addWordEl = document.getElementById('add-word');
const addMeaningEl = document.getElementById('add-meaning');
const addPatternsEl = document.getElementById('add-patterns');

document.getElementById('btnAdd').addEventListener('click', () => {
    const word = (addWordEl.value || '').trim();
    if(!word){
        addWordEl.focus();
        return;
    }
    const meaning = (addMeaningEl.value || '').trim();
    const patterns = (addPatternsEl.value || '').trim().split('\n+/').map(s => s.trim()).filter(Boolean);
    const exists = words.find(w => w.word.toLowerCase() === word.toLowerCase());
    if(exists){
        alert('單字已存在，請改為編輯或換一個');
        return;
    }
    words.unshift({
        word,
        meaning,
        patterns,
        fav: false
    });
    save();
    addWordEl.value = addMeaningEl.value = addPatternsEl.value = '';
    showPanel('library');
    renderList();
});

let currentQ = null;
const quizPromptEl = document.getElementById('quizPrompt');
const quizAnswerEl = document.getElementById('quizAnswer');

function pickQ(){
    const scope = document.getElementById('quizScope').value;
    const pool = words.filter(w => scope === 'all' ? true : w.fav);
    if(pool.length === 0){
        alert('題庫為空，請先新增或收藏單詞');
        return;
    }
    const mode = document.getElementById('quizMode').value;
    const w = pool[Math.floor(Math.random() * pool.length)];
    if(mode === 'meaning'){
        currentQ = {
            answer: w.word,
            prompt: w.meaning || '(無中文註解)'
        };
    }else{
        const p = (w.patterns && w.patterns.length) ? w.patterns[Math.floor(Math.random() * w.patterns.length)] : '(無句型)';
        currentQ = {
            answer: w.word,
            prompt: p.replace(new RegExp(w.word, 'i'), '____')
        };
    }
    quizPromptEl.textContent = currentQ.prompt;
    quizAnswerEl.value = '';
    quizAnswerEl.focus();
    document.getElementById('quizResult').textContent = '';
}
// 檢查單字功能
function checkAnswer(){
    if(!currentQ) return;
    const a = (quizAnswerEl.value || '').trim();
    const ans = currentQ.answer;
    const dist = editDistance(a.toLowerCase(), ans.toLowerCase());
    const ok = a.toLowerCase() === ans.toLowerCase();
    const near = !ok && dist <= 1;
    const resEl = document.getElementById('quizResult');
    if(ok){
        resEl.innerHTML = `<span class="result-bad">答對了！</span>`;
    }
    else if(near){
        resEl.innerHTML = `<span class="result-bad> * 接近(差${dist})個字母</span> 正解:<b>${escapeHtml(ans)}</b>`;
    }
    else{
        resEl.innerHTML = `<span class="result-bad">錯誤:</span> 正解<b>${escapeHtml(ans)}</b>`;
    }
}
// 新增句子功能
function editDistance(a,b){
    const dp = Array.from({ length: a.length + 1}, () => Array(b.length + 1).fill(0));
    for(let i = 0; i <= a.length; i++){
        dp[i][0] = i;
    }
    for(let j = 0; j <= b .length; j++){
        dp[0][j] = j;
    }
    for(let i = 1; i <= a.length; i++)
        for(let j = 1; j <= b.length; j++)
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[j - 1], dp[i - 1][j - 1]);
        return dp[a.length][b.length];
}
    document.getElementById('btnAsk').addEventListener('click', pickQ);
    quizAnswerEl.addEventListener('keydown', e => {
        if(e.key === 'Enter'){
            checkAnswer();
        }
    });
    document.getElementById('btnCheck').addEventListener('click', checkAnswer);
    document.getElementById('btnReveal').addEventListener('click', () => {
        if(currentQ){
            document.getElementById('quizResult').innerHTML = ` 答案: <b>${escapeHtml(currentQ.answer)}</b>`;
        }
    });
    document.getElementById('btnExport').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(words, null, 2)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'wordbook.json';
        a.click();
        URL.revokeObjectURL(a.href);
    });
    document.getElementById('fileImport').addEventListener('change', async (e) => {
        const f = e.target.files[0];
        if(!f) return;
        try{
            const text = await f.text();
            const data = JSON.parse(text);
            if(!Array.isArray(data)){
                throw new Error('格式錯誤');
            }
            words = data
            .filter(Boolean)
            .map(x => ({
                word: String(x.word || '').trim(),
                pos: String(x.pos || ''),
                synonym: String(x.synonym || ''),
                antonym: String(x.antonym || ''),
                derivatives: String(x.derivatives || ''),
                phrases: String(x.phrases || ''),
                meaning: String(x.meaning || ''),
                patterns: Array.isArray(x.patterns) ? x.patterns.filter(Boolean) : [],
                fav: !!x.fav
            })).filter(x => x.word);
                save();
                renderList();
                showPanel('library');
        }catch(err){
            alert('匯入失敗:' + err.message);
        }
    });
    document.getElementById('btnClear').addEventListener('click', () => {
        if(confirm('確定要清空資料嗎? 此動作無法復原')){
            words = [];
            save();
            renderList();
        }
    });
    function escapeHtml(s){
        return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#039;'}[c]));
    }
load();
renderList();

function LiveABC(event){
    event.preventDefault();
    const LiveABC = document.getElementById("Live-ABC-TUEE");
    LiveABC.style.display = (LiveABC.style.display === "block") ? "none" : "block";
}

document.getElementById('Live-ABC-TUEE').addEventListener('change', function(){
    const selctedValue = this.value;
    if(!selctedValue) return;
    const jsonPath = `json/The-Unified-Entrance-Exam/${selctedValue}.json`;
    fetch(jsonPath)
        .then(response => {
            if(!response.ok){
                throw new Error('網路錯誤或檔案不存在');
            }
            return response.json();
        })
        .then(data => {
            console.log('載入成功:', data);
            renderWords(data);
        })
        .catch(error => {
            console.error('讀取 JSON 發生錯誤:', error);
        });
});

function renderWords(words){
    const container = document.getElementById('list');
    container.innerHTML = '';

    words.forEach((w, i) => {
        const patterns = w.patterns && w.patterns.length
            ? w.patterns.map(p => `<div>${p}</div>`).join('')
            : '<span class="muted">(尚無例句)</span>';
        const synonym = w.synonym && w.synonym.length
            ? (Array.isArray(w.synonym) ? w.synonym.join(', ') : w.synonym || '無')
            : (typeof w.synonym === "string" ? w.synonym : "");
        const antonym = w.antonym && w.antonym.length
            ? (Array.isArray(w.antonym) ? w.synonym.join(', ') : w.antonym || '無')
            : 'unknow';
        const derivatives = w.derivatives && w.derivatives.length
            ? (Array.isArray(w.derivatives) ? w.synonym.join(', ') : w.derivatives || '無')
            : 'unknow';
        const phrases = w.phrasesText && w.phrases.length
            ? (Array.isArray(w.phrases) ? w.synonym.join(', ') : w.phrases || '無')
            : 'unknow';
        const html = `
            <div class="word" data-idx="${i}">
                <div class="top">
                    <strong>${(w.word)}</strong>
                    <span class="pos">${w.pos || '未知詞性'}</span>
                    <span class="star ${w.fav ? 'fav' : ''}" title="收藏">★</span>
                </div>
                <div class="synonym">${synonym || 'unknow'}</div>
                <div class="antonym">${antonym || 'unknow'}</div>
                <div class="derivatives">${derivatives || 'unknow'}</div>
                <div class="phrases">${phrases || 'unknow'}</div>
                <div class="muted">${escapeHtml(w.meaning || '')}</div>
                <div>${patterns}</div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

function escapeHtml(text){
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

document.getElementById('btn-refresh').addEventListener('click', function(){
    location.reload();
});