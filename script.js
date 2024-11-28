var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var resetButton = document.getElementById("reset");
var netice = document.getElementById("netice");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert('Speech recognition is not supported in this browser.');
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = window.navigator.language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let isManuallyStopped = false;

    // Check microphone permissions
    navigator.permissions.query({ name: 'microphone' }).then((permission) => {
        if (permission.state === 'denied') {
            alert('Please enable microphone permissions for speech recognition.');
        }
    });

    startButton.addEventListener('click', () => {
        isManuallyStopped = false;
        recognition.start();
        console.log('Speech recognition started.');
    });

    stopButton.addEventListener('click', () => {
        isManuallyStopped = true;
        recognition.stop();
        console.log('Speech recognition stopped.');
    });

    resetButton.addEventListener("click", () => {
        netice.value = "";
    });

    recognition.addEventListener('result', (event) => {
        const result = event.results[event.resultIndex][0].transcript;
        netice.value += result + ' ';
        console.log('Recognized speech:', result);
    });

    recognition.addEventListener('end', () => {
        if (!isManuallyStopped) {
            recognition.start();
            console.log('Speech recognition restarted.');
        }
    });

    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
            alert('Microphone access is not allowed. Please enable it in browser settings.');
        } else if (event.error === 'network') {
            alert('Network error. Please check your connection.');
        } else {
            alert('Speech recognition error: ' + event.error);
        }
    });
}

