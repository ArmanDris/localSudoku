# Sudoku

Place numbers with 1-9 keys, clear number with spacebar.

# About:

Generating valid sudoku boards was the main challenge of this project. To generate a valid sudoku board I used recursion to search down a tree of possible boards and stop when I find a valid one. After the user has solved a board their name and score are sent to the backend to be placed in an sqlite database. The page will periodically ping the server to display the top five high scores.

# Attribution:

Straberry server icon by:

<a href="https://www.flaticon.com/free-icons/strawberry" title="strawberry icons">Strawberry icons created by Mihimihi - Flaticon</a>

# Notes:

- Boards are not guaranteed to have unique solutions
- Every board has at lease one solution
