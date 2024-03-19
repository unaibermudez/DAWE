// Get the canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// Variable to track rotation angle
var rotationAngle = 0;
var rotating = false;

// Event listener for the rotate button
document.getElementById('rotateButton').addEventListener('click', function() {
    // Toggle rotation state
    rotating = !rotating;

    // Start rotating the canvas
    if (rotating) {
        rotateCanvas();
    }
});

// Function to rotate the canvas
function rotateCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Translate to the center of the canvas
    context.translate(canvas.width / 2, canvas.height / 2);

    // Rotate the canvas
    context.rotate(rotationAngle * Math.PI / 180);

    // Translate back
    context.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw a rectangle (just for visualization)
    context.fillStyle = 'blue';
    context.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);

    // Reset transformation matrix
    context.setTransform(1, 0, 0, 1, 0, 0);

    // Increment rotation angle for the next frame
    rotationAngle += 1;

    // Request next animation frame
    if (rotating) {
        requestAnimationFrame(rotateCanvas);
    }
}

