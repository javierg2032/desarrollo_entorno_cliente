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

function formarFamilias(datos) {
  // Crear un objeto para almacenar la información de los perros
  const perros = {};

  // Llenar el objeto con la información de los datos
  datos.forEach((registro) => {
    const { padre, madre, hijos } = registro;

    // Asegurar que los padres existan en el objeto
    if (padre && !perros[padre]) {
      perros[padre] = { padre: null, madre: null, hijos: [] };
    }
    if (madre && !perros[madre]) {
      perros[madre] = { padre: null, madre: null, hijos: [] };
    }

    // Registrar hijos y asignar sus padres
    hijos.forEach((hijo) => {
      if (!perros[hijo]) {
        perros[hijo] = {
          padre: padre || null,
          madre: madre || null,
          hijos: [],
        };
      } else {
        if (!perros[hijo].padre) perros[hijo].padre = padre || null;
        if (!perros[hijo].madre) perros[hijo].madre = madre || null;
      }
    });

    // Agregar hijos a los padres
    if (padre) perros[padre].hijos = perros[padre].hijos.concat(hijos);
    if (madre) perros[madre].hijos = perros[madre].hijos.concat(hijos);
  });

  // Pedir el nombre del perro al usuario
  const nombreBuscado = prompt(
    "Introduce el nombre del perro que deseas consultar:"
  );
  if (!nombreBuscado) {
    alert("No se introdujo un nombre. Operación cancelada.");
    return;
  }

  // Verificar si el perro existe en los registros
  if (!perros[nombreBuscado]) {
    alert(`El perro "${nombreBuscado}" no se encuentra en los registros.`);
    return;
  }

  // Obtener la información del perro
  const perro = perros[nombreBuscado];
  const padre = perro.padre || "Desconocido";
  const madre = perro.madre || "Desconocido";
  const hijos =
    perro.hijos.length > 0 ? perro.hijos.sort().reverse() : ["Desconocido"];
  const abueloPaterno = perro.padre
    ? perros[perro.padre]?.padre || "Desconocido"
    : "Desconocido";
  const abuelaPaterna = perro.padre
    ? perros[perro.padre]?.madre || "Desconocido"
    : "Desconocido";
  const abueloMaterno = perro.padre
    ? perros[perro.madre]?.padre || "Desconocido"
    : "Desconocido";
  const abuelaMaterna = perro.padre
    ? perros[perro.madre]?.madre || "Desconocido"
    : "Desconocido";

  // Crear un mensaje con la información del perro
  let mensaje = `Información de ${nombreBuscado}:\n`;
  mensaje += `Hijos: ${hijos.join(", ")}\n`;
  mensaje += `Padre: ${padre}\n`;
  mensaje += `Madre: ${madre}\n`;
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


  