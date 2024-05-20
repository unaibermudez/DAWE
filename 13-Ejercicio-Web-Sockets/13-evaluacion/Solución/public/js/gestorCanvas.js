import {setupSockets} from "./sockets.js";
import {crashSocket} from "./sockets.js";
//Variables globales

//Canvas cuadrado rojo
var canvasCuadrado= document.getElementById("lienzo");
var contextCuadrado = canvasCuadrado.getContext("2d");
//Coordenadas del cuadrado
var inix
var iniy
var finx
var finy
//Canvas imagen
var canvasImagen= document.getElementById("lienzofondo");
var contextImagen= canvasImagen.getContext("2d");
//Longitud imagen (para determinar limites del cuadrado)
var imgX
var imgY

inix=0;
iniy=0;
finx=28;
finy=36;
pintarCanvas();
//Control eventos de teclado
window.onload = setupSockets;

window.addEventListener("keydown", keyDownHandler, true);
function keyDownHandler(e) {
	const key=e.key;
    if(e.key == "ArrowRight") { //Si pulso derecha
		if (finx<imgX){
			inix=inix+1
			finx=finx+1;
			pintarCanvas();
		}
		else {
			crashSocket();
		}
    }
    else if(e.key == "ArrowLeft") { //Si pulso izquierda
        if (inix>0){
			inix=inix-1;
			finx=finx-1;
			pintarCanvas();
		}
        else{
        	crashSocket();
		}
    }
}

//Funciones pintado canvas
function pintarCanvas(){
	
	 var spritesheet = new Image();
		 spritesheet.src = "spritesheet.png";
		 spritesheet.onload = function() {
			contextImagen.drawImage(spritesheet, 0, 0); //Dibujo la imagen
			imgX=spritesheet.width;
			imgY=spritesheet.height;
			pintarCuadrado(); //Dibujo el cuadrado

			//Dibujo la imagen ampliada
			var canvasImgA= document.getElementById("imagenAmpliada");
			var contextImgA = canvasImgA.getContext("2d");
			contextImgA.drawImage(spritesheet, inix, iniy,28,36,0,0,28*2,36*2); //Dibujo la imagen ampliandola *2
		 };
}

function pintarCuadrado()
{ 
	//Dibujo el cuadrado
	contextCuadrado.clearRect(0, 0, canvasCuadrado.width, canvasCuadrado.height); //Limpio el canvas del cuadrado
	contextCuadrado.beginPath();
	contextCuadrado.moveTo(inix,iniy);
	contextCuadrado.lineTo(finx,iniy);
	contextCuadrado.lineTo(finx,finy);
	contextCuadrado.lineTo(inix,finy);
	contextCuadrado.closePath();
	contextCuadrado.lineWidth = 1;
	contextCuadrado.strokeStyle = "red";
	contextCuadrado.stroke();
	//Dibujo las coordenadas del cuadrado
	contextCuadrado.fillStyle = "red";
	contextCuadrado.fillText("("+inix+","+iniy+")",imgX-45, 10);
}

		 