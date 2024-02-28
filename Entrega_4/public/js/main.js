import { tipos_prod, lista_prod } from "./tienda.js";
import { RaquetasDeTenis } from "./raquetasDeTenis.js";
import { Zapatillas } from "./zapatillas.js";
import { Camisetas } from "./camisetas.js";

window.onload = () => {
    cargarProductos();
    cargarGestoresEventos();
};

function cargarProductos() {
    const secciones = ["raquetasDeTenis", "Zapatillas", "Camisetas"];
    for (let i = 0; i < secciones.length; i++) {
        const seccionId = secciones[i];
        const seccion = document.getElementById(seccionId);
        for (let j = 0; j < lista_prod[i].length; j++) {
            const producto = lista_prod[i][j];
            let especificaciones = '';
            if (producto instanceof RaquetasDeTenis) {
                especificaciones = `Peso: ${producto.peso}`;
            } else if (producto instanceof Zapatillas) {
                especificaciones = `Uso: ${producto.uso}`;
            } else if (producto instanceof Camisetas) {
                especificaciones = `Color: ${producto.color}`;
            }
            const plantilla = `
                <div class="producto">
                    <div class="producto-nombre" >${producto.nombre}</div>
                    <p><span class="producto-precio"">Precio:</span> ${producto.precio}€</p>
                    <p><span class="producto-specs"">Especificaciones:</span> ${especificaciones}</p>
                    <input type="number" class="spinner" value="0" min="0" max="9">
                    <button class="btn-comprar" disabled>Comprar</button>
                </div>
            `;
            seccion.innerHTML += plantilla;
        }
    }
}

function cargarGestoresEventos() {
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    botonesComprar.forEach((boton, index) => {
        const spinner = boton.previousElementSibling;
        boton.addEventListener("click", () => {
            const cantidad = parseInt(spinner.value);
            if (cantidad > 0) {
                agregarAlCarrito(lista_prod, index, cantidad);
                spinner.value = 0;
                boton.disabled = true;
            }
        });
    });

    const spinners = document.querySelectorAll(".spinner");
    spinners.forEach(spinner => {
        spinner.addEventListener("change", () => {
            const boton = spinner.nextElementSibling;
            const cantidad = parseInt(spinner.value);
            if (cantidad >= 1 && cantidad <= 9) {
                boton.disabled = false;
                boton.textContent = `Comprar ${cantidad}`;
            } else {
                boton.disabled = true;
                boton.textContent = "Comprar";
            }
        });
    });
    
}

function agregarAlCarrito(lista_prod, index, cantidad) {
    const producto = lista_prod.flat()[index];
    const carritoLista = document.getElementById("carrito-lista");
    const li = document.createElement("li");
    li.textContent = `${cantidad} x ${producto.nombre}`;
    carritoLista.appendChild(li);
    document.getElementById("carrito").style.visibility = "visible";
    
    var container = document.querySelector('.container');
    container.style.width = 'calc(100% - 300px - 40px)'; // Ajusta 300px según el ancho del carrito
}

// Obtén una referencia al div container y al div carrito
var container = document.querySelector('.container');
var carrito = document.getElementById('carrito');

// Define una función para actualizar el ancho del container
function actualizarAnchoContainer() {
    var visibility = window.getComputedStyle(carrito).getPropertyValue('visibility');
    if (visibility === 'visible') {
        // Si el carrito es visible, el container ocupa el 80% del ancho
        container.style.width = 'calc(100% - 380px - 40px)'; // Ajusta 300px según el ancho del carrito
    } else {
        // Si el carrito no es visible, el container ocupa el 100% del ancho
        container.style.width = '100%';
    }
}

// Llama a la función cuando la página se carga
actualizarAnchoContainer();

// Llama a la función cuando la visibilidad del carrito cambia
var observer = new MutationObserver(actualizarAnchoContainer);
observer.observe(carrito, { attributes: true, attributeFilter: ['style'] });
