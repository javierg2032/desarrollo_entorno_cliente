// Supongamos que los ficheros son cadenas de texto simuladas
let fichero1 = `G27CQ4 212,65€
XG27ACS 269,66€
CQ32G2SE 214,20€
G27C4X 189,45€`;

// Procesar el fichero 1
fichero1=fichero1.toUpperCase();
let array= fichero1.split("\n");
let productos=[];
for (let i = 0; i < array.length; i++) {
    productos[i]=array[i].split(" ");
}
console.log(productos);