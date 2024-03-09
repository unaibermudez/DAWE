let posx;
let posy;
let direction = 1; 
let width;
let height;

function dibujarPelota(context) {
	context.clearRect(0, 0, width, height);
	posx += direction;
	if(posx == width-10 || posx == 10) {
		direction *= -1;
	}
	context.beginPath();
	context.arc(posx, posy, 10, 0, 2*Math.PI, false);
	context.stroke();
}

window.onload = () => {
	lienzo = document.getElementById("lienzo");
	context = lienzo.getContext("2d");
	width = lienzo.width;
	height = lienzo.height;
	posx = 10;
	posy = height - 10;
	
	dibujarPelota(context);
	setInterval(dibujarPelota, 10, context);
}