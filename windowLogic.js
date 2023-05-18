// Prevent spacebar from scrolling page
window.addEventListener('keydown', function(e) {
    if (e.key === ' ' && e.target == document.body) {
        e.preventDefault();
    }
});

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
    canvas.getContext('2d').scale(2,2);

    // If drawboard is defined then call it
    if (typeof drawBoard === 'function') {
        drawBoard();
    }
}

window.addEventListener('resize', initializeCanvasSize, false);

// ========== TO RUN ========== 
initializeCanvasSize();

// ========== COLLAPSE SETUP ========== 
let collapse_container = document.getElementById('collapse_container');
let collapse_canvas = document.getElementById("collapse");
let collapse_ctx = collapse_canvas.getContext("2d");

function initializeCollapseCanvasSize() {
    collapse_canvas.width = canvasLength * 2;
    collapse_canvas.height = canvasLength * 2;
    collapse_canvas.style.width = canvasLength + "px";
    collapse_canvas.style.height = canvasLength + "px";
    collapse_canvas.getContext('2d').scale(2,2);

    if (typeof drawCollapseBoard === 'function') {
        drawCollapseBoard();
    }
}

window.addEventListener('resize', initializeCollapseCanvasSize, false);
initializeCollapseCanvasSize();

class Referee {
    constructor() {
        this.b = new Board();
        this.c = new Collapse(this.b);
    }

    setup_board() {
        //this.b.generateBoard();
        this.c.drawCollapseBoard();
        this.b.drawBoard();
    }

    handleInput(e) {
        if (e instanceof MouseEvent) {
            this.b.handleMouseEvent(e);
        } else {
            this.b.handleKeyEvent(e);
            this.c.syncBoards();
            this.c.drawCollapseBoard();
        }
    }
}

let referee = new Referee;
referee.setup_board();

window.addEventListener('mousedown', e => {referee.handleInput(e);});
window.addEventListener('keydown', e => {referee.handleInput(e);});