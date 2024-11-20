nombre = "pepe";
apellido = null;

nombre !== null && apellido !== null
  ? console.log(nombre + " " + apellido)
  : console.log(
      nombre == null
        ? "*Falta nombre* " + apellido
        : nombre + " *falta apellido*"
    );
