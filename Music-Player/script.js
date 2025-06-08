
  // 載入並解析 lrc 檔
  fetch("lyrics.lrc")
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    })
    .then(text => {
      const lines = text.split("\n").filter(l => /\[\d{2}:\d{2}\.\d{2,3}\]/.test(l));
      lyrics = lines.map(l => {
        const m = l.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.+)/);
        return {
          time: parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3]) / (m[3].length === 2 ? 100 : 1000),
          text: m[4].trim()
        };
      });
    })
    .catch(e => console.error("Failed to load .lrc:", e));

  // 每次播放更新歌詞
  audio.addEventListener("timeupdate", () => {
    const t = audio.currentTime;
    const i = lyrics.findIndex((line, idx) => t >= line.time && t < (lyrics[idx+1]?.time || Infinity));
    if (i !== -1 && i !== lastIndex) {
      updateLyrics(i);
      lastIndex = i;
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
