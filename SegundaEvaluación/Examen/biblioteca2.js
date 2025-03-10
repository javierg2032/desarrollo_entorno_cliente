//⬇⬇ CÓDIGO REALIZADO EN EL EXAMEN ⬇⬇

/*1 - Importación de datos
Se proporcionan 3 ficheros en formato CSV que contienen:
• Datos de lectores
• Datos de libros
• Datos de préstamos
Antes de interactuar con cualquier otra sección del UI, se deberá realizar la carga de datos iniciales.
Para importar los datos, se seleccionarán los ficheros correspondientes de lectores, libros y préstamos que
se entregan como parte de este ejercicio.
Al clickar en el botón Importar, se ejecutará la importación de los 3 ficheros.
No se realizará ninguna comprobación ni corrección de la información a importar; simplemente, se
incluirá la información de los ficheros en las estructuras de datos ya creadas por el alumno.
Sólo se modificará, si es necesario, el formato de numPrestamo, numSocio y/o codLibro para que sea
compatible con el formato elegido por el alumno para estas propiedades de acuerdo al código de la
actividad ya entregado antes del examen.
Debajo del botón de su sección (Importar), una vez clickado, aparecerá un mensaje diciendo si se ha
producido algún error en la importación y cuál ha sido (texto en color rojo) o un mensaje diciendo que se
ha realizado la importación de forma exitosa (texto en color verde). El mensaje aparecerá cada vez que
se pulse el botón Importar; si se vuelve a clickar el botón de esta sección, desaparecerá este mensaje
antes de hacer otras tareas relacionadas con el click en tal botón.*/

// Recibir Fichero de Libros
document
  .getElementById("importar-boton")
  .addEventListener("click", function () {
    let seccionImportar = document.getElementById("importar");
    let mensajeExistente = document.getElementById("mensaje-importacion");

    // Si el mensaje ya existe, lo elimino antes de importar
    if (mensajeExistente) {
      mensajeExistente.remove();
    }

    const fileLibros = document.getElementById("importar-input-libros")
      .files[0];
    const fileLectores = document.getElementById("importar-input-lectores")
      .files[0];
    const filePrestamos = document.getElementById("importar-input-prestamos")
      .files[0];

    // Si no hay archivos seleccionados, salgo de la función
    if (!fileLibros && !fileLectores && !filePrestamos) {
      return;
    }

    let errorOImportacionExitosa = false;

    // Si hay un archivo de libros, lo leo y proceso
    if (fileLibros) {
      const readerLibros = new FileReader();
      readerLibros.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "libros");
      };
      readerLibros.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de libros.");
      };
      readerLibros.readAsText(fileLibros);
    }

    // Si hay un archivo de lectores, lo leo y proceso
    if (fileLectores) {
      const readerLectores = new FileReader();
      readerLectores.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "lectores");
      };
      readerLectores.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de lectores.");
      };
      readerLectores.readAsText(fileLectores);
    }

    // Si hay un archivo de lectores, lo leo y proceso
    if (filePrestamos) {
      const readerPrestamos = new FileReader();
      readerPrestamos.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "prestamos");
      };
      readerPrestamos.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de lectores.");
      };
      readerPrestamos.readAsText(filePrestamos);
    }

    // Si no hubo error, creo y muestro el mensaje de éxito
    if (!errorOImportacionExitosa) {
      mostrarMensajeExito("¡Importación Exitosa!");
    }

    // Limpio los campos de importación después de importar
    document.getElementById("importar-input-libros").value = "";
    document.getElementById("importar-input-lectores").value = "";
    document.getElementById("importar-input-prestamos").value = "";

    // Función para mostrar el mensaje de error
    function mostrarMensajeError(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-importacion";
      p.innerText = mensaje;
      p.style.color = "red";
      seccionImportar.appendChild(p);
    }

    // Función para mostrar el mensaje de éxito
    function mostrarMensajeExito(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-importacion";
      p.innerText = mensaje;
      p.style.color = "green";
      seccionImportar.appendChild(p);
    }
  });

// Procesar CSV
function processCSV(text, tipoFichero) {
  const fichero = text
    .split("\r\n") // Divido en líneas
    .slice(1) // Elimino la primera línea (encabezado)
    .map((linea) => {
      // Divido el fichero por lineas
      let celdas = linea.split(";");

      // Divido las lineas en celdas y convierto en array las filas
      return celdas.map((celda) => celda.split(",")).flat();
    });

  fichero.pop(); // Elimino la ultima linea vacia

  if (tipoFichero === "lectores") {
    for (let celda of fichero) {
      listaLectores.push(
        new Lector(celda[0], celda[1], celda[2], celda[3], celda[4])
      );
    }

    listaLectores.sort((a, b) => a.numSocio - b.numSocio); //Ordeno los lectores por el numero de socio de mayor a menor
    console.table(listaLectores);

    //Compruebo los emails y los telefonos de los lectores
    comprobarEmails(verificarEmail);
    comprobarTelefonos(verificarTelefono);

    if (listaCorreosInvalidos.length > 0) {
      console.table(listaCorreosInvalidos);
    }
    if (listaTelefonosInvalidos.length > 0) {
      console.table(listaTelefonosInvalidos);
    }
  } else if (tipoFichero === "libros") {
    for (let celda of fichero) {
      listaLibros.push(
        new Libro(celda[0], celda[1], celda[2], celda[3], celda[4], celda[5])
      );
    }
    listaLibros.sort((a, b) => a.codLibro - b.codLibro); //Ordeno los libros por el codigo de libro de mayor a menor

    console.table(listaLibros);
  } else if (tipoFichero === "prestamos") {
    for (let celda of fichero) {
      listadoPrestamos.push(
        new Prestamo(celda[0], celda[1], celda[2], celda[3], celda[4])
      );
    }
    listadoPrestamos.sort((a, b) => a.numPrestamo - b.numPrestamo);
    console.table(listadoPrestamos);
  }
}

