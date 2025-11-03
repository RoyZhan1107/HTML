document.addEventListener("contextmenu", function(e){
    e.preventDefault();
})
function checkMaintenanceTime(){
    const on = 1;
    if(on === 1){
        document.body.innerHTML =
        `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; background: #1d1d1d; color: #fff; text-align: center;">
	    <header style="position: absolute; top: 0; width: 100%; background-color: #333; color: #fff; padding: 10px 0 ; text-align: center;">系統維護中</header>
	    <p>系統維護時間: 01:00(A.M.) - 06:00(A.M.)</p>
	    <p>目前時間為系統正在維護中，造成您的不便，敬請見諒</p>
        </div>`;
    }
        else{
            document.body.innerHTML =
            `<span>檔案分享網站</span>
        <ul>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/112-1物理期中會考答案.pdf" class="btn" download>下載 112-1物理其中會考題目.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/112-1物理期中會考題目.pdf" class="btn" download>下載 112-1物理其中會考答案.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/112-1物理期末會考答案.pdf" class="btn" download>下載 112-1物理其末會考題目.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/112-1物理期末會考題目.pdf" class="btn" download>下載 112-1物理其末會考答案.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/112-2物理期中會考題目.pdf" class="btn" download>下載 112-2物理其中會考題目.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/112-2物理期末會考答案.pdf" class="btn" download>下載 112-2物理其末會考答案.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/112-2物理期末會考題目.pdf" class="btn" download>下載 112-2物理其末會考題目.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/113-1物理期中會考答案.pdf" class="btn" download>下載 113-1物理其中會考題目.pdf</a></li>
            <li><a href="https://royzhan1107.github.io/HTML/File-Share/File/113-1物理期中會考題目.pdf" class="btn" download>下載 113-1物理其中會考題目.pdf</a></li>
        </ul>
        <small class="small">這個網站僅限於題庫下載，並且不可轉傳給他人，以避免盜用他人之著作權等等糾紛</small>`;
        }
}