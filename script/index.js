import { Rectangle, Ellipse } from "./shapes.js";
import render from "./render.js";
import input from "./input.js";

let rect = new Rectangle({
  x: 32,
  y: 32,
  width: 32,
  height: 32,

  fill: "#008cff",
  stroke: "#fff"
});
rect.render();

let dragging = false;
let dragRelative = null;
input.on("mousedown", ({offsetX: x, offsetY: y}) => {
  if(rect.isInside(x,y)) {
    dragging = true;
    dragRelative = rect.relativeTo(x,y);
  }
})

input.on("mousemove", ({offsetX: x, offsetY: y}) => {
  if(dragging) {
    rect.clear();
    rect.options.x = x - dragRelative.x;
    rect.options.y = y - dragRelative.y;
    rect.render();
  }

  if(rect.isInside(x, y)) {
    document.body.classList.add("pointer");
  } else {
    document.body.classList.remove("pointer");
  }
})

input.on("mouseup", () => {
  dragging = false
})