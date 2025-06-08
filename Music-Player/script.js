    const audio = document.getElementById("audio");
    const lyricsDisplay = document.getElementById("lyrics-display");
    let lyrics = [];

    fetch("lyrics.lrc")
      .then(response => response.text())
      .then(text => {
        const lines = text.split("\n");
        lyrics = lines
          .filter(line => /\[\d{2}:\d{2}\.\d{2}\]/.test(line))
          .map(line => {
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
            const time = parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 100;
            return { time: time, text: match[4] };
          });

        updateLyrics(0);
      });

    function updateLyrics(activeIndex) {
      lyricsDisplay.innerHTML = '';
      const linesToShow = 5;
      const start = Math.max(0, activeIndex - 2);
      const end = Math.min(lyrics.length, activeIndex + 3);
      for (let i = start; i < end; i++) {
        const line = document.createElement("div");
        line.className = "lyrics-line" + (i === activeIndex ? " active" : "");
        line.textContent = lyrics[i].text;
        lyricsDisplay.appendChild(line);
      }
    }

    audio.addEventListener("timeupdate", () => {
      const currentTime = audio.currentTime;
      for (let i = 0; i < lyrics.length; i++) {
        const current = lyrics[i];
        const next = lyrics[i + 1] || { time: Infinity };
        if (currentTime >= current.time && currentTime < next.time) {
          updateLyrics(i);
          break;
        }
      }
    });