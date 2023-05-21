class Board {
    constructor() {
        // ======== DRAW VARIABLES =======
        this.main = document.getElementById('main');
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.initializeCanvasSize();

        this.lineThickness = 1;
        this.boardColor = '#A39E93';
        this.fontColor = '#FAF9F7';
        this.boldColor = '#A39E93';
        this.highlightColor = '#423D33';
        this.font = "300 28px Sans-serif";
        this.boldFont = "300 28px Sans-serif";

        // ======== BOARD LOGIC VARIABLES =======
        this.blankNum = 0;
        // Board gets populated with negative numbers at start of game, negative numbers cannot be changed :O.
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        // ======== INPUT HANDLING VARIABLES =======
        this.receiveInput = false;
        this.currentSquareX = -1;
        this.currentSquareY = -1;
    }

    // ======== START OF DRAW FUNCTIONS =======
    initializeCanvasSize() {
        this.canvasLength = this.main.clientHeight;
        this.boxLength = this.canvasLength / 9;

        // Need to double canvas size and then half it to make it not blurry
        canvas.width = this.canvasLength * 2;
        canvas.height = this.canvasLength * 2;
        canvas.style.width = this.canvasLength + "px";
        canvas.style.height = this.canvasLength + "px";
        canvas.getContext('2d').scale(2, 2);
    }

    // Make a 9x9 sqaure 
    // Every 3rd line is bold both vertically and horizontally
    drawGrid() {
        let lineThickness = this.lineThickness;
        let boardColor = this.boardColor;
        let boxLength = this.boxLength;
        let canvasLength = this.canvasLength;
        let ctx = this.ctx;
        // Vertixal lines
        for (let i = 1; i < 9; i++) {
            ctx.beginPath();
            if (i % 3 === 0) {
                ctx.rect(i * boxLength - lineThickness, 0, lineThickness + 2, canvasLength);
            } else {
                ctx.rect(i * boxLength - (lineThickness + 0), 0, lineThickness, canvasLength);
            }
            ctx.fillStyle = boardColor;
            ctx.fill();
            ctx.closePath();
        }

        // Horizontal lines
        for (let i = 1; i < 9; i++) {
            ctx.beginPath();
            if (i % 3 === 0) {
                ctx.rect(0, i * boxLength - lineThickness, canvasLength, lineThickness + 2);
            } else {
                ctx.rect(0, i * boxLength - (lineThickness + 0), canvasLength, lineThickness);
            }
            ctx.fillStyle = boardColor;
            ctx.fill();
            ctx.closePath();
        }
    }

    // x & y must be less than or equal to 9
    // chr must be a number
    // Draws a chr in the box with the coords x,y
    drawNumber(x, y, chr) {
        let ctx = this.ctx;
        ctx.font = this.font;
        ctx.fillStyle = this.fontColor;

        if (chr < 0) {
            chr = -chr;
            ctx.font = this.boldFont;
            ctx.fillStyle = this.boldColor;
        }

        // draws text with bottom left part of character stating at x,y
        ctx.fillText(chr, (x + 0.4) * this.boxLength, (y + 0.7) * this.boxLength);
    }

    drawAllNumbers() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.board[x][y] !== this.blankNum) {
                    this.drawNumber(x, y, this.board[x][y]);
                }
            }
        }
    }

    drawBoard() {
        this.drawGrid();
        this.drawAllNumbers();
    }

    clearBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // ======== GETTERS & SETTERS =======
    getValueOfCell(x, y) {
        return this.board[x][y];
    }

    // ======== START OF BOARD LOGIC =======
    resetBoard() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                this.board[x][y] = this.blankNum;
            }
        }
    }

    // Place starting numbers in board
    // Does not guarentee board will be valid
    populateBoard() {
        // Clear board to make sure populate board does not loop infinitely
        this.resetBoard();

        for (let x = 0; x < 9; x = x + 3) {
            for (let y = 0; y < 9; y = y + 3) {
                // Put 2-4 numbers in each small 3x3 board
                let numGivenNums = 2 + this.getRandomInt(2);
                for (let i = 0; i < numGivenNums; i++) {
                    let randY = this.getRandomInt(2) + y;
                    let randX = this.getRandomInt(2) + x;
                    let randNum = -1 * (1 + this.getRandomInt(8));
                    if (this.board[randX][randY] === this.blankNum && this.checkValidNum(randX, randY, randNum)) {
                        this.board[randX][randY] = randNum;
                    } else {
                        i--;
                    }
                }
            }
        }
    }

    // Generate a board with one possible solution
    generateBoard(c) {
        let rand_x = this.getRandomInt(8);
        let rand_y = this.getRandomInt(8);
        // Rules for picking a cell: 
        //   - collapse_cell cannot be empty
        //   - collapse_cell cannot hold a negative integer (collapsed)
        c.syncBoards();
    }

    // This function will likely be obsoleted by wave fn logic
    checkValidNum(x, y, num) {
        // Num must be only one of its kind on its row, column and mini box
        if (num === 0) return true;

        // Check valid row
        for (let j = 0; j < 9; j++) {
            if (Math.abs(this.board[j][y]) === Math.abs(num)) {
                return false;
            }
        }


        // Check valid Column
        for (let j = 0; j < 9; j++) {
            if (Math.abs(this.board[x][j]) === Math.abs(num)) {
                return false;
            }
        }


        let miniGridX = Math.floor(x / 3);
        let miniGridY = Math.floor(y / 3);

        let startingX = miniGridX * 3;
        let startingY = miniGridY * 3;

        // Check valid mini box
        for (let j = startingX; j < startingX + 3; j++) {
            for (let k = startingY; k < startingY + 3; k++) {
                if (Math.abs(this.board[j][k]) === Math.abs(num)) {
                    return false;
                }
            }
        }

        return true;
    }

    // ======== START OF INPUT HANDLING =======
    getSquare(pos) {
        // How many lengths until get to current pos.
        return Math.floor(pos / this.boxLength);
    }

    selectSquare() {
        let boxLength = this.boxLength;
        let ctx = this.ctx;
        this.clearBoard();
        ctx.beginPath();
        ctx.rect(boxLength * this.currentSquareX, boxLength * this.currentSquareY, boxLength, boxLength);
        ctx.fillStyle = this.highlightColor;
        ctx.fill();
        ctx.closePath();

        this.drawBoard();
        this.receiveInput = true;
    }

    deselectSquare() {
        this.receiveInput = false;
        this.clearBoard();
        this.drawBoard();
    }

    // True if x, y is within canvas
    isInCanvas(x, y) {
        const rect = canvas.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return true;
        }
        return false;
    }

    handleMouseEvent(e) {
        if (this.isInCanvas(e.clientX, e.clientY)) {
            // Mouse click was inside the canvas!
            const rect = canvas.getBoundingClientRect();
            let clickX = e.clientX - rect.left;
            let clickY = e.clientY - rect.top;

            this.currentSquareX = this.getSquare(clickX);
            this.currentSquareY = this.getSquare(clickY);

            this.deselectSquare();
            this.selectSquare();
        } else {
            this.deselectSquare();
        }
    }

    handleKeyEvent(e) {
        if (this.receiveInput == false) return;

        // If key not 1-9 or SPACE then return
        if (!/^[1-9 ]$/i.test(e.key)) return;

        // Check if trying to change starting num
        if (this.board[this.currentSquareX][this.currentSquareY] < 0) return;

        let num = 0;
        if (e.key === " ") num = 0;
        else num = parseInt(e.key);

        //if (!checkValidNum(currentSquareX, currentSquareY, num)) return;

        this.board[this.currentSquareX][this.currentSquareY] = num;
        this.selectSquare();
    }

    // ========== MISC FUNCTIONS ==========
    getRandomInt(max) { return Math.floor(Math.random() * (max + 1)); }
}