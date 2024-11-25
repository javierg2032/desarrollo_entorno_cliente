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
          // Ignorar celdas vacías
          const columnas = linea.split(",").map((item) => item.trim());
          const padre = columnas[0] || "Desconocido";
          const madre = columnas[1] || "Desconocido";
          const hijos = columnas.slice(2).filter((hijo) => hijo !== ""); // Filtrar hijos vacíos
          datos.push({ padre, madre, hijos });
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

function formarFamilias(datos) {
  // Crear un mapa para agilizar la búsqueda de perros por nombre
  const mapa = new Map();

  // Llenar el mapa con información de los registros
  datos.forEach((registro) => {
    const { padre, madre, hijos } = registro;

    // Aseguramos que todos los nombres aparezcan en el mapa
    if (padre && !mapa.has(padre)) {
      mapa.set(padre, { padre: null, madre: null, hijos: [] });
    }
    if (madre && !mapa.has(madre)) {
      mapa.set(madre, { padre: null, madre: null, hijos: [] });
    }
    hijos.forEach((hijo) => {
      if (!mapa.has(hijo)) {
        mapa.set(hijo, { padre, madre, hijos: [] });
      } else {
        const existente = mapa.get(hijo);
        existente.padre = padre || existente.padre;
        existente.madre = madre || existente.madre;
      }
    });
  });

  // Recorremos nuevamente el mapa para ensamblar las familias
  const resultados = [];
  mapa.forEach((registro, nombre) => {
    const { padre, madre, hijos } = registro;

    // Si ambos padres son desconocidos, no mostrar la familia
    if (!padre && !madre) {
      return;
    }

    // Buscar abuelos por parte del padre
    const abueloPaterno = padre
      ? mapa.get(padre)?.padre || "Desconocido"
      : "Desconocido";
    const abuelaPaterna = padre
      ? mapa.get(padre)?.madre || "Desconocido"
      : "Desconocido";

    // Buscar abuelos por parte de la madre
    const abueloMaterno = madre
      ? mapa.get(madre)?.padre || "Desconocido"
      : "Desconocido";
    const abuelaMaterna = madre
      ? mapa.get(madre)?.madre || "Desconocido"
      : "Desconocido";

    const familia = `
      <div class="familia">
        <p><strong id="nombre">Perro:</strong> ${nombre}</p>
        <p><strong id="padre">Padre:</strong> ${padre || "Desconocido"}</p>
        <p><strong id="madre">Madre:</strong> ${madre || "Desconocido"}</p>
        <p><strong id="abueloP">Abuelo paterno:</strong> ${abueloPaterno}</p>
        <p><strong id="abuelaP">Abuela paterna:</strong> ${abuelaPaterna}</p>
        <p><strong id="abueloM">Abuelo materno:</strong> ${abueloMaterno}</p>
        <p><strong id="abuelaM">Abuela materna:</strong> ${abuelaMaterna}</p>
      </div>
    `;

    resultados.push(familia);
  });

  // Mostrar los resultados en el DOM
  document.getElementById("resultados").innerHTML = resultados.join("");
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
      // Llamo a leerArchivo para procesar el archivo seleccionado
      const datos = await leerArchivo(archivo);

      // Llamo a la función formarFamilias para procesar y mostrar los resultados
      formarFamilias(datos);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  });
