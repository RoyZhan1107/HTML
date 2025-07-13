// 元素參考
const player = document.getElementById("player");
const lyricsList = document.getElementById("lyrics-list");
let lyricsMap = [];

// 每秒同步歌詞滾動
player.addEventListener("timeupdate", () => {
  const currentTime = player.currentTime;
  const currentLineIndex = lyricsMap.findIndex((line, index) => {
    const next = lyricsMap[index + 1];
    return currentTime >= line.time && (!next || currentTime < next.time);
  });

  if (currentLineIndex !== -1) {
    document.querySelectorAll(".lyrics-line").forEach((el, i) => {
      el.style.color = i === currentLineIndex ? "red" : "#000";
      el.style.fontSize = i === currentLineIndex ? "20px" : "14px";
    });

    const activeLine = document.getElementById("line-" + currentLineIndex);
    if (activeLine) {
      lyricsList.scrollTo({
        top: activeLine.offsetTop - 60,
        behavior: "smooth"
      });
    }
  }
});

// 載入對應 .txt 檔案的歌詞
function loadLyrics(songName) {
  const txtPath = `lyrics/${songName}.txt`;

  fetch(txtPath)
    .then(res => {
      if (!res.ok) throw new Error("無法載入歌詞檔");
      return res.text();
    })
    .then(parseLRCFromTXT)
    .catch(() => {
      lyricsList.innerHTML = "<li>找不到歌詞</li>";
    });
}

// 解析 .txt 檔（內容需為 LRC 格式）
function parseLRCFromTXT(txt) {
  lyricsMap = [];
  lyricsList.innerHTML = "";
  const lines = txt.split("\n");

  lines.forEach((line, index) => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (match) {
      const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
      const text = match[3].trim();
      lyricsMap.push({ time, text });
    }
  });

  lyricsMap.forEach((line, index) => {
    const li = document.createElement("li");
    li.className = "lyrics-line";
    li.id = "line-" + index;
    li.textContent = line.text;
    lyricsList.appendChild(li);
  });
}
