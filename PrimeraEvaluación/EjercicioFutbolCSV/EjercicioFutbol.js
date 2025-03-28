/* Tengo un documento CSV, (Nombre, Masculino O Femenino, Apellido, Puesto en el equipo, 
Equipo asignado), debo eliminar los duplicados y separar los datos dependiendo del género */

// Función para leer el archivo CSV
function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Evento que ocurre cuando el archivo se ha leído correctamente
    reader.onload = function (event) {
      const contenido = event.target.result; // Contenido del archivo

      // Divido el contenido en líneas
      const lineas = contenido.split("\n");

      // Quito la primera línea porque es el encabezado
      lineas.shift();

      // Procesar las líneas en un array de objetos
      const datos = [];
      lineas.forEach((linea) => {
        if (linea.trim() !== "") {
          // Ignorar líneas vacías
          const columnas = linea.split(";").map((item) => item.trim());
          const [nombre, genero, apellido, puesto, equipo] = columnas;

          // Evitar duplicados comprobando si ya existe en el array
          const yaExiste = datos.some(
            (dato) =>
              dato.nombre === nombre &&
              dato.genero === genero &&
              dato.apellido === apellido &&
              dato.puesto === puesto &&
              dato.equipo === equipo
          );

          if (!yaExiste) {
            datos.push({ nombre, genero, apellido, puesto, equipo });
          }
        }
      });

      // Devuelvo los datos ya procesados
      resolve(datos);
    };

    // En caso de error al leer el archivo
    reader.onerror = function () {
      reject(new Error("Error al leer el archivo"));
    };

    // Inicio la lectura del archivo como texto
    reader.readAsText(file);
  });
}

// Función para separar los datos por puesto y género
function separarPorPuesto(datos) {
  // Creo un objeto para organizar los datos, con una estructura para cada género
  const separacion = {
    masculino: { portero: [], centro: [], delantero: [], defensa: [] },
    femenino: { portero: [], centro: [], delantero: [], defensa: [] },
  };

  // Recorro cada dato y lo organizo por género y puesto
  datos.forEach((dato) => {
    const { nombre, apellido, genero, puesto } = dato;

    if (genero === "M" || genero === "F") {
      // Verifico que el género sea válido
      const categoriaGenero = genero === "M" ? "masculino" : "femenino";
      const jugador = { nombre, apellido }; // Creo un objeto solo con nombre y apellido

      // Uso switch para añadir el jugador al puesto correcto dentro del género correcto
      switch (puesto) {
        case "Portero":
          separacion[categoriaGenero].portero.push(jugador);
          break;
        case "Centro":
          separacion[categoriaGenero].centro.push(jugador);
          break;
        case "Delantero":
          separacion[categoriaGenero].delantero.push(jugador);
          break;
        case "Defensa":
          separacion[categoriaGenero].defensa.push(jugador);
          break;
        default:
          // En caso de una posición inválida, simplemente ignoramos o mostramos un mensaje
          console.error(
            "ERROR: La posición " +
              puesto +
              " del jugador/a " +
              jugador.nombre +
              " " +
              jugador.apellido +
              " no es válida"
          );
          break;
      }
    }
  });

  return separacion; // Devuelvo el objeto ya separado por género y puesto
}

// Función para crear equipos completos y gestionar las reservas
function crearEquipos(datosPorGeneroYPorPuesto) {
  const equipos = { masculino: [], femenino: [] }; // Para almacenar los equipos completos
  const requisitos = { portero: 1, defensa: 4, centro: 3, delantero: 3 }; // Número de jugadores por puesto

  // Recorro cada género (masculino y femenino)
  for (const genero in datosPorGeneroYPorPuesto) {
    const datos = datosPorGeneroYPorPuesto[genero];
    let equipoCompleto = {
      portero: [],
      defensa: [],
      centro: [],
      delantero: [],
    };

    // Mientras haya suficientes jugadores en cada puesto para formar un equipo completo
    while (
      datos.portero.length >= requisitos.portero &&
      datos.defensa.length >= requisitos.defensa &&
      datos.centro.length >= requisitos.centro &&
      datos.delantero.length >= requisitos.delantero
    ) {
      // Selecciono el número de jugadores necesarios para cada posición y los añado al equipo
      equipoCompleto.portero.push(
        ...datos.portero.slice(0, requisitos.portero)
      );
      equipoCompleto.defensa.push(
        ...datos.defensa.slice(0, requisitos.defensa)
      );
      equipoCompleto.centro.push(...datos.centro.slice(0, requisitos.centro));
      equipoCompleto.delantero.push(
        ...datos.delantero.slice(0, requisitos.delantero)
      );

      // Quito a esos jugadores ya asignados de la lista de datos
      datos.portero = datos.portero.slice(requisitos.portero);
      datos.defensa = datos.defensa.slice(requisitos.defensa);
      datos.centro = datos.centro.slice(requisitos.centro);
      datos.delantero = datos.delantero.slice(requisitos.delantero);

      // Agrego el equipo completo al conjunto de equipos de ese género
      equipos[genero].push(equipoCompleto);

      // Reinicio el equipo para preparar uno nuevo en el siguiente ciclo
      equipoCompleto = {
        portero: [],
        defensa: [],
        centro: [],
        delantero: [],
      };
    }
  }

  return equipos; // Devuelvo los equipos completos
}

// Evento que se ejecuta cuando selecciono un archivo en el input
document
  .getElementById("fileInput")
  .addEventListener("change", async function (e) {
    const archivo = e.target.files[0];
    if (!archivo) {
      alert("Por favor, selecciona un archivo CSV.");
      return;
    }

    try {
      const timeStart = Date.now(); // Inicio del contador

      // Llamo a leerArchivo para procesar el archivo seleccionado
      const datos = await leerArchivo(archivo);

      // Separo los datos por género y puesto
      const datosPorGeneroYPorPuesto = separarPorPuesto(datos);

      // Creo los equipos completos
      const equipos = crearEquipos(datosPorGeneroYPorPuesto);

      const timeEnd = Date.now(); // Fin del contador
      const timeElapsed = (timeEnd - timeStart) / 1000; // Tiempo en segundos

      console.log("Equipos completos por género:", equipos);
      console.log("Tiempo total de procesamiento:", timeElapsed, "segundos");
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  });
