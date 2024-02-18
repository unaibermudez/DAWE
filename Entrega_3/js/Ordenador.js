import {Producto} from './Producto.js';

export class Ordenador extends Producto {
	constructor(marca, modelo, precio, cpu){
		super(marca, modelo, precio);
		this.cpu = cpu;
	}
	getCpu(){
		return this.cpu;
	}
	setCpu(cpu){
		this.cpu = cpu;
	}
	mostrar(){
		return this.cpu;
	}
	static getTipoProducto() {
        return "Ordenadores";
    }
}