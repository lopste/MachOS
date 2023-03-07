function init(start: () => void = () => null) {
    // check if canvas is supported
    if (!document.createElement('canvas').getContext) {
        alert('Sorry, but your browser does not support the HTML canvas element. Please try a different browser.'); // TODO: use a better way to show this message
        return;
    }

    if (document.readyState === 'complete') {
        start()

        window.addEventListener('resize', canvasExpand);
    } else {
        document.addEventListener('DOMContentLoaded', function (){
            start();
            canvasExpand();

            window.addEventListener('resize', canvasExpand);
        });
    }
}

const canvasInitialWidth = 512;
const canvasInitialHeight = 342;

function canvasExpand() {
    const canvas = document.querySelector('canvas#display') as HTMLCanvasElement;

    const widthFit = Math.floor(window.innerWidth / canvasInitialWidth);
    const heightFit = Math.floor(window.innerHeight / canvasInitialHeight);

    const fit = Math.min(widthFit, heightFit);

    canvas.style.setProperty("width", (canvasInitialWidth * fit) + "px");
    canvas.style.setProperty("height", (canvasInitialHeight * fit) + "px");
    canvas.style.setProperty("border-width", (fit) + "px");
}

export default init;