/*2 - Gestión de eventos de entrada-salida del cursor de la sección Vista Libros
Se ha incluido en biblioteca 2.html un elemento p con id="cursor-sobre-vista-libros".
• Cuando el cursor entre en la sección Vista Libros, aparecerá en el elemento p con id="cursorsobre-vista-libros" el mensaje: “Entró en Vista Libros”.
• Cuando el cursor salga de la sección Vista Libros, aparecerá en el elemento p con id="cursorsobre-vista-libros" el mensaje: “Salío de Vista Libros”.
Se utilizarán los eventos: mouseenter (el cursor entra dentro de los límites de un elemento) y mouseleave
(el cursor sale de los límites de un elemento).*/

//Al entrar en 'vista-libros'
document
  .getElementById("vista-libros")
  .addEventListener("mouseenter", function () {
    document.getElementById("cursor-sobre-vista-libros").innerText =
      "Entró en Vista Libros"; //añadimos el texto en 'cursor-sobre-vista-libros'
  });

//Al salir de 'vista-libros'
document
  .getElementById("vista-libros")
  .addEventListener("mouseleave", function () {
    document.getElementById("cursor-sobre-vista-libros").innerText =
      "Salio de Vista Libros"; //añadimos el texto en 'cursor-sobre-vista-libros'
  });

/*3 - Tamaño y lenguaje de la ventana del navegador
Se ha incluido en biblioteca 2.html un elemento p con id="propiedades-navegador".
Se incluirá en este elemento el siguiente mensaje:
• Código del lenguaje: xx_XX.
• Alto de pantalla: xxxx pixels.
• Ancho de pantalla: xxxx pixels.
Para ello, se utilizarán las propiedades del BOM que correspondan para que la información del mensaje
anterior señale:
• El código de lenguaje configurado en el navegador
• La altura de la pantalla del usuario completa
• La anchura de la pantalla del usuario completa*/

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById(
    "propiedades-navegador"
  ).innerText = `Código del lenguaje: ${navigator.language}
  Alto de pantalla: ${screen.height} pixels
  Ancho de pantalla: ${screen.width} pixels`;
});

/*4 - Nuevo formato de teléfono del lector
En la especificación sobre la que ha trabajado el alumno, el teléfono del usuario (propiedad telefono) tiene el siguiente formato:
• Texto. Contendrá 9 cifras.
Cambiamos el formato a:
• Texto. Contendrá 9 cifras. Podrá empezar o no por “+34 ” (caracteres “+34” seguido por un espacio).
• Ejemplos del nuevo formato: “+34 687339182”, “687339182”.
Realizar los cambios necesarios para adaptar el código a este nuevo formato. */

function verificarTelefono(numeroTelefono) {
  const telefonoValido1 = /^[9|6|7][0-9]{8}$/; // Comienza por 9, 6 o 7 y tiene 8 dígitos después del primero
  const telefonoValido2 = /^\+34\s[9|6|7][0-9]{8}$/; // Contiene el prefijo +34 junto con un espacio y comienza por 9, 6 o 7 y tiene 8 dígitos después del primero

  if (
    telefonoValido1.test(numeroTelefono) ||
    telefonoValido2.test(numeroTelefono)
  ) {
    return true;
  } else {
    return false;
  }
}

/*5 - Redefinición de la estructura de datos con el listado de libros
Se creará una NUEVA estructura que contendrá el listado de todos los libros (no se cambia la actual que
ha definido en la actividad el alumno). Se creará teniendo en cuenta lo siguiente:
• Si el alumno ha definido en la actividad entregada un array de objetos como estructura para la
lista de libros: Se desarrollará una función llamada crearNuevaListaLibros que, teniendo como
argumento la estructura que ya tiene creada el alumno, devuelva una nueva estructura llamada
nuevoObjetoListaLibros que será un objeto de objetos*/

function crearNuevaListaLibros(listaLibros) {
  const nuevoObjetoListaLibros = {};
  listaLibros.forEach((libro) => {
    nuevoObjetoListaLibros[libro.codLibro] = {
      isbn: libro.isbn,
      auto: libro.autor,
      titulo: libro.titulo,
      editorial: libro.editorial,
      ejemplares: libro.ejemplares,
    };
  });
  return nuevoObjetoListaLibros;
}

/*6 – Modificación de la sección Vista Libros para incluir filtrado
En el código HTML de la sección Vista Libros se ha incluido un elemento <input type="text">
(id="vista-libros-incluye"), donde el usuario puede introducir (o no) caracteres para visualizar el listado
de libros cuyo título incluya los caracteres seleccionados. Estos caracteres pueden encontrarse en
cualquier posición del string de la propiedad titulo de cada libro.
La lista con los libros se actualizará con el filtro al clickar en el botón Actualizar Libros (id="vistalibros-boton")
Se propone utilizar el método includes() de string, aunque el alumno podrá utilizar otros mecanismos que
considere adecuados.
*/
document
  .getElementById("vista-libros-boton")
  .addEventListener("click", function () {
    //Le paso el valor que haya en "vista-libros-incluye"
    const filtro = document
      .getElementById("vista-libros-incluye")
      .value.toLowerCase();
    const tbody = document
      .getElementById("vista-libros")
      .querySelector("tbody");
    tbody.innerHTML = "";

    for (let libro of listaLibros) {
      //Añado otra comprobación a la hora de mostrar la tabla (en el titulo de cada libro comprobar si contiene
      //el valor del filtro (uso toLowerCase para que no haya problemas entre mayusculas y minusculas))
      if (!libro.bajaLibro && libro.titulo.toLowerCase().includes(filtro)) {
        //Creo filas de la tabla por cada libro, siendo cada celda los atributos de ese libro
        tbody.innerHTML += `
        <tr>
          <td>${libro.codLibro}</td>
          <td>${libro.isbn}</td>
          <td>${libro.autor}</td>
          <td>${libro.titulo}</td>
          <td>${libro.editorial}</td>
          <td>${libro.ejemplares}</td>
        </tr>`;
      }
    }

    // Estilos
    document.querySelectorAll("#vista-libros th").forEach((th) => {
      th.style.backgroundColor = "#BB61F0";
      th.style.color = "#1B1B1B";
      th.style.padding = "10px";
      th.style.outline = "1px solid #000";
    });
    document.querySelectorAll("#vista-libros td").forEach((td) => {
      td.style.backgroundColor = "#C398EB";
      td.style.color = "#1B1B1B";
      td.style.padding = "10px";
      td.style.outline = "1px solid #000";
    });
  });

