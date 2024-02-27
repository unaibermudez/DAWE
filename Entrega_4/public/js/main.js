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
                <div class="producto" style="border: 1px solid black; margin: 10px;">
                    <div style="font-size: 20px; font-weight: bold; background-color: #447cc4;color: white;">${producto.nombre}</div>
                    <p><span style="font-weight: bold;">Precio:</span> ${producto.precio}€</p>
                    <p><span style="font-weight: bold;">Especificaciones:</span> ${especificaciones}</p>
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
            } else {
                boton.disabled = true;
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
}
