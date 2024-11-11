/*Tengo un documento CSV, (Nombre, Masculino O Femenino, Apellido, Puesto en el equipo, Equipo asignado), debo eliminar los duplicados y separar los datos dependiendo del genero*/

async function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const contenido = event.target.result;

      // Dividir el contenido en líneas
      let array = contenido.split("\n");

      // Eliminar el encabezado
      const encabezado = array.shift();

      // Convertir las líneas a objetos
      const datos = array
        .filter((linea) => linea.trim() !== "") // Filtrar líneas vacías
        .map((linea) => {
          const [nombre, genero, apellido, puesto, equipo] = linea
            .split(";")
            .map((item) => item.trim());
          return { nombre, genero, apellido, puesto, equipo };
        });

      // Eliminar duplicados usando un Set basado en el objeto completo
      let conjunto = new Set(datos.map((item) => JSON.stringify(item)));

      // Convertir de nuevo a un array de objetos sin duplicados
      let noRepes = [...conjunto].map((item) => JSON.parse(item));

      // Resolver con los datos sin duplicados
      resolve(noRepes);
    };

    reader.onerror = function (e) {
      reject(new Error("Error al leer el archivo"));
    };

    reader.readAsText(file);
  });
}

// Función para separar los datos por género, quitando la celda "genero"
function separarPorGenero(datos) {
  const masculino = [];
  const femenino = [];

  datos.forEach((dato) => {
    const { nombre, apellido, puesto } = dato; // Extraer las propiedades sin "genero"

    if (dato.genero === "M") {
      masculino.push({ nombre, apellido, puesto });
    } else if (dato.genero === "F") {
      femenino.push({ nombre, apellido, puesto });
    }
  });

  return { masculino, femenino };
}

// Función para separar los datos por puesto, quitando la celda "puesto"
function separarPorPuesto(datosPorGenero) {
  // Inicializamos los objetos para cada género
  const separacion = {
    masculino: { portero: [], centro: [], delantero: [], defensa: [] },
    femenino: { portero: [], centro: [], delantero: [], defensa: [] },
  };

  // Recorremos cada género
  for (const genero in datosPorGenero) {
    datosPorGenero[genero].forEach((dato) => {
      const { nombre, apellido } = dato; // Quitamos "puesto" en la inserción

      switch (dato.puesto) {
        case "Portero":
          separacion[genero].portero.push({ nombre, apellido });
          break;
        case "Centro":
          separacion[genero].centro.push({ nombre, apellido });
          break;
        case "Delantero":
          separacion[genero].delantero.push({ nombre, apellido });
          break;
        case "Defensa":
          separacion[genero].defensa.push({ nombre, apellido });
          break;
      }
    });
  }

  return separacion;
}

document
  .getElementById("fileInput")
  .addEventListener("change", async function (e) {
    const archivo = e.target.files[0];
    if (!archivo) {
      alert("Por favor, selecciona un archivo CSV.");
      return;
    }

    try {
      // Llama a la función leerArchivo y pasa el archivo seleccionado
      const datos = await leerArchivo(archivo);

      // Separar por género
      const datosSeparados = separarPorGenero(datos);

      // Separar por puesto
      const datosPorGeneroYPorPuesto = separarPorPuesto(datosSeparados);

      // Mostrar los datos por consola
      console.log(
        "Datos sin duplicados, separados por género y por puesto:",
        datosPorGeneroYPorPuesto
      );
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  });

// Función para crear equipos completos
function crearEquipos(datosPorGeneroYPorPuesto) {
  const equipos = { masculino: [], femenino: [] };
  const reservas = { masculino: [], femenino: [] };
  const requisitos = { portero: 1, defensa: 4, centro: 3, delantero: 3 };

  // Procesar para cada género
  for (const genero in datosPorGeneroYPorPuesto) {
    const datos = datosPorGeneroYPorPuesto[genero];
    let equipoCompleto = {
      portero: [],
      defensa: [],
      centro: [],
      delantero: [],
    };

    // Mientras haya suficientes jugadores para formar un equipo completo
    while (
      datos.portero.length >= requisitos.portero &&
      datos.defensa.length >= requisitos.defensa &&
      datos.centro.length >= requisitos.centro &&
      datos.delantero.length >= requisitos.delantero
    ) {
      // Asignar los jugadores a las posiciones correspondientes
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

      // Eliminar los jugadores que ya se asignaron
      datos.portero = datos.portero.slice(requisitos.portero);
      datos.defensa = datos.defensa.slice(requisitos.defensa);
      datos.centro = datos.centro.slice(requisitos.centro);
      datos.delantero = datos.delantero.slice(requisitos.delantero);

      // Agregar el equipo completo
      equipos[genero].push(equipoCompleto);

      // Reiniciar el equipo para el siguiente ciclo
      equipoCompleto = {
        portero: [],
        defensa: [],
        centro: [],
        delantero: [],
      };
    }

    // Los jugadores restantes se agregan a las reservas
    reservas[genero] = [
      ...datos.portero,
      ...datos.defensa,
      ...datos.centro,
      ...datos.delantero,
    ];
  }

  return { equipos, reservas };
}

// Evento que llama a crearEquipos y muestra los resultados
document
  .getElementById("fileInput")
  .addEventListener("change", async function (e) {
    const archivo = e.target.files[0];
    if (!archivo) {
      alert("Por favor, selecciona un archivo CSV.");
      return;
    }

    try {
      // Leer y procesar el archivo CSV
      const datos = await leerArchivo(archivo);

      // Separar por género
      const datosSeparados = separarPorGenero(datos);

      // Separar por puesto
      const datosPorGeneroYPorPuesto = separarPorPuesto(datosSeparados);

      // Crear equipos completos y reservas
      const { equipos, reservas } = crearEquipos(datosPorGeneroYPorPuesto);

      // Mostrar los datos por consola
      console.log("Equipos completos por género:", equipos);
      console.log("Reservas por género:", reservas);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  });
