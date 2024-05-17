import { Producto } from "./Producto.js";  

export class Movil extends Producto {
    constructor(marca, modelo, precio, conectividad){
        super(marca, modelo, precio);
        this.conectividad = conectividad;
    }

    getConectividad(){
        return this.conectividad;
    }
    setConectividad(conectividad){
        this.conectividad = conectividad;
    }
    mostrar(){
        return this.conectividad;
    }
    
    static getTipoProducto() {
        return "Moviles";
    }
}