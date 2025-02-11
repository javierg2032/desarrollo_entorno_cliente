/*Se hace una tirada de un D6 con promesas, si sale par se usa resolve(resultado par) y si sale impar se usa reject(resultado impar)*/
let tirada = Math.floor(Math.random() * 6 + 1);
console.log(tirada);
let promise = new Promise(function (resolve, reject) {
  if (tirada % 2 == 0) {
    resolve("Par");
  } else {
    reject("Impar");
  }
});

promise.then(
  (result) => console.log(result),
  (error) => console.log(error)
);
