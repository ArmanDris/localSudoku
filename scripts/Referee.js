class Referee {
    constructor() {
        this.name;
        this.seconds = 0;
        this.intervalId;

        this.b = new Board();
        this.d = new DeliveryBoy();

        this.win = document.getElementById('win');
        this.greeting = document.getElementById('greeting');
        this.timer = document.getElementById('timer');

        this.updateTimer();
        this.hideWin();
        this.showGreeting();
    }

    start() {
        let name = this.name = document.getElementById('nickname').value;
        if (name.length === 0) { name = 'anon'; }
        this.name = name;

        this.b.clearBoard();
        this.b.generateBoard(this.getDifficulty());
        this.b.drawBoard();
        this.intervalId = setInterval(this.tick.bind(this), 1000);

        this.syncLeaderboard();
        this.hideGreeting();
    }

    resize_board() {
        this.b.initializeCanvasSize();
        this.b.drawBoard();
    }

    // ========== TIMER FUNCTIONS ==========
    tick() {
        this.seconds++;
        this.updateTimer();
    }

    stopTimer() {
        clearInterval(this.intervalId);
        this.updateTimer();
    }

    // ========== WIN LOGIC ==========
    checkSolved() 
    {
        if (this.b.checkSolved(this.b.board))
            this.trigger_victory();
    }

    trigger_victory() {
        this.stopTimer(this.intervalId);
        this.d.deliver(this.name, this.seconds, this.getDifficulty());
        this.syncLeaderboard();

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

        this.showWin();
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
        if (this.win.style.display !== 'none' || this.greeting.style.display !== 'none') { return; }
        this.b.handleKeyEvent(e);
        this.checkSolved(this.b.board);
    }

    // ========== MISC FUNCTIONS ==========
    formatTime(seconds) {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;

        if (m < 10) { m = ('0' + m); }
        if (s < 10) { s = ('0' + s); }

        return (m + ":" + s);
    }

    getDifficulty() {
        let easy = document.getElementById('easy');
        let hard = document.getElementById('hard');

        if (easy.classList.contains('active')) {
            return 'easy';
        }
        if (hard.classList.contains('active')) {
            return 'hard';
        }

        return 'medium';
    }

    updateTimer() { this.timer.textContent = this.formatTime(this.seconds); }
    hideGreeting() { this.greeting.style.display = 'none'; }
    showGreeting() { this.greeting.style.display = 'flex'; }
    hideWin() { this.win.style.display = 'none'; }
    showWin() { this.win.style.display = 'initial'; }
    
}

let referee = new Referee;

window.addEventListener('mousedown', e => { referee.handleMouseDown(e); });
window.addEventListener('keydown', e => { referee.handleKeyDown(e); });

window.addEventListener('resize', () => referee.resize_board(), false);

// Difficulty button logic
const boxes = document.querySelectorAll('.difficulty-option');
boxes.forEach(box => {
    box.addEventListener('click', () => {
        // Remove active class from all boxes
        boxes.forEach(box => box.classList.remove('active'));

        // Add active class to the clicked box
        box.classList.add('active');
    });
});

function kickoff() { referee.start(); }

function restartGame() { referee.stopTimer(); referee = new Referee; }