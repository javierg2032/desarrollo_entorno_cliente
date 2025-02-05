/*Que devuelva "Texto+'A'+'B'" y despues "Texto+('A'+'B')"*/
a = 7;
b = 22;
console.log("<br>" + ("<br>Texto " + a + " " + b));
console.log("<br>" + ("<br>Texto " + (a + b)));

/*Que devuelva "'A'+'B'+Texto" y despues "('A'+'B')+Texto"*/
console.log("<br>" + ("<br>" + a + " " + b + " texto"));
console.log("<br>" + ("<br>" + (a + b) + " texto"));

a = 5;
b = a++; //'B' obtiene el valor de 'A' y despues a 'A' se le suma 1
c = ++a; //A 'A' se le suma 1 y despues 'C' obtiene el valor de 'A'
console.log("<br>" + (a + " " + b + " " + c));