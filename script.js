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
    
    const uniqueVoices = new Set();
    
    voices.forEach(voice => {
        if (!uniqueVoices.has(voice.name)) {
            const option = document.createElement("option");
            option.setAttribute("value", voice.name);
            option.textContent = voice.name;
            voiceDropdown.appendChild(option);
            
            uniqueVoices.add(voice.name);
        }
    });
}

function setVoice() {
  for(let index = 0; index < voices.length; index++) {
    if(voices[index].name === voiceDropdown.value) {
      message.voice = voices[index];
    }
  }
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
rateInput.addEventListener("change", setRate);
pitchInput.addEventListener("change", setPitch);
textarea.addEventListener("change", setText);
stopButton.addEventListener("click", stopSpeak);
speakButton.addEventListener("click", speakVoices);

populateVoices();