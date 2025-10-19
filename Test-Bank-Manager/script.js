// edit of script.js
(() => {
    const storagekey = 'image_vocab_banks_v2';
    let banks = JSON.parse(localStorage.getItem(storagekey) || '[]');
    let currentBankId = null;
    let previewBankIndex = 0; // for preview navigation

    // elements
    const banksList = document.getElementById('banksList');
    const bankNameInput = document.getElementById('bankName');
    const createBankBtn = document.getElementById('createBank');
    const importAll = document.getElementById('importAll');
    const importAllFile = document.getElementById('importAllFile');
    const exportAllBtn = document.getElementById('exportAll');

    const currentBankTitle = document.getElementById('currentBankTitle');
    const bankMeta = document.getElementById('bankMeta');
    const exportBankBtn = document.getElementById('exportBank');
    const exportExcelBtn = document.getElementById('exportExcel');
    const deleteBankBtn = document.getElementById('deleteBank');

    const qType = document.getElementById('qType');
    const qPrompt = document.getElementById('qPrompt');
    const choiceList = document.getElementById('choiceList');
    const addChoice = document.getElementById('addChoice');
    const qFillAnswer = document.getElementById('qFillAnswer');
    const qFile = document.getElementById('qFile');
    const filePreview = document.getElementById('filePreview');
    const addQuestion = document.getElementById('addQuestion');
    const clearForm = document.getElementById('clearForm');
    
    const previewArea = document.getElementById('previewArea');
    const startQuiz = document.getElementById('startQuiz');
    const prevQ = document.getElementById('prevQ');
    const nextQ = document.getElementById('nextQ');
    const playAudio = document.getElementById('playAudio');

    const questionsList = document.getElementById('questionsList');
    function persist(){
        localStorage.setItem(storagekey, JSON.stringify(banks));
    }
    function uid(){
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }
    // render banks
    function renderBanks(){
        banksList.innerHTML = '';
        banks.forEach(b => {
            const el = document.createElement('div');
            el.className = 'bank-item';
            if(b.id === currentBankId){
                el.classList.add('active');
            }
            el.innerHTML = `<span>${b.name}</span><div style="display: flex; gap: 6px;"><button data-id="${b.id}" class="btn ghost">開啟</button><button data-id="${b.id}" class="btn ghost del">刪除</button></div>`;
            el.querySelector('button').addEventListener('click', () => openBank(b.id));
            el.querySelector('.del').addEventListener('click', (e) => {
                e.stopPropagation();
                if(confirm('確定刪除題庫?')){
                   banks = banks.filter(x => x.id !== b.id);
                    if(currentBankId === b.id){
                        currentBankId = null;
                    }
                    persist();
                    renderBanks();
                    renderBankPanel();
                }
            });
            
            banksList.appendChild(el);
        });
        
    }

    function openBank(id){
        currentBankId = id;
        renderBanks();
        renderBankPanel();
    }
    function renderBankPanel(){
        const bank = banks.find(b => b.id === currentBankId);
        if(!bank){
            currentBankTitle.textContent = '未選擇題庫';
            bankMeta.textContent = '0題';
            questionsList.innerHTML = '';
            previewArea.innerHTML = '題目預覽';
            return;
        }
        currentBankTitle.textContent = bank.name;
        bankMeta.textContent = `${bank.questions.length}題`;
        renderQuestionsList(bank);
    }
    // create bank
    createBankBtn.addEventListener('click', () => {
        const name = bankNameInput.value.trim();
        if(!name){
            return alert('請輸入題庫名稱');
        }
        const b = {id: uid(), name, questions: []};
        banks.push(b);
        persist();
        bankNameInput.value = '';
        renderBanks();
        openBank(b.id);
    });
    // export/import all(json)
    exportAllBtn.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(banks)], {
            type: 'application/json'
        });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'all_banks.json';
        a.click();
        URL.revokeObjectURL(a.href);
    });
    importAll.addEventListener('click', () => {
        importAllFile.click();
    });
    importAllFile.addEventListener('change', e => {
        const f = e.target.files[0];
        if(!f) return;
        const r = new FileReader();
        r.onload = ev => {
            try{
                const data = JSON.parse(ev.target.result);
                if(Array.isArray(data)){
                    banks = data;
                    persist();
                    renderBanks();
                    renderBankPanel();
                    alert('匯入完成');
                }
                else{
                    alert('格式錯誤');
                }
            }catch(err){
                alert('匯入失敗:' + err.message);
            };
            r.readAsText(f);
        };
    });
    // add choice helper
    function createChoiceItem(text = ''){
        const div = document.createElement('div');
        div.className = 'choice-item';
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.placeholder = '選項文字(可在最後面加 |correct)';
        inp.value = text;
        inp.style.flex = '1';
        const del = document.createElement('button');
        del.className = 'btn ghost';
        del.textContent = '刪除';
        del.addEventListener('click', () => {
            div.remove();
        });
        div.appendChild(inp);
        div.appendChild(del);
        return div;
    }
    addChoice.addEventListener('click', () => {
        choiceList.appendChild(createChoiceItem());
    });
    // file preview
    let currentFileData = null; // {type, dataUrl}
    qFile.addEventListener('change', e => {
        const f = e.target.files[0];
        if(!f){
            return;
        }
        const reader = new FileReader();
        reader.onload = ev => {
            currentFileData = {
                type: f.type, dataUrl: ev.target.result
            };
            renderFilePreview();
        };
        reader.readAsDataURL(f);
    });
    function renderFilePreview(){
        filePreview.innerHTML = '';
        if(!currentFileData){
            return;
        }
    if(currentFileData.type.startsWith('image/')){
        const img = document.createElement('img');
        img.src = currentFileData.dataUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '160px';
        filePreview.appendChild(img);
    }else if(currentFileData.type.startsWith('audio/')){
        const a = document.createElement('audio');
        a.src = currentFileData.dataUrl;
        a.controls = true;
        filePreview.appendChild(a);
        }
    }

    // add question
    addQuestion.addEventListener('click', () => {
    if(!currentBankId){
        return alert('請先選擇題庫');
    }
        const bank = banks.find(b => b.id === currentBankId);
        const type = qType.value;
        const prompt = qPrompt.value.trim();
        if(!prompt){
            return alert('請輸入題幹');
        }
        const q = {
            id:uid(),
            type,
            prompt,
            file: currentFileData,
            note: '',
            created: Date.now()
        };
        if(type === 'single' || type === 'multiple'){
            const opts = [];
            Array.from(choiceList.querySelectorAll('input')).forEach(inp => {
                const v = inp.value.trim();
                if(!v) return;
                const parts = v.split('|').map(s => s.trim());
                const text = parts[0];
                const correct = parts[1] && parts[1].toLowerCase() === 'correct';
                opts.push({text, correct});
            });
            if(opts.length < 2) return alert('選項至少兩個');
            q.choices = opts;
        }else if(type === 'fill'){
            const ans = qFillAnswer.value.trim();
            if(!ans) return alert('請輸入填充題答案');
            q.answers = ans.split(',').map(s => s.trim());
        }else if(type === 'listening'){
            // audio should be in q.file
            if(!currentFileData || !currentFileData.type.startsWith('audio/')) return alert('請上傳音檔作為聽力素材');
            q.audio = currentFileData;
        }else if(type === 'reading'){
            // reading passage is in prompt, could have multiple questions later (not implemented)
        }else if(type === 'short'){
            // short answer: optional model answer
            q.model = qFillAnswer.value.trim();
        }
        bank.questions.push(q);
        persist();
        renderBankPanel();
        clearFormFields();
        alert('已加入題庫');
    });
    function clearFormFields(){
        qPrompt.value = '';
        while(choiceList.firstChild){
            choiceList.removeChild(choiceList.firstChild);
            qFillAnswer.value = '';
            qFile.value = '';
            currentFileData = null;
            renderFilePreview();
        }
        clearForm.addEventListener('click', clearFormFields);
    }
