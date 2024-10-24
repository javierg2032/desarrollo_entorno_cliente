// Supongamos que los ficheros son cadenas de texto simuladas
const fichero1 = `G27CQ4 212,65€
XG27ACS 269,66€
CQ32G2SE 214,20€
G27C4X 189,45€`;

// Procesar el fichero 1
let lineas1 = fichero1.split("\n");
let arrayBidimensional1 = [];
for (let i = 0; i < lineas1.length; i++) {
  let datos1 = lineas1[i].split(" "); // separa los datos por espacios
  arrayBidimensional1.push(datos1); // agrega la línea procesada al array bidimensional
}

console.log("\nFichero Pantallas1");
for (let i = 0; i < arrayBidimensional1.length; i++) {
  for (let j = 0; j < arrayBidimensional1[i].length; j++) {
    console.log(`${arrayBidimensional1[i][j]}` + ` `);
  }
}
