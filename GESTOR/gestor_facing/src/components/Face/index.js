import React, { useState, useEffect } from 'react';
import './Face.css';
import Canvas from './Canvas';

function Face(props) {
  const [amplitude, setAmplitude] = useState(100);
  const [talking, setTalking] = useState(false);
  const {msg, setMsg} = props;

  useEffect(() => {
    let interval = setInterval(
      () => {
        setAmplitude(Math.random() * 100)
      },
      50
    )
    return () => {
      clearInterval(interval);
    }
  }, [])

  useEffect(() => {
    if (msg !== '') {
      var tts = new SpeechSynthesisUtterance();
      tts.onstart = () => {
        console.log('start')
        setTalking(true);
      }
      tts.onend = () => {
        setTalking(false);
        console.log('end')
      }
      tts.lang = "es-MX";
      tts.text = msg;
      window.speechSynthesis.speak(tts);
      setAmplitude(Math.random() * 100)
      setMsg('')
    }
  }, [msg])
  return (
    <div className="App">
      <Canvas
        // TODO: identify emotion on msg
        emotion={"Happy"}
        amplitude={amplitude}
        mode={talking ? "talk" : "quiet"}
      />
    </div>
  );
}

export default Face;
