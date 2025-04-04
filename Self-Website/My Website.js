function Language(lang){
    if(lang === "en"){
        document.getElementById("Home").textContent = "Home";
        document.getElementById("Personal Study Result").textContent = "Personal Study Result";
        document.getElementById("Youtube Channel").textContent = "Youtube Channel";
        document.getElementById("Personal Bloger").textContent = "My Bloger";
        document.getElementById("Name").textContent = "Name";
        document.getElementById("Names").textContent = "Roy Zhan";
        document.getElementById("Constellation").textContent = "Constellation";
        document.getElementById("Constellations").textContent = "Scorpio";
        document.getElementById("Birthday").textContent = "Birthday";
        document.getElementById("Chinese Zodiac").textContent = "Chinese Zodiac";
        document.getElementById("Chinese Zodiacs").textContent = "Dog";
        document.getElementById("Github").textContent = "Github Website";
        document.getElementById("Github Website").textContent = "Roy Zhan's HTML Homepage";
        document.getElementById("Github Website").style.color = "#fff";
        document.getElementById("About").textContent = "About Me";
        document.getElementById("About Me").textContent = "I am very interested in programming, I have learned C++, C#, HTML, etc., and I can disassemble and assemble computers.";
        document.getElementById("footer").innerHTML = "&copy; Writer: Roy Zhan";
    }
    else if(lang === "zh"){
        document.getElementById("Home").textContent = "首頁";
        document.getElementById("Personal Study Result").textContent = "個人學習成果";
        document.getElementById("Youtube Channel").textContent = "個人 Youtube 頻道";
        document.getElementById("Personal Bloger").textContent = "個人部落格";
        document.getElementById("Name").textContent = "姓名";
        document.getElementById("Names").textContent = "嚴浩軒";
        document.getElementById("Constellation").textContent = "星座";
        document.getElementById("Constellations").textContent = "天蠍座";
        document.getElementById("Birthday").textContent = "生日";
        document.getElementById("Chinese Zodiac").textContent = "生肖";
        document.getElementById("Chinese Zodiacs").textContent = "狗";
        document.getElementById("Github").textContent = "Github 網站";
        document.getElementById("Github Website").textContent = "嚴浩軒的 HTML 首頁";
        document.getElementById("Github Website").style.color = "#fff";
        document.getElementById("About").textContent = "關於我";
        document.getElementById("About Me").textContent = "對於程式很感興趣，學過 C++ 、C#、HTML等等，會拆裝電腦，";
        document.getElementById("footer").innerHTML = "&copy; 作者: 嚴浩軒";
    }

}