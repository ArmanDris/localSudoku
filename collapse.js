const collapseBoardColor = '#27241D';
const collapseFont = "300 15px Sans-serif";
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
    let top_x = x * boxLength;
    let top_y = y * boxLength;

    collapse_ctx.fillStyle = collapseBoardColor;

    let boardValue = collapseBoard[y][x];

    // Just draw character
    if (boardValue.length === 1) {
        // draws text with bottom left part of character stating at x,y
        if (boardValue[0] < 0) { boardValue[0] = -boardValue[0]; }

        collapse_ctx.font = font;
        collapse_ctx.fillText(boardValue, (x + 0.4) * boxLength, (y + 0.7) * boxLength);
    }

    // Need to draw superposition
    else {
        let mini_box_length = (1 / 3 * boxLength);
        let box_padding = boxLength / 10;

        for (let i = 1; i < 3; i++) {
            collapse_ctx.beginPath();
            collapse_ctx.rect(top_x + i * mini_box_length, top_y + box_padding, 1, boxLength - box_padding * 2);
            collapse_ctx.rect(top_x + box_padding, top_y + i * mini_box_length, boxLength - box_padding * 2, 1);
            collapse_ctx.fillStyle = collapseBoardColor;
            collapse_ctx.fill();
            collapse_ctx.closePath();
        }

        // What a nightmare of positioning values.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                collapse_ctx.font = collapseFont;
                if (typeof boardValue[j + (i * 3)] !== "undefined") {
                    collapse_ctx.fillText(boardValue[j + (i * 3)], top_x + (j + 0.3) * mini_box_length, top_y + (i + 0.8) * mini_box_length);
                }
            }
        }
    }
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
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let num = board[y][x];
            if (num !== blankNum) {
                collapseBoard[y][x] = [num];
            }
        }
    }


    for (let x = 0; x < 9; x++) {
        if (collapseBoard[0][x].length === 1) {
            let num = collapseBoard[0][x][0];
            for (let i = 0; i < 9; i++) {
                if (i !== x) {
                    // Need index positive and negative because board number may be positive or negative
                    let index_positive = collapseBoard[0][i].indexOf(num);
                    let index_negative = collapseBoard[0][i].indexOf(-num);

                    if (index_positive > -1) {
                        collapseBoard[0][i].splice(index_positive, 1);
                    }

                    if (index_negative > -1) {
                        collapseBoard[0][i].splice(index_negative, 1);
                    }
                }
            }
        }
    }
    // Remove all of val from column
    // Remove all of val from box
}

syncBoards();
drawCollapseGrid();
drawAllCollapseNumbers();