export class Producto {
	constructor(marca, modelo, precio){
		this.marca = marca;
		this.modelo = modelo;
		this.precio = precio;
	}

	getMarca(){
		return this.marca;
	}
	setMarca(marca){
		this.marca = marca;
	}
	getModelo(){
		return this.modelo;
	}
	setModelo(modelo){
		this.modelo = modelo;
	}
	getPrecio(){
		return this.precio;
	}
	setPrecio(precio){
		this.precio = precio;
	}

	mostrar(){
		var contenido = "<p>Producto:" + this.marca + "<br/>" + "modelo:" + this.modelo + "<br/>"  + "Precio:" + this.precio + "</p><hr/>";
		return contenido;
	}
	
}
