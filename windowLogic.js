let main = document.getElementById('main');
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let canvasLength = main.clientHeight;
let boxLength = canvasLength / 9;

function initializeCanvasSize() {
    canvasLength = main.clientHeight;
    boxLength = canvasLength / 9;

    canvas.height = canvasLength;
    canvas.width = canvasLength;

    // If drawboard is defined then call it
    if (typeof drawBoard === 'function') {
        drawBoard();
    }
}

window.addEventListener('resize', initializeCanvasSize, false);

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

// ========== COLLAPSE SETUP ========== 
let collapse_container = document.getElementById('collapse_container');
let collapse_canvas = document.getElementById("collapse");
let collapse_ctx = canvas.getContext("2d");

function initializeCollapseCanvasSize() {
    // canvas length will be height of main
    collapse_canvas.height = canvasLength;
    collapse_canvas.width = canvasLength;
}

window.addEventListener('resize', initializeCollapseCanvasSize, false);

initializeCollapseCanvasSize();