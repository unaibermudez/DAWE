var efecto = null;
var clip = './videos/demovideo1'; // nombre del vídeo, sin extensión
var audioclip = './audios/soundtrack.mp3'; // nombre del audio, sin 
var rotation = 0;

window.onload = function() {
	var video = document.getElementById("video");
	var botonByN = document.getElementById("byn");
	botonByN.onclick = cambiarEfecto;
	var botonNormal = document.getElementById("normal");
	botonNormal.onclick = cambiarEfecto;

	//EJERCICIO 2 a) Pausar video
	var botonPausa = document.getElementById("pausa");
	botonPausa.onclick = pararVideo;

	//EJERCICIO 2 b) Efecto ciencia ficcion
	var botonCienciaFicción = document.getElementById("cienciaficción");	
	botonCienciaFicción.onclick = cambiarEfecto;

	//EJERCICIO 2 c) Rotacion
	var botonRotar = document.getElementById("rotar");	
	botonRotar.onclick = rotar;

	//EJERCICIO 2 d) sonido en background
	var botonPlayAudio = document.getElementById("playaudio");	
	botonPlayAudio.onclick = ActivarAudio;
	
	//EJERCICIO 2 e) picture in picture
	var botonPip = document.getElementById("formatoPiP");
	botonPip.onclick = activarPip;

	video.addEventListener("play", procesarFrame, false);
	video.src = clip + getFormatExtension();

	video.load();
	video.play();
}

//EJERCICIO 2 a) PAUSE
function pararVideo(e){
	if (!video.paused && !video.ended) {
		video.pause();
		return;
	}
	else {
		video.play();
		return;
	}
}

//EJERCICIO 1
function ActivarAudio(e){
	loadAudio(audioclip).then(audio => audio.play());
}

//EJERCICIO 1
function loadAudio(file){
	return new Promise(function (resolve){
		var audio = new Audio(file);
		audio.addEventListener("loadeddata", (e) => {
			resolve(audio)
		})
	})
}

// Para ejercicio 2 b)
function cambiarEfecto(e){
	var id = e.target.getAttribute("id");
	if ( id == "byn" ){
		efecto = byn;
	}
	else if  ( id == "cienciaficción" ){
		efecto = scifi;
	}
	 else {
		efecto = null;
	}
}

function getFormatExtension() {
	var video = document.getElementById("video");
	if (video.canPlayType("video/mp4") != "") {
		return ".mp4";
	} 
	else if (video.canPlayType("video/ogg") != "") {
		return ".ogv";
	}
	else if (video.canPlayType("video/webm") != "") {
		return ".webm";
	} 
}

function procesarFrame(e) {
	var video = document.getElementById("video");

	if (video.paused || video.ended) {
		return;
	}

	var bufferCanvas = document.getElementById("buffer");
	var displayCanvas = document.getElementById("display");
	var buffer = bufferCanvas.getContext("2d");
	var display = displayCanvas.getContext("2d");

	if (rotation > 0){
		buffer.setTransform(1,0,0,1,0,0);                      
		buffer.translate(bufferCanvas.width/2, bufferCanvas.height/2);
  		// Rotate 1 degree
  		buffer.rotate(rotation*Math.PI / 180);
  		// Move registration point back to the top left corner of canvas
	  	buffer.translate(-bufferCanvas.width/2, -bufferCanvas.height/2); 
 	}

	buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);

	var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
	var length = frame.data.length / 4;

	for (var i = 0; i < length; i++) {
		var r = frame.data[i * 4 + 0];
		var g = frame.data[i * 4 + 1];
		var b = frame.data[i * 4 + 2];
		
		if (efecto != null){		
			efecto(i, r, g, b, frame.data);
		}
	}

	display.putImageData(frame, 0, 0);

	setTimeout(procesarFrame, 0);
	// en los navegadores modernos, es mejor usar :
	// requestAnimationFrame(procesarFrame);
}

function byn(pos, r, g, b, data) {
	var gris = (r+g+b)/3;

	data[pos * 4 + 0] = gris;
	data[pos * 4 + 1] = gris;
	data[pos * 4 + 2] = gris;
}

//EJERCICIO 2 b)
function scifi(pos, r, g, b, data) {
	var offset = pos * 4;
	data[offset] = Math.round(255 - r);
	data[offset+1] = Math.round(255 - g);
	data[offset+2] = Math.round(255 - b);
}

//EJERCICIO 2 c)
function rotar(e) {
	setInterval(() => rotation ++, 50);
}

//EJERCICIO 2 e)
async function activarPip(e) {
	var botonPip = document.getElementById("formatoPiP");
	botonPip.disabled = true;
	var video = document.getElementById("video");
	await video.requestPictureInPicture();
	botonPip.disabled = false;
	pararVideo();
}