import {tienda, nombre_productos} from './tienda.js';

const mostrar_datos = (producto) => {
	return `<div class="producto">
	<div class="nombre_producto">${producto.nombre}</div>
	<div class="precio"><span class="negrita">Precio</span>: ${producto.precio}€/kg</div>
	${producto.granja ? `<div class="info_extra"><span class="negrita">Origen</span>: ${producto.granja}</div>`: ''}
	${producto.marca ? `<div class="info_extra"><span class="negrita">Marca</span>: ${producto.marca}</div>`: ''}
	${producto.fabricante ? `<div class="info_extra"><span class="negrita">Fabricante</span>: ${producto.fabricante}</div>`: ''}
</div>`
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
}
