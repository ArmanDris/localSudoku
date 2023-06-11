class Referee {
    constructor() {
        this.b = new Board();
        this.c = new Collapse(this.b);
    }

    setup_board() {
        let win = document.getElementById('win');
        win.style.display = 'none';
        this.b.generateBoard(this.c);
        this.c.syncBoards();
        this.c.drawCollapseBoard();
        this.b.drawBoard();
    }

    resize_board() {
        this.b.initializeCanvasSize();
        this.b.drawBoard();
    }

    handleMouseDown(e) {
        this.b.handleMouseEvent(e);
    }

    handleKeyDown(e) {
        if (e.key === ' ' && e.target == document.body) { e.preventDefault(); }
        this.b.handleKeyEvent(e);
        this.c.syncBoards();
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