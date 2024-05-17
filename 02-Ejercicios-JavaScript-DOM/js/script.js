window.onload = () => {
    // APARTADO 1 
    let main = document.querySelector('main');
    let section = document.createElement('section');
    let h1 = document.createElement('h1');
    h1.textContent = 'Encabezado de la Sección';
    section.appendChild(h1);
    for (let i = 0; i < 3; i++) {
        let article = document.createElement('article');
        article.textContent = 'Texto del artículo ' + (i + 1);
        section.appendChild(article);
    }
    main.appendChild(section);

    // APARTADO 2
    function addLink(ulSelector, linkText, liClass) {
        let ul = document.querySelector(ulSelector);
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = '#';
        a.textContent = linkText;

        // Añade la clase al elemento <li>
        if (liClass) {
            li.className = liClass;
        }

        li.appendChild(a);
        ul.appendChild(li);
    }

    addLink('.aside-menu', 'Enlace añadido 1');
    addLink('.aside-menu', 'Enlace añadido 2');
    addLink('.aside-menu', 'Enlace añadido 3');
    addLink('.nav-menu', 'Enlace Superior', 'nav-item');
    addLink('.footer-menu', 'Enlace Footer');

    // APARTADO 3
    // a)
    let articles = document.querySelectorAll('article');

    for (let i = 0; i < articles.length; i++) {
        articles[i].style.fontSize = 'smaller';
    }
    // b)
    let asideLinks = document.querySelectorAll('aside a');

    for (let i = 0; i < asideLinks.length; i++) {
        asideLinks[i].style.textDecoration = 'none';
        asideLinks[i].style.fontStyle = 'italic';
    }
    // c)
    let navLinks = document.querySelectorAll('nav a');

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].style.fontSize = 'smaller';
        navLinks[i].style.fontWeight = 'bold';
    }

    // APARTADO 4
    let liElements = document.querySelectorAll('li');

    console.log('La cantidad de <li> es: ' + liElements.length);

}