let nombre = new Set(["Pepe","Juan","Pedro"]);
//undefined
nombre.size;
//3
nombre.delete("Juan");
//true
nombre.size;
//2
nombre.clear;
//ƒ clear() { [native code] }
nombre.clear();
//undefined
nombre.size;
//0
nombre.add("Pepe").add("Juan").add("Pedro");
//Set(3) {'Pepe', 'Juan', 'Pedro'}
nombre.size;
//3
nombre.has("Pepe");
//true
nombre.add("Juan");
//Set(3) {'Pepe', 'Juan', 'Pedro'}
nombre.size;
//3
let name=["Antonio","Pedro","Lucas"];
//undefined
console.log(name);
// (3) ['Antonio', 'Pedro', 'Lucas']
//undefined
nombre.add(name[0]);
//Set(4) {'Pepe', 'Juan', 'Pedro', 'Antonio'}
nombre.add(name[1]);
//Set(4) {'Pepe', 'Juan', 'Pedro', 'Antonio'}
nombre.add(name[2]);
//Set(5) {'Pepe', 'Juan', 'Pedro', 'Antonio', 'Lucas'}
nombre.size;
//5
//se añade al set un array por su posición
console.log(nombre);
//Set(5) {'Pepe', 'Juan', 'Pedro', 'Antonio', 'Lucas'}
let nombre2=[...nombre];
//undefined
console.log(nombre2);
//(5) ['Pepe', 'Juan', 'Pedro', 'Antonio', 'Lucas']
//undefined

//array=new Set (array)=> para hacer un set del array