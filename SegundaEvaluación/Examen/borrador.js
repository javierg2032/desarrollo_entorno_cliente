/*

document.getElementById("vista-libros").addEventListener("mouseenter", function() {
    document.getElementById("cursor-sobre-vista-libros").innerText = "Entró en Vista Libros";
  });
  
  document.getElementById("vista-libros").addEventListener("mouseleave", function() {
    document.getElementById("cursor-sobre-vista-libros").innerText = "Salió de Vista Libros";
  });
  

document.addEventListener("DOMContentLoaded", function () {
    const propiedadesNavegador = document.getElementById("propiedades-navegador");
    const codigoLenguaje = navigator.language || navigator.userLanguage;
    const altoPantalla = screen.height;
    const anchoPantalla = screen.width;
  
    propiedadesNavegador.innerText = `Código del lenguaje: ${codigoLenguaje}.
    Alto de pantalla: ${altoPantalla} pixels.
    Ancho de pantalla: ${anchoPantalla} pixels.`;
  });

function verificarTelefono(numeroTelefono) {
  const telefonoValido1 = /^[9|6|7][0-9]{8}$/; // Comienza por 9, 6 o 7 y tiene 8 dígitos después del primero
  const telefonoValido2 = /^\+34\s[9|6|7][0-9]{8}$/; // Contiene el prefijo +34 junto con un espacio y comienza por 9, 6 o 7 y tiene 8 dígitos después del primero

  if (telefonoValido1.test(numeroTelefono) || telefonoValido2.test(numeroTelefono)) {
    return true;
  } else {
    return false;
  }


function crearNuevaListaLibros(listaLibros) {
  const nuevoObjetoListaLibros = {};

  listaLibros.forEach(libro => {
    nuevoObjetoListaLibros[libro.codLibro] = {
      isbn: libro.isbn,
      autor: libro.autor,
      titulo: libro.titulo,
      editorial: libro.editorial,
      ejemplares: libro.ejemplares
    };
  });

  return nuevoObjetoListaLibros;
}



// Filtrado de libros en la sección Vista Libros
document.getElementById("vista-libros-boton").addEventListener("click", function () {
  const filtro = document.getElementById("vista-libros-incluye").value.toLowerCase();
  const tbody = document.getElementById("vista-libros").querySelector("tbody");
  tbody.innerHTML = "";

  for (let libro of listaLibros) {
    if (!libro.bajaLibro && libro.titulo.toLowerCase().includes(filtro)) {
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




function solicitudPrestamo(numSocio, codLibro) {
  let seccionPrestamo = document.getElementById("prestamo");
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
        `¡Préstamo exitoso! Número de Préstamo: ${prestamo.numPrestamo}, Fecha de Préstamo: ${prestamo.fechaPrestamo.toLocaleDateString()}`
      );
    })
    .catch((error) => {
      mostrarMensajeError(error.message);
    });

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
}

function comprobarLibro(codLibro) {
  return new Promise((resolve, reject) => {
    let libro = listaLibros.find(
      (libro) => libro.codLibro === codLibro && !libro.bajaLibro
    );
    if (libro && libro.ejemplares > 0) {
      resolve();
    } else {
      reject(new Error("El libro no existe, está dado de baja o no hay ejemplares disponibles."));
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
      reject(new Error("El lector no existe o está dado de baja."));
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
      let nuevoPrestamo = new Prestamo(numeroPrestamo, numSocio, codLibro);
      listadoPrestamos.push(nuevoPrestamo);
      listadoPrestamosVivos.push(nuevoPrestamo);
      resolve(nuevoPrestamo);
    } else {
      reject(new Error("No se pudo realizar el préstamo."));
    }
  });
}





  */
