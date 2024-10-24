const fichero2 = `G27CQ4: 212,65€ 1920px 65W 27" 170Hz 1ms
XG27ACS: 180hz 269,66$ 27" 62w 2ms
CQ32G2SE: 31" 165Hz 214,20€ 1ms 2560px 52W
G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"`;
// Procesar el fichero 2
let lineas2 = fichero2.split("\n");
let arrayBidimensional2 = [];
for (let i = 0; i < lineas2.length; i++) {
  let datos2 = lineas2[i].split(" "); // separa los datos por espacios
  arrayBidimensional2.push(datos2); // agrega la línea procesada al array bidimensional
}

console.log("\nFichero Pantallas2");
for (let i = 0; i < arrayBidimensional2.length; i++) {
  for (let j = 0; j < arrayBidimensional2[i].length; j++) {
    console.log(`${arrayBidimensional2[i][j]}` + ` `);
  }
}
