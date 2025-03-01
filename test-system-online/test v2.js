let currentIndex = 0;

function fetchQuestion(select){
    return new Promise((resolve, reject) => {
        let fileName = "";
        switch(select){
            case "02800工業電子":
                fileName = "02800.json";
                break;
            case "11700數位電子乙級":
                fileName = "11700.json";
                break;
            case "11800電腦軟體應用":
                fileName = "11700.json";
                break;
            case "11900電腦軟體設計":
                fileName = "11900.json";
                break;
            case "12000電腦硬體裝修":
                fileName = "12000.json";
                break;
            case "12000電腦硬體裝修乙級":
                fileName = "12001.json";
                break;
            default:
                reject("無效選擇");
                return;
        }
        fetch(fileName)
            .then(response => {
                if(!response.ok){
                    throw new Error("無法載入 JSON 檔");
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
    fetchQuestion("11700數位電子乙級")
        .then(questionData => {
            console.log("載入的題目資料:", questionData);
        })
        .catch(error => {
            console.error("發生錯誤:", error);
        });
    /*
    if(select === "11700數位電子乙級"){
        fetch("11700.json")
            .then(response => response.json())
            .then(data => {
                question = data;
            })
    }else if(select === "18000電腦軟體應用"){
        fetch("18000.json")
            .then(response => response.json())
            .then(data => {
                question = data;
            })
    }
    */

function Previous(){
    currentIndex++;
}
function Next(){
    currentIndex--;
}