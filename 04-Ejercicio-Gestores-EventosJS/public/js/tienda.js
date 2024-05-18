import { RaquetasDeTenis } from './raquetasDeTenis.js';
import { Zapatillas } from './zapatillas.js';
import { Camisetas } from './camisetas.js';

var raqueta1 = new RaquetasDeTenis("Wilson Blade 200 V8", 270, 300);
var raqueta2 = new RaquetasDeTenis("Head Boom Pro 2022", 280, 310);
var raqueta3 = new RaquetasDeTenis("Babolat Pure Drive", 250, 300);
var raqueta4 = new RaquetasDeTenis("Head Graphene XT Speed MP 2022", 240, 300);
var raqueta5 = new RaquetasDeTenis("Wilson Ultra 100L V4.0", 220, 280);
var raqueta6 = new RaquetasDeTenis("Tecnifibre TF-X1 300", 260, 300);
var raqueta7 = new RaquetasDeTenis("Dunlop SX 300 LS", 230, 285);
var raqueta8 = new RaquetasDeTenis("Babolat Aero G 2019", 180, 290);
var raqueta9 = new RaquetasDeTenis("Yonex VCore Pro 100", 250, 300);
var raqueta10 = new RaquetasDeTenis("Wilson Pro Staff RF97 Autograph Laver Cup", 300, 315);
var raqueta11 = new RaquetasDeTenis("Prince Textreme Warrior 100", 210, 295);
var raqueta12 = new RaquetasDeTenis("Volkl V-Feel V8 Pro", 240, 305);

var camiseta1 = new Camisetas("Wilson Script Eco Slimfit", 28, "Azul");
var camiseta2 = new Camisetas("Nike Court Dri-Fit Slam", 80, "Amarilla");
var camiseta3 = new Camisetas("Nike Court Dri-Fit Slam", 80, "Verde");
var camiseta4 = new Camisetas("Dri-Fit RAFA", 90, "Naranja");
var camiseta5 = new Camisetas("Head Club Ivan", 30, "Azul");
var camiseta6 = new Camisetas("Lacoste Classic Polo", 95, "Verde Bosque");
var camiseta7 = new Camisetas("Adidas Linear", 20, "Rosa");
var camiseta8 = new Camisetas("Babolat Perf Crew Neck", 35, "Negro");
var camiseta9 = new Camisetas("Asics Athlete SS Polo", 40, "Blanco");
var camiseta10 = new Camisetas("Wilson Script Tech Tee", 25, "Rojo");
var camiseta11 = new Camisetas("Nike Court Dri-Fit Advantage", 60, "Gris");
var camiseta12 = new Camisetas("Adidas Category Graphic", 30, "Azul");

var zapatillas1 = new Zapatillas("Nike Air Zoom Vapor 111 Premium AC", 200, "Tierra Batida");
var zapatillas2 = new Zapatillas("The Roger Pro", 198, "Pista Cubierta");
var zapatillas3 = new Zapatillas("Asics Court FF 3 Novak AC", 190, "Pista Cubierta");
var zapatillas4 = new Zapatillas("Adidas Cdizero Cybersonic", 180, "Tierra Batida");
var zapatillas5 = new Zapatillas("New Balance Lav", 160, "Tierra Batida");
var zapatillas6 = new Zapatillas("K-Swiss Aero Knit", 150, "Pista Cubierta");

const tipos_prod = [raqueta1.tipoProducto(), zapatillas1.tipoProducto(), camiseta1.tipoProducto()];

let lista_raquetas = [raqueta1, raqueta2, raqueta3, raqueta4, raqueta5, raqueta6, raqueta7, raqueta8, raqueta9, raqueta10, raqueta11, raqueta12];
let lista_zapatillas = [zapatillas1, zapatillas2, zapatillas3, zapatillas4, zapatillas5, zapatillas6]; 
let lista_camisetas = [camiseta1, camiseta2, camiseta3, camiseta4, camiseta5, camiseta6, camiseta7, camiseta8, camiseta9, camiseta10, camiseta11, camiseta12];
const lista_prod = [lista_raquetas, lista_zapatillas, lista_camisetas];

export { tipos_prod, lista_prod };
