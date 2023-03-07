import dom from './dom';

import './resources/style.css';

dom(() => {
    let canvas = document.querySelector("canvas#display") as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');

    if(!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillText("Hello World!", 10, 10);
});