import { Producto } from "./producto.js";

export class Zapatillas extends Producto {
    constructor(nombre, precio, uso) {
        super(nombre, precio);
        this.uso = uso;
    }
    getUso() {
        return this.uso;
    }

    setUso(uso) {
        this.talla = uso;
    }
    tipoProducto() {
        return "Zapatillas";
    }
}