// Función para leer el archivo CSV
function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Evento que ocurre cuando el archivo se ha leído correctamente
    reader.onload = function (event) {
      const contenido = event.target.result; // Contenido del archivo

      // Divido el contenido en líneas
      const lineas = contenido.split("\r\n");

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

/*function formarFamilias(datos) {
  const resultados = [];

  datos.forEach((registro) => {
    const { padre, madre, hijos } = registro;

    // Si ambos padres son desconocidos se ignora
    if (!padre && !madre) return;

    // Función para buscar abuelos a partir de un nombre
    const buscarAbuelos = (nombre) => {
      if (!nombre) return { abuelo: "Desconocido", abuela: "Desconocido" }; //Si el nombre no existe, devuelve "Desconocido" para los abuelos
      const registroPadres = datos.find((item) => item.hijos.includes(nombre)); //datos.find() se usa para encontrar un registro donde algo aparezca en otra parte
      if (registroPadres) {
        return {
          //Extrae los nombres de los padres del registro que pasan a ser el abuelo y la abuela
          abuelo: registroPadres.padre || "Desconocido",
          abuela: registroPadres.madre || "Desconocido",
        };
      }
      return { abuelo: "Desconocido", abuela: "Desconocido" }; //Si no hay información devuelve "Desconocido"
    };

    // Buscar abuelos paternos
    const { abuelo: abueloPaterno, abuela: abuelaPaterna } =
      buscarAbuelos(padre);

    // Buscar abuelos maternos
    const { abuelo: abueloMaterno, abuela: abuelaMaterna } =
      buscarAbuelos(madre);

    // Crear el HTML de la familia
    const familia = `
      <div class="familia">
        <p><strong id="nombre">Hijos:</strong> ${
          hijos.join(", ") || "Sin hijos"
        }</p>
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
}*/

function formarFamilias(datos) {
  // Crear un array para almacenar la información de los perros
  const perros = [];

  // Llenar el array con la información de los datos
  datos.forEach(({ padre, madre, hijos }) => {
    // Asegurar que los padres existan en el array (usamos || para asignar 'Desconocido' en caso de que no exista)
    if (padre && !perros.find((p) => p.nombre === padre)) {
      perros.push({ nombre: padre, padre: null, madre: null, hijos: [] });
    }
    if (madre && !perros.find((p) => p.nombre === madre)) {
      perros.push({ nombre: madre, padre: null, madre: null, hijos: [] });
    }

    // Registrar hijos y asignar sus padres
    hijos.forEach((hijo) => {
      const perroExistente = perros.find((p) => p.nombre === hijo);
      if (!perroExistente) {
        perros.push({
          nombre: hijo,
          padre: padre || null,
          madre: madre || null,
          hijos: [],
        });
      } else {
        perroExistente.padre = perroExistente.padre ?? (padre || null);
        perroExistente.madre = perroExistente.madre ?? (madre || null);
      }
    });

    // Agregar los hijos a los padres
    perros.find((p) => p.nombre === padre)?.hijos.push(...hijos);
    perros.find((p) => p.nombre === madre)?.hijos.push(...hijos);
  });

  // Pedir el nombre del perro al usuario
  const nombreBuscado = prompt(
    "Introduce el nombre del perro que deseas consultar:"
  );
  if (!nombreBuscado)
    return alert("No se introdujo un nombre. Operación cancelada.");

  // Verificar si el perro existe en los registros
  const perroBuscado = perros.find((p) => p.nombre === nombreBuscado);
  if (!perroBuscado)
    return alert(
      `El perro "${nombreBuscado}" no se encuentra en los registros.`
    );

  // Obtener la información del perro
  const { padre, madre, hijos } = perroBuscado;

  // Obtener ancestros con valores predeterminados usando el operador ?? para "Desconocido"
  const abueloPaterno = padre
    ? perros.find((p) => p.nombre === padre)?.padre ?? "Desconocido"
    : "Desconocido";
  const abuelaPaterna = padre
    ? perros.find((p) => p.nombre === padre)?.madre ?? "Desconocido"
    : "Desconocido";
  const abueloMaterno = madre
    ? perros.find((p) => p.nombre === madre)?.padre ?? "Desconocido"
    : "Desconocido";
  const abuelaMaterna = madre
    ? perros.find((p) => p.nombre === madre)?.madre ?? "Desconocido"
    : "Desconocido";

  // Si hay hijos, ordenarlos alfabéticamente de forma inversa
  const hijosOrdenados = hijos.length
    ? hijos.sort().reverse()
    : ["Desconocido"];

  // Crear un mensaje con la información del perro
  let mensaje = `Información de ${nombreBuscado}:\n`;
  mensaje += `Hijos: ${hijosOrdenados.join(", ")}\n`;
  mensaje += `Padre: ${padre ?? "Desconocido"}\n`;
  mensaje += `Madre: ${madre ?? "Desconocido"}\n`;
  mensaje += `Abuelo paterno: ${abueloPaterno}\n`;
  mensaje += `Abuela paterna: ${abuelaPaterna}\n`;
  mensaje += `Abuelo materno: ${abueloMaterno}\n`;
  mensaje += `Abuela materna: ${abuelaMaterna}\n`;

  // Mostrar el mensaje al usuario
  alert(mensaje);
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
