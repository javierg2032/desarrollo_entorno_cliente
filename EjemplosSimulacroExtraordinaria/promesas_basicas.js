// Uso básico de Promesas

function cargarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image(200, 200);
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Error al cargar imagen"));
    img.src = url;
  });
}

// Ejemplo de uso
cargarImagen("images/ejemplo.jpg")
  .then(img => document.body.appendChild(img))
  .catch(err => console.error(err));
