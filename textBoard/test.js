let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

window.addEventListener('resize', draw, false);
function draw() {
    length = 450;

    canvas.width = length;
    canvas.height = length;
}


window.addEventListener('mousedown', e => {handleInput(e);});
window.addEventListener('keydown', e => {handleInput(e)});

function handleInput(e) {
    if (e instanceof MouseEvent) {
        console.log("mousedown!");
    } else {
        console.log("keyboard press!");
    }
}

draw();