// Utilidades comunes con arrays

const articulos = [
  { nombre: "Camiseta", precio: 20 },
  { nombre: "Figura", precio: 30 },
  { nombre: "Taza", precio: 10 },
];

const baratos = articulos.filter(a => a.precio < 25);
const ordenados = [...articulos].sort((a, b) => a.precio - b.precio);
const total = articulos.reduce((acc, obj) => acc + obj.precio, 0);

console.log(baratos, ordenados, total);
