import {Producto} from './producto.js';

export class Libro extends Producto {
	constructor(titulo, autor, precio){
		super(titulo, autor, precio);
	}
}