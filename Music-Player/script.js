fetch("lyrics.lrc?v=" + Date.now())
  .then(response => response.ok ? response.text() : Promise.reject("載入失敗"))
  .then(text => {
    const lines = text.split("\n");
    lyrics = [];

    lines.forEach(line => {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
      if (match) {
        const time = parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 100;
        lyrics.push({ time: time, text: match[4] });
      }
    });

    updateLyrics(0);
  })
  .catch(err => {
    console.error("載入 lyrics.lrc 失敗:", err);
    lyricsDisplay.textContent = "無法載入歌詞";
  });
