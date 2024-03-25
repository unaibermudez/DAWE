document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("name").focus();

    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var name = document.getElementById("name").value.trim();
        var phone = document.getElementById("phone").value.trim();
        var email = document.getElementById("email").value.trim();
        var books = document.getElementById("books").value.trim();
        var quantity = parseInt(document.getElementById("quantity").value);
        var files = document.getElementById("file").files;

        var errors = [];

        if (name === "") {
            errors.push("Por favor, introduce tu nombre.");
        }

        var phonePattern = /^\d{3}-?\d{3}-?\d{3}$/;
        if (!phonePattern.test(phone)) {
            errors.push("Por favor, introduce un número de teléfono válido (123-456-789).");
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push("Por favor, introduce un correo electrónico válido.");
        }

        if (books === "") {
            errors.push("Por favor, selecciona al menos un libro.");
        }

        if (quantity < 1 || quantity > 5) {
            errors.push("La cantidad de libros debe estar entre 1 y 5.");
        }

        if (files.length === 0) {
            errors.push("Por favor, selecciona al menos un archivo para cargar.");
        }

        var statusMessages = document.getElementById("statusMessages");
        statusMessages.innerHTML = "";

        if (errors.length === 0) {
            statusMessages.innerHTML = "<p>Formulario enviado correctamente.</p>";
            console.log("Formulario enviado correctamente.");
            document.getElementById("myForm").reset();
        } else {
            var errorMessage = "<ul>";
            errors.forEach(function(error) {
                errorMessage += "<li>" + error + "</li>";
            });
            errorMessage += "</ul>";
            statusMessages.innerHTML = errorMessage;
            console.log("Errores:", errors);
        }
    });

    var dropArea = document.getElementById("dropArea");

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight');
    }

    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        handleFiles(files);
    }

    function handleFiles(files) {
        var statusMessages = document.getElementById("statusMessages");
        var fileArray = [...files];
        statusMessages.innerHTML = "<p>Archivos seleccionados:</p><ul>";
        fileArray.forEach(file => {
            statusMessages.innerHTML += "<li>" + file.name + "</li>";
        });
        statusMessages.innerHTML += "</ul>";
    }
});
