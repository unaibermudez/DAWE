import { tipos_prod, lista_prod } from "./tienda.js";
import { RaquetasDeTenis } from "./raquetasDeTenis.js";
import { Zapatillas } from "./zapatillas.js";
import { Camisetas } from "./camisetas.js";

window.onload = () => {
    cargarProductos();
    cargarGestoresEventos();
    actualizarAnchoContainer();

    const carrito = document.getElementById('carrito');
    carrito.addEventListener('mouseenter', () => {
        ampliarCarrito();
    });
    carrito.addEventListener('mouseleave', () => {
        reducirCarrito();
    });
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

var dict_carrito = {};
function agregarAlCarrito(lista_prod, index, cantidad) {
    const producto = lista_prod.flat()[index];
    const carritoLista = document.getElementById("carrito-lista");
    if (producto.nombre in dict_carrito) {
        //Ya existe el producto en el carrito
        var max = false;
        dict_carrito[producto.nombre] += cantidad;   
        if (dict_carrito[producto.nombre] >= 9) {
            dict_carrito[producto.nombre] = 9;
            max = true;
        } 
        const carritoItem = document.querySelectorAll('.carrito-item');
        carritoItem.forEach(item => {
            if (item.textContent.includes(producto.nombre)) {
                item.innerHTML = ` 
                <p><span class="producto-nombre-carrito"">${dict_carrito[producto.nombre]}x ${producto.nombre}</span></p>
                <p><span class="producto-precio-carrito"">Precio: ${producto.precio}€</span></p>
                <p><span class="producto-specs-carrito"">Especificaciones: ${obtenerEspecificaciones(producto)}</span></p>
                `;
                if (max === true){
                    item.innerHTML += `<p><span class="producto-max-carrito"">Máximo de productos alcanzado!!</span></p>`;
                    alert("Máximo de productos alcanzado!!");
                }
            }
        });
    } else {
        dict_carrito[producto.nombre] = cantidad;
        const div = document.createElement("div");
        div.className = "carrito-item";
        div.innerHTML = ` 
        <p><span class="producto-nombre-carrito"">${dict_carrito[producto.nombre]}x ${producto.nombre}</span></p>
        <p><span class="producto-precio-carrito"">Precio: ${producto.precio}€</span></p>
        <p><span class="producto-specs-carrito"">Especificaciones: ${obtenerEspecificaciones(producto)}</span></p>
        `;
        if (dict_carrito[producto.nombre] >= 9) {
            div.innerHTML += `<p><span class="producto-max-carrito"">Máximo de productos alcanzado!!</span></p>`;
            alert("Máximo de productos alcanzado!!");

        }
        // Agregar gestión de eventos mouseenter y mouseleave al elemento del carrito
        div.addEventListener('mouseenter', () => {
            div.style.backgroundColor = 'white';
            div.style.color = 'black';
        });
        div.addEventListener('mouseleave', () => {
            div.style.backgroundColor = ''; // Restaura el color de fondo
            div.style.color = ''; // Restaura el color de texto
        });
        carritoLista.appendChild(div);
    }
    document.getElementById("carrito").style.visibility = "visible";

}

function obtenerEspecificaciones(producto) {
    if (producto instanceof RaquetasDeTenis) {
        return `Peso: ${producto.peso}`;
    } else if (producto instanceof Zapatillas) {
        return `Uso: ${producto.uso}`;
    } else if (producto instanceof Camisetas) {
        return `Color: ${producto.color}`;
    }
}


function ampliarCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.style.width = '30%'; // Amplía el ancho al 30%
    carrito.style.transform = 'scale(1.05)'; // Escala el tamaño al 105%
}

function reducirCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.style.width = '25%'; // Restaura el ancho al 25%
    carrito.style.transform = 'scale(1)'; // Restaura el tamaño original
}


function actualizarAnchoContainer() {
    var container = document.querySelector('.container');
    var carrito = document.getElementById('carrito');
    var visibility = window.getComputedStyle(carrito).getPropertyValue('visibility');
    if (visibility === 'visible') {
        // Si el carrito es visible, el container ocupa el 80% del ancho
        container.style.width = 'calc(100% - 380px - 40px)'; // Ajusta 300px según el ancho del carrito
    } else {
        // Si el carrito no es visible, el container ocupa el 100% del ancho
        container.style.width = '100%';
    }
}

var observer = new MutationObserver(actualizarAnchoContainer);
observer.observe(carrito, { attributes: true, attributeFilter: ['style'] });
