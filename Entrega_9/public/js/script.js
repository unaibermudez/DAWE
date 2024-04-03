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
            errors.push("name: Por favor, introduce tu nombre.");
        }

        var phonePattern = /^\d{3}-?\d{3}-?\d{3}$/;
        if (!phonePattern.test(phone)) {
            errors.push("phone: Por favor, introduce un número de teléfono válido (123-456-789).");
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push("email: Por favor, introduce un correo electrónico válido.");
        }

        if (books === "") {
            errors.push("books: Por favor, selecciona al menos un libro.");
        }

        if (quantity < 1 || quantity > 5) {
            errors.push("quantity: La cantidad de libros debe estar entre 1 y 5.");
        }

        var statusMessages = document.getElementById("statusMessages");
        statusMessages.innerHTML = "";

        if (errors.length === 0) {
            // Crear objeto FormData para enviar datos y archivos
            var formData = new FormData();
            formData.append('first_name', name);
            formData.append('last_name', ''); // No hay campo last_name en tu formulario, ajusta según tu necesidad
            formData.append('email', email);
            formData.append('file', files[0]); // Solo enviamos el primer archivo

            fetch('/upload/files', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta del servidor:", data);
                if (data.success) {
                    // Imprimir datos del archivo
                    console.log("Nombre del archivo:", data.file.name);
                    console.log("Tamaño del archivo:", data.file.size);
                    console.log("Tipo de archivo:", data.file.type);
                
                    // Obtener la información del formulario
                    var formDataList = "<ul>" +
                        "<li>Nombre: " + name + "</li>" +
                        "<li>Teléfono: " + phone + "</li>" +
                        "<li>E-mail: " + email + "</li>" +
                        "<li>Libro: " + books + "</li>" +
                        "<li>Cantidad: " + quantity + "</li>" +
                        "</ul>";
                
                    // Concatenar los mensajes en una sola línea
                    var fileInfoMessage = "Nombre del archivo: " + data.file.name +
                        " | Tamaño del archivo: " + data.file.size + " bytes" +
                        " | Tipo de archivo: " + data.file.type;
                
                    // Resto del código para mostrar mensajes de estado en la página
                    var statusMessages = document.getElementById("statusMessages");
                    statusMessages.innerHTML = "<p>Mensajes de estado.</p>";
                    statusMessages.innerHTML += "<p>" + fileInfoMessage + "</p>"; // Agregar la información del archivo en una sola línea
                    statusMessages.innerHTML += "<p>Datos del formulario:</p>";
                    statusMessages.innerHTML += formDataList; // Agregar la información del formulario en una lista
                    document.getElementById("myForm").reset();
                    statusMessages.innerHTML += "<p></p>";
                } else {
                    statusMessages.innerHTML = "<p>Error al enviar el formulario.</p>";
                }
                
            })
        } else {
            errors.forEach(function(error) {
                var fieldName = error.split(':')[0].toLowerCase();
                var errorMessage = error.split(':')[1];
                document.getElementById(fieldName + "Error").innerHTML = errorMessage;
            });
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
        if (fileArray.length > 0) {
            statusMessages.innerHTML = "<p>Archivos seleccionados:</p><ul>";
            fileArray.forEach(file => {
                statusMessages.innerHTML += "<li>" + file.name + "</li>";
            });
            statusMessages.innerHTML += "</ul>";
        } else {
            statusMessages.innerHTML = "<p>No se han seleccionado archivos.</p>";
        }
    }
});
