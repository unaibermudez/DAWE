import {Agricola} from './agricolas.js';
import {Deportes} from './deportes.js';
import {Mueble} from './muebles.js';

export let tienda = {
    "agricolas": [
        new Agricola("Zanahoria", 0.50, "Granja del tío Pepe"),
        new Agricola("Manzana", 2.00, "Granja del tío Pepe"),
        new Agricola("Pera", 2.50, "Granja del tío Pepe"),
        new Agricola("Cebolla", 0.75, "Granja del tío Pepe"),
        new Agricola("Lechuga", 1.00, "Isabelen Baserria"),
        new Agricola("Remolacha", 1.20, "Isabelen Baserria"),
        new Agricola("Pepino", 2.99, "Joxe Mariren Baserria"),
        new Agricola("Ajo", 0.89, "Joxe Mariren Baserria"),
        new Agricola("Calabacín", 1.99, "El Bach-erri"),
        new Agricola("Tomate", 5.00, "El Bach-erri"),
        new Agricola("Tomacco", 7.99, "Granja Simpson"),
        new Agricola("Sandía", 2.10, "Gran Granja de Gran"),
        new Agricola("Melón", 1.90, "Gran Granja de Gran")
    ],
    "deportes": [
        new Deportes("Gafas de natación", 15.00, "Spido"),
        new Deportes("Calzado de marcha", 45.00, "Ribuk"),
        new Deportes("Gorra para el sol", 10.00, "Naik"),
        new Deportes("Calzado para correr", 100.00, "Addydas")
    ],
    "muebles": [
        new Mueble("Mesilla de Noche", 50.00, "Muebles La Abuelita"),
        new Mueble("Armario empotrado", 1500.00, "Muebles La Abuelita"),
        new Mueble("Escritorio <i>estudiamucho</i>", 500.00, "Muebles La Abuelita"),
        new Mueble("Estantería <i>ayquesecae</i>", 300.00, "Ebanisto el Manitas"),
        new Mueble("Sofá <i>Piesparaqueosquiero</i>", 800.00, "Ebanisto el Manitas"),
    ]
};
export let nombre_productos = [Agricola.nombre_producto, Deportes.nombre_producto, Mueble.nombre_producto];