/*7 - Modificación de la función solicitudPrestamo() utilizando promesas
La especificación para la función solicitudPrestamo() dice:
Un préstamo se solicita introduciendo los datos numSocio y codLibro. Se creará un nuevo
préstamo, comprobándose antes si es posible realizarlo. Condiciones para realizar el préstamo:
tanto el lector como el libro existen y no están dados de baja; hay un número de ejemplares mayor
que 0 de dicho libro.
Entrada y salida de datos:
• Entrada de datos: A través del navegador
• Salida de mensajes: A través del navegador según lo especificado en la sección
correspondiente del UI
Se rediseñará esta función utilizando Promesas.
solicitudPrestamo() contendrá 3 funciones, cada una de ellas con una promesa. Se tendrá que cumplir
una promesa para poder pasar a la siguiente. Estas funciones se llamarán desde solicitudPrestamo() de
forma asíncrona.
Estas funciones realizarán las siguientes tareas:
• comprobarLibro(): Comprobará que el libro existe, que no está dado de baja y que hay un número de ejemplares mayor que 0
• comprobarLector(): Comprobar que el lector existe y que no está dado de baja
• generarPrestamo(): Creará un préstamo
Cada vez que se haga click en el botón Préstamo, y como resultado del procesamiento del
préstamo ,aparecerá, debajo de los botones de la sección, un mensaje en un elemento p diciendo si se ha
producido algún error y cuál ha sido (texto en color rojo) o un mensaje diciendo que se ha prestado de forma
exitosa y que incluya numPrestamo y fechaPrestamo (texto en color verde); si se vuelve a clickar cualquier
botón de esta sección, desaparecerá este mensaje antes de hacer otras tareas relacionadas con tal clickado.
El alumno podrá utilizar cualquiera de las modalidades vistas en clase para el manejo de promesas:
• Métodos then(), catch(), finally()
• Async/Await*/

function solicitudPrestamo(numSocio, codLibro) {
  let seccionPrestamo = document.getElementById("devolucion-prestamo");
  let mensajeExistente = document.getElementById("mensaje-prestamo");

  // Si el mensaje ya existe, lo elimino antes de continuar
  if (mensajeExistente) {
    mensajeExistente.remove();
  }

  comprobarLibro(codLibro)
    .then(() => comprobarLector(numSocio))
    .then(() => generarPrestamo(numSocio, codLibro))
    .then((prestamo) => {
      mostrarMensajeExito(
        `¡Préstamo exitoso! Número de Préstamo: ${
          prestamo.numPrestamo
        }, Fecha de Préstamo: ${prestamo.fechaPrestamo.toLocaleDateString()}`
      );
    })
    .catch((error) => {
      mostrarMensajeError(error.message);
    });

  //Funcion para mostrar el mensaje de error
  function mostrarMensajeError(mensaje) {
    let p = document.createElement("p");
    p.id = "mensaje-prestamo";
    p.innerText = mensaje;
    p.style.color = "red";
    seccionPrestamo.appendChild(p);
  }

  //Funcion para mostrar el mensaje de exito
  function mostrarMensajeExito(mensaje) {
    let p = document.createElement("p");
    p.id = "mensaje-prestamo";
    p.innerText = mensaje;
    p.style.color = "green";
    seccionPrestamo.appendChild(p);
  }
}

function comprobarLibro(codLibro) {
  return new Promise((resolve, reject) => {
    let libro = listaLibros.find(
      (libro) => libro.codLibro === codLibro && !libro.bajaLibro
    );
    if (libro && libro.ejemplares > 0) {
      resolve();
    } else {
      reject(
        new Error("El libro no existe, esta dado de baja o no hay ejemplares")
      );
    }
  });
}

function comprobarLector(numSocio) {
  return new Promise((resolve, reject) => {
    let lector = listaLectores.find(
      (lector) => lector.numSocio === numSocio && !lector.bajaLector
    );
    if (lector) {
      resolve();
    } else {
      reject(new Error("El lector no existe o esta dado de baja"));
    }
  });
}

function generarPrestamo(numSocio, codLibro) {
  return new Promise((resolve, reject) => {
    if (prestamoLibro(codLibro)) {
      let numeroPrestamo =
        listadoPrestamos.length > 0
          ? listadoPrestamos[listadoPrestamos.length - 1].numPrestamo + 1
          : 1;
      let nuevoPrestamos = new Prestamo(numeroPrestamo, numSocio, codLibro);
      listadoPrestamos.push(nuevoPrestamo);
      listadoPrestamosVivos.push(nuevoPrestamo);
      resolve(nuevoPrestamo);
    } else {
      reject(new Error("No se pudo realizar el préstamo."));
    }
  });
}

//⬆⬆ CÓDIGO REALIZADO EN EL EXAMEN ⬆⬆

//⬇⬇ CÓDIGO DEL EJERCICIO ENTREGADO ⬇⬇

