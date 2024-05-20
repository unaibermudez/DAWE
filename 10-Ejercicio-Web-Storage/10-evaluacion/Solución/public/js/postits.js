window.onload = init;

var hovered;

function init() {
	var button = document.getElementById("add_button");
	button.addEventListener('click', createSticky);
	var buttonDelete = document.getElementById("delete_button");
	buttonDelete.addEventListener('click', clearStickyNotes);

	/* cargar las notas postit de localStorage  
	 cada nota se guarda como un par así: postit_X = texto_de_la_nota
	 donde X es el número de la nota
	 por cada una de ellas, llamar al método
	 addStickyToDOM(texto_de_la_nota); */
	for (var i = 0; i < localStorage.length; i++) {
		var clave = localStorage.key(i);
		if (clave.startsWith('postit_')){ //Si es un postit
			var valor = localStorage.getItem(clave);
			addStickyToDOM(valor, clave);
		}
	}
	calcularLocalSize(); //Muestro el tamaño del localStorage

	document.addEventListener('keydown', (e) => {
		if(e.key == 'Delete' && hovered != null) {
			localStorage.removeItem(hovered.dataset.id);
			hovered.parentNode.removeChild(hovered);
			calcularLocalSize();	
		}
	});
}

function createSticky() {
	var value = document.getElementById("note_text").value;

    /* Crear la nota con nombre postit_X, donde X es un número entero
	 (postit_1, postit_2, ...)  y guardarla en el localStorage */
	var guardado = false;
	var i = localStorage.length + 1;
	while (!guardado) {
		if (localStorage.getItem('postit_'+i) == null) {
			localStorage[`postit_${i}`] = value;
			guardado = true;
		}
		i++;
	}
	addStickyToDOM(value, 'postit_'+i-1);
	calcularLocalSize(); 
}

function addStickyToDOM(value, key) {
	var stickies = document.getElementById("stickies");
	var postit = document.createElement("li");
	var span = document.createElement("span");
	console.log(key)
	postit.dataset.id = key;
	span.setAttribute("class", "postit");
	span.innerHTML = value;
	postit.appendChild(span);
	stickies.appendChild(postit);
	postit.addEventListener('mouseover', (e) => {
		if(postit == e.target || span == e.target) {
			hovered = postit;
			//postit.style["background-color"] = '#f4b2a4';
		}
	});
	postit.addEventListener('mouseout', (e) => {
		if(postit == e.target) {
			hovered = null;
			//postit.style["background-color"] = 'LightGoldenRodYellow';
		}
	});
}

function clearStickyNotes() {
	let stickies = document.getElementById("stickies"); // obtener una referencia a la capa "stickies"
	
	// Borrar todos los elementos de stickies del DOM
	while (stickies.lastElementChild) {
		stickies.removeChild(stickies.lastElementChild);
	}

	// Borrar todos los elementos que empiecen por "postit_" de localStorage
	const localLength = localStorage.length;
	let indice = 0;
	for (let i = 0; i < localLength; i++) {
		const clave = localStorage.key(indice);
		if (clave.startsWith('postit_')){ //Si es un postit
			localStorage.removeItem(clave); //Borro y mantengo mismo indice
		} else{
			indice++; //Actualizo indice ya que no he borrado
		}
	}
	calcularLocalSize(); 
}

function calcularLocalSize() {
	let data = '';
    for (let key in localStorage){
        if(localStorage.hasOwnProperty(key)){
            data += window.localStorage[key];
        }
    }
	document.getElementById('localSize').innerHTML = data ? `\nEspacio utilizado: ${((data.length * 16)/(8 * 1024)).toFixed(2)} KB` : 'Espacio utilizado: 0 KB';
}
