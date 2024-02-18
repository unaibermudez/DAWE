export class Producto {
	constructor(titulo, autor, precio){
		this.titulo = titulo;
		this.autor = autor;
		this.precio = precio;
	}

	mostrar(){
		var contenido = "<p>Producto:" + this.titulo + "<br/>" + "Autor:" + this.autor + "<br/>"  + "Precio:" + this.precio + "</p><hr/>";
		return contenido;
	}
}
