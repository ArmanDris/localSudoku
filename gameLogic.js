let lineThickness = 3;

const boardColor = '#563232';
const highlightColor = '#ADD8E6';
const font = "100 30px Sans-serif";
const boldFont = "400 30px Sans-serif";

const blankNum = 0;

// Board gets populated with negative numbers at start of game, negative numbers cannot be changed :O.
// !!!!! I BET THE STRICT TYPE COMPARASON IS MESSING WITH MY CHECK VALID INPUT BECAUSE KEYBOARD INPUTS ARE STORED AS CHAR
// Probably should just run check valid board becfore every time i draw board? or maybe I use it to populate board and then dictate user input
let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// Make a 9x9 sqaure 
// Every 3rd line is bold both vertically and horizontally
function drawGrid() {
    // Vertixal lines
    for (let i = 1; i < 9; i++) {
        ctx.beginPath();
        if (i % 3 === 0) {
            ctx.rect(i * boxLength - lineThickness, 0, lineThickness * 2, canvasLength);
        } else {
            ctx.rect(i * boxLength - (lineThickness/2), 0, lineThickness, canvasLength);
        }
        ctx.fillStyle = boardColor;
        ctx.fill();
        ctx.closePath();
    }

    // Horizontal lines
    for (let i = 1; i < 9; i++) {
        ctx.beginPath();
        if (i % 3 === 0) {
            ctx.rect(0, i * boxLength - lineThickness, canvasLength, lineThickness * 2);
        } else {
            ctx.rect(0, i * boxLength - (lineThickness/2), canvasLength, lineThickness);
        }
        ctx.fillStyle = boardColor;
        ctx.fill();
        ctx.closePath();
    }
}

// x & y must be less than or equal to 8
// chr must be a number
// Draws a chr in the box with the coords x,y
function placeNumber(x, y, chr) {

    ctx.font = font;

    if (chr < 0) {
        chr = -chr;
        ctx.font = boldFont;
    }

    // draws text with bottom left part of character stating at x,y
    ctx.fillText(chr, (x + 0.4) * boxLength, (y + 0.7) * boxLength);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function resetBoard() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            board[y][x] = blankNum;
        }
    }
}

// Place starting numbers in board
function populateBoard() {
    // Clear board to make sure populate board does not loop infinitely
    resetBoard();

    for (let x = 0; x < 9; x = x + 3) {
        for (let y = 0; y < 9; y = y + 3) {
            // Put 3-5 numbers in each small 3x3 board
            let numGivenNums = 3 + getRandomInt(3);
            for (let i = 0; i < numGivenNums; i++) {
                let randY = getRandomInt(3) + y;
                let randX = getRandomInt(3) + x;
                let randNum = -1*(1 + getRandomInt(9));
                if (board[randY][randX] === blankNum && checkValidNum(randX, randY, randNum)) {
                    board[randY][randX] = randNum;
                } else {
                    i--;
                }
            }
        }
    }

}

function drawNumbers() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (board[y][x] !== blankNum) {
                placeNumber(x, y, board[y][x]);
            }
        }
    }
}

function drawBoard() {
    drawGrid();
    drawNumbers();
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkValidNum(x, y, num) {
    // Num must be only one of its kind on its row, column and mini box

    // Check valid row
    for (let j = 0; j < 9; j++) {
        if (Math.abs(board[y][j]) === Math.abs(num)) {
            return false;
        }
    }


    // Check valid Column
    for (let j = 0; j < 9; j++) {
        if (Math.abs(board[j][x]) === Math.abs(num)) {
            return false;
        }
    }


    let miniGridX = Math.floor(x/3);
    let miniGridY = Math.floor(y/3);

    let startingX = miniGridX * 3;
    let startingY = miniGridY * 3;

    // Check valid mini box
    for (let j = startingX; j < startingX + 3; j++) {
        for (let k = startingY; k < startingY + 3; k++) {
            if (Math.abs(board[k][j]) === Math.abs(num)) {
                return false;
            }
        }
    }

    return true;
}

// ========== END OF BOARD LOGIC ==========
// ======== START OF INPUT HANDLING =======

let receiveInput = false;
let currentSquareX = -1;
let currentSquareY = -1;

function getSquare(x) {
    // How many lengths until get to current x pos.
    return Math.floor(x / boxLength);
}

function selectSquare() {
    ctx.beginPath();
    ctx.rect(boxLength * currentSquareX, boxLength * currentSquareY, boxLength, boxLength);
    ctx.fillStyle = highlightColor;
    ctx.fill();
    ctx.closePath();

    drawBoard();
    receiveInput = true;
}

function deselectSquare() {
    clearBoard();
    receiveInput = false;
    drawBoard();
}

// True if x, y is within canvas
function isInCanvas(x, y) {
    const rect = canvas.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return true;
    }
    return false;
}

function handleMouseEvent(e) {
    if (isInCanvas(e.clientX, e.clientY)) {
        // Mouse click was inside the canvas!
        const rect = canvas.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        let clickY = e.clientY - rect.top;

        currentSquareX = getSquare(clickX);
        currentSquareY = getSquare(clickY);

        deselectSquare();
        selectSquare();
    } else {
        deselectSquare();
    }
}

function handleKeyEvent(e) {
    if (/^[1-9]$/i.test(e.key)) {
        if (receiveInput === true) {
            // Check if trying to change starting num
            if (board[currentSquareY][currentSquareX] >= 0) {
                board[currentSquareY][currentSquareX] = parseInt(e.key);
                clearBoard();
                selectSquare();
                drawBoard();
            }
        }
    }
}

// ========== TO RUN ========== 
populateBoard();
drawBoard();