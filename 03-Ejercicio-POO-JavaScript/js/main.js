import { nombresTiposProductos, productosPorTipo } from './tienda.js';


productosPorTipo.forEach((productos, index) => { // por cada tipo de producto
    console.log(nombresTiposProductos[index]);
    productos.forEach(producto => { // por cada producto
        let tipo = producto.constructor.getTipoProducto();
        let seccion;
        if (tipo === "Consolas") {
            seccion = document.getElementById('consolas');
            let card = document.createElement('div');
            card.className = 'product-card';
            var marca = producto.marca;
            var modelo = producto.modelo;
            var precio = producto.precio;
            var memoria = producto.mostrar();
            let h2 = document.createElement('h2');
            h2.innerHTML = modelo;
            card.appendChild(h2);
            let h4 = document.createElement('h4');
            h4.innerHTML = marca;
            card.appendChild(h4);
            let p = document.createElement('p');
            let span = document.createElement('span');
            span.innerHTML = "Precio: " +precio + "€";
            p.appendChild(span);
            card.appendChild(p);
            let p2 = document.createElement('p');
            let span2 = document.createElement('span');
            span2.innerHTML = "Memoria: " + memoria;
            p2.appendChild(span2);
            card.appendChild(p2);
            seccion.appendChild(card);
        } else if (tipo === "Ordenadores") {
            seccion = document.getElementById('ordenadores');
            let card = document.createElement('div');
            card.className = 'product-card';
            var marca = producto.marca;
            var modelo = producto.modelo;
            var precio = producto.precio;
            var cpu = producto.mostrar();
            let h2 = document.createElement('h2');
            h2.innerHTML = modelo;
            card.appendChild(h2);
            let h4 = document.createElement('h4');
            h4.innerHTML = marca;
            card.appendChild(h4);
            let p = document.createElement('p');
            let span = document.createElement('span');
            span.innerHTML = "Precio: " +precio + "€";
            p.appendChild(span);
            card.appendChild(p);
            let p2 = document.createElement('p');
            let span2 = document.createElement('span');
            span2.innerHTML = "CPU: " + cpu;
            p2.appendChild(span2);
            card.appendChild(p2);
            seccion.appendChild(card);
        } else if (tipo === "Moviles") {
            seccion = document.getElementById('moviles');
            let card = document.createElement('div');
            card.className = 'product-card';
            var marca = producto.marca;
            var modelo = producto.modelo;
            var precio = producto.precio;
            var conectividad = producto.mostrar();
            let h2 = document.createElement('h2');
            h2.innerHTML = modelo;
            card.appendChild(h2);
            let h4 = document.createElement('h4');
            h4.innerHTML = marca;
            card.appendChild(h4);
            let p = document.createElement('p');
            let span = document.createElement('span');
            span.innerHTML = "Precio: " +precio + "€";
            p.appendChild(span);
            card.appendChild(p);
            let p2 = document.createElement('p');
            let span2 = document.createElement('span');
            span2.innerHTML = "Conectividad: " + conectividad;
            p2.appendChild(span2);
            card.appendChild(p2);
            seccion.appendChild(card);
        }
    });
});

