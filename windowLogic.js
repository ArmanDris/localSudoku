let main = document.getElementById('main');
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function initializeCanvasSize() {
    canvasLength = main.clientHeight;
    boxLength = canvasLength / 9;

    // Need to double canvas size and then half it to make it not blurry
    canvas.width = canvasLength * 2;
    canvas.height = canvasLength * 2;
    canvas.style.width = canvasLength + "px";
    canvas.style.height = canvasLength + "px";
    canvas.getContext('2d').scale(2,2)

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