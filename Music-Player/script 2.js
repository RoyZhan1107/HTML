// 儲存 LRC 文件內容為 JavaScript 物件
const lyrics = {
    "00:08.22": "I'm a motherfuckin' train wreck",
    // ...
};

// 創建一個 div 元素用於顯示歌詞
const lyricContainer = document.getElementById("lyric-container");
if (!lyricContainer) {
    const container = document.createElement("div");
    container.id = "lyric-container";
    document.body.appendChild(container);
}

// 取得音樂播放器的播放進度
function getProgress() {
    // 這裡是取得播放器進度的代碼，假設您已經有這個功能
    const progress = getMusicPlayerProgress();
    return progress;
}

// 更新顯示的歌詞內容
function updateLyrics() {
    const progress = getProgress();
    let lyricTime = "";
    for (const time in lyrics) {
        if (time > progress.toFixed(2)) {
            lyricTime = time;
        }
    }
    const lyricText = lyrics[lyricTime];
    if (lyricText) {
        lyricContainer.innerHTML = lyricText;
    } else {
        // 如果找不到歌詞，顯示"歌詞未找到"
        lyricContainer.innerHTML = "歌詞未找到";
    }
}

// 進入音樂播放器的播放事件，更新歌詞內容
document.addEventListener("play", () => {
    updateLyrics();
});

// 這裡是播放進度變化事件的代碼，假設您已經有這個功能
const musicPlayer = document.getElementById("music-player");
if (musicPlayer) {
    musicPlayer.addEventListener("progress", () => {
        updateLyrics();
    });
}
