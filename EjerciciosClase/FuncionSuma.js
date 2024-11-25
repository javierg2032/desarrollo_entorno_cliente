function suma(...args) {
  sum = 0;
  for (arg of args) {
    sum += arg;
  }
  return sum;
}

console.log(suma(4));
console.log(suma(4, 5));
console.log(suma(4, 5, 6));
console.log(suma(4, 5, 6, 1));
console.log(suma());
