let fichero2 = `G27CQ4: 212,65€ 1920px 65W 27" 170Hz 1ms
XG27ACS: 180hz 269,66$ 27" 62w 2ms
CQ32G2SE: 31" 165Hz 214,20€ 1ms 2560px 52W
G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"`;

// Procesar el fichero 2 con un array de objetos
fichero2 = fichero2.toUpperCase();
let lineas = fichero2.split("\n");
let productos = [];

for (let linea of lineas) {
  let partes = linea.split(" ");
  let producto = {
    modelo: partes[0].replace(":", ""),
    precio: null,
    moneda: "",
    resolucion: null,
    potencia: null,
    tamano: null,
    frecuencia: null,
    tiempoRespuesta: null
  };

  for (let parte of partes.slice(1)) { // Usar slice(1) para omitir el modelo
    if (parte.includes("€") || parte.includes("$")) {
      producto.precio = parseFloat(parte.replace(",", "."));
      producto.moneda = parte.includes("€") ? "€" : "$";
    } else if (parte.includes("PX")) {
      producto.resolucion = parseInt(parte.replace("PX", ""));
    } else if (parte.includes("W")) {
      producto.potencia = parseInt(parte.replace("W", ""));
    } else if (parte.includes('"')) {
      producto.tamano = parte;
    } else if (parte.includes("HZ")) {
      producto.frecuencia = parseInt(parte.replace("HZ", ""));
    } else if (parte.includes("MS")) {
      producto.tiempoRespuesta = parseInt(parte.replace("MS", ""));
    }
  }

  productos.push(producto);
}

console.log(productos);
