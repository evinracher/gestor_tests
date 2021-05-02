import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import { getEmotion, stop } from '../../services/emotions';

const Face = (props) => {
  const [amplitude, setAmplitude] = useState(100);
  const [talking, setTalking] = useState(false);
  const [moving, setMoving] = useState(false);
  const [emotion, setEmotion] = useState("Neutral")
  const [blink, setBlink] = useState(undefined)
    const { msg, setMsg } = props;
    var stopTimeout;

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
	clearTimeout(stopTimeout);
    }
  }, [])

  useEffect(() => {
    if (msg !== '' && !talking && !moving) {
      var interval;
      var tts = new SpeechSynthesisUtterance();

      tts.onstart = () => {
        console.log('start')
          setTalking(true);
	  setMoving(true);
      }

	tts.onend = () => {
	    setTalking(false);
	    stopTimeout = setTimeout(() => {
        stop()
	.then(res => {
	    console.log(res)
	      })
	      .catch((err) => console.error(err))
	      .finally(() => {
		  setMoving(false);
		  setEmotion('Neutral')
		  setMsg('')
		  console.log('end')
	      })
	    }, 4000)
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
	window.speechSynthesis.cancel();
	window.speechSynthesis.speak(tts);
      })
      return () => {
        clearInterval(interval);
      }
    }
  }, [msg, setMsg])
  return (
    <div className="App">
      <Canvas
        emotion={emotion}
        amplitude={amplitude}
        blink={blink}
        mode={talking ? "talk" : "quiet"}
      />
    </div>
  );
}

export default Face;
