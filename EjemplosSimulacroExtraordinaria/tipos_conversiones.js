// Conversión de tipos y comprobación

const n = "123";
console.log(Number(n)); // 123
console.log(parseInt("123.45")); // 123
console.log(parseFloat("123.45")); // 123.45

console.log(typeof 5); // "number"
console.log(typeof "hola"); // "string"
console.log(typeof []); // "object"
console.log(Array.isArray([])); // true
console.log(isNaN("a")); // true
