// Eventos de teclado

document.addEventListener("keydown", function (e) {
  if (e.key === "$") {
    console.log("Se pulsó la tecla $");
  }

  if (e.ctrlKey && e.key === "e") {
    e.preventDefault();
    console.log("Ctrl + E fue presionado");
  }
});
