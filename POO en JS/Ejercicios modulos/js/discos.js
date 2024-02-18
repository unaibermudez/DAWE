import {Producto} from './producto.js';

export class Disco extends Producto {
	constructor(titulo, autor, precio, formato){
		super(titulo, autor, precio);
		this.formato = formato;
	}

	formato() {
		console.log("Formato del disco:" + formato)	
	}
}
