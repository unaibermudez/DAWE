import {tienda} from './tienda.js';

window.onload = () => {
    let imprimirListado = document.getElementById('listado');
    tienda.forEach(producto => {
        let capa = document.createElement('div');
        capa.innerHTML = producto.mostrar();
        imprimirListado.appendChild(capa);
    });
}