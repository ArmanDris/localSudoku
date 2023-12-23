class BoardTest {
    testGetPossibleMoves() {
        let b = new Board();

        b.board[0][8] = -9;
        b.board[8][0] = -5;
        b.board[2][2] = 1;

        let expected_moves = [2, 3, 4, 6, 7, 8];

        let returned_moves = b.getPossibleMoves(b.board, 0, 0);

        if (!this.arraysEqual(returned_moves, expected_moves)) {
            console.error("Error: getPossibleMoves returned unexpected possibilities");
            console.log(expected_moves + "\n" + returned_moves);
        }

    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
    
        for (let i = 0; i < arr1.length; i++)
            if (arr1[i] !== arr2[i])
                return false;

        return true;
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
        if (solved_b.numSolutions(solved_b.board) !== 0) {
            console.error("Error: numSolutions returned unexpected value");
            console.log(b.numSolutions(b.board));
        }

    }
    
}

let t = new BoardTest();
t.testGetPossibleMoves();
t.testNumSolutions();