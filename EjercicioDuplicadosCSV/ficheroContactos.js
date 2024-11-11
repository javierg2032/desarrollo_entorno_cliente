function mostrarContenido(setContenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = Array.from(setContenido).join("\r\n");    
}

document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const contenido = await leerArchivo(archivo);

    //console.log(contenido);
    //mostrarContenido(contenido);

    const contenidoSep = contenido.split("\r\n");
    const setContenido = new Set ();
    //conjunto=new Set(contenidoSep);
    //conjunto.delete("");
    for (let i=0; i<contenidoSep.length;i++){
        setContenido.add(contenidoSep[i].replaceAll(";"," "));
        //setContenido.add(contenidoSep[i].replace(";"," ").replace(";",": ")); es mejor la línea de arriba
    }
    mostrarContenido(setContenido);
    //noRepetidos=[...conjunto];
}, false);

async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}
