//Constructor Clientes
function Cliente(nombre, apellido, telefono, ciudad, miViaje) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
  this.ciudad = ciudad;
  this.miViaje = miViaje;
  this.contratado = function () {
    return this.miViaje;
  };
}

//Constructor Viajes
function Viaje(origen, destino, duracion, pais, precio) {
  this.origen = origen;
  this.destino = destino;
  this.duracion = duracion;
  this.pais = pais;
  this.precio = precio;
}

//Crear un array de 4 clientes y 4 viajes
const listaClientes = [
  new Cliente("Juan", "Ramírez", "612345679", "Madrid", "Paris"),
  new Cliente("Ana", "Gómez", "612345789", "Madrid", ""),
  new Cliente("Amaya", "López", "612346679", "Madrid", "Roma"),
  new Cliente("Pedro", "Sánchez", "612345879", "Madrid", "Burgos"),
];

const listaViajes = [
  new Viaje("Madrid", "Paris", "1 hora y 30 minutos", "Francia", 80),
  new Viaje("Madrid", "Roma", "1 horta y 45 minutos", "Italia", 60),
  new Viaje("Madrid", "Burgos", "45 minutos", "España", 30),
  new Viaje("Madrid", "Tenerife", "2 horas", "España", 110),
];

//Que clientes no ha contratado ningun viaje
function clienteContratacion(arrayClientes) {
  let lugarCliente;
  for (let cliente in arrayClientes) {
    let c = arrayClientes[cliente];
    lugarCliente = c.miViaje;
    if (lugarCliente == "") {
      return c.nombre;
    }
  }
}

console.log(
  clienteContratacion(listaClientes) + " no ha contratado ningún viaje"
);

//Cuanto se han gastado todos los clientes en viajes
function gastoViajes(arrayClientes, arrayViajes) {
  let lugarCliente;
  let lugarViaje;
  let precio = 0;
  for (let cliente in arrayClientes) {
    let c = arrayClientes[cliente];
    lugarCliente = c.miViaje;
    for (let destino in arrayViajes) {
      let d = arrayViajes[destino];
      lugarViaje = d.destino;
      if (lugarCliente == lugarViaje) {
        precio = precio + d.precio;
      }
    }
  }
  return precio;
}

console.log(
  "Todos los clientes se han gastado un total de: " +
    gastoViajes(listaClientes, listaViajes) +
    "€"
);

//Prototipos (sirven para heredar propiedades y metodos):

/*const listaViajesDescuento = [new viajeDescuento("Burgos", 0.2)];*/

/*Suponemos que hacemos un viaje a Burgos al mes
Crear objeto BurgosMes con las propiedades:
mes
fechaSalida
*/

const burgos = new Viaje("Madrid", "Burgos", "45 minutos", "España", 30);

function BurgosMes(mes, fechaSalida) {
  this.mes = mes;
  this.fechaSalida = fechaSalida;
}
const burgosEnero = new BurgosMes("Enero", "20/01/2025");

burgosEnero.__proto__ = burgos;
console.log(burgosEnero);

console.log(burgosEnero.mes); //Propiedad propia
console.log(burgosEnero.precio); //Propiedad del Prototipo
console.log(burgosEnero.origen); //Propiedad del Prototipo

//Crear objeto Agencia

function Agencia(codigo, direccion, telefono) {
  this.codeigo = codigo;
  this.telefono = telefono;
}

const direccionAgencia = {
  calle: "Calle Martinez Soria",
  numero: 15,
  piso: "3ºH",
};

const agencia = {
  nif: "1234",
  direccion: direccionAgencia,
  telefono: "912345678",
  direccionCompleta: function () {
    return (
      this.direccion.calle +
      ", " +
      this.direccion.numero +
      ", " +
      this.direccion.piso
    );
  },
};

console.log(agencia, agencia.direccionCompleta());

//Crear cliente pepe basado en el constructor cliente y crear viaje roma basado en el constructor viaje
const pepe = new Cliente("Pepe", "Viyuela", "612345678", "Madrid", "Roma");
const roma = new Viaje("Madrid", "Roma", "2 horas", "Italia", 150);

roma.__proto__ = agencia;

