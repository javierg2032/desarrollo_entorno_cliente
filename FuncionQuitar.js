function quitar(array, ...args) {
  for (let i = 0; i < array.length; i++) {
    if (args.includes(array[i])) {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}

console.log(quitar([1, 2, 3, 4, 5], 3, 4));
console.log(quitar([1, 2, 3, 4, 5], 3, 1));
console.log(quitar([1, 2, 3, 4, 5], 7, 6));
