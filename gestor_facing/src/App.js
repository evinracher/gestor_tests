import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import meSpeak from 'mespeak';
// import * as config from 'mespeak/voices/';
meSpeak.loadConfig(require("mespeak/src/mespeak_config.json"))
meSpeak.loadVoice(require("mespeak/voices/es.json"))

function sing(text, note, duration) {
  var buffer = meSpeak.speak(text, { rawdata: 'default' });
  console.log(buffer)
  // playSound(buffer, freqToCents(note), duration)
}

function freqToCents(freq) {
  var root = 440 //no idea what is the base frequency of the speech generator
  return 3986 * Math.log10(freq / 440)
}

function playSound(streamBuffer, cents, duration, callback) {
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var source = context.createBufferSource();
  // source.connect(compressor);

  context.decodeAudioData(streamBuffer, function (audioData) {
    var duration = audioData.duration;
    var delay = (duration) ? Math.ceil(duration * 1000) : 1000;
    setTimeout(callback, delay);
    source.buffer = audioData;
    source.detune.value = cents;

    source.start(0);
  }, function (error) { });
}

function App() {
  const [amplitude, setAmplitude] = useState(100);

  useEffect(() => {
  }, [])
  return (
    <div className="App">
      <Canvas

        onClick={() => {
          var audiostreams = [];
          var audioStream;
          // meSpeak.loadVoice('en/en-us');
          // meSpeak.loadVoice('voices/en/en-us.json');
          // meSpeak.loadVoice();
          // console.log(voice)
          // meSpeak.loadVoice('en/en-us')
          // meSpeak.loadVoice('voices/en/en-us.json');
          var test = meSpeak.speak('Hola, mi nombre es gestor. Recuerda lavarte las manos para prevenir el covid', { 'rawdata': 'array' }, function (success, id, stream) {
            // data is ArrayBuffer of 8-bit uint
            audiostreams.push(stream);
            audioStream = stream;
          });
          console.log(test)
          meSpeak.play(test);
          setAmplitude(Math.random() * 100)
        }}
        emotion={"Neutral"}
        amplitude={amplitude}
      />
    </div>
  );
}

export default App;
