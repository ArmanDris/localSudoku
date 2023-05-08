let main = document.getElementById('main');
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


window.addEventListener('resize', setCanvasSize, false);

let canvasLength = main.clientHeight;
let boxLength = canvasLength / 9;

function initializeCanvasSize() {
    canvasLength = main.clientHeight;
    // canvas length will be height of main
    canvas.height = canvasLength;
    canvas.width = canvasLength;
}

function setCanvasSize() {
    initializeCanvasSize();
    boxLength = canvasLength / 9;
    drawBoard();
}

window.addEventListener('mousedown', e => {handleInput(e);});
window.addEventListener('keydown', e => {handleInput(e)});

function handleInput(e) {
    if (e instanceof MouseEvent) {
        handleMouseEvent(e);
    } else {
        handleKeyEvent(e);
    }
}

// ========== TO RUN ========== 
initializeCanvasSize();