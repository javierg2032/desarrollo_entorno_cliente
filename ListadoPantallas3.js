const fichero3 = `   G27CQ4:         212,65€ 1920px  65W 27" 170Hz 1ms
 XG27ACS:    180hz  269.66$      27" 62w 2ms 
CQ32G2SE: 31"  165Hz 214,20€ 1ms       2560px 52W   
     G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"`;
     // Procesar el fichero 3
let lineas3 = fichero3.split("\n");
let arrayBidimensional3 = [];
for (let i = 0; i < lineas3.length; i++) {
  let datos3 = lineas3[i].split(" "); // separa los datos por espacios
  arrayBidimensional3.push(datos3); // agrega la línea procesada al array bidimensional
}

console.log("\nFichero Pantallas3");
for (let i = 0; i < arrayBidimensional3.length; i++) {
  for (let j = 0; j < arrayBidimensional3[i].length; j++) {
    console.log(`${arrayBidimensional3[i][j]}` + ` `);
  }
}
