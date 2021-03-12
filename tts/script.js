var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname == bname) return 0;
    else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    console.log(utterThis)
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function (event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function () {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function () {
  speak();
}
// Other example
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();

var bufferLength = analyser.fftSize;
var dataArray = new Float32Array(bufferLength);

window.isAudioPlaying = () => {
  analyser.getFloatTimeDomainData(dataArray);
  for (var i = 0; i < bufferLength; i++) {
    if (dataArray[i] != 0) return true;

  }
  return false;
}

navigator.mediaDevices.getDisplayMedia({
  video: true,
  audio: true
})
  .then(stream => {
    console.log(stream)
    if (stream.getAudioTracks().length > 0) {
      var source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      document.body.classList.add('ready');
    } else {
      console.log('Failed to get stream. Audio not shared or browser not supported');
    }

  }).catch(err => console.log("Unable to open capture: ", err));
