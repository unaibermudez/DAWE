class ArrayOrdenado {
    constructor(comparador) {
        this.comparador = comparador;
        this.contenido = [];
    }

    findPos(elt) {
        return this.contenido.findIndex(item => this.comparador(elt, item) < 0);
    }

    insert(elt) {
        let pos = this.findPos(elt);
        if (pos === -1) {
            this.contenido.push(elt);
        } else {
            this.contenido.splice(pos, 0, elt);
        }
    }
}

let ordenado = new ArrayOrdenado((a, b) => a - b);
ordenado.insert(5);
ordenado.insert(1);
ordenado.insert(2);
ordenado.insert(4);
ordenado.insert(3);
console.log("array:", ordenado.contenido);
// array: [1, 2, 3, 4, 5]