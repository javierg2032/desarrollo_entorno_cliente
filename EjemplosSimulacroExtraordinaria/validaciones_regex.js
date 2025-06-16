// Validaciones comunes usando expresiones regulares

function validaSKU(sku) {
  return /^[A-Z]{3}-\d{4}$/.test(sku); // Formato ABC-1234
}

function validaPrecio(precio) {
  return /^\d+(\.\d{1,2})?$/.test(precio); // Números con hasta 2 decimales
}

function validaNombre(nombre) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(nombre); // Letras y espacios
}

function campoNoVacio(valor) {
  return valor.trim() !== "";
}