/*
// play TTS for current form text
  playTTS.addEventListener('click', ()=>{
    const text = qTextToSpeech.value.trim(); if(!text) return alert('請先貼上要朗讀的文字'); speakText(text);
  });
  function speakText(text){ const msg = new SpeechSynthesisUtterance(text); const v = voiceSelect.value; if(v){ const voices = window.speechSynthesis.getVoices(); const sel = voices.find(x=>x.name===v); if(sel) msg.voice = sel; } msg.rate = parseFloat(speechRate.value) || 1; window.speechSynthesis.cancel(); window.speechSynthesis.speak(msg); }
        // questions list render
        function renderQuestionsList(bank){
            questionsList.innerHTML = '';
            bank.questions.forEach((q, i) => {
                const el = document.createElement('div');
                el.style.borderTop = '1px solid #f0f4fb';
                el.style.padding = '8px 0';
                const typeLabel = {
                    single: '單選',
                    multiple: '多選',
                    fill: '填充',
                    listening: '聽力',
                    reading: '閱讀',
                    short: '簡答'
                }[q.type] || q.type;
                let detail = '';
                if(q.type === 'single' || q.type === 'multiple'){
                    detail = q.choices.map((c, idx) => `<div class="small">${String.fromCharCode(65 + idx)}. ${c.text} ${c.correct ?'<strong>(正解)</strong>': ''}</div>`).join('');
                }else if(q.type === 'fill'){
                    detail = `<div class="small">答案: ${q.answers.join(', ')}</div>`;
                }else if(q.type === 'short'){
                    detail = `<div class="small">參考答案: ${q.model || ''}</div>`;
                }
                const fileHtml = q.file ? (q.file.type.startsWith('image/') ? `<img src="${q.file.dataUrl}" style="width: 120px; height: 80px; object-fit: contain; border-radius: 6px">`: (q.file.type.startsWith('audio/') ? '<div class="small">(含音檔)</div>' : '')) : '';
                el.innerHTML = `<div style=\"display: flex; gap: 8px; align-items: center;\"><div style=\"flex:1\"><div><strong>${i + 1}. [${typeLabel}]</strong>${escapeHtml(q.prompt)}</div><div class=\"small muted\">${q.note || ''}</div>${detail}</div><div style=\"display: flex; flex-direction: column; gap: 6px; align-items: flex-end;\">${fileHtml}<div><button class=\"btn ghost\" data-edit=\"${q.id}\">編輯</button><button class=\"btn ghost\" data-del=\"${q.id}\">刪除</button></div></div></div>`;
                el.querySelector('[data-edit]').addEventListener('click', () => editQuestion(bank.id, q.id));
                el.querySelector('[data-del]').addEventListener('click', () => {
                    if(confirm('刪除此題目?')){
                        bank.questions = bank.questions.filter(x => x.id !== q.id);
                        persist();
                        renderBankPanel();
                    }
                });
                questionsList.appendChild(el);
            });
    };
    */
    function editQuestion(bankId, qId){
        const bank = banks.find(b => b.id === bankId);
        const q = bank.questions.find(x => x.id === qId);
        if(!q) return; // load into form for editing
        qType.value = q.type;
        qPrompt.value = q.prompt;
        clearChoicesInForm();
        if(q.type === 'single' || q.type === 'multiple'){
            q.choices.forEach(c => {
                choiceList.appendChild(createChoiceItem((c.text + (c.correct ? '| correct' : ''))));
            });
        }
        else if(q.type === 'fill'){
            qFillAnswer.value = (q.answers || []).join(', ');
        }
        else if(q.type === 'short'){
            qFillAnswer.value = q.model || '';
        }
        if(q.file){
            currentFileData = q.file;
            renderFilePreview();
        }
        // remove original and let user save as new or re-add
        if(confirm('已將題目載入編輯表單，儲存後會保留原題或請先刪除原題。要刪除原題嗎?')){
            bank.questions = bank.questions.filter(x => x.id !== qId);
            persist();
            renderBankPanel();
        }
    }
    function clearChoicesInForm(){
        while(choiceList.firstChild){
            choiceList.removeChild(choiceList.firstChild);
        }
    }
        // preview quiz simple navigation
        startQuiz.addEventListener('click', () => {
            const bank = banks.find(b => b.id === currentBankId);
            if(!bank || bank.questions.length === 0){
                return alert('題庫無題目可預覽');
            }
                previewBankIndex = 0;
                showPreviewQuestion();
        });
        prevQ.addEventListener('click', () => {
            const bank = banks.find(b => b.id === currentBankId);
            if(!bank) return;
            previewBankIndex = Math.max(0, previewBankIndex - 1);
            showPreviewQuestion();
        });
        nextQ.addEventListener('click', () => {
            const bank = banks.find(b => b.id === currentBankId);
            if(!bank) return;
            previewBankIndex = Math.min(bank.questions.length - 1, previewBankIndex + 1);
            showPreviewQuestion();
        });
        playAudio.addEventListener('click', () => {
            const bank = banks.find(b => b.id === currentBankId);
            if(!bank) return;
            const q = bank.questions[previewBankIndex];
            if(!q) return;
            if(q.audio){
                const a = new Audio(q.audio.dataUrl);
                a.play();
            }else if(q.file && q.file.type.startsWith('audio/')){
                const a = new Audio(q.file.dataUrl);
                a.play();
            }else alert('此題無音檔');
        });

    function showPreviewQuestion(){
        const bank = banks.find(b => b.id === currentBankId);
        if(!bank || bank.questions.length === 0) return;
        const q = bank.questions[previewBankIndex];
        const typeLabel = {single: '單選', multiple: '多選', fill: '填充', listening: '聽力', reading: '閱讀', short: '簡答'}[q.type] || q.type;
        let html = `<div style=\"padding: 12px\"><div style=\"font-weight: 700; margin-bottom: 8px\">${escapeHtml(q.prompt)}</div><div style=\"margin-top: 6px\">類型: ${typeLabel}</div>`;
        if(q.type === 'single' || q.type === 'multiple'){
            html += '<div style="margin-top: 8px;">';
            q.choices.forEach((c, idx) => {
                html += `<div><label><input type=\"${q.type === 'single' ? 'radio' : 'checkbox'}\" name=\"pchoice\"> ${String.fromCharCode( 65 + idx)}. ${escapeHtml(c.text)}</label></div>`;
            });
            html += '</div>';
        }
        else if(q.type === 'fill'){
            html += `<div style=" margin-top: 8px;">填空: <input type=\"text\" placeholder=\"輸入答案\"></div>`;
        }
        else if(q.type === 'listening'){
            html += `<div style="margin-top: 8px">聽力: 按下播放鍵收聽</div>`;
        }
        else if(q.type === 'reading'){
            html += `<div style="margin-top: 8px">段落: ${escapeHtml(q.prompt)}</div>`;
        }
        else if(q.type === 'short'){
            html += `<div style="margin-top: 8px">簡答: <textarea placeholder=\"請輸入答案\"></textarea></div>`;
        }
        if(q.file && q.file.type.startsWith('image/')) html += `<div style="margin-top: 8px"><img src=\"${q.file.dataUrl}\" style=\"max-width: 100%; max-height: 160px; object-fit: contain\"></div>`;
        html += '</div>';
        previewArea.innerHTML = html;
        }

        // export current bank to Word (as HTML wrapped in .doc) -- embeds images using data URLs
        exportBankBtn.addEventListener('click', () => {
            const bank = banks.find(b => b.id === currentBankId);
            if(!bank) return alert('請先選擇題庫');
            const html = bankToHTML(bank);
            const blob = new Blob([html], {type: 'application/msword'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${bank.name}.doc`;
            a.click();
            URL.revokeObjectURL(a.href);
        });

        // export current bank to Excel (.xlsx) using SheetJS
        exportExcelBtn.addEventListener('click', () => {
            const bank = banks.find(b => b.id === currentBankId);
            if(!bank) return alert('請先選擇題庫');
            const rows = [['Index', 'Type', 'Prompt', 'Choices', 'Answer', 'HasImage', 'FileDataURL']];
            bank.questions.forEach((q, i) => {
                const type = q.type;
                const prompt = q.prompt;
                let choices = '';
                let answer = '';
                if(q.choices){
                    choices = q.choices.map(c => c.text + (c.correct ? '(正)' : '')).join(' | ');
                }
                if(q.choice){
                    answer = q.answers.filter(c => c.correct).map(c => c.text).join(', ');
                }
                if(q.answers){
                    answer = q.answers.join(', ');
                }
                if(q.model){
                    answer = q.model;
                }
                const hasImage = q.file && q.file.type.startsWith('image/') ? 'Y' : '';
                const fileData = q.file ? q.file.dataUrl : '';
                rows.push([i + 1, type, prompt, choices, answer, hasImage, fileData]);
            });
            const ws = XLSX.utils.aoa_to_sheet(rows);
            const wb = XLSX.utils.book_new();
            const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
            XLSX.utils.book_append_sheet(wb, ws, 'Questions');
            const blob = new Blob([wbout], {type: 'application/octet-stream'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${bank.name}.xlsx`;
            a.click();
            URL.revokeObjectURL(a.href);
        });
        
        function bankToHTML(bank){
            // Build a simple HTML document that Word can open. Images embedded as data URLs.
            let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(bank.name)}</title></head><body>`;
            html += `<span>${escapeHtml(bank.name)}</span>`;
            bank.questions.forEach((q, i) => {
                html += `<span>${i + 1}. [${escapeHtml(q.type)}] ${escapeHtml(q.prompt)}</span>`;
                if(q.choices){
                    html += '<ul>';
                    q.choices.forEach((c) => {
                        html += `<li>${escapeHtml(c.text)} ${c.correct ? '<strong>(正確)</strong>' : ''}</li>`;
                    });
                    html += '</ul>';
                }
                if(q.answers){
                    html += `<div><strong>答案:</strong>${escapeHtml((q.answers || []).join(', '))}</div>`;
                }
                if(q.model){
                    html += `<div><strong>參考答案:</strong>${escapeHtml(q.model)}</div>`;
                }
                if(q.file && q.file.type.startsWith('image/')){
                    html += `<div><img src="${q.file.dataUrl}" style="max-width: 400px"></div>`;
                }
                if(q.file && q.file.type.startsWith('audio/')){
                    html += `<div>(含音檔)</div>`;
                }
            });
            html += '</body></html>';
            return html;
        }
        // helper: escape html
        function escapeHtml(str){
            if(!str) return '';
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        // delete bank button
        deleteBankBtn.addEventListener('click', () => {
            if(!currentBankId) return;
            if(!confirm('確定刪除此題庫?')) return;
            banks = banks.filter(b => b.id !== currentBankId);
            currentBankId = null;
            persist();
            renderBanks();
            renderBankPanel();
        });
        // edit question (simple placeholder) - already implemented earlier as editQuestion

        // keyboard nav for preview
        window.addEventListener('keydown', e => {
            if(e.key === 'ArrowLeft'){
                prevQ.click();
            }
            if(e.key === 'ArrowRight'){
                nextQ.click();
            }
        });
        // initial render
        renderBanks();
        renderBankPanel();
})();
// test of script.js
const aArea = document.getElementById('aArea');
aArea.innerHTML = html;