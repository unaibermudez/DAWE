/* postits.js */

var focusedPostit = null;

window.onload = init;

function init() {
	var addButton = document.getElementById("add_button");
    addButton.onclick = createSticky;
	
    var clearButton = document.getElementById("clear_button");
    clearButton.onclick = clearStickyNotes;
	
    // Mostrar el espacio total utilizado en KB
    displayTotalSpace();
    
    // Cargar las notas post-it de localStorage al cargar la página
    loadStickyNotes();
	
    // Agregar eventos de ratón para cambiar el color del post-it cuando se pasa el ratón sobre él
    var stickies = document.getElementById("stickies");

	stickies.addEventListener("mouseover", changeColorOnMouseOver);
	
    // Agregar evento de teclado para borrar el post-it cuando se pulsa la tecla de borrar
    document.addEventListener("keydown", deleteFocusedPostit);
}

function printLocalStorage() {
	if (localStorage.length === 0) {
		console.log("No hay elementos en localStorage");
	}
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		if (value === "") {
			console.log(`${key}: "sin texto"`);
		} else {
			console.log(`${key}: ${value}`);
		}
	}
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    
    // Crear la nota con un identificador único y guardarla en localStorage
    var id = generateId();
    addStickyToDOM(id, value);

    // Obtener el número actual de notas guardadas en localStorage
    var count = localStorage.getItem("sticky_count");
    count = count ? parseInt(count) : 0;

    // Incrementar el contador y usarlo para generar el nombre único de la nota
    count++;
    localStorage.setItem("sticky_count", count);
    localStorage.setItem("postit_" + id, value);

    // Actualizar el espacio total utilizado en KB
    displayTotalSpace();
}

function generateId() {
    // Generar un identificador único para la nota
    return Math.random().toString(36).substr(2, 9); // Utilizando parte de un UUID
}

function loadStickyNotes() {
    // Obtener el número total de notas guardadas en localStorage
    var count = localStorage.getItem("sticky_count");
    count = count ? parseInt(count) : 0;

    // Recorrer todas las notas guardadas y mostrarlas en la interfaz
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("postit_")) {
            var id = key.replace("postit_", "");
            var note = localStorage.getItem(key);
            addStickyToDOM(id, note);
        }
    }
}

function addStickyToDOM(id, value) {
    var stickies = document.getElementById("stickies");
    var postit = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "postit");
    span.innerHTML = value;
    postit.appendChild(span);
    postit.setAttribute("data-id", id); // Establecer el atributo data-id con el identificador único
    stickies.appendChild(postit);
}

function clearStickyNotes() {
    // Eliminar todas las notas de la pantalla
    var stickies = document.getElementById("stickies");
    stickies.innerHTML = "";

    // Eliminar todas las notas del localStorage
    localStorage.clear();

    // Actualizar el espacio total utilizado en KB
    displayTotalSpace();
}

function displayTotalSpace() {
    // Calcular el espacio total utilizado en bytes
    var totalSpace = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        totalSpace += (key.length + value.length) * 16; // Cada carácter ocupa 16 bits
    }

    // Convertir el espacio total a KB
    var totalSpaceKB = totalSpace / 1024;

    // Mostrar el espacio total utilizado en KB
    var totalSpaceElement = document.getElementById("total_space");
    totalSpaceElement.textContent = "Espacio total utilizado: " + totalSpaceKB.toFixed(2) + " KB";
}


function changeColorOnMouseOver(event) {
    var target = event.target;

    // Check if the element is a post-it or a text inside a post-it
    if (target.firstChild.className === "postit" || target.parentElement.className === "postit") {
        var postit = target.firstChild.className === "postit" ? target : target.parentElement;

        // Change the color of the post-it when the mouse is over it
        postit.style.backgroundColor = "lightblue";

        // Set the focused post-it
        focusedPostit = postit;
    }
}

function deleteFocusedPostit(event) {
    // Verificar si se ha presionado la tecla de borrar y si hay un post-it con el foco
	if ((event.key === "Backspace" || event.key === "Delete") && focusedPostit !== null) {
        // Eliminar el post-it
        focusedPostit.parentElement.removeChild(focusedPostit);
        
        // Eliminar la nota correspondiente del localStorage
        var id = focusedPostit.getAttribute("data-id");
        localStorage.removeItem("postit_" + id);

        // Reducir en uno el valor de sticky_count en localStorage
        var count = localStorage.getItem("sticky_count");
        count = count ? parseInt(count) : 0;
        if (count > 0) {
            count--;
            localStorage.setItem("sticky_count", count);

			if (count === 0) {
				localStorage.clear();
			}
        }

        // Actualizar el espacio total utilizado en KB
        displayTotalSpace();
    }
}

document.addEventListener('mouseout', function(event) {
    if (focusedPostit) {
        focusedPostit.style.backgroundColor = ''; // Reset the color when mouse is out
    }
});
