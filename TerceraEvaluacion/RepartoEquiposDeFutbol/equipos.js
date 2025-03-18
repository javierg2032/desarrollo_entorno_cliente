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
  console.table(jugadoresTotales);
  jugadoresTotales = eliminaDuplicados();
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
  console.table(jugadoras);
  console.table(jugadores);

  while (jugadores.length >= 11) {
    generaEquipoMasculino();
  }

  while (jugadoras.length >= 11) {
    generaEquipoFemenino();
  }

  restante();

  console.log(equiposFemeninos);
  console.log(equiposMasculinos);
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

function generaEquipoFemenino() {
  let equipo = new Equipo();

  for (let i = jugadoras.length - 1; i >= 0; i--) {
    //Lo recorro de forma inversa para poder ir eliminando las jugadoras que ya tienen equipo
    let jugadora = jugadoras[i];

    if (jugadora.puesto === "Portero" && equipo.portero.length < 1) {
      equipo.portero.push(jugadora);
      jugadoras.splice(i, 1);
    } else if (jugadora.puesto === "Defensa" && equipo.defensa.length < 4) {
      equipo.defensa.push(jugadora);
      jugadoras.splice(i, 1);
    } else if (jugadora.puesto === "Centro" && equipo.centro.length < 3) {
      equipo.centro.push(jugadora);
      jugadoras.splice(i, 1);
    } else if (jugadora.puesto === "Delantero" && equipo.delantero.length < 3) {
      equipo.delantero.push(jugadora);
      jugadoras.splice(i, 1);
    }

    if (
      equipo.portero.length === 1 &&
      equipo.defensa.length === 4 &&
      equipo.centro.length === 3 &&
      equipo.delantero.length === 3
    ) {
      equiposFemeninos.push(equipo);
      console.log("Equipo femenino completo");
      return;
    }
  }

  console.log("No hay suficientes jugadoras para completar un equipo femenino");
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

function generaEquipoMasculino() {
  let equipo = new Equipo();

  for (let i = jugadores.length - 1; i >= 0; i--) {
    //Lo recorro de forma inversa para poder ir eliminando las jugadores que ya tienen equipo
    let jugador = jugadores[i];

    if (jugador.puesto === "Portero" && equipo.portero.length < 1) {
      equipo.portero.push(jugador);
      jugadores.splice(i, 1);
    } else if (jugador.puesto === "Defensa" && equipo.defensa.length < 4) {
      equipo.defensa.push(jugador);
      jugadores.splice(i, 1);
    } else if (jugador.puesto === "Centro" && equipo.centro.length < 3) {
      equipo.centro.push(jugador);
      jugadores.splice(i, 1);
    } else if (jugador.puesto === "Delantero" && equipo.delantero.length < 3) {
      equipo.delantero.push(jugador);
      jugadores.splice(i, 1);
    }

    if (
      equipo.portero.length === 1 &&
      equipo.defensa.length === 4 &&
      equipo.centro.length === 3 &&
      equipo.delantero.length === 3
    ) {
      equiposMasculinos.push(equipo);
      console.log("Equipo masculino completo");
      return;
    }
  }

  console.log(
    "No hay suficientes jugadores para completar un equipo masculino"
  );
}
