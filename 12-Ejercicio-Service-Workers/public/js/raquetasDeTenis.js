import { Producto } from "./producto.js";

export class RaquetasDeTenis extends Producto {
    constructor(nombre, precio, peso) {
        super(nombre, precio);
        this.peso = peso;
    }
    getPeso() {
        return this.peso;
    }
    setPeso(peso) {
        this.peso = peso;
    }
    tipoProducto() {
        return "Raquetas de Tenis";
    }
}