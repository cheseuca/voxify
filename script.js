const voiceDropdown = document.querySelector("#voices");
const rateInput = document.querySelector("#rate");
const pitchInput = document.querySelector("#pitch");
const textarea = document.querySelector("#textarea");
const stopButton = document.querySelector("#stop-button");
const speakButton = document.querySelector("#speak-button");

const message = new SpeechSynthesisUtterance(textarea.value);
let voices = [];

function populateVoices() {
    voices = speechSynthesis.getVoices();

    for(let index = 0; index < voices.length; index++) {
        const option = document.createElement("option");
        option.setAttribute("value", index);
        option.textContent = voices[index].name;

        voiceDropdown.appendChild(option);
    }

    setVoice();
}

function setVoice() {
    const selectedVoiceIndex = voiceDropdown.value;
    message.voice = voices[selectedVoiceIndex];
}

function setRate() {
  message.rate = rateInput.value;
}

function setPitch() {
  message.pitch = pitchInput.value;
}

function setText() {
  message.text = textarea.value;
}

function stopSpeak() {
    speechSynthesis.cancel();
}

function speakVoices() {
  speechSynthesis.speak(message);
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
rateInput.addEventListener("input", setRate);
pitchInput.addEventListener("input", setPitch);
textarea.addEventListener("input", setText);
voiceDropdown.addEventListener("change", setVoice);
stopButton.addEventListener("click", stopSpeak);
speakButton.addEventListener("click", speakVoices);