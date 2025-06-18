  // 載入並解析 lrc 檔
  fetch("boyfriend-lyrics.txt?v=" + Date.now())
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    })
    .then(text => {
      const lines = text.split("\n");
      lines.forEach(line => {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
        if (match) {
          const time = parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 100;
          lyrics.push({ time: time, text: match[4] });
        }
      });
    });

  // 每次播放更新歌詞
  audio.addEventListener("play", () => {
    const t = audio.currentTime;
    for(let i = 0; i < lyrics.length; i++) {
      const current = lyrics[i];
      const next = lyrics[i + 1] || {time: Infinity};
      if(currentTime >= current.time && t < next.time) {
          updateLyrics(i);
        break;
      }
    }
  });

  

  let lyrics = [], lastIndex = -1;

  function updateLyrics(idx) {
    const display = document.getElementById("lyrics-display");
    display.innerHTML = "";
    const start = Math.max(0, idx - 2), end = Math.min(lyrics.length, idx + 3);
    for (let i = start; i < end; i++) {
      const div = document.createElement("div");
      div.className = "lyrics-line" + (i === idx ? " active" : "");
      div.textContent = lyrics[i].text;
      display.appendChild(div);
    }
  }