//Constructor Lector
function Lector(numSocio, nombre, apellido, telefono, email) {
  this.numSocio = numSocio;
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
  this.email = email;
}

//Constructor Libro
function Libro(codLibro, isbn, autor, titulo, editorial, ejemplares) {
  this.codLibro = codLibro;
  this.isbn = isbn;
  this.autor = autor;
  this.titulo = titulo;
  this.editorial = editorial;
  this.ejemplares = ejemplares;
}

//Constructor Prestamo
function Prestamo(numPrestamo, numSocio, codLibro) {
  this.numPrestamo = numPrestamo;
  this.numSocio = numSocio;
  this.codLibro = codLibro;
  this.fechaPrestamo = new Date();
}

//Listado Lectores
const listaLectores = [];

//Listado Libros
const listaLibros = [];

//Listado Correos Invalidos
const listaCorreosInvalidos = [];

//Listado Telefonos Invalidos
const listaTelefonosInvalidos = [];

//Listado Dominios Validos
const listaDominiosValidos = ["es", "com", "org", "net", "eu"];

//Listado Prestamos Total
const listadoPrestamos = [];

//Listado Prestamos Vivos
const listadoPrestamosVivos = [];

//Funciones de Lector
function altaLector() {
  /*La función devolverá:
    numSocio – Si el alta ha sido correcta
    F – Si falta algún dato
    V – Si hay algún dato con formato incorrecto*/
  //numSocio debe generarse automaticamente sin repetirse con algun numSocio existente
  let resultado = "F"; //Inicializo el resultado a F
  let numSocio =
    parseInt(listaLectores[listaLectores.length - 1].numSocio) +
    1; /*Convierto el numero de socio del ultimo indice del array en un entero 
  para porder sumarle 1 de forma que el numero de socio sea el siguiente al ultimo*/
  let nombre = prompt("Introduce el nombre:");
  let apellido = prompt("Introduce el apellido:");
  let telefono = prompt("Introduce el teléfono:");
  let email = prompt("Introduce el email:");
  numSocio =
    numSocio.toString(); /*Convierto de nuevo el numero de socio en una cadena de texto para que cumpla con los requisitos del enunciado*/

  if (nombre != "" && apellido != "" && telefono != "" && email != "") {
    if (
      verificarEmail(email) &&
      verificarTelefono(telefono) &&
      verificarNombreApellidoAutorEditorial(nombre) &&
      verificarNombreApellidoAutorEditorial(apellido)
    ) {
      listaLectores.push(
        new Lector(numSocio, nombre, apellido, telefono, email)
      );
      console.log("Lector añadido correctamente");
      resultado = numSocio;
      console.log(listaLectores);
    } else {
      console.log(
        "No se ha podido añadir el lector debido a que el email o el teléfono no son válidos"
      );
      resultado = "V";
    }
  }
  return resultado;
}

