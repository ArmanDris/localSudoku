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

    handleInput(e) {
        if (e.key === ' ' && e.target == document.body);
            e.preventDefault();

        if (e instanceof MouseEvent) {
            this.b.handleMouseEvent(e);
        } else {
            this.b.handleKeyEvent(e);
            this.c.syncBoards();
            this.c.drawCollapseBoard();
        }
    }
}

let referee = new Referee;
referee.setup_board();

window.addEventListener('mousedown', e => {referee.handleInput(e);});
window.addEventListener('keydown', e => {referee.handleInput(e);});

window.addEventListener('resize',() => referee.resize_board(), false);