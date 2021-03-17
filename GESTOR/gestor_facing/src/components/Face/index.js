import React, { useState, useEffect } from 'react';
import './Face.css';
import Canvas from './Canvas';
import { getEmotion } from '../../services/emotions';

const Face = (props) => {
  const [amplitude, setAmplitude] = useState(100);
  const [talking, setTalking] = useState(false);
  const [emotion, setEmotion] = useState("Neutral")
  const [blink, setBlink] = useState(undefined)
  const { msg, setMsg } = props;

  useEffect(() => {
    let speakInterval = setInterval(
      () => {
        setAmplitude(Math.random() * 100)
      },
      50
    )


    let blinkInterval = setInterval(
      () => {
        if (Math.random() * 10 > 4) {
          setBlink(0.2)
          const blinkTimeF1 = setTimeout(() => {
            setBlink(0.5)
            return clearTimeout(blinkTimeF1)
          }, 100)
          const blinkTimeF2 = setTimeout(() => {
            setBlink(1)
            return clearTimeout(blinkTimeF2)
          }, 200)
        }
      },
      2000
    )

    return () => {
      clearInterval(speakInterval);
      clearInterval(blinkInterval);
    }
  }, [])

  useEffect(() => {
    if (msg !== '') {
      var interval;
      var tts = new SpeechSynthesisUtterance();

      tts.onstart = () => {
        console.log('start')
        setTalking(true);
      }

      tts.onend = () => {
        setTalking(false);
        setEmotion('Neutral')
        console.log('end')
        clearInterval(interval);
      }
      tts.lang = "es-MX";
      tts.text = msg;
      setAmplitude(Math.random() * 100)
      getEmotion(msg).then(res => {
        console.log(res)
        if (res.length) {
          if (res.length > 1) {
            interval = setInterval(
              () => {
                setEmotion(res[Math.floor(Math.random() * res.length)])
              },
              1000
            )
          } else {
            setEmotion(res[0])
          }
        }
      })
      window.speechSynthesis.speak(tts);
      setMsg('')
      return () => {
        clearInterval(interval);
      }
    }
  }, [msg, setMsg])
  return (
    <div className="App">
      <Canvas
        // TODO: identify emotion on msg
        emotion={emotion}
        amplitude={amplitude}
        blink={blink}
        mode={talking ? "talk" : "quiet"}
      />
    </div>
  );
}

export default Face;
