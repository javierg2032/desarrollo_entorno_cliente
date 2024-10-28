let fichero2 = `G27CQ4: 212,65€ 1920px 65W 27" 170Hz 1ms
XG27ACS: 180hz 269,66$ 27" 62w 2ms
CQ32G2SE: 31" 165Hz 214,20€ 1ms 2560px 52W
G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"`;
// Procesar el fichero 2 con un array de objetos

fichero2 = fichero2.toUpperCase();
let lineas = fichero2.split("\n");
let productos = [];

for (let i = 0; i < lineas.length; i++) {
  let partes = lineas[i].split(" ");
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

  for (let j = 1; j < partes.length; j++) {
    if (partes[j].includes("€") || partes[j].includes("$")) {
      producto.precio = parseFloat(partes[j].replace(",", "."));
      producto.moneda = partes[j].includes("€") ? "€" : "$";
    } else if (partes[j].includes("PX")) {
      producto.resolucion = parseInt(partes[j].replace("PX", ""));
    } else if (partes[j].includes("W")) {
      producto.potencia = parseInt(partes[j].replace("W", ""));
    } else if (partes[j].includes('"')) {
      producto.tamano = partes[j];
    } else if (partes[j].includes("HZ")) {
      producto.frecuencia = parseInt(partes[j].replace("HZ", ""));
    } else if (partes[j].includes("MS")) {
      producto.tiempoRespuesta = parseInt(partes[j].replace("MS", ""));
    }
  }
  
  productos.push(producto);
}

console.log(productos);