function bajaLector(numeroSocio) {
  let numeroSocioString = numeroSocio.toString();
  let estadoBaja = false;
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocioString) {
      listaLectores[lector].bajaLector = true;
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, "0"); //padStart indica la longitud que debe tener y en caso de ser menor, añade un 0 a la izquierda
      const mes = String(fecha.getMonth() + 1).padStart(2, "0"); //en javascript los meses empiezan en 0, por eso le sumo 1
      const anyo = fecha.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anyo}`;
      listaLectores[lector].fechaBaja = fechaFormateada;
      estadoBaja = true;
      break;
    }
  }
  if (estadoBaja == true) {
    alert("Lector dado de baja correctamente");
    console.table(listaLectores);
  } else {
    alert("El número de socio introducido no coincide con el de ningún lector");
  }
}

function modifLector(numeroSocio) {
  // Compruebo si el numSocio existe en la lista de lectores
  let existeSocio = false;
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocio) {
      existeSocio = true; // Si existe, marco la bandera
      break;
    }
  }

  if (!existeSocio) {
    alert("El número de socio no existe.");
    return; // Salgo de la función si no existe el numSocio
  }

  let datoAModificar = prompt("Introduce el dato a modificar");

  switch (datoAModificar) {
    case "numSocio":
      let numSocio = prompt("Introduce el nuevo numSocio:");

      // Compruebo si el numSocio ya existe
      let existe = false;
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numSocio) {
          existe = true; // Si ya existe, marco la bandera
          break;
        }
      }

      if (existe) {
        alert("El número de socio ya existe");
      } else {
        // Si no existe, cambio el numSocio del lector correspondiente
        for (let lector in listaLectores) {
          if (listaLectores[lector].numSocio == numeroSocio) {
            listaLectores[lector].numSocio = numSocio;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      }
      break;

    case "nombre":
      let nombre = prompt("Introduce el nuevo nombre:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarNombreApellidoAutorEditorial(nombre)) {
            listaLectores[lector].nombre = nombre;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del nombre no es valido");
            break;
          }
        }
      }
      break;

    case "apellido":
      let apellido = prompt("Introduce el nuevo apellido:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarNombreApellidoAutorEditorial(apellido)) {
            listaLectores[lector].apellido = apellido;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del apellido no es valido");
            break;
          }
        }
      }
      break;

    case "telefono":
      let telefono = prompt("Introduce el nuevo teléfono:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarTelefono(telefono)) {
            listaLectores[lector].telefono = telefono;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del telefono no es valido");
            break;
          }
        }
      }
      break;

    case "email":
      let email = prompt("Introduce el nuevo email:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarEmail(email)) {
            listaLectores[lector].email = email;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del email no es valido");
            break;
          }
        }
      }
      break;

    default:
      alert("Dato no válido.");
      return;
  }

  listaLectores.sort((a, b) => a.numSocio - b.numSocio);
}

//COMPROBACIONES LECTOR

// Función para comprobar el email
//Implemento un Callback siguiendo la teoria vista en clase
function comprobarEmails(verificarEmail) {
  /*Compruebo si el lector existe para añadirlo a la lista de email invalidos, si no existe 
    (es decir que se esta llamando a la función a la hora de dar de alta un nuevo lector) 
    no lo añado a la lista de no validos (debido a que si algun campo a la hora de dar de alta un cliente es erroneo, no deberia poder crearse)*/
  for (let lector in listaLectores) {
    if (!verificarEmail(listaLectores[lector].email)) {
      listaCorreosInvalidos.push({
        numSocio: listaLectores[lector].numSocio, //Creo una propiedad en un objeto con una clave específica y le asigno el valor del Lector correspondiente
        nombre: listaLectores[lector].nombre,
        apellido: listaLectores[lector].apellido,
        telefono: listaLectores[lector].telefono,
        email: listaLectores[lector].email,
      });
    }
  }
}

// Función para comprobar el teléfono
function comprobarTelefonos(verificarTelefono) {
  /*Compruebo si el lector existe para añadirlo a la lista de telefonos invalidos, si no existe 
    (es decir que se esta llamando a la función a la hora de dar de alta un nuevo lector) 
   no lo añado a la lista de no validos (debido a que si algun campo a la hora de dar de alta un cliente es erroneo, no deberia poder crearse)*/
  for (let lector in listaLectores) {
    if (!verificarTelefono(listaLectores[lector].telefono)) {
      listaTelefonosInvalidos.push({
        numSocio: listaLectores[lector].numSocio,
        nombre: listaLectores[lector].nombre,
        apellido: listaLectores[lector].apellido,
        telefono: listaLectores[lector].telefono,
        email: listaLectores[lector].email,
      });
    }
  }
}

//VERIFICACIONES LECTOR

function verificarEmail(direccionEmail) {
  const dominios = listaDominiosValidos.join("|"); /*es|com|org|net|eu*/
  const emailValido = new RegExp(
    `^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.(${dominios}))+$`
  );

  if (!emailValido.test(direccionEmail)) {
    /*En caso de que emailValido sea false (no coinciden los requisitos de emailLector con la expresion regular de emailValido)*/
    return false;
  } else {
    return true;
  }
}

//⬇⬇ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬇⬇
/*
function verificarTelefono(numeroTelefono) {
  const telefonoValido = /^[9|6|7][0-9]{8}$/; // Comienza por 9, 6 o 7 y tiene 8 dígitos despues del primero
  if (!telefonoValido.test(numeroTelefono)) {
    return false;
  } else {
    return true;
  }
}*/

//⬆⬆ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬆⬆

//FUNCIONES DE LIBRO
function altaLibro(
  isbnLibro,
  autorLibro,
  tituloLibro,
  editorialLibro,
  numeroEjemplares
) {
  let codLibro =
    parseInt(listaLibros[listaLibros.length - 1].codLibro) +
    1; /*Convierto el código de libro del último índice del array en un entero 
    para poder sumarle 1 de forma que el código de libro sea el siguiente al último*/

  let isbn = isbnLibro;
  let autor = autorLibro;
  let titulo = tituloLibro;
  let editorial = editorialLibro;
  let ejemplares = parseInt(numeroEjemplares); //Convierto el número de ejemplares en un entero

  codLibro =
    codLibro.toString(); /*Convierto de nuevo el código de libro en una cadena de texto para que cumpla con los requisitos del enunciado*/

  // Verifico que ninguno de los datos esté vacío
  if (
    isbn != "" &&
    autor != "" &&
    titulo != "" &&
    editorial != "" &&
    ejemplares != ""
  ) {
    ejemplares = parseInt(ejemplares); // Convierto el número de ejemplares a entero

    // Verifico el formato de cada dato
    if (
      verificarISBN(isbn) &&
      verificarNombreApellidoAutorEditorial(autor) &&
      verificarTitulo(titulo) &&
      verificarNombreApellidoAutorEditorial(editorial) &&
      verificarEjemplares(ejemplares)
    ) {
      // Compruebo si el libro ya existe en la lista
      let existe = listaLibros.some((libro) => libro.isbn === isbn); // Uso some() para verificar si ya hay un libro con el mismo ISBN

      if (existe) {
        alert("El libro con este ISBN ya existe"); // Muestro un mensaje de alerta si el libro ya está en la lista
      } else {
        listaLibros.push(
          new Libro(codLibro, isbn, autor, titulo, editorial, ejemplares)
        ); // Si el libro no existe, lo agrego a la lista
      }
    } else {
      alert("Algún dato tiene un formato incorrecto"); // Muestro un mensaje de error si algún dato tiene un formato inválido
    }
  } else {
    alert("Faltan datos por introducir"); // Muestro un mensaje de error si algún campo está vacío
  }
}

function bajaLibro() {
  codigoLibro = prompt("Introduce el codigo del libro:");
  let codigoLibroString = codigoLibro.toString();
  let estadoBaja = false;
  for (let libro in listaLibros) {
    if (listaLibros[libro].codLibro == codigoLibroString) {
      listaLibros[libro].bajaLibro = true;
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, "0"); //padStart indica la longitud que debe tener y en caso de ser menor, añade un 0 a la izquierda
      const mes = String(fecha.getMonth() + 1).padStart(2, "0"); //en javascript los meses empiezan en 0, por eso le sumo 1
      const anyo = fecha.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anyo}`;
      listaLibros[libro].fechaBaja = fechaFormateada;
      estadoBaja = true;
      break;
    }
  }
  if (estadoBaja == true) {
    console.log("Libro dado de baja correctamente");
    console.table(listaLectores);
  } else {
    console.log(
      "El código de libro introducido no coincide con el de ningún libro"
    );
  }
}

