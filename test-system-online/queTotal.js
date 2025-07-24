function queTotal(event){
    event.preventDefault();
    const queTotal = document.getElementById("que-total");
    const queTable = document.getElementById("que-table");
    const isTrue = queTotal.style.display === "block";

    if(isTrue){
        queTotal.style.display = "none";
        queTable.style.display = "table";
    }else{
        queTotal.style.display = "block";
        queTable.style.display = "none";
    }
}
