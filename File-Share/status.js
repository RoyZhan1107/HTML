async function checkStatus() {
  const res = await fetch("https://gist.githubusercontent.com/royzhan1107/File-Share.html");
  const data = await res.json();

  if (data.on === 1) {
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;background:#1d1d1d;color:#fff;text-align:center;">
        <header style="position:absolute;top:0;width:100%;background-color:#333;color:#fff;padding:10px 0;text-align:center;">
          系統維護中
        </header>
        <p>系統維護時間: 01:00(A.M.) - 06:00(A.M.)</p>
        <p>目前時間為系統正在維護中，造成您的不便，敬請見諒。</p>
      </div>
    `;
  }
}
checkStatus();