function modifLibro(codigoLibro) {
  // Compruebo si el codLibro existe en la lista de libros
  let existeLibro = false;
  for (let libro in listaLibros) {
    if (listaLibros[libro].codLibro == codigoLibro) {
      existeLibro = true;
      break;
    }
  }

  if (!existeLibro) {
    alert("El código de libro no existe.");
    return; // Salgo de la función si no existe el codLibro
  }

  let datoAModificar = prompt("Introduce el dato a modificar");

  switch (datoAModificar) {
    case "codLibro":
      let codLibro = prompt("Introduce el nuevo código de libro:");

      // Compruebo si el codLibro ya existe
      let existe = false;
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codLibro) {
          existe = true;
          break;
        }
      }
      if (existe) {
        alert("El código de libro ya existe");
      } else {
        // Si no existe, cambio el codLibro del libro correspondiente
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].codLibro = codLibro;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      }
      break;

    case "isbn":
      let isbn = prompt("Introduce el nuevo isbn:");
      if (verificarISBN(isbn)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].isbn = isbn;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato del ISBN no es valido");
      }
      break;

    case "autor":
      let autor = prompt("Introduce el nuevo autor:");
      if (verificarNombreApellidoAutorEditorial(autor)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].autor = autor;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato del autor no es valido");
      }
      break;

    case "titulo":
      let titulo = prompt("Introduce el nuevo título:");
      if (verificarTitulo(titulo)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].titulo = titulo;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato del título no es válido");
      }
      break;

    case "editorial":
      let editorial = prompt("Introduce la nueva editorial:");
      if (verificarNombreApellidoAutorEditorial(editorial)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].editorial = editorial;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato de la editorial no es válido");
      }
      break;

    case "ejemplares":
      let ejemplares = prompt("Introduce el nuevo número de ejemplares:");
      ejemplares = parseInt(ejemplares);

      // Validación para el número de ejemplares
      if (verificarEjemplares(ejemplares)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].ejemplares = ejemplares;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log(
          "El número de ejemplares debe ser mayor o igual a 0 y menor o igual a 9."
        );
      }
      break;

    default:
      console.log("Dato no válido.");
      return;
  }

  listaLibros.sort((a, b) => a.codLibro - b.codLibro); // Ordeno la lista de libros por código
}

function hayLibro(codLibroOIsbn) {
  for (let libro of listaLibros) {
    if (
      (libro.codLibro === codLibroOIsbn || libro.isbn === codLibroOIsbn) &&
      !libro.bajaLibro
    ) {
      return true; // Si encuentro el libro (bien sea por el Código del libro o por el ISBN) y no está dado de baja, devuelvo true
    }
  }
  return false; // Si no encuentro el libro o está dado de baja, devuelvo false
}

function prestamoLibro(codigoLibro) {
  let prestado = false;

  // Verifico si el libro existe y no está dado de baja
  if (!hayLibro(codigoLibro)) {
    alert(
      "El libro con el código proporcionado no existe o está dado de baja."
    );
    return prestado;
  }

  // Recorro la lista de libros para buscar el libro con el código proporcionado
  for (let libro of listaLibros) {
    if (libro.codLibro == codigoLibro) {
      if (libro.ejemplares > 0) {
        // Si hay ejemplares disponibles, hago el préstamo
        libro.ejemplares = parseInt(libro.ejemplares) - 1; // Resto 1 al número de ejemplares
        libro.ejemplares = libro.ejemplares.toString(); // Aseguro que el valor vuelva a ser cadena de texto
        prestado = true; // Indico que el préstamo fue exitoso
        break; // Salgo del bucle porque ya se ha procesado el préstamo
      } else {
        alert(
          "No hay suficientes ejemplares disponibles para realizar el préstamo"
        );
        break; // Salgo del bucle si no hay ejemplares disponibles
      }
    }
  }

  return prestado; // Devuelvo true si se prestó el libro, o false en caso contrario
}

function devolucionLibro(codLibro) {
  // Verifico si el libro existe y no está dado de baja
  if (!hayLibro(codLibro)) {
    return false; // Devuelvo false si el libro no existe o está dado de baja
  }

  // Recorro la lista de libros para buscar el libro con el código proporcionado
  for (let libro of listaLibros) {
    if (libro.codLibro == codLibro) {
      // Aumento el número de ejemplares disponibles
      libro.ejemplares = parseInt(libro.ejemplares) + 1;
      libro.ejemplares = libro.ejemplares.toString(); // Aseguro que el valor vuelva a ser cadena de texto
      return true; // Devuelvo true si se encontró el libro y se aumentaron los ejemplares
    }
  }

  return false; // Devuelvo false si no se encontró el libro
}

function dondeLibro() {
  let codLibro = prompt("Introduce el código del libro:");

  // Verifico si el libro existe y no está dado de baja
  if (!hayLibro(codLibro)) {
    console.log(
      "El libro con el código proporcionado no existe o está dado de baja."
    );
    return;
  }

  // Defino la ubicación fija para los libros de manga
  const ubicacion = {
    pasillo: 7,
    estanteria: 4,
    estante: 6,
  };

  console.log(
    `El libro con código ${codLibro} se encuentra en el pasillo ${ubicacion.pasillo}, estantería ${ubicacion.estanteria}, estante ${ubicacion.estante}.`
  );
}

//FUNCIONES PRESTAMO

