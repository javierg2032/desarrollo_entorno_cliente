const jugadores = [];
const jugadoras = [];
let jugadoresTotales = [];
const equiposMasculinos = [];
const equiposFemeninos = [];
const restantes = [];

function Jugador(nombre, sexo, apellido, puesto) {
  this.nombre = nombre;
  this.sexo = sexo;
  this.apellido = apellido;
  this.puesto = puesto;
  this.equipo = "";
}

function Equipo() {
  this.portero = [];
  this.defensa = [];
  this.centro = [];
  this.delantero = [];
}

document
  .getElementById("importar-boton")
  .addEventListener("click", function importar() {
    const fileJugadores = document.getElementById("importar-input").files[0];

    // Si no hay archivos seleccionados, salgo de la función
    if (!fileJugadores) {
      return;
    }

    // Si hay un archivo de jugadores, lo leo y proceso
    if (fileJugadores) {
      const readerJugadores = new FileReader();
      readerJugadores.onload = function (e) {
        const text = e.target.result;
        processCSV(text);
        preparaEquipos();
      };

      readerJugadores.readAsText(fileJugadores);

      
    }

    // Limpio los campos de importación después de importar
    document.getElementById("importar-input").value = "";
  });

// Procesar CSV
function processCSV(text) {
  const fichero = text
    .split("\r\n") // Divido en líneas
    .slice(1) // Elimino la primera línea (encabezado)
    .map((lineas) => {
      // Divido el fichero por lineas
      let linea = lineas.split(";");
      return linea;
    });

  fichero.pop(); // Elimino la ultima linea vacia

  for (let celda of fichero) {
    jugadoresTotales.push(new Jugador(celda[0], celda[1], celda[2], celda[3]));
  }
  jugadoresTotales.sort((a, b) => a.nombre.localeCompare(b.nombre)); //Ordeno los jugadores por sexo
  //console.table(jugadoresTotales);
  jugadoresTotales = eliminaDuplicados();
  console.log("Listado de jugadores sin duplicados:");
  console.table(jugadoresTotales);
}

function eliminaDuplicados() {
  const sinDuplicados = jugadoresTotales.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (o) => o.nombre === obj.nombre && o.apellido === obj.apellido
      )
  );
  return sinDuplicados;
}

function preparaEquipos() {
  separaGeneros();

  generaEquipo();

  while (jugadores.length >= 11 || jugadoras.length >= 11) {
    generaEquipo();
  }

  restante();
  console.log("Equipo/s Femeninos:");
  console.log(equiposFemeninos);
  console.log("Equipo/s Masculinos:");
  console.log(equiposMasculinos);
  console.log("Jugador/es Restante/s:");
  console.log(restantes);
}

function separaGeneros() {
  for (let i = 0; i <= jugadoresTotales.length - 1; i++) {
    if (jugadoresTotales[i].sexo == "M" || jugadoresTotales[i].sexo == "m") {
      jugadores.push(jugadoresTotales[i]);
    } else {
      if (jugadoresTotales[i].sexo == "F" || jugadoresTotales[i].sexo == "f") {
        jugadoras.push(jugadoresTotales[i]);
      } else {
        console.log("El sexo del jugador no es valido");
      }
    }
  }
}

function generaEquipo() {
  let equipoFemenino = new Equipo();
  for (let i = jugadoras.length - 1; i >= 0; i--) {
    //Lo recorro de forma inversa para poder ir eliminando las jugadoras que ya tienen equipo
    let jugadora = jugadoras[i];

    if (jugadora.puesto === "Portero" && equipoFemenino.portero.length < 1) {
      equipoFemenino.portero.push(jugadora);
      jugadoras.splice(i, 1);
    } else if (
      jugadora.puesto === "Defensa" &&
      equipoFemenino.defensa.length < 4
    ) {
      equipoFemenino.defensa.push(jugadora);
      jugadoras.splice(i, 1);
    } else if (
      jugadora.puesto === "Centro" &&
      equipoFemenino.centro.length < 3
    ) {
      equipoFemenino.centro.push(jugadora);
      jugadoras.splice(i, 1);
    } else if (
      jugadora.puesto === "Delantero" &&
      equipoFemenino.delantero.length < 3
    ) {
      equipoFemenino.delantero.push(jugadora);
      jugadoras.splice(i, 1);
    }

    if (
      equipoFemenino.portero.length === 1 &&
      equipoFemenino.defensa.length === 4 &&
      equipoFemenino.centro.length === 3 &&
      equipoFemenino.delantero.length === 3
    ) {
      equiposFemeninos.push(equipoFemenino);
      console.log("Equipo femenino completo");
      return;
    }
  }

  let equipoMasculino = new Equipo();

  for (let i = jugadores.length - 1; i >= 0; i--) {
    //Lo recorro de forma inversa para poder ir eliminando las jugadores que ya tienen equipo
    let jugador = jugadores[i];

    if (jugador.puesto === "Portero" && equipoMasculino.portero.length < 1) {
      equipoMasculino.portero.push(jugador);
      jugadores.splice(i, 1);
    } else if (
      jugador.puesto === "Defensa" &&
      equipoMasculino.defensa.length < 4
    ) {
      equipoMasculino.defensa.push(jugador);
      jugadores.splice(i, 1);
    } else if (
      jugador.puesto === "Centro" &&
      equipoMasculino.centro.length < 3
    ) {
      equipoMasculino.centro.push(jugador);
      jugadores.splice(i, 1);
    } else if (
      jugador.puesto === "Delantero" &&
      equipoMasculino.delantero.length < 3
    ) {
      equipoMasculino.delantero.push(jugador);
      jugadores.splice(i, 1);
    }

    if (
      equipoMasculino.portero.length === 1 &&
      equipoMasculino.defensa.length === 4 &&
      equipoMasculino.centro.length === 3 &&
      equipoMasculino.delantero.length === 3
    ) {
      equiposMasculinos.push(equipoMasculino);
      console.log("Equipo masculino completo");
      return;
    }
  }
}

function restante() {
  for (let i = 0; i <= jugadoras.length - 1; i++) {
    let jugadora = jugadoras[i];
    restantes.push(jugadora);
  }

  for (let i = 0; i <= jugadores.length - 1; i++) {
    let jugador = jugadores[i];
    restantes.push(jugador);
  }
}
