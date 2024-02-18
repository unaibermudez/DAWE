const almacen = [
    {tipo: "lavadora", valor: 5000},
    {tipo: "lavadora", valor: 650},
    {tipo: "vaso", valor: 10},
    {tipo: "armario", valor: 1200},
    {tipo: "lavadora", valor: 77}
];

let lavadoras = almacen.filter(item => item.tipo == "lavadora");
let totalValorLavadoras = lavadoras.reduce((suma, item) => item.valor + suma,0);
console.log(totalValorLavadoras)