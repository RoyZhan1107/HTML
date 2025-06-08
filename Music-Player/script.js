const audio = document.getElementById("audio");
const lyricsBox = document.getElementById("lyrics-list");
let lyrics = [];

fetch("lyrics.lrc")
  .then(res => res.text())
  .then(data => {
    lyrics = parseLRC(data);
    lyrics.forEach(line => {
      const div = document.createElement("div");
      div.textContent = line.text;
      div.dataset.time = line.time;
      lyricsBox.appendChild(div);
    });
  });

function parseLRC(data) {
  const lines = data.split("\n");
  const result = [];

  for (const line of lines) {
    const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseFloat(match[2]);
      const time = min * 60 + sec;
      const text = match[3].trim();
      result.push({ time, text });
    }
  }
  return result;
}

// 自動滾動 + 歌詞標記
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  let activeIndex = -1;

  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    }
  }

  const lines = lyricsBox.children;
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.remove("active");
  }

  if (activeIndex >= 0) {
    lines[activeIndex].classList.add("active");
    lines[activeIndex].scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
