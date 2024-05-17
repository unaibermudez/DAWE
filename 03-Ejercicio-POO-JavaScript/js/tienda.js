import {Ordenador} from './Ordenador.js';
import {Consola} from './Consola.js';
import {Movil} from './Movil.js';

const ordenador1 = new Ordenador("MSI", "Prestige 14", 1000, "Ryzen 7");
const ordenador2 = new Ordenador("Apple", "MacBook Pro", 1500, "Intel i7");
const ordenador3 = new Ordenador("HP", "Pavilion", 800, "Intel i5");
const ordenador4 = new Ordenador("Asus", "ZenBook", 1200, "Ryzen 5");
const ordenador5 = new Ordenador("Lenovo", "IdeaPad", 600, "Ryzen 3");
const ordenador6 = new Ordenador("Dell", "Inspiron", 700, "Intel i3");


const movil1 = new Movil("Samsung", "Galaxy S23 Ultra", 1000, "5G");
const movil2 = new Movil("Apple", "iPhone 13 Pro", 1200, "5G");
const movil3 = new Movil("Xiaomi", "Redmi Note 10", 300, "4G");
const movil4 = new Movil("OnePlus", "8T", 600, "5G");
const movil5 = new Movil("Realme", "8 Pro", 400, "5G");
const movil6 = new Movil("Huawei", "P40", 500, "5G");

const consola1 = new Consola("Sony", "PlayStation 5", 500, "512GB");
const consola2 = new Consola("Microsoft", "Xbox Series X", 500, "1TB");
const consola3 = new Consola("Nintendo", "Switch", 300, "64GB");
const consola4 = new Consola("Sony", "PlayStation 4", 300, "256GB");


// Crear la lista con los nombres de cada tipo de producto en la tienda
const nombresTiposProductos = [
    Consola.getTipoProducto(),
    Ordenador.getTipoProducto(),
    Movil.getTipoProducto()
];

// Crear la lista que contiene sublistas de productos
const productosPorTipo = [
    [consola1, consola2, consola3, consola4],
    [ordenador1, ordenador2, ordenador3, ordenador4, ordenador5, ordenador6],
    [movil1, movil2, movil3, movil4, movil5, movil6]
];

export { nombresTiposProductos, productosPorTipo };