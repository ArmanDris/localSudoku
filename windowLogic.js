class Referee {
    constructor() {
        this.seconds = 0;
        this.b = new Board();
        this.intervalId;
        this.win_screen = document.getElementById('win');
        this.d = new DeliveryBoy();
    }

    setup_board() {
        let win = document.getElementById('win');
        win.style.display = 'none';
        this.b.generateBoard(this.c);
        this.b.drawBoard();
        this.intervalId = setInterval(this.tick.bind(this), 1000);
        this.syncLeaderboard();
    }

    resize_board() {
        this.b.initializeCanvasSize();
        this.b.drawBoard();
    }

    // ========== TIMER FUNCTIONS ==========
    tick() {
        this.seconds++;
        this.updateHeader();
    }

    stopTimer() {
        clearInterval(this.intervalId);
        this.updateHeader();
    }

    updateHeader() {
        let header = document.getElementById('timer');
        header.textContent = this.formatTime(this.seconds);
    }

    // ========== WIN LOGIC ==========
    checkSolved() {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (this.b.validNum(x, y) === false) {
                    return;
                }
            }
        }

        this.win();
    }

    win() {
        this.stopTimer(this.intervalId);

        let win_messages = [
            "Bravo, my brilliant puzzle solver!",
            "Excellent work, my Sudoku superstar!",
            "Impressive skills, you've got that Sudoku magic!",
            "You did it, my clever friend! So proud of you!",
            "Fantastic job, well played, my Sudoku ace!",
            "Outstanding performance, my dear genius!",
            "Well done, my incredible puzzle master!",
            "You're awesome, congratulations, my brilliant mind!",
            "Bravo, my talented Sudoku champion!",
            "Terrific achievement, hats off to you, my puzzle prodigy!",
            "Incredible work, you're a Sudoku genius, my exceptional player!",
            "Marvelous job, I'm beyond proud of you, my puzzle virtuoso!",
            "Phenomenal play, you've mastered it, my unstoppable solver!",
            "Congrats, you're a Sudoku superstar, my unbeatable challenger!",
            "Exceptional performance, way to go, my incredible mind-bender!"
        ]

        let timer = document.getElementById('end_timer');
        timer.textContent = this.formatTime(this.seconds);

        let grats = document.getElementById('grats-text');
        grats.textContent = win_messages[this.b.getRandomInt(win_messages.length - 1)];

        this.win_screen.style.display = 'initial';
    }

    async syncLeaderboard() {
        try {
            const leaderboard = await this.d.receive();

            let table = "<table>";
            for (let i = 0; i < leaderboard.length; i++) {
                let name = leaderboard[i][0];
                let time = leaderboard[i][1];
                table +=  "<tr> <td>" + name + "</td>" + "<td>" + this.formatTime(time) + "</td> </tr>";
            }
            table += "</table>";
            document.querySelector("#leaderboard table").innerHTML = table;
        }
        catch (error) {
            console.log(error);
        }
    }

    // ========== INPUT HANDLING ==========
    handleMouseDown(e) {
        this.b.handleMouseEvent(e);
    }

    handleKeyDown(e) {
        if (e.key === ' ' && e.target == document.body) { e.preventDefault(); }
        if (this.win_screen.style.display !== 'none') return;
        this.b.handleKeyEvent(e);
        this.checkSolved();
    }

    // ========== MISC FUNCTIONS ==========
    formatTime(seconds) {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;

        if (m < 10) { m = ('0' + m); }
        if (s < 10) { s = ('0' + s); }

        return (m + ":" + s);
    }
}

let referee = new Referee;
referee.setup_board();

window.addEventListener('mousedown', e => { referee.handleMouseDown(e); });
window.addEventListener('keydown', e => { referee.handleKeyDown(e); });

window.addEventListener('resize', () => referee.resize_board(), false);

function restartGame() {
    referee.stopTimer();
    referee = new Referee;
    referee.setup_board();
}

function sendScore() {
    let name = document.getElementById('nickname').value;
    referee.d.deliver(name, referee.seconds);
    restartGame();
}