console.log("Nif agencia viaje Roma: " + roma.nif); //Propiedad del prototipo
console.log(
  "Origen: " +
    roma.origen +
    ", Destino: " +
    roma.destino +
    ", Duracion: " +
    roma.duracion +
    ", Pais: " +
    roma.pais +
    ", Precio: " +
    roma.precio +
    ", Nif de la Agencia: " +
    roma.nif +
    ", Direccion de la Agencia: " +
    roma.direccionCompleta() +
    ", Telefono: " +
    roma.telefono
);

listaViajes.forEach((viaje) => {
  viaje.__proto__ = agencia;
});

listaViajes.forEach((viaje) => {
  console.log(viaje);
});

/*Si miViaje es Roma, a ese Cliente se le asigna el prototipo de viaje que tambien tenga Roma como destino */

function asignaProtoRoma(arrayClientes, arrayViajes) {
  let lugarCliente;
  let lugarViaje;
  let asigna = false;
  for (let cliente in arrayClientes) {
    let c = arrayClientes[cliente];
    lugarCliente = c.miViaje;
    if (lugarCliente == "Roma") {
      for (let destino in arrayViajes) {
        let d = arrayViajes[destino];
        lugarViaje = d.destino;
        if (lugarCliente == lugarViaje) {
          c.__proto__ = d;
          asigna = true;
        }
      }
    }
  }
  return asigna;
}

console.log(asignaProtoRoma(listaClientes, listaViajes));
console.log(listaClientes);

/*Lo mismo que asignaProtoRoma pero para Burgos*/

function asignaProtoBurgos(arrayClientes, arrayViajes) {
  let lugarCliente;
  let lugarViaje;
  let asigna = false;
  for (let cliente in arrayClientes) {
    let c = arrayClientes[cliente];
    lugarCliente = c.miViaje;
    if (lugarCliente == "Burgos") {
      for (let destino in arrayViajes) {
        let d = arrayViajes[destino];
        lugarViaje = d.destino;
        if (lugarCliente == lugarViaje) {
          c.__proto__ = d;
          asigna = true;
        }
      }
    }
  }
  return asigna;
}
console.log(asignaProtoBurgos(listaClientes, listaViajes));
console.log(listaClientes);

/*Crear factura a los clientes, mostrando: nombre del cliente, destino, origen y precio del viaje y los datos de la agencia del viaje*/
function creaFactura(arrayClientes, arrayViajes) {
  let lugarCliente;
  let lugarViaje;
  let factura = "";
  let arrayFacturas = [];
  for (let cliente in arrayClientes) {
    let c = arrayClientes[cliente];
    lugarCliente = c.miViaje;
    for (let destino in arrayViajes) {
      arrayViajes[destino].__proto__ = agencia;
      let d = arrayViajes[destino];
      lugarViaje = d.destino;
      if (lugarCliente == lugarViaje) {
        c.__proto__ = d;
        factura =
          "Cliente: " +
          c.nombre +
          " " +
          c.apellido +
          ", Destino: " +
          d.destino +
          ", Origen: " +
          d.origen +
          ", Precio: " +
          d.precio +
          "€, Agencia: " +
          d.nif +
          ", " +
          d.direccionCompleta() +
          ", " +
          d.telefono;

        arrayFacturas.push(factura);
      }
    }
  }
  return arrayFacturas;
}

//console.log(creaFactura(listaClientes, listaViajes));

function creaFacturaSimple(arrayClientes, arrayViajes) {
  let factura = "";
  let arrayFacturas = [];

  for (let cliente in arrayClientes) {
    let c = arrayClientes[cliente];
    let lugarCliente = c.miViaje;

    if (lugarCliente != "") {
      for (let destino in arrayViajes) {
        let d = arrayViajes[destino];
        d.__proto__ = agencia;
        let lugarViaje = d.destino;

        if (lugarCliente == lugarViaje) {
          c.__proto__ = d;

          factura =
            "Cliente: " +
            c.nombre +
            " " +
            c.apellido +
            ", Destino: " +
            c.destino +
            ", Origen: " +
            c.origen +
            ", Precio: " +
            c.precio +
            "€, Agencia: " +
            c.nif +
            ", " +
            c.direccionCompleta() +
            ", Teléfono: " +
            c.telefono;

          arrayFacturas.push(factura);
        }
      }
    }
  }

  return arrayFacturas;
}

console.log(creaFacturaSimple(listaClientes, listaViajes));
