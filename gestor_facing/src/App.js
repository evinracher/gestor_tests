import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App() {
  const [amplitude, setAmplitude] = useState(100);
  const [talking, setTalking] = useState(false);

  useEffect(() => {
    let interval = setInterval(
      () => {
        setAmplitude(Math.random() * 100)
      },
      100
    )
    return () => {
      clearInterval(interval);
    }
  }, [])
  return (
    <div className="App">
      <Canvas

        onClick={() => {
          var msg = new SpeechSynthesisUtterance();
          msg.onstart = () => {
            console.log('start')
            setTalking(true);
          }
          msg.onend = () => {
            setTalking(false);
            console.log('end')
          }
          msg.lang = "es-MX";
          msg.text = "Hola mi nombre es Gestor, recuerda lavarte las manos para prevenir el covid";
          window.speechSynthesis.speak(msg);
          setAmplitude(Math.random() * 100)
        }}
        emotion={"Sad"}
        amplitude={amplitude}
        mode={talking ? "talk" : "quiet"}
      />
    </div>
  );
}

export default App;
