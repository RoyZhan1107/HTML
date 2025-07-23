function queTotal(event){
    event.preventDefault();
    const queTotal = document.getElementById("que-total");
    queTotal.style.display = (queTotal.style.display === "block") ? "none" : "block";
}