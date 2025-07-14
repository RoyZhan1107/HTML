const player = document.getElementById("audio");
const lyricsList = document.getElementById("lyrics-list");
let lyricsMap = [];
let currentLineIndex = -1;

function loadLyrics(songName) {
  fetch(`lyrics/${songName}.txt`)
    .then(res => res.ok ? res.text() : Promise.reject("歌詞載入失敗"))
    .then(parseLyrics)
    .catch(err => {
      console.error(err);
      lyricsList.innerHTML = "<li>找不到歌詞</li>";
    });
}

function parseLyrics(txt) {
  lyricsMap = [];
  lyricsList.innerHTML = "";

  txt.split("\n").forEach((line, index) => {
    const match = line.match(/\[(\d{2}):(\d{2}(?:\.\d+)?)\](.*)/);
    if (match) {
      const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
      const text = match[3].trim();
      lyricsMap.push({ time, text });

      const li = document.createElement("li");
      li.className = "lyrics-line";
      li.id = `line-${index}`;
      li.textContent = text;
      lyricsList.appendChild(li);
    }
  });
}

player.addEventListener("timeupdate", () => {
  const currentTime = player.currentTime;

  const index = lyricsMap.findIndex((line, i) => {
    const next = lyricsMap[i + 1];
    return currentTime >= line.time && (!next || currentTime < next.time);
  });

  if (index !== -1 && index !== currentLineIndex) {
    currentLineIndex = index;

    document.querySelectorAll(".lyrics-line").forEach((el, i) => {
      el.classList.toggle("active", i === index);
    });

    const activeLine = document.getElementById(`line-${index}`);
    if (activeLine) {
      const scrollContainer = lyricsList;
      const scrollOffset = activeLine.offsetTop - scrollContainer.offsetTop - scrollContainer.clientHeight / 2 + activeLine.clientHeight / 2;
      scrollContainer.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  }
});

// Example usage on page load
window.onload = () => {
  const songName = "I Like You"; // 檔名不含副檔名
  player.src = `Music/${songName}.mp3`;
  loadLyrics(songName);
};
