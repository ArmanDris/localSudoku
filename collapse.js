const collapseBoardColor = '#27241D';
const collapseFont = "300 4px Sans-serif";
const ds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let collapseBoard = [];
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);
collapseBoard.push([ds, ds, ds, ds, ds, ds, ds, ds, ds]);

// Make a 9x9 sqaure 
// Every 3rd line is bold both vertically and horizontally
function drawCollapseGrid() {
    // Vertixal lines
    for (let i = 1; i < 9; i++) {
        collapse_ctx.beginPath();
        if (i % 3 === 0) {
            collapse_ctx.rect(i * boxLength - lineThickness, 0, lineThickness + 2, canvasLength);
        } else {
            collapse_ctx.rect(i * boxLength - (lineThickness + 0), 0, lineThickness, canvasLength);
        }
        collapse_ctx.fillStyle = collapseBoardColor;
        collapse_ctx.fill();
        collapse_ctx.closePath();
    }

    // Horizontal lines
    for (let i = 1; i < 9; i++) {
        collapse_ctx.beginPath();
        if (i % 3 === 0) {
            collapse_ctx.rect(0, i * boxLength - lineThickness, canvasLength, lineThickness + 2);
        } else {
            collapse_ctx.rect(0, i * boxLength - (lineThickness + 0), canvasLength, lineThickness);
        }
        collapse_ctx.fillStyle = collapseBoardColor;
        collapse_ctx.fill();
        collapse_ctx.closePath();
    }
}

// Draw all possible values square at x,y can take
function drawCollapseNumbers(x, y) {
    // Every square should be split into a grid of nine smaller squares
    // Each number the square can take will appear in the square
    collapse_ctx.fillStyle = collapseBoardColor;

    let boardValue = collapseBoard[y][x];

    // Just draw character
    if (boardValue.length === 1) {
        // draws text with bottom left part of character stating at x,y
        collapse_ctx.font = font;
        collapse_ctx.fillText(boardValue, (x + 0.4) * boxLength, (y + 0.7) * boxLength);
    }

    // Need to draw superposition
    else {

    }
    console.log(boardValue.length)
}

function drawAllCollapseNumbers() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            drawCollapseNumbers(x, y);
        }
    }
}

// Updates collapseBoard to match board
function syncBoards() {
    // 
}

drawCollapseGrid();
drawAllCollapseNumbers();