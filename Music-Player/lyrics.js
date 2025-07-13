const player = document.getElementById("player");
const lyricsList = document.getElementById("lyrics-list");
let lyricsMap = [];

function showLyrics(index) {
  const song = songQueue[index];
  if (song) {
    const name = song.name.split("(")[0].trim(); // 提取檔名
    loadLyrics(name); // 呼叫載入對應歌詞
  }
}

function loadLyrics(songName) {
  const txtPath = `lyrics/${encodeURIComponent(songName)}.txt`;
  fetch(txtPath)
    .then(res => {
      if (!res.ok) throw new Error(`載入失敗: ${res.status}`);
      return res.text();
    })
    .then(parseLRCFromTXT)
    .catch(err => {
      console.error(err);
      lyricsList.innerHTML = "<li>找不到歌詞</li>";
    });
}

function parseLRCFromTXT(txt) {
  lyricsMap = [];
  lyricsList.innerHTML = "";
  txt.split("\n").forEach(v => {
    const m = v.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (m) {
      lyricsMap.push({
        time: parseInt(m[1]) * 60 + parseFloat(m[2]),
        text: m[3].trim()
      });
    }
  });
  lyricsMap.forEach((ln,i) => {
    const li = document.createElement("li");
    li.className = "lyrics-line";
    li.id = "line-" + i;
    li.textContent = ln.text;
    lyricsList.appendChild(li);
  });
}

player.addEventListener("timeupdate", () => {
  const t = player.currentTime;
  const idx = lyricsMap.findIndex((ln,i) => {
    const next = lyricsMap[i+1];
    return t >= ln.time && (!next || t < next.time);
  });
  if (idx !== -1) {
    lyricsList.querySelectorAll(".lyrics-line").forEach((el,i) => {
      el.style.color = i === idx ? "red" : "#888";
      el.style.fontSize = i === idx ? "20px" : "14px";
    });
    const active = document.getElementById(`line-${idx}`);
    if (active) {
      lyricsList.scrollTo({
        top: active.offsetTop - lyricsList.clientHeight/2,
        behavior: "smooth"
      });
    }
  }
});