function listadoTotalPrestamos() {
  // Compruebo si no hay préstamos registrados
  if (listadoPrestamos.length === 0) {
    console.log("No hay préstamos registrados.");
    return;
  }

  // Recorro la lista de todos los préstamos
  for (let prestamo of listadoPrestamos) {
    // Creo una cadena con la información del préstamo
    let infoPrestamo = `Número de Préstamo: ${
      prestamo.numPrestamo
    }, Número de Socio: ${prestamo.numSocio}, Código de Libro: ${
      prestamo.codLibro
    }, Fecha de Préstamo: ${prestamo.fechaPrestamo.toLocaleDateString()}`;

    // Si el préstamo tiene fecha de devolución, la añado a la cadena
    if (prestamo.fechaDevolucion) {
      infoPrestamo += `, Fecha de Devolución: ${prestamo.fechaDevolucion.toLocaleDateString()}`;
    } else {
      // Si no tiene fecha de devolución, indico que el préstamo está vivo
      infoPrestamo += `, Estado: Vivo`;
    }

    // Muestro la información del préstamo en la consola
    console.log(infoPrestamo);
  }

  // Muestro el array completo de préstamos en la consola
  console.log(listadoPrestamos);
}
//⬇⬇ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬇⬇

/*function solicitudPrestamo(codLibro, numSocio) {
  if (!hayLibro(codLibro)) {
    alert(
      "El libro con el código proporcionado no existe o está dado de baja."
    );
    return;
  }

  let lectorExiste = listaLectores.some(
    (lector) => lector.numSocio == numSocio && !lector.bajaLector
  );
  if (!lectorExiste) {
    alert(
      "El lector con el número de socio proporcionado no existe o está dado de baja."
    );
    return;
  }

  if (prestamoLibro(codLibro)) {
    let numeroPrestamo =
      listadoPrestamos.length > 0
        ? listadoPrestamos[listadoPrestamos.length - 1].numPrestamo + 1
        : 1;
    listadoPrestamos.push(new Prestamo(numeroPrestamo, numSocio, codLibro));
    listadoPrestamosVivos.push(
      new Prestamo(numeroPrestamo, numSocio, codLibro)
    );
    alert(
      `¡Préstamo exitoso! Número de Préstamo: ${numeroPrestamo}, Fecha de Préstamo: ${new Date().toLocaleDateString()}`
    );
  } else {
    alert("No se pudo realizar el préstamo.");
  }
}*/

//⬆⬆ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬆⬆
function devolucionPrestamos(codLibro, numPrestamo) {
  if (!devolucionLibro(codLibro)) {
    alert(
      "El libro con el código proporcionado no existe o está dado de baja."
    );
    return;
  }

  let prestamoEncontrado = false;
  for (let prestamo of listadoPrestamos) {
    if (prestamo.numPrestamo == numPrestamo && prestamo.codLibro == codLibro) {
      prestamo.fechaDevolucion = new Date();
      prestamoEncontrado = true;
      break;
    }
  }

  if (prestamoEncontrado) {
    listadoPrestamosVivos = listadoPrestamosVivos.filter(
      (prestamo) => prestamo.numPrestamo != numPrestamo
    );
    alert(
      `¡Devolución exitosa! Número de Préstamo: ${numPrestamo}, Fecha de Devolución: ${new Date().toLocaleDateString()}`
    );
  } else {
    alert("No se encontró el préstamo con el número proporcionado.");
  }
}

//VERIFICACIONES
function verificarNombreApellidoAutorEditorial(texto) {
  const datoValido = /^[a-zA-ZáéíóúÁÉÍÓÚ]+(-[a-zA-ZáéíóúÁÉÍÓÚ]+)?$/; //Compruebo que este compuesta por una o dos palabras separadas
  // por un guion, que esta compuesto por cualquier letra (tanto Mayúsculas como Minúsculas) y que las vocales puedan tener acentos
  return datoValido.test(texto); //Devuelvo el resultado de comprobar si el texto que se le da a la funcion cumple los requisitos de nombreApellidoValido
}

function verificarISBN(texto) {
  const isbnValido = /^\d{13}$/; // Debe contener exactamente 13 dígitos
  return isbnValido.test(texto); //Devuelvo el resultado de comprobar si el texto que se le da a la funcion cumple los requisitos de verificarISBN
}

function verificarTitulo(texto) {
  const tituloValido = /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s\-_¡!@#$%&/()¿?€.,:;]+$/; // Compruebo que el título está compuesto por letras (mayúsculas y minúsculas),
  // números y los caracteres imprimibles permitidos y espacios (\s)
  return tituloValido.test(texto);
}

function verificarEjemplares(ejemplares) {
  const ejemplaresValido = /^[0-9]$/; // Valores posibles del 0 al 9
  return ejemplaresValido.test(ejemplares.toString()); //Devuelve si es valido el valor en formato texto
}

//INTERACCIONES CON EL DOM:
//VISTA LIBROS

//⬇⬇ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬇⬇
/*
document
  .getElementById("vista-libros-boton")
  .addEventListener("click", function () {
    const tbody = document
      .getElementById("vista-libros")
      .querySelector("tbody");
    tbody.innerHTML = "";
    for (let libro of listaLibros) {
      if (!libro.bajaLibro) {
        tbody.innerHTML += `
          <tr>
            <td>${libro.codLibro}</td>
            <td>${libro.isbn}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
            <td>${libro.editorial}</td>
            <td>${libro.ejemplares}</td>
          </tr>`;
      }
    }
    // Estilos
    document.querySelectorAll("#vista-libros th").forEach((th) => {
      th.style.backgroundColor = "#BB61F0";
      th.style.color = "#1B1B1B";
      th.style.padding = "10px";
      th.style.outline = "1px solid #000";
    });
    document.querySelectorAll("#vista-libros td").forEach((td) => {
      td.style.backgroundColor = "#C398EB";
      td.style.color = "#1B1B1B";
      td.style.padding = "10px";
      td.style.outline = "1px solid #000";
    });
  });*/

//⬆⬆ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬆⬆

//VISTA LECTORES

