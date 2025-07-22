function changeFontSize() {
    const fontSize = document.getElementById('fontSizeSelect').value;
    document.getElementById('question').style.fontSize = `${fontSize}px`;
    document.querySelectorAll('label[for^="option"]').forEach((label) => {
        label.style.fontSize = `${fontSize}px`;
    });
}