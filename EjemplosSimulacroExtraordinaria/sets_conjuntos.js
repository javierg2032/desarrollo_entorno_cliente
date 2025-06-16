// Uso de conjuntos en JS

const conjunto = new Set();
conjunto.add("A");
conjunto.add("B");
conjunto.delete("A");

console.log(conjunto.has("B")); // true

const arrayDesdeSet = [...conjunto];
