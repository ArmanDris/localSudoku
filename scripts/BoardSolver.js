class BoardSolver {
    // ============================
    // Board creation
    // ============================
    static createBoard(board, difficulty) {
        board = this.resetBoard(board);
        // Start filling the board
        this.fillOutBoard(board, 0, 0);

        // Remove some numbers to create a puzzle
        this.removeNumbers(board, difficulty);

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                board[x][y] = -board[x][y];
            }
        }

        return board;
    }

    static fillOutBoard(board, x, y) {
        // Reached the end of the board 
        if (y === 9) { return true; }
        // Move to the next row
        if (x === 9) { return this.fillOutBoard(board, 0, y + 1); }
        // Move to the next cell
        if (board[x][y] !== 0) { return this.fillOutBoard(board, y, col + 1); }

        let nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let i = 0; i < 9; i++) {
            let num = nums[i];
            // If num is a valid move then
            if (this.isValidMove(board, x, y, num)) {
                board[x][y] = num;
                // See if will result in a finished board
                if (this.fillOutBoard(board, x + 1, y)) {
                    return true;
                }
                // If not then try next num
                board[x][y] = 0; // Backtrack
            }
        }

        // If try all nums and still stuck then return false
        return false;
    }

    static checkSolved(board) {
        const abs = x => Math.abs(x);
        // Check each row
        for (let y = 0; y < 9; y++) {
            let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let x = 0; x < 9; x++) {
                BoardSolver.remove(possibilities, abs(board[x][y]));
            }
            if (possibilities.length !== 0) return false;
        }

        // Check each column
        for (let x = 0; x < 9; x++) {
            let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let y = 0; y < 9; y++) {
                BoardSolver.remove(possibilities, abs(board[x][y]));
            }
            if (possibilities.length !== 0) return false;
        }

        // Check each mini box
        for (let x = 0; x < 9; x += 3) for (let y = 0; y < 9; y += 3) {
            let mini_grid_x = x - (x % 3);
            let mini_grid_y = y - (y % 3);
            let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    BoardSolver.remove(possibilities, abs(board[mini_grid_x + i][mini_grid_y + j]));
            if (possibilities.length !== 0) return false;
        }

        return true;
    }

    // ============================
    // Helpers
    // ============================

    static removeNumbers(board, difficulty) {
        let numToRemove = 50; // Adjust this number to control difficulty (default 40)

        if (difficulty === 'easy') { numToRemove = 40; }
        if (difficulty === 'medium') { numToRemove = 55; }
        if (difficulty === 'hard') { numToRemove = 70; }

        for (let i = 0; i < numToRemove; i++) {
            const row = this.getRandomInt(8);
            const col = this.getRandomInt(8);

            board[row][col] = 0;
        }
    }

    static resetBoard(board) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                board[x][y] = 0;
            }
        }
        return board;
    }

    static shuffle(arr) {
        let temp = [];

        for (let i = arr.length; i > 0; i--) {
            let random_index = this.getRandomInt(i - 1);
            temp.push(arr[random_index]);
            arr.splice(random_index, 1);
        }
        return temp;
    }

    static getRandomInt(max) { return Math.floor(Math.random() * (max + 1)); }

    static isValidMove(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false; // Check for row and column conflicts
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false; // Check for 3x3 grid conflicts
                }
            }
        }

        return true;
    }

    // Returns valid numbers. Number at x,y has no effect on returned numbers
    static getPossibleMoves(board, x, y) {
        let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // Remove numbers in mini grid
        let mini_grid_x = x - (x % 3);
        let mini_grid_y = y - (y % 3);
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                BoardSolver.remove(possibilities, Math.abs(board[mini_grid_x + i][mini_grid_y + j]));

        // Remove numbers in row
        for (let i = 0; i < 9; i++)
            BoardSolver.remove(possibilities, Math.abs(board[i][y]));

        // Remove numbers in column
        for (let i = 0; i < 9; i++)
            BoardSolver.remove(possibilities, Math.abs(board[x][i]));

        return possibilities;
    }

    static remove(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1)
            arr.splice(index, 1);
        return arr;
    }
}