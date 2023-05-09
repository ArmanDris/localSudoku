# localSudoku
Simple Sudoku in JS
Place numbers with 1-9, clear number with spacebar.

HTML & CSS are standard.

Basic JS window and board drawing logic.
Meat of project is in generating a sudoku board with a unique solution.

So far have a fn that can tell if placing a number in a square is a legal move.
To finish the program I will need:
A function to generate a valid solved board. To do this I think I should
1. Have a finished visualisation of all the possible values each square can take on a board
2. If there are no more possible moves and the board has empty squares then restart generation
3. If there is possible moves then make a move on the square with the least amount of possible values
4. Repeat until board is finished or until stuck
