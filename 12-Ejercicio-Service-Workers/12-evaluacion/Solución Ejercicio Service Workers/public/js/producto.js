export class Producto {
	constructor(nombre, precio) {
		this._nombre = nombre;
		this._precio = precio;
	}

	get nombre() {
		return this._nombre;
	}

    set nombre(nombre) {
		this._nombre = nombre;
	}

    get precio() {
		return this._precio;
	}

    set precio(precio) {
		this._precio = precio;
	}
}
