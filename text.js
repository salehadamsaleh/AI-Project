/*text to speech part*/
const startsButton = document.getElementById("start-Button");
const stopsButton = document.getElementById("stop-Button");
const resetsButton = document.getElementById("reset-Button");
const textsArea = document.getElementById("text");

// Check browser support
if (!("speechSynthesis" in window)) {
    alert("Your browser does not support Text-to-Speech.");
}

let utterance;
const synth = window.speechSynthesis;

// Load voices when available
synth.onvoiceschanged = () => {
    console.log("Voices loaded:", synth.getVoices());
};

startsButton.addEventListener("click", () => {
    const text = textsArea.value.trim();
    if (text === "") {
        alert("Please enter text to convert to speech!");
        return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Adjust language as needed
    utterance.rate = 1; // Adjust rate (0.5 - 2)
    utterance.pitch = 1; // Adjust pitch (0 - 2)

    synth.speak(utterance);
});

stopsButton.addEventListener("click", () => {
    if (synth.speaking) {
        synth.cancel();
    }
});

resetsButton.addEventListener("click", () => {
    textsArea.value = "";
});
