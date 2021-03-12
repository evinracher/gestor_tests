import React, { useRef, useEffect } from 'react'

const canvasHeight = 480;
const canvasWidth = 800;
const background = '#282c34';
const itemColor = '#4FD4FF';
const baseEyesHeight = 150;
const baseMouthHeight = 300;
const emotions = {
  "Happy": {
    eyes: { height: baseEyesHeight + 25, start: Math.PI, end: 0 },
    mouth: { height: baseMouthHeight, start: 0, end: Math.PI }
  },
  "Angry": {
    eyes: { height: baseEyesHeight, start: 0, end: Math.PI },
    mouth: { height: baseMouthHeight + 25, start: Math.PI, end: 0 }
  },
  "Surprise": {
    eyes: { height: baseEyesHeight, start: 0, end: Math.PI * 2 },
    mouth: { height: baseMouthHeight + 50, start: Math.PI, end: 0 }
  },
  "Sad": {
    eyes: { height: baseEyesHeight, start: Math.PI + 1.8, end: Math.PI - 0.5 },
    mouth: { height: baseMouthHeight + 50, start: Math.PI, end: 0 }
  },
  "Fear": {
    eyes: { height: baseEyesHeight, start: Math.PI, end: 0 },
    mouth: { height: baseMouthHeight + 25, start: Math.PI, end: 0 }
  }
}



const Canvas = props => {
  const canvasRef = useRef(null);

  const { emotion } = props;

  const drawEyes = (ctx, height, start, end) => {
    ctx.fillStyle = itemColor;
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 - 180, height, 100, start, end)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 + 180, height, 100, start, end)
    ctx.fill()
  }

  const drawSadEyes = (ctx) => {
    ctx.fillStyle = itemColor;
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 - 180, baseEyesHeight, 100, Math.PI + 1.8, Math.PI - 0.5)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(canvasWidth / 2 + 180, baseEyesHeight, 100, 0.5, Math.PI + 1.2)
    ctx.fill()
  }

  const drawMouth = (ctx, height, start, end) => {
    ctx.beginPath()
    ctx.arc(canvasWidth / 2, height, 100, start, end)
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

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    //Our draw come here
    resizeCanvas(canvas)
    draw(context)
  }, [])
  return <canvas ref={canvasRef} {...props} />
}

export default Canvas