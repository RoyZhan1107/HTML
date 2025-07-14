const player = document.getElementById("audio");
const lyricsList = document.getElementById("lyrics-list");
let lyricsMap = [];
// let currentLineIndex = -1;

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

let lastLineIndex = -1;  // 全域變數

player.addEventListener("timeupdate", () => {
  const currentTime = player.currentTime;
  const currentLineIndex = lyricsMap.findIndex((line, idx) => {
    const next = lyricsMap[idx + 1];
    return currentTime >= line.time && (!next || currentTime < next.time);
  });

  if (currentLineIndex === -1 || currentLineIndex === lastLineIndex) return;

  lastLineIndex = currentLineIndex;

  document.querySelectorAll(".lyrics-line").forEach((el, i) => {
    el.classList.toggle("active", i === currentLineIndex);
  });

  const activeLine = document.getElementById(`line-${currentLineIndex}`);
  if (activeLine) {
    const half = lyricsList.clientHeight / 2;
    lyricsList.scrollTo({
      top: activeLine.offsetTop - half,
      behavior: "smooth"
    });
  }
});



// Example usage on page load
window.onload = () => {
  const songName = "I Like You"; // 檔名不含副檔名
  player.src = `Music/${songName}.mp3`;
  loadLyrics(songName);
};
