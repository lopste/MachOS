import {query as $} from "./util.js";

let canvas = $("#render")
canvas.width = Math.floor(window.innerWidth / 2);
canvas.height = Math.floor(window.innerHeight / 2);

let context = canvas.getContext("2d", { alpha: false, antialias: false })

canvas.style.setProperty("width", `${canvas.width * 2}px`);
canvas.style.setProperty("height", `${canvas.height * 2}px`);

let renderBatch = []
let nextRenderBatch = []
function render(t) {
  if(!renderBatch.length) {
    renderBatch = nextRenderBatch;
    nextRenderBatch = [];
    requestAnimationFrame(render);
    return;
  }
  
  for(let i = 0; i < renderBatch.length; i++) {
    let batch = renderBatch[i]
    if (batch) {
      batch(t);
    }
  }
  renderBatch = nextRenderBatch;
  nextRenderBatch = [];
  
  requestAnimationFrame(render);
}

function queueForRender(f) {
  nextRenderBatch.push(f)
}

requestAnimationFrame(render);

function rect(opt) {
  let defaultOptions = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    fill: "#f00",
    stroke: "#00f",
    strokeWidth: 1,

    strokeEnabled: true
  }

  let options = {}
  Object.assign(options, defaultOptions, opt)

  nextRenderBatch.push(() => {
    context.fillStyle = options.fill
    if(options.strokeEnabled) context.strokeStyle = options.stroke
    if(options.strokeEnabled) context.strokeWidth = options.strokeWidth
    context.beginPath()
    
    let offset = options.strokeEnabled ? 0.5 : 0
    context.rect(options.x + offset, options.y + offset, options.width, options.height)
    context.closePath()
    context.fill()
    if(options.strokeEnabled) context.stroke()
  })
}

function ellipse(opt) {
  let defaultOptions = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    fill: "#f00",
    stroke: "#00f",
    strokeWidth: 1,

    rotation: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,

    strokeEnabled: true
  }

  let options = {}
  Object.assign(options, defaultOptions, opt)

  nextRenderBatch.push(() => {
    context.fillStyle = options.fill
    if(options.strokeEnabled) context.strokeStyle = options.stroke
    if(options.strokeEnabled) context.strokeWidth = options.strokeWidth
    context.beginPath()
    
    context.ellipse(options.x, options.y, 
                    options.width / 2, options.height / 2,
                    options.rotation, options.startAngle, options.endAngle)
    context.closePath()
    context.fill()
    if(options.strokeEnabled) context.stroke()
  })
}

function clear(opt) {
  let defaultOptions = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
  }

  let options = Object.assign({}, defaultOptions, opt)
  
  nextRenderBatch.push(() => {
    context.clearRect(options.x, options.y, options.width, options.height)
  })
}

export default {
  canvas,
  context,
  queueForRender,
  
  rect,
  clear,
  ellipse
}