import {Producto} from './producto.js';

export class Deportes extends Producto {
  constructor(nombre, precio, marca) {
      super(nombre, precio);
      this._marca = marca;
  }

  static get nombre_producto() {
    return "Productos Deportivos";
  }

  get marca() {
		return this._marca;
	}

  set marca(marca) {
		this._marca = marca;
	}
}