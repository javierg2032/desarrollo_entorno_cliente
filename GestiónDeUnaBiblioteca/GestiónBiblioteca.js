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

//Funciones de Lector
function altaLector() {
  let numSocio = prompt("Introduce el número de socio:");
  let nombre = prompt("Introduce el nombre:");
  let apellido = prompt("Introduce el apellido:");
  let telefono = prompt("Introduce el teléfono:");
  let email = prompt("Introduce el email:");

  if (
    comprobarEmail(email, nombre, apellido) &&
    comprobarTelefono(telefono, nombre, apellido)
  ) {
    listaLectores.push(new Lector(numSocio, nombre, apellido, telefono, email));
    alert("Lector añadido correctamente");
  } else {
    alert(
      "No se ha podido añadir el lector debido a que el email o el teléfono no son válidos"
    );
  }
}

function bajaLector(numeroSocio) {
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocio) {
      listaLectores[lector].bajaLector = true;
      listaLectores[lector].fechaBaja = new Date();
    } else {
      alert(
        "El número de socio introducido no coincide con el de ningún lector"
      );
    }
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
  const telefonoValido = /^[9|6|7][0-9]{9}$/;

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
}
