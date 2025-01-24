//Recibir Fichero
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Archivo seleccionado por el usuario
    const reader = new FileReader(); // Lector de archivos

    reader.onload = function (e) {
      const text = e.target.result; // Contenido del archivo
      processCSV(text); // Procesar el contenido del archivo
    };

    reader.readAsText(file); // Leer el archivo como texto
  });

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

//Constructor Listado Lectores
function ListaLectores(Lector) {
  this.Lector = Lector;
}

//Constructor Listado Lectores
function ListaLibros(Libro) {
  this.Libro = Libro;
}

//Listado Correos Invalidos
const listaCorreosInvalidos = [];

//Listado Telefonos Invalidos
const listaTelefonosInvalidos = [];

//Listado Dominios Validos
const listaDominiosValidos = ["es", "com", "org", "net", "eu"];

// Procesar CSV
function processCSV(text) {
  let tipoFichero = prompt(
    "¿El fichero que vas a introducir es el de los lectores?"
  );

  const fichero = text
    .split("\r\n") // Divido en líneas
    .slice(1) // Elimino la primera línea (encabezado)
    .map((linea) => {
      // Divido el fichero por lineas
      let celdas = linea.split(";");

      // Divido las lineas en celdas y convierto en array las filas
      return celdas.map((celda) => celda.split(",")).flat();
    });

  fichero.pop(); //Elimino la ultima linea vacia

  if (tipoFichero.toLowerCase() === "si") {
    for (let celda of fichero) {
      
      new ListaLectores(
        new Lector(celda[0], celda[1], celda[2], celda[3], celda[4])
      );
    }
    /*console.log(fichero);*/
    console.log(ListaLectores);
  } else {
    for (let celda of fichero) {
      new ListaLectores(
        new Libro(celda[0], celda[1], celda[2], celda[3], celda[4], celda[5])
      );
    }
    /*console.log(fichero);*/
    console.log(ListaLibros);
  }
}
/*
//Funciones de Lector
function altaLector() {
  let numSocio = prompt("Introduce el número de socio:");
  let nombre = prompt("Introduce el nombre:");
  let apellido = prompt("Introduce el apellido:");
  let telefono = prompt("Introduce el teléfono:");
  let email = prompt("Introduce el email:");

  if (
    numSocio != "" &&
    nombre != "" &&
    apellido != "" &&
    telefono != "" &&
    email != ""
  ) {
    if (
      comprobarEmail(email, nombre, apellido) &&
      comprobarTelefono(telefono, nombre, apellido)
    ) {
      listaLectores.push(
        new Lector(numSocio, nombre, apellido, telefono, email)
      );
      alert("Lector añadido correctamente");
    } else {
      alert(
        "No se ha podido añadir el lector debido a que el email o el teléfono no son válidos"
      );
    }
  }
}

function bajaLector(numeroSocio) {
  let numeroSocioString = numeroSocio.toString();
  let estadoBaja = false;
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocioString) {
      listaLectores[lector].bajaLector = true;
      listaLectores[lector].fechaBaja = new Date();
      estadoBaja = true;
      break;
    }
  }
  if (estadoBaja == true) {
    alert("Lector dado de baja correctamente");
  } else {
    alert("El número de socio introducido no coincide con el de ningún lector");
  }
}

// Función para comprobar el email
function comprobarEmail(emailLector, nombreLector, apellidoLector) {
  const dominios = listaDominiosValidos.join("|");
  const emailValido = new RegExp(
    `^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.(${dominios}))+$`
  );

  if (!emailValido.test(emailLector)) {
    alert("Dirección de email inválida");
    listaCorreosInvalidos.push({ nombreLector, apellidoLector, emailLector });
    return false;
  }
  return true;
}

// Función para comprobar el teléfono
function comprobarTelefono(telefonoLector, nombreLector, apellidoLector) {
  const telefonoValido = /^[9|6|7][0-9]{8}$/; // Comienza por 9, 6 o 7 y tiene 8 dígitos despues del primero

  if (!telefonoValido.test(telefonoLector)) {
    alert("Número de teléfono inválido");
    listaCorreosInvalidos.push({
      nombreLector,
      apellidoLector,
      telefonoLector,
    });
    return false;
  }
  return true;
}

function modifLector(numeroSocio) {
  let datoAModificar = prompt("Introduce el dato a modificar");
  switch (datoAModificar) {
    case "numSocio":
      let numSocio = prompt("Introduce el nombre:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          for (let lector in listaLectores) {
            if (listaLectores[lector].numSocio == numeroSocio) {
              alert("El número de socio ya existe");
            } else {
              listaLectores[lector].numSocio = numSocio;
            }
          }
        }
      }
      break;
    case "nombre":
      let nombre = prompt("Introduce el nombre:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].nombre = nombre;
        }
      }
      break;
    case "apellido":
      let apellido = prompt("Introduce el apellido:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].apellido = apellido;
        }
      }
      break;
    case "telefono":
      let telefono = prompt("Introduce el telefono:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].telefono = telefono;
        }
      }
      break;
    case "email":
      let email = prompt("Introduce el email:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].email = email;
        }
      }
      break;
  }
  alert("Lector modificado correctamente");
}

//Funciones de Libro
function altaLibro() {
  let codLibro = prompt("Introduce el codigo del libro:");
  let isbn = prompt("Introduce el isbn:");
  let autor = prompt("Introduce el autor:");
  let titulo = prompt("Introduce el titulo:");
  let editorial = prompt("Introduce la editorial:");
  let ejemplares = prompt("Introduce los ejemplares:");

  if (
    codLibro != "" &&
    isbn != "" &&
    autor != "" &&
    titulo != "" &&
    editorial != "" &&
    ejemplares != ""
  ) {
    listaLibros.push(
      new Libro(codLibro, isbn, autor, titulo, editorial, ejemplares)
    );
    alert("Libro añadido correctamente");
  }
}

function bajaLibro(codigoLibro) {
  for (let libro in listaLibros) {
    if (listaLibros[libro].codLibro == codigoLibro) {
      listaLibros[libro].bajaLibro = true;
      listaLibros[libro].fechaBaja = new Date();
    } else {
      alert(
        "El código de libro introducido no coincide con el de ningún libro"
      );
    }
  }
}

function modifLibro(codigoLibro) {
  let datoAModificar = prompt("Introduce el dato a modificar");
  switch (datoAModificar) {
    case "codLibro":
      let codLibro = prompt("Introduce el codigo de libro:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          for (let libro in listaLibros) {
            if (listaLibros[libro].codLibro == codigoLibro) {
              alert("El código de libro ya existe");
            } else {
              listaLibros[libro].codLibro = codLibro;
            }
          }
        }
      }
      break;
    case "isbn":
      let isbn = prompt("Introduce el isbn:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].isbn = isbn;
        }
      }
      break;
    case "autor":
      let autor = prompt("Introduce el autor:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].autor = autor;
        }
      }
      break;
    case "titulo":
      let titulo = prompt("Introduce el titulo:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].titulo = titulo;
        }
      }
      break;
    case "editorial":
      let editorial = prompt("Introduce el editorial:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].editorial = editorial;
        }
      }
      break;

    case "ejemplares":
      let ejemplares = prompt("Introduce el ejemplares:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].ejemplares = ejemplares;
        }
      }
      break;
  }
  alert("Libro modificado correctamente");
}

function hayLibro(codigoIsbn, nombreAutor, tituloLibro) {
  for (let libro in listaLibros) {
    if (
      listaLibros[libro].isbn == codigoIsbn &&
      listaLibros[libro].autor == nombreAutor &&
      listaLibros[libro].titulo == tituloLibro
    ) {
      return isbn + nombre + autor + titulo + ejemplares;
    } else return Error;
  }
}

/*function prestamoLibro(codigoIsbn) {
  for (let libro in listaLibros) {
    if (listaLibros[libro].isbn == codigoIsbn) {
    if(listaLibros[libro].ejemplares>0){

    }
    
    }
  }
}*/
