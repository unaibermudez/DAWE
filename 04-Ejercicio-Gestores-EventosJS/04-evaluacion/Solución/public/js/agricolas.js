import {Producto} from './producto.js';

export class Agricola extends Producto {
  constructor(nombre, precio, granja) {
      super(nombre, precio);
      this._granja = granja;
  }

  static get nombre_producto() {
    return "Productos Agrícolas";
  }

  get granja() {
		return this._granja;
	}

  set granja(granja) {
		this._granja = granja;
	}
}