let fichero3 = `   G27CQ4:         212,65€ 1920px  65W 27" 170Hz 1ms
 XG27ACS:    180hz  269.66$      27" 62w 2ms 
CQ32G2SE: 31"  165Hz 214,20€ 1ms       2560px 52W   
     G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"`;

// Procesar el fichero 3
fichero3 = fichero3.toUpperCase().trim();
let array = fichero3.split("\n");

// Procesamos cada línea, eliminando espacios extra
let productos = [];
for (let i = 0; i < array.length; i++) {
  productos[i] = array[i].trim().split(/\s+/); // Eliminamos espacios adicionales al dividir cada línea
}
console.log(productos);

let ordenado = [];

// Reorganizamos cada producto en un array ordenado
for (let i = 0; i < productos.length; i++) {
  ordenado[i] = ["", "", "", "", "", "", "", ""]; // Inicializamos cada producto con 8 elementos vacíos
  
  // Asignamos el nombre del producto, eliminando el carácter ":"
  ordenado[i][0] = productos[i][0].replace(":", ""); 

  for (let j = 1; j < productos[i].length; j++) { 
    if (productos[i][j].includes("€") || productos[i][j].includes("$")) {
      ordenado[i][1] = parseFloat(productos[i][j].replace(",", "."));
      ordenado[i][2] = productos[i][j].includes("€") ? "€" : "$";
    } else if (productos[i][j].includes("PX")) {
      ordenado[i][3] = productos[i][j].replace("PX", "");
    } else if (productos[i][j].includes("W")) {
      ordenado[i][4] = productos[i][j].replace("W", "");
    } else if (productos[i][j].includes('"')) {
      ordenado[i][5] = productos[i][j].replace('"', '');
    } else if (productos[i][j].includes("HZ")) {
      ordenado[i][6] = productos[i][j].replace("HZ", "");
    } else if (productos[i][j].includes("MS")) {
      ordenado[i][7] = productos[i][j].replace("MS", "");
    }
  }
}

console.log(ordenado);
