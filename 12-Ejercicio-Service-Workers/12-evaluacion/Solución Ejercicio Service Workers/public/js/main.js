import {tienda, nombre_productos} from './tienda.js';

const mostrar_datos = (producto) => {
	return `<div class="producto">
	<div class="nombre_producto">${producto.nombre}</div>
	<div class="precio"><span class="negrita">Precio</span>: ${producto.precio}€/kg</div>
	${producto.granja ? `<div class="info_extra"><span class="negrita">Origen</span>: ${producto.granja}</div>`: ''}
	${producto.marca ? `<div class="info_extra"><span class="negrita">Marca</span>: ${producto.marca}</div>`: ''}
	${producto.fabricante ? `<div class="info_extra"><span class="negrita">Fabricante</span>: ${producto.fabricante}</div>`: ''}
	<input class="botoncarrito" type="button" value="Comprar">
	<input class="spinner" type="number" min="0" max="9" step="1" value="0">
</div>`
}

const actualizar_carrito = (carrito) => {
	let contenido_carrito = document.getElementById("contenido_carrito");
	contenido_carrito.innerHTML = '';
	for(const nombre in carrito) {
		let nuevo_producto = document.createElement("div");
		nuevo_producto.classList.add("itemcarrito");
		nuevo_producto.innerHTML = `<div class="negrita">${carrito[nombre]['cantidad']}x${nombre}</div>
		<div>${carrito[nombre]['precio']}</div>
		<div>${carrito[nombre]['extra']}</div>`
		contenido_carrito.appendChild(nuevo_producto);

		nuevo_producto.addEventListener('mouseenter', () => {
			nuevo_producto.style['background-color'] = "steelblue";
			nuevo_producto.style['color'] = "white";

			nuevo_producto.style['border-bottom'] = "";
			nuevo_producto.style['margin-bottom'] = "";
			nuevo_producto.style['width'] = "";
			nuevo_producto.style['padding'] = "";
		});
		nuevo_producto.addEventListener('mouseleave', () => {
			nuevo_producto.style['background-color'] = "";
			nuevo_producto.style['color'] = "";

			nuevo_producto.style['border-bottom'] = "1px solid gray";
			nuevo_producto.style['margin-bottom'] = "10px";
			nuevo_producto.style['width'] = "100%";
			nuevo_producto.style['padding'] = "5px";
		});
	}
}

const cargarGestoresEventos = () => {
	let botones_carrito = document.getElementsByClassName("botoncarrito");
	let menu_carrito = document.getElementById("carrito");
	menu_carrito.addEventListener('mouseenter', () => {
		menu_carrito.style['width'] = "15%";
	});
	menu_carrito.addEventListener('mouseleave', () => {
		menu_carrito.style['width'] = "10%";
	});

	let carrito = {};
	for(let i = 0; i < botones_carrito.length; i++) {
		botones_carrito[i].addEventListener('click', (e) => {
			// Conseguimos la etiqueta padre a la que pertenece el botón
			let producto = e.target.parentNode;
			// Accedemos a los hijos del padre, que serán los datos del producto
			let nombre = producto.children[0].innerText;
			let precio = producto.children[1].innerText;
			let origen = producto.children[2].innerText;
			let cantidad = parseInt(producto.children[4].value); // sin parseInt, obtendremos un string
			
			// Si hay 9 copias del mismo producto, mostramos una alerta y no lo añadimos al carrito
			if(nombre in carrito && carrito[nombre]['cantidad'] + cantidad > 9) {
				alert("No se pueden añadir más de 9 copias del mismo producto al carrito.");
				return;
			}
			if(!(nombre in carrito)) {
				// Añadimos el producto al carrito
				carrito[nombre] =  {nombre, 'precio': precio, 'extra': origen, 'cantidad': cantidad};
			} else {
				carrito[nombre]['cantidad'] += cantidad;
			}
			// Hacemos visible el menú del carrito
			menu_carrito.style["visibility"] = "visible";
			// Actualizamos los productos del carrito
			actualizar_carrito(carrito);

			// Reiniciamos el contador
			producto.children[4].value = 0;
			producto.children[3].value = "Comprar";
			producto.children[3].disabled = true;
		});
	}

	for(let i = 0; i < botones_carrito.length; i++) {
		botones_carrito[i].disabled = true;
	}

	let spinners = document.getElementsByClassName("spinner");
	for(let i = 0; i < spinners.length; i++) {
		spinners[i].addEventListener('change', (e) => {
			let boton = e.target.parentNode.getElementsByClassName("botoncarrito")[0];
			if(e.target.value > 0) {
				boton.value = `Comprar ${e.target.value}`;
				boton.disabled = false;
			} else {
				boton.value = "Comprar";
				boton.disabled = true;
			}
		});
	}
}

window.onload = () => {
	let columnas = document.getElementsByClassName("columna_contenido");
    let titulos = document.getElementsByClassName("columna_cabecera");

	// Cargar los titulos
	nombre_productos.forEach((nombre_producto, i) => {
		let capa = titulos[i];
		capa.innerHTML = `<h1>${nombre_producto}</h1>`;
	});

	// Cargar los productos
	tienda["agricolas"].forEach(producto => {
		let capa = columnas[0];
		capa.innerHTML += mostrar_datos(producto);
	});

	tienda["deportes"].forEach(producto => {
		let capa = columnas[1];
		capa.innerHTML += mostrar_datos(producto);
	});

	tienda["muebles"].forEach(producto => {
		let capa = columnas[2];
		capa.innerHTML += mostrar_datos(producto);
	});

	cargarGestoresEventos(carrito);

	let aviso = null;
	window.addEventListener('offline', () => {
		aviso = document.createElement("div");
		aviso.setAttribute("id", "aviso");
		aviso.innerHTML = '<p>Estás offline</p>';
		document.body.appendChild(aviso); 
		console.log("hola");
	});

	window.addEventListener('online', () => {
		if(aviso) {
			document.body.remove(aviso);
		}
	});
}
