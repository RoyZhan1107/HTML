const audioContext = new(window.AudioContext || window.webkitAudioContext)();
function Sound(note){
    const frequencies = {
        'C1': 130.81, 'C#1': 138.59, 'D1': 146.83, 'D#1': 155.56, 'E1': 164.81,
        'F1': 174.61, 'F#1': 185.00, 'G1': 196.00, 'G#1': 207.65, 'A1': 220.00,
        'A#1': 223.08, 'B1': 246.94,
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63,
        'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00,
        'A#': 466.16, 'B': 493.88, 'C2': 523.25, 'C#2': 554.37, 'D2': 587.33,
        'D#2': 622.25, 'E2': 659.25, 'F2': 698.46, 'F#2': 739.99, 'G2': 783.99,
        'G#2': 830.61, 'A2': 880.00, 'A#2': 932.33, 'B2':987.77
    };
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequencies[note];
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
}
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('keydown', function(event){
        const keyMap = {
            'a': 'C', 's': 'D', 'd': 'E', 'f': 'F', 'g': 'G', 'h': 'A', 'j': 'B', 'k': 'C2',
            '1': 'C', '2': 'D', '3': 'E', '4': 'F', '5': 'G', '6': 'A', '7': 'B', '8': 'C2',
            'z': 'C1', 'x': 'D1', 'c': 'E1', 'v': 'F1', 'b': 'G1', 'n': 'A1', 'm': 'B1',
            'q': 'C2', 'w': 'D2', 'e': 'E2', 'r': 'F2', 't': 'G2', 'y': 'A2', 'u': 'B2'
        };
        const note = keyMap[event.key];
        if(note){
            Sound(note);
        }
    });
})