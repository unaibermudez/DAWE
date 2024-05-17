function agregar_link(capa, texto, enlace) {
    let new_li = document.createElement("li");
    let new_a = document.createElement("a");
    new_a.href = enlace;
    new_a.innerText = texto;
    new_li.appendChild(new_a);
    capa.appendChild(new_li);
    /*
        Versión alternativa:
        let new_li = document.createElement("li");
        new_li.innerHTML = '<a href="#">' + texto + '</a>';
        capa.appendChild(new_li);
    */
}

window.onload = () => {
    
    /*******************************
        Primera tarea
    *******************************/

    let main = document.getElementsByTagName("main")[0]; // solo puede haber un main
    let new_section = document.createElement("section");

    // Añadimos primero un encabezado de tipo h1 al <section>
    let new_h1 = document.createElement("h1");
    new_h1.innerText = "Avisos";
    new_section.appendChild(new_h1);

    // Ahora tenemos que incluir 3 <article> dentro de section, lo haremos en un bucle
    for(let i = 0; i < 3; i++) {
        let new_article = document.createElement("article");

        // Creamos ub parrafo con su respectivo texto para añadirlo al <article>
        let new_p = document.createElement("p");
        new_p.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nunc odio, interdum ac mi a, dignissim tempus diam. Duis laoreet justo at lectus dapibus tristique. Donec accumsan ac lorem eu condimentum. Morbi blandit ante aliquet erat imperdiet, et elementum eros blandit. Ut aliquam risus ac velit sollicitudin sollicitudin in non velit. Nunc facilisis nisi quis nulla venenatis, at ultricies dolor aliquam. Praesent vel tellus vulputate, ultricies sapien sed, fringilla tortor. Morbi at dui vitae lorem vestibulum vehicula at et tellus. Ut iaculis ac metus id molestie. Aenean et justo erat. Suspendisse dignissim luctus lacus, vitae lobortis metus.";
        new_article.appendChild(new_p);

        // Agregamos el <article> al <section>
        new_section.appendChild(new_article);
    }
    main.appendChild(new_section);

    /*******************************
        Segunda tarea
    *******************************/

    // Añadir 3 enlaces al menu aside
    let menu_aside = document.querySelector("aside ul");
    for(let i = 0; i < 3; i++) {
        // Creamos un <li> que tenga un <a> dentro, incluyendo su texto y su href
        agregar_link(menu_aside, "Enlace " + (3+i+1), "#");
    }

    // Menú bajo el header
    let menu_superior = document.querySelector("nav ul");
    agregar_link(menu_superior, "Wikipedia", "https://es.wikipedia.org/wiki/Universidad_del_Pa%C3%ADs_Vasco");

    // Menú del footer
    let menu_footer = document.querySelector("footer ul");
    agregar_link(menu_footer, "YouTube", "https://www.youtube.com/user/upvehu");

    /*******************************
        Tercera tarea
    *******************************/

    let parrafos = document.getElementsByTagName("p");
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].style["font-size"] = "smaller";
    }

    let aside = document.getElementsByTagName("aside")[0];
    let enlaces = aside.getElementsByTagName("a");
    for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].style["text-decoration"] = "none";
        enlaces[i].style["font-style"] = "italic";
    }

    let nav = document.getElementsByTagName("nav")[0];
    enlaces = nav.getElementsByTagName("a");
    for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].style["font-size"] = "smaller";
        enlaces[i].style["font-weight"] = "bold";
    }

    /*******************************
        Cuarta tarea
    *******************************/

    let cantidad_li = document.getElementsByTagName("li").length;
    console.log("La cantidad de <li> es: " + cantidad_li);
}

