import {Producto} from './producto.js';

export class Mueble extends Producto {
  constructor(nombre, precio, fabricante) {
      super(nombre, precio);
      this._fabricante = fabricante;
  }

  static get nombre_producto() {
    return "Muebles";
  }

  get fabricante() {
		return this._fabricante;
	}

  set fabricante(fabricante) {
		this._fabricante = fabricante;
	}
}