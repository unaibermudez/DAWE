import {Producto} from './Producto.js';

export class Consola extends Producto {
	constructor(marca, modelo, precio, memoria){
		super(marca, modelo, precio);
		this.memoria = memoria;
	}
	getMemoria(){
		return this.memoria;
	}
	setMemoria(memoria){
		this.memoria = memoria;
	}

	mostrar(){
		return this.memoria;
	}

	static getTipoProducto() {
		return "Consolas";
	}
}