class Referee {
    constructor() {
        this.seconds = 0;
        this.b = new Board();
    }

    setup_board() {
        let win = document.getElementById('win');
        win.style.display = 'none';
        this.b.generateBoard(this.c);
        this.b.drawBoard();
        setInterval(this.tick.bind(this), 1000);
    }

    resize_board() {
        this.b.initializeCanvasSize();
        this.b.drawBoard();
    }

    tick() {
        this.seconds++;

        let header = document.getElementById('header');
        header.textContent = 'Sudoku ' + this.b.formatTime(this.seconds);
    }
 
    handleMouseDown(e) {
        this.b.handleMouseEvent(e);
    }

    handleKeyDown(e) {
        if (e.key === ' ' && e.target == document.body) { e.preventDefault(); }
        this.b.handleKeyEvent(e);
    }
}

let referee = new Referee;
referee.setup_board();

window.addEventListener('mousedown', e => { referee.handleMouseDown(e); });
window.addEventListener('keydown', e => { referee.handleKeyDown(e); });

window.addEventListener('resize', () => referee.resize_board(), false);

function restartGame() {
    referee = new Referee;
    referee.setup_board();
}