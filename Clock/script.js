function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const week = ['Sun','Mon','Tue','Wen','Thu','Fri','Sat'];
    const Week = week[now.getDay()];

    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = `${year}-${month}-${day}-${Week}`;

    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();