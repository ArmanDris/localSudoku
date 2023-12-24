class BoardTest {

    testCheckSolved() {
        let starting_b = new Board();
        if (BoardSolver.checkSolved(starting_b.board))
            console.error("Error: Board should not be solved");

        let almost_solved_b = new Board();
        almost_solved_b.board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [2, 3, 4, 5, 6, 7, 8, 9, 0]     // The 0 should be a 1 to be solved
        ];
        if (BoardSolver.checkSolved(almost_solved_b.board))
            console.error("ERROR: Board should not be solved");

        let solved_b = new Board();
        solved_b.board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [2, 3, 4, 5, 6, 7, 8, 9, 1]
        ];
        if (!BoardSolver.checkSolved(solved_b.board))
            console.error("ERROR: Board should be solved");

        let almost_solved2 = new Board();
        almost_solved2.board = [
            [4, -3, 5, -1, 8, -6, -2, 7, -9],
            [2, -1, -9, -7, -5, 4, -6, 3, 8],
            [6, -8, -7, -9, -2, -3, -5, -4, -1],
            [-8, -7, 4, 3, 9, 5, -1, -2, -6],
            [9, -2, 6, -4, 1, 8, -7, -5, -3],
            [3, 5, -1, -6, -7, -2, -8, -9, 4],
            [-1, -9, -8, -2, 4, 7, -3, 6, -5],
            [7, -4, -3, -5, 6, -1, 9, 8, -2],
            [5, -6, -2, 8, -3, -9, -4, -1, 6]
        ];
        if (BoardSolver.checkSolved(almost_solved2.board))
            console.error("ERROR: Board should not be solved");

        let solved2 = new Board();
        solved2.board = [
            [4, -3, 5, -1, 8, -6, -2, 7, -9],
            [2, -1, -9, -7, -5, 4, -6, 3, 8],
            [6, -8, -7, -9, -2, -3, -5, -4, -1],
            [-8, -7, 4, 3, 9, 5, -1, -2, -6],
            [9, -2, 6, -4, 1, 8, -7, -5, -3],
            [3, 5, -1, -6, -7, -2, -8, -9, 4],
            [-1, -9, -8, -2, 4, 7, -3, 6, -5],
            [7, -4, -3, -5, 6, -1, 9, 8, -2],
            [5, -6, -2, 8, -3, -9, -4, -1, 7]
        ];
        if (!BoardSolver.checkSolved(solved2.board))
            console.error("ERROR: Board should not be solved");
    }

    testGetPossibleMoves() {
        let b = new Board();

        b.board[0][8] = -9;
        b.board[8][0] = -5;
        b.board[2][2] = 1;

        let expected_moves = [2, 3, 4, 6, 7, 8];

        let returned_moves = BoardSolver.getPossibleMoves(b.board, 0, 0);

        if (!this.arraysEqual(returned_moves, expected_moves)) {
            console.error("Error: getPossibleMoves returned unexpected possibilities");
            console.log(expected_moves + "\n" + returned_moves);
        }

    }

    testNumSolutions() {

        // Test solved board
        let solved_b = new Board();
        solved_b.board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [2, 3, 4, 5, 6, 7, 8, 9, 1]
        ];
        if (BoardSolver.numSolutions(solved_b.board) !== 0) {
            console.error("Error: numSolutions returned unexpected value");
            console.log(BoardSolver.numSolutions(solved_b.board));
        }

        let impossible_b = new Board();
        impossible_b.board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [2, 3, 4, 5, 6, 7, 8, 9, 9]
        ];

        if (BoardSolver.numSolutions(impossible_b.board) !== 0) {
            console.error("Error: numSolutions returned unexpected value");
            console.log(BoardSolver.numSolutions(impossible_b.board));
        }

        let almost_b = new Board();
        almost_b.board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [2, 3, 4, 5, 6, 7, 8, 9, 0]
        ];

        if (BoardSolver.numSolutions(almost_b.board) !== 1) {
            console.error("Error: numSolutions returned unexpected value");
            console.log(BoardSolver.numSolutions(almost_b.board));
        }

    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;

        for (let i = 0; i < arr1.length; i++)
            if (arr1[i] !== arr2[i])
                return false;

        return true;
    }

}

let t = new BoardTest();
t.testGetPossibleMoves();
t.testCheckSolved();