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
  if (comprobarEmail(numSocio) && comprobarTelefono(numSocio)) {
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

function comprobarEmail(numeroSocio) {
  const dominios = listaDominiosValidos.join("|"); // Unir los dominios con "|"
  const emailValido = new RegExp( //Crear una expresión regular con el patrón de validación de email con los dominios validos del array
    `^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.(${dominios}))+$`
  ); // Comprueba que comienza por letras, numeros, guiones bajos o puntos, seguido de @, letras, guiones o puntos, seguido de un punto y de una de las cadenas en el array de Strings listaDominiosValidos
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocio) {
      if (!emailValido.test(email.value)) {
        //.test comprueba que el texto coincide con el patrón
        alert("Dirección de email invalida");
        listaCorreosInvalidos.push(
          listaLectores[lector].nombre,
          listaLectores[lector].apellido,
          listaLectores[lector].email
        );
      } else {
        return true;
      }
    }
  }
}

function comprobarTelefono(numeroSocio) {
  var telefonoValido = /^[9|6|7][0-9]{9}$/; //Comprueba que comienza por 9,6 o 7, tiene 9 digitos en total y que contiene solamente numeros
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocio) {
      if (!telefonoValido.test(telefono.value)) {
        //.test comprueba que el texto coincide con el patrón
        alert("Número de teléfono invalido");
        listaCorreosInvalidos.push(
          listaLectores[lector].nombre,
          listaLectores[lector].apellido,
          listaLectores[lector].telefono
        );
      } else {
        return true;
      }
    }
  }
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
