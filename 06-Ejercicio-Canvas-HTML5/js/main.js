const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const previewCanvas = document.getElementById('previewCanvas');
const previewCtx = previewCanvas.getContext('2d');

const img = new Image();
img.src = 'images/spritesheet.png';

let windowX = 0;
let windowY = 0;
const windowWidth = 100;
const windowHeight = 100

img.onload = function() {
    draw();
};

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            windowY = Math.max(0, windowY - 10);
            break;
        case 'ArrowDown':
            windowY = Math.min(canvas.height - windowHeight, windowY + 10);
            break;
        case 'ArrowLeft':
            windowX = Math.max(0, windowX - 10);
            break;
        case 'ArrowRight':
            windowX = Math.min(canvas.width - windowWidth, windowX + 10);
            break;
    }
    draw();
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(windowX, windowY, windowWidth, windowHeight);
    ctx.fillStyle = 'black';
    ctx.fillText(`x: ${windowX}, y: ${windowY}`, 10, 20);

    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    previewCtx.drawImage(canvas, windowX, windowY, windowWidth, windowHeight, 0, 0, previewCanvas.width, previewCanvas.height);
}