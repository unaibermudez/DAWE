class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    suma(punto) {
        return new Punto(this.x + punto.x, this.y + punto.y);
    }
}

console.log(new Punto(1, 2).suma(new Punto(2, 1)));