document
  .getElementById("comprobar-lectores-boton")
  .addEventListener("click", function () {
    const tbody = document
      .getElementById("comprobar-lectores-tabla")
      .querySelector("tbody");
    tbody.innerHTML = "";
    for (let lector of listaLectores) {
      if (!lector.bajaLector) {
        tbody.insertAdjacentHTML(
          "beforeend",
          `<tr>
            <td style="background-color: #C398EB;">${lector.numSocio}</td>
            <td style="background-color: #C398EB;">${lector.nombre}</td>
            <td style="background-color: #C398EB;">${lector.apellido}</td>
            <td style="background-color: ${
              verificarTelefono(lector.telefono) ? "#C398EB" : "#EA9E90"
            };">${lector.telefono}</td>
            <td style="background-color: ${
              verificarEmail(lector.email) ? "#C398EB" : "#EA9E90"
            };">${lector.email}</td>
          </tr>`
        );
      }
    }

    // Estilos generales de la tabla
    document.querySelectorAll("#comprobar-lectores-tabla th").forEach((th) => {
      th.style.backgroundColor = "#BB61F0";
      th.style.color = "#1B1B1B";
      th.style.padding = "10px";
      th.style.outline = "1px solid #000";
    });
    document.querySelectorAll("#comprobar-lectores-tabla td").forEach((td) => {
      td.style.color = "#1B1B1B";
      td.style.padding = "10px";
      td.style.outline = "1px solid #000";
    });
  });

//ALTA LIBRO

document
  .getElementById("alta-libro-boton")
  .addEventListener("click", function () {
    let seccionAlta = document.getElementById("alta-libro");
    let mensajeExistente = document.getElementById("mensaje-alta");

    // Si el mensaje ya existe, lo elimino antes de continuar
    if (mensajeExistente) {
      mensajeExistente.remove();
    }

    let isbn = document.getElementById("alta-libro-isbn").value;
    let autor = document.getElementById("alta-libro-autor").value;
    let titulo = document.getElementById("alta-libro-titulo").value;
    let editorial = document.getElementById("alta-libro-editorial").value;
    let ejemplares = document.getElementById("alta-libro-ejemplares").value;

    try {
      altaLibro(isbn, autor, titulo, editorial, ejemplares);
      mostrarMensajeExito("¡Alta de libro exitosa!");
      // Limpio los campos del formulario
      document.getElementById("alta-libro-isbn").value = "";
      document.getElementById("alta-libro-autor").value = "";
      document.getElementById("alta-libro-titulo").value = "";
      document.getElementById("alta-libro-editorial").value = "";
      document.getElementById("alta-libro-ejemplares").value = "";
    } catch (error) {
      mostrarMensajeError(error.message);
    }

    // Función para mostrar el mensaje de error
    function mostrarMensajeError(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-alta";
      p.innerText = mensaje;
      p.style.color = "red";
      seccionAlta.appendChild(p);
    }

    // Función para mostrar el mensaje de éxito
    function mostrarMensajeExito(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-alta";
      p.innerText = mensaje;
      p.style.color = "green";
      seccionAlta.appendChild(p);
    }
  });

//Devolución/Préstamo de libros

//⬇⬇ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬇⬇

document
  .getElementById("prestamo-boton")
  .addEventListener("click", function () {
    let seccionPrestamo = document.getElementById("prestamo");
    let mensajeExistente = document.getElementById("mensaje-prestamo");

    // Si el mensaje ya existe, lo elimino antes de continuar
    if (mensajeExistente) {
      mensajeExistente.remove();
    }

    let codLibro = document.getElementById("codigo-libro-prestamo").value;
    let numSocio = document.getElementById("numero-socio-prestamo").value;

    try {
      solicitudPrestamo(codLibro, numSocio);
      mostrarMensajeExito(
        `¡Préstamo exitoso! Número de Préstamo: ${numPrestamo}, Fecha de Préstamo: ${new Date().toLocaleDateString()}`
      );
    } catch (error) {
      mostrarMensajeError(error.message);
    }

    // Función para mostrar el mensaje de error
    function mostrarMensajeError(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-prestamo";
      p.innerText = mensaje;
      p.style.color = "red";
      seccionPrestamo.appendChild(p);
    }

    // Función para mostrar el mensaje de éxito
    function mostrarMensajeExito(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-prestamo";
      p.innerText = mensaje;
      p.style.color = "green";
      seccionPrestamo.appendChild(p);
    }
  });
//⬆⬆ CÓDIGO COMENTADO PARA QUE NO CHOQUE CON EL CAMBIO DEL EXAMEN ⬆⬆

document
  .getElementById("devolucion-boton")
  .addEventListener("click", function () {
    let seccionDevolucion = document.getElementById("devolucion");
    let mensajeExistente = document.getElementById("mensaje-devolucion");

    // Si el mensaje ya existe, lo elimino antes de continuar
    if (mensajeExistente) {
      mensajeExistente.remove();
    }

    let codLibro = document.getElementById("codigo-libro-devolucion").value;
    let numPrestamo = document.getElementById(
      "numero-prestamo-devolucion"
    ).value;

    try {
      devolucionPrestamos(codLibro, numPrestamo);
      mostrarMensajeExito(
        `¡Devolución exitosa! Número de Préstamo: ${numPrestamo}, Fecha de Devolución: ${new Date().toLocaleDateString()}`
      );
    } catch (error) {
      mostrarMensajeError(error.message);
    }

    // Función para mostrar el mensaje de error
    function mostrarMensajeError(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-devolucion";
      p.innerText = mensaje;
      p.style.color = "red";
      seccionDevolucion.appendChild(p);
    }

    // Función para mostrar el mensaje de éxito
    function mostrarMensajeExito(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-devolucion";
      p.innerText = mensaje;
      p.style.color = "green";
      seccionDevolucion.appendChild(p);
    }
  });
