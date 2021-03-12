// it works as long as the height is not much smaller than the width
import React, { useRef, useEffect } from 'react'

const background = '#282c34';
const itemColor = '#4FD4FF';



const Canvas = props => {
  let canvasHeight = 480;
  let canvasWidth = 800;
  let emotions = {};
  let baseEyesHeight = 0;
  let baseMouthHeight = 0;
  let sizer = 0;
  const { amplitude, mode } = props;

  const initVariables = () => {
    sizer = Math.min(canvasHeight, canvasWidth);
    baseEyesHeight = canvasHeight * 0.3;
    baseMouthHeight = baseEyesHeight * 2;
    emotions = {
      "Happy": {
        eyes: { height: 25, start: Math.PI, end: 0 },
        mouth: { start: 0, end: Math.PI }
      },
      "Angry": {
        eyes: { start: 0, end: Math.PI },
        mouth: { height: 25, start: Math.PI, end: 0 }
      },
      "Surprise": {
        eyes: { start: 0, end: Math.PI * 2 },
        mouth: { height: 50, start: Math.PI, end: 0 }
      },
      "Sad": {
        eyes: { height: baseEyesHeight, start: Math.PI + 1.8, end: Math.PI - 0.5 },
        mouth: { height: 50, start: Math.PI, end: 0 }
      },
      "Fear": {
        eyes: { start: Math.PI, end: 0 },
        mouth: { height: 25, start: Math.PI, end: 0 }
      },
      "Neutral": {
        eyes: { start: Math.PI * 2, end: 0 },
        mouth: { start: 0, end: Math.PI }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvasWidth = canvas.width
    canvasHeight = canvas.height
    // canvas.width = canvasWidth
    // canvas.height = canvasHeight
    initVariables();
    //Our draw come here
    resizeCanvas(canvas)
    draw(context)
  }, [amplitude])

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
  //   draw(context);
  // }, [amplitude])

  const canvasRef = useRef(null);

  const { emotion } = props;

  const drawEyes = (ctx, height = 0, start, end) => {
    ctx.fillStyle = itemColor;
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 - canvasWidth * 0.15, baseEyesHeight + height, canvasWidth * 0.1, start, end)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 + canvasWidth * 0.15, baseEyesHeight + height, canvasWidth * 0.1, start, end)
    ctx.fill()
  }

  const drawSadEyes = (ctx) => {
    ctx.fillStyle = itemColor;
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 - canvasWidth * 0.15, baseEyesHeight, canvasWidth / 2 * 0.2, Math.PI + 1.8, Math.PI - 0.5)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 + canvasWidth * 0.15, baseEyesHeight, canvasWidth / 2 * 0.2, 0.5, Math.PI + 1.2)
    ctx.fill()
  }

  const drawMouth = (ctx, height = 0, start, end, radiusX = canvasWidth * 0.1, radiusY = amplitude > 0 ? amplitude : 0) => {
    ctx.beginPath()
    ctx.ellipse(canvasWidth / 2, baseEyesHeight + (canvasWidth * 0.1) * 2 + height, radiusX, radiusY > 100 || mode !== "talk" ? 100 : radiusY, 0, start, end)
    ctx.fill()
  }

  const draw = ctx => {
    ctx.fillStyle = background;
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fill()
    const { eyes, mouth } = emotions[emotion];
    if (emotion === 'Sad') {
      drawSadEyes(ctx);
    } else {
      drawEyes(ctx, eyes.height, eyes.start, eyes.end);
    }
    drawMouth(ctx, mouth.height, mouth.start, mouth.end);
  }

  function resizeCanvas(canvas) {
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window
      const context = canvas.getContext('2d')
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.scale(ratio, ratio)
      return true
    }

    return false
  }
  return <canvas ref={canvasRef} {...props} />
}

export default Canvas