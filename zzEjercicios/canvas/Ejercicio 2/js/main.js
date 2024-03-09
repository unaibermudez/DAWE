let posx;
let posy;
let direction = -1; 
let width;
let height;

const ANCHO_NAVE = 40;
const ALTO_NAVE = 20;
const SPEED = 10;
const GROSOR = 3;
const COLORES = ["red", "orange", "yellow", "green", "blue", "purple"];
let i = 0;

function dibujarFlecha(context) {
	context.clearRect(0, 0, width, height);
	/* posx += direction;
	if(posx == width-10 || posx == 10) {
		direction *= -1;
	} */
	// Derecha
	if(direction == 'right') {
		context.beginPath();
		// Lateral superior
		context.moveTo(posx, posy);
		context.lineTo(posx-ANCHO_NAVE-1, posy); // -1 para cerrar correctamente
		// Parte trasera
		context.lineTo(posx-ANCHO_NAVE-1, posy+ALTO_NAVE);
		// Lateral inferior
		context.moveTo(posx-ANCHO_NAVE-1, posy+ALTO_NAVE);
		context.lineTo(posx, posy+ALTO_NAVE);
		// Ala inferior
		context.lineTo(posx, posy+2*ALTO_NAVE);
		context.lineTo(posx+1.5*ALTO_NAVE, posy+0.5*ALTO_NAVE);
		// Ala superior
		context.lineTo(posx, posy-ALTO_NAVE);
		context.lineTo(posx, posy);
	} else {
		context.beginPath();
		// Lateral superior
		context.moveTo(posx, posy);
		context.lineTo(posx-ANCHO_NAVE, posy);
		// Ala superior
		context.lineTo(posx-ANCHO_NAVE, posy-ALTO_NAVE);
		context.lineTo(posx-1.75*ANCHO_NAVE, posy+0.5*ALTO_NAVE);
		// Ala inferior
		context.lineTo(posx-ANCHO_NAVE, posy+2*ALTO_NAVE);
		context.lineTo(posx-ANCHO_NAVE, posy+ALTO_NAVE);
		// Lateral inferior
		context.lineTo(posx, posy+ALTO_NAVE);
		context.closePath();
	}

	// Dibujar y rellenar
	context.lineWidth = GROSOR; 
	context.stroke();
	context.fillStyle = COLORES[i]; 
	context.fill(); 
}

window.onload = () => {
	lienzo = document.getElementById("lienzo");
	context = lienzo.getContext("2d");
	width = lienzo.width;
	height = lienzo.height;
	posx = 100;
	posy = height - 100;
	
	dibujarFlecha(context);
	document.addEventListener('keydown', (event) => {
		if(event.key == 'ArrowLeft') {
			posx -= SPEED;
			if(posx-1.77*ANCHO_NAVE < 0) {
				posx = 1.77*ANCHO_NAVE+GROSOR;
			}
			direction = 'left';
		} else if(event.key == 'ArrowRight') {
			posx += SPEED;
			if(posx+0.75*ANCHO_NAVE > width-1) {
				posx = width-1-0.75*ANCHO_NAVE;
			}
			direction = 'right';
		}
		dibujarFlecha(context);
	});
	setInterval(() => {
		i = (i+1)%COLORES.length;
		dibujarFlecha(context);
	}, 500);
}