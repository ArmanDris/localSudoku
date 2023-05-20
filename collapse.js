class Collapse {
    constructor(board) {
        this.b = board;

        // ======== DRAW VARIABLES =======
        this.collapse_container = document.getElementById('collapse_container');
        this.collapse_canvas = document.getElementById("collapse");
        this.collapse_ctx = this.collapse_canvas.getContext("2d");

        this.initializeCollapseCanvasSize();

        this.collapseBoardColor = '#27241D';
        this.collapseFont = "300 15px Sans-serif";

        // ======== BOARD LOGIC VARIABLES =======
        this.possible_values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.collapseBoard = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => this.possible_values.slice()));
    }

    // ======== START OF DRAW FUNCTIONS =======
    initializeCollapseCanvasSize() {
        this.canvasLength = this.b.main.clientHeight;
        this.boxLength = this.b.canvasLength / 9;

        this.collapse_canvas.width = this.canvasLength * 2;
        this.collapse_canvas.height = this.canvasLength * 2;
        this.collapse_canvas.style.width = this.canvasLength + "px";
        this.collapse_canvas.style.height = this.canvasLength + "px";
        this.collapse_canvas.getContext('2d').scale(2, 2);

    }
    // Make a 9x9 sqaure 
    // Every 3rd line is bold both vertically and horizontally
    drawCollapseGrid() {
        let lineThickness = this.b.lineThickness;
        let collapse_ctx = this.collapse_ctx;
        let boxLength = this.b.boxLength;
        let canvasLength = this.b.canvasLength;

        // Vertixal lines
        for (let i = 1; i < 9; i++) {
            collapse_ctx.beginPath();
            if (i % 3 === 0) {
                collapse_ctx.rect(i * boxLength - lineThickness, 0, lineThickness + 1, canvasLength);
            } else {
                collapse_ctx.rect(i * boxLength - (lineThickness + 0), 0, lineThickness, canvasLength);
            }
            collapse_ctx.fillStyle = this.collapseBoardColor;
            collapse_ctx.fill();
            collapse_ctx.closePath();
        }

        // Horizontal lines
        for (let i = 1; i < 9; i++) {
            collapse_ctx.beginPath();
            if (i % 3 === 0) {
                collapse_ctx.rect(0, i * boxLength - lineThickness, canvasLength, lineThickness + 1);
            } else {
                collapse_ctx.rect(0, i * boxLength - (lineThickness + 0), canvasLength, lineThickness);
            }
            collapse_ctx.fillStyle = this.collapseBoardColor;
            collapse_ctx.fill();
            collapse_ctx.closePath();
        }
    }

    // Draw all possible values square at x,y can take
    drawCollapseNumbers(x, y) {
        let collapseFont = this.collapseFont;
        let collapseBoardColor = this.collapseBoardColor;
        let collapseBoard = this.collapseBoard;
        let collapse_ctx = this.collapse_ctx;
        let boxLength = this.b.boxLength;

        let top_x = x * boxLength;
        let top_y = y * boxLength;

        collapse_ctx.fillStyle = collapseBoardColor;

        let boardValue = collapseBoard[y][x];

        // Just draw character
        if (boardValue.length === 1 && boardValue[0] < 0) {
            // draws text with bottom left part of character stating at x,y
            if (boardValue[0] < 0) { boardValue[0] = -boardValue[0]; }

            collapse_ctx.font = this.b.font;
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

    drawAllCollapseNumbers() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                this.drawCollapseNumbers(x, y);
            }
        }
    }

    clearCollapseBoard() {
        this.collapse_ctx.clearRect(0, 0, this.collapse_canvas.width, this.collapse_canvas.height);
    }

    drawCollapseBoard() {
        this.clearCollapseBoard();
        this.drawCollapseGrid();
        this.drawAllCollapseNumbers();
    }

    // ======== START OF COLLAPSE LOGIC =======
    // Updates collapseBoard to match board. Sets all collapsed numbers to negative
    syncBoards() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                let num = this.b.getValueOfCell(x, y);
                if (num === this.b.blankNum) {
                    this.collapseBoard[y][x] = [...this.possible_values];
                }
                else {
                    if (num > 0) {
                        this.collapseBoard[y][x] = [-num];
                    }
                    else {
                        this.collapseBoard[y][x] = [num];
                    }
                }
            }
        }


        // Look through all cells in row x and column y
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (this.collapseBoard[y][x].length === 1 && this.collapseBoard[y][x][0] < 0) {
                    // Once we find a definite value we need to:
                    let num = this.collapseBoard[y][x][0];
                    // 1: Remove the value from all the superpositions in row
                    for (let i = 0; i < 9; i++) {
                        if (i !== x) {
                            let index_positive = this.collapseBoard[y][i].indexOf(-num);

                            if (index_positive > -1) {
                                this.collapseBoard[y][i].splice(index_positive, 1);
                            }
                        }
                    }

                    // 2: Remove value from all superpositions in column
                    for (let i = 0; i < 9; i++) {
                        if (i !== y) {
                            let index_negative = this.collapseBoard[i][x].indexOf(-num);

                            if (index_negative > -1) {
                                this.collapseBoard[i][x].splice(index_negative, 1);
                            }
                        }
                    }

                    // 3: Remove value from all superpositions in mini box
                    let miniGridX = Math.floor(x / 3);
                    let miniGridY = Math.floor(y / 3);

                    let startingX = miniGridX * 3;
                    let startingY = miniGridY * 3;

                    // Check valid mini box
                    for (let j = startingX; j < startingX + 3; j++) {
                        for (let k = startingY; k < startingY + 3; k++) {
                            if (j !== x && k !== y) {
                                let index_negative = this.collapseBoard[k][j].indexOf(-num);

                                if (index_negative > -1) {
                                    this.collapseBoard[k][j].splice(index_negative, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}