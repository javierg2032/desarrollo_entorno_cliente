/*const cliente = {
  nombre: "Pedro",
  apellido: "García",
  telefono: "612456789",
  ciudad: "Toledo",
};

cliente.nombre; //accedemos al nombre del cliente

const viaje = {
  origen: "Madrid",
  destino: "Roma",
  duración: "2 horas",
  pais: "Italia",
};

viaje.destino; //accedemos al destino, tiene restricciones esta forma de llamarla por ejemplo si la propiedad esta compuesta de dos palabras
viaje["origen"]; //mejor

for (let linea in viaje) {
  console.log(linea + " es " + viaje[linea]);
}

//metodo que nos de origen(valor) - destino, madrid (madrid - londres)
const viaje2 = {
  origen: "Madrid",
  destino: "Roma",
  duración: "2 horas",
  pais: "Italia",
  trayecto: function () {
    return viaje2.origen + " - " + viaje2.destino;
  },
};

viaje2.trayecto(); //te imprime: Madrid-Roma

for (let linea in viaje2) {
  console.log(linea + " es " + viaje2[linea]);
}

//Esto imprime el metodo como se declaró, ahora a continuación lo evitaremos

//Con esta forma evitaremos que salga lo de la funcion(imprime solo los valores que no tienen metodos)
for (let linea in viaje2) {
  if (typeof viaje2[linea] != "function") {
    console.log(linea + " es " + viaje2[linea]);
  }
}*/

//Constructor(para generar mas viajes)
function Viaje(origen, destino, duracion, pais, precio) {
    this.origen = origen;
    this.destino = destino;
    this.duracion = duracion;
    this.pais = pais;
    this.precio = precio;
  }
  
  /*//Creamos nuevo objeto(llamamos a la funcion con New, creamos nuevo objeto)
  const viajeNuevo = new Viaje("Sevilla", "Venecia", "3 horas", "Italia");
  
  //Creamos 5 objetos mas
  const mallorca = new Viaje("Mallorca", "Madrid", "1 hora", "España");
  const menorca = new Viaje("Menorca", "Sevilla", "1 hora", "Italia");
  const avila = new Viaje("Avila", "Toledo", "2 horas", "España");
  const cuenca = new Viaje("Cuenca", "Merida", "2 horas", "España");
  const toledo = new Viaje("Toledo", "Madrid", "1 hora", "España");
  
  delete toledo.pais; // borramos propiedad de toledo
  
  toledo.pais = "España"; // le volvemos a añadir la propiedad*/
  
  //CORREGIR
  //Hacemos constructor de cliente(anteriormente creado)
  //Si no tiene viaje que devuelva string vacio y si tiene que te lo devuelva el viaje
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
  
  /*const cliente1 = new Cliente("Luis", "Ramirez", "691234506", "Toledo", "");
  const cliente2 = new Cliente(
    "Alfonso",
    "Perez",
    "684127908",
    "Mallorca",
    "Menorca"
  );
  
  //hacer esto,corregir
  console.log(cliente1.contratado()); //imprime todo con "" donde falta el dato(miViaje)*/
  
  //crear cliente con direccion burgos
  //sabiendo que va a burgos de forma sencilla quiere ver la duracion del viaje del cliente que va a burgos
  //creo cliente3 que va a burgos y queremos saber la duracion
  
  const cliente = new Cliente("Ramón", "Pérez", "612345678", "Madrid", "");
  const burgos = new Viaje("Madrid", "Burgos", "45 minutos", "España", 16);
  
  cliente.miViaje = burgos;
  console.log("Datos del cliente: " + cliente);
  
  //Dos formas de mostrarlo:
  console.log("La duración del viaje es: " + cliente.miViaje.duracion);
  console.log("La duración del viaje es: " + cliente.contratado().duracion);
  
  //Añadir la propiedad descuento a la constante burgos:
  console.log("El precio del viaje es de: " + burgos.precio + "€");
  
  burgos.descuento = 0.2;
  
  console.log(burgos);
  
  burgos.precioDescuento = burgos.precio - burgos.precio * burgos.descuento;
  
  console.log(
    "El precio tras el descuento es de: " + burgos.precioDescuento + "€"
  );
  