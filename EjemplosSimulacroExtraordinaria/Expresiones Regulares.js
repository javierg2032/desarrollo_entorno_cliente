// Número de teléfono (Sin prefijo)
const telefonoSinPrefijo = /^[967][0-9]{8}$/;

// Número de teléfono (Con prefijo +34)
const telefonoConPrefijo34 = /^\+34\s[967][0-9]{8}$/;

// Número de teléfono (Con prefijos validos en un array)
/*
const listaPrefijosValidos = ["+34", "+33", "+31", "+30", "+32"];
const prefijos = listaPrefijosValidos.join("|"); (+34|+33|+31|+30|+32)
*/
const telefonoConPrefijo = new RegExp(`^\(${prefijos})\s[967][0-9]{8}$`);

// DNIs
const dni = /^[0-9]{8}[A-Z]$/;

// Código postal
const codigoPostal = /^[0-9]{5}$/;

// Dirección de correo electrónico
const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

//Dirección de correo electronico (Con dominios validos en un array)
/*
//Listado Dominios Validos
const listaDominiosValidos = ["es", "com", "org", "net", "eu"];
const dominios = listaDominiosValidos.join("|"); (es|com|org|net|eu)
*/
const emailConDominios = new RegExp(
  `^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(${dominios})$`
);

/*
Cadena compuesta por una o dos palabras separadas por un guion 
(Compuesto por cualquier letra (tanto Mayúsculas como Minúsculas) y 
las vocales pueden tener acentos)
*/
const cadenaSeparadaGuión = /^[a-zA-ZáéíóúÁÉÍÓÚ]+(-[a-zA-ZáéíóúÁÉÍÓÚ]+)?$/;

/*
Cadena compuesta por una o dos palabras separadas por un espacio 
(Compuesto por cualquier letra (tanto Mayúsculas como Minúsculas) y 
las vocales pueden tener acentos)
*/
const cadenaSeparadaEspacio = /^[a-zA-ZáéíóúÁÉÍÓÚ]+(\s[a-zA-ZáéíóúÁÉÍÓÚ]+)?$/;

// Formato de fecha (dd/mm/aaaa)
const fecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

//Contraseña (Puede incluir letras mayúsculas, minúsculas, números y caracteres especiales)
const contrasena = /^[A-Za-z\d\W_]{8,}$/;

//Contraseña Segura (Obliga a incluir al menos una letra mayúscula, una minúscula, un número y un caracter especial)
const contrasenaSegura = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
