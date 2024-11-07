/*Tengo un documento CSV, quiero recorrerlo como si fuese un array de objetos 
(Nombre, Masculino O Femenino, Apellido, Puesto en el equipo, Equipo asignado) 
para comprobar si esta duplicado en el documento*/

/*Tengo un documento CSV, debo leer el documento y eliminar los duplicados con set*/

/*function leerCSV(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const contenido = event.target.result;

    // Dividir el contenido en líneas
    let array = contenido.split("\r\n");

    // Eliminar el encabezado
    const encabezado = array.shift();

    // Convertir las líneas a objetos
    const datos = array.map((linea) => {
      const [nombre, genero, apellido, puesto, equipo] = linea.split(";");
      return {
        nombre,
        genero,
        apellido,
        puesto,
        equipo,
      };
    });

    // Eliminar duplicados usando un Set basado en el objeto completo
    let conjunto = new Set(datos.map((item) => JSON.stringify(item)));

    // Convertir de nuevo a un array
    let noRepes = [...conjunto].map((item) => JSON.parse(item));

    // Mostrar los datos sin duplicados
    console.log(noRepes);
  };

  reader.readAsText(file);
}
*/

async function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const contenido = event.target.result;
      // Dividir el contenido en líneas
      let array = contenido.split("\r\n");

      // Eliminar el encabezado
      const encabezado = array.shift();

      // Convertir las líneas a objetos
      const datos = array.map((linea) => {
        const [nombre, genero, apellido, puesto, equipo] = linea.split(";");
        return {
          nombre,
          genero,
          apellido,
          puesto,
          equipo,
        };
      });

      // Eliminar duplicados usando un Set basado en el objeto completo
      let conjunto = new Set(datos.map((item) => JSON.stringify(item)));

      // Convertir de nuevo a un array
      let noRepes = [...conjunto].map((item) => JSON.parse(item));

      // Mostrar los datos sin duplicados
      console.log(noRepes);
      resolve(noRepes);
    };

    reader.onerror = function (e) {
      reject(new Error("Error al leer el archivo"));
    };

    reader.readAsText(file);
  });
}

document.getElementById("fileInput").addEventListener("change", function (e) {
  const archivo = e.target.files[0]; // Captura el archivo seleccionado
  if (!archivo) {
    alert("Por favor, selecciona un archivo CSV.");
    return;
  }

  // Llama a la función leerArchivo y pasa el archivo seleccionado
  leerArchivo(archivo)
    .then((datos) => {
      // Mostrar los datos o hacer algo con ellos
      document.getElementById("resultado").textContent = JSON.stringify(
        datos,
        null,
        2
      );
    })
    .catch((error) => {
      console.error(error);
    });
});
