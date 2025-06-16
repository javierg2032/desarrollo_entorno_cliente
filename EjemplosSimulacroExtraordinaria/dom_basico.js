// Interacción básica con el DOM

function mostrarMensaje(texto) {
  const p = document.getElementById("mensaje");
  if (p) {
    p.textContent = texto;
  }
}

function obtenerUsuario() {
  return document.getElementById("usuario")?.value.trim();
}

console.log("Hola desde JS");
