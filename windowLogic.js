class Referee {
    constructor() {
        this.b = new Board();
        this.c = new Collapse(this.b);
    }

    setup_board() {
        //this.b.generateBoard();
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
        if (e.key === ' ' && e.target == document.body);
            e.preventDefault();

        this.b.handleKeyEvent(e);
        this.c.syncBoards();
        this.c.drawCollapseBoard();
    }
}

let referee = new Referee;
referee.setup_board();

window.addEventListener('mousedown', e => {referee.handleMouseDown(e);});
window.addEventListener('keydown', e => {referee.handleKeyDown(e);});

window.addEventListener('resize',() => referee.resize_board(), false);