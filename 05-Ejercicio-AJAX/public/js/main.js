
function getBookData() {
    const isbn = document.getElementById('isbn').value;
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
        .then(response => response.json())
        .then(data => {
            const book = data[`ISBN:${isbn}`];
            const div = document.getElementById('bookData');
            div.innerHTML = '';
            const h1 = document.createElement('h1');
            h1.textContent = book.details.title;
            div.appendChild(h1);
            const h2 = document.createElement('h2');
            h2.textContent = book.details.authors[0].name;
            div.appendChild(h2);
            const img = document.createElement('img');
            img.src = book.thumbnail_url.replace('-S.', '-M.');
            div.appendChild(img);
        });
}
