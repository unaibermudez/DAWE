import { Producto } from "./producto.js";

export class Camisetas extends Producto {
    constructor(nombre, precio, color) {
        super(nombre, precio);
        this.color = color
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    tipoProducto() {
        return "Camisetas";
    }
}