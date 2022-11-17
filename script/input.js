import render from "./render.js";

let events = {
  "mousemove": [],
  "mouseup": [],
  "mousedown": [],
  "click": [],
  "dblclick": [],
  "keydown": [],
  "keyup": [],
  "keypress": []
};

function emit(eventName, e) {
  let fns = events[eventName]
  fns.forEach(fn => fn(e));
}

function on(eventName, fn) {
  events[eventName].push(fn);
}

function remove(eventName, fn) {
  let fns = events[eventName]
  fns.splice(fns.indexOf(fn), 1);
}

Object.keys(events).forEach((k) => {
  document.body.addEventListener(k, (e) => {
    let me = Object.assign({}, e);
    
    let transformPos = n => Math.floor(n/2)
    if(e instanceof MouseEvent) {
      me.pageX = transformPos(e.pageX);
      me.pageY = transformPos(e.pageY);

      me.offsetX = transformPos(e.offsetX);
      me.offsetY = transformPos(e.offsetY);
    }
    
    emit(k, me);
  })
})

function relativeToCanvas(x,y) {
  return {
    x: x - render.canvas.getBoundingClientRect().left,
    y: y - render.canvas.getBoundingClientRect().top
  }  
}

export default {
  emit,
  on,
  remove,

  relativeToCanvas
}