const player = document.getElementById("audio");
const lyricsList = document.getElementById("lyrics-list");
let lyricsMap = [], currentLineIndex = -1;

function loadLyrics(songName) {
  fetch(`lyrics/${songName}.txt`)
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    })
    .then(parseLyrics)
    .catch(err => {
      console.error("載入錯誤:", err);
      lyricsList.innerHTML = "<li>歌詞載入失敗</li>";
    });
}

function parseLyrics(txt) {
  lyricsMap = [];
  lyricsList.innerHTML = "";
  txt.split("\n").forEach((line, idx) => {
    const m = line.match(/\[(\d{2}):(\d{2}(?:\.\d+)?)\](.*)/);
    if (m) {
      const time = parseInt(m[1]) * 60 + parseFloat(m[2]);
      lyricsMap.push({ time, text: m[3].trim() });
      const li = document.createElement("li");
      li.id = `line-${idx}`;
      li.textContent = m[3].trim();
      lyricsList.appendChild(li);
    }
  });
}

player.addEventListener("timeupdate", () => {
  const t = player.currentTime;
  const idx = lyricsMap.findIndex((l,i) => {
    const next = lyricsMap[i+1];
    return t >= l.time && (!next || t < next.time);
  });
  if (idx !== -1 && idx !== currentLineIndex) {
    currentLineIndex = idx;
    document.querySelectorAll(".lyrics-line").forEach((el, i) => {
      el.classList.toggle("active", i === idx);
    });
    const active = document.getElementById(`line-${idx}`);
    if (active) {
      const top = active.offsetTop - lyricsList.clientHeight/2;
      lyricsList.scrollTo({ top, behavior: "smooth" });
    }
  }
});

// 页面初始化
window.onload = () => {
  player.src = "Music/I Like You.mp3";
  loadLyrics("I Like You");
};
