const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'square';
ctx.lineWidth = 100;


function changeMode() {
    var index = document.getElementById("blendmode").selectedIndex;
    var allOptions = document.getElementById("blendmode").options;
    let optionValue = allOptions[index].value;

    ctx.globalCompositeOperation = optionValue;
}

function erase() {
    ctx.globalCompositeOperation = 'destination-out';
}

function eraseAll() {
    ctx.globalCompositeOperation = 'destination-in';
}

function changeCorner() {
    var index = document.getElementById("roundness").selectedIndex;
    var allOptions = document.getElementById("roundness").options;
    let optionValue = allOptions[index].value;
    ctx.lineCap = optionValue;
}

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return;
    // console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    if (ctx.lineWidth >= 200 || ctx.lineWidth <= 50) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;

    } else {
        ctx.lineWidth--;

    }

}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
