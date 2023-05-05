// require fs module.
const fs = requiere('fs');
// require path module.
const path = require('path');

TODO://Recibo una ruta

//Esta ruta existe,retorna T/F
const existsRoute = (route) => fs.existsSync(route);

//Es una ruta absoluta, retorna T/F
const isAbsolute = (route) => path.isAbsolute(route);

//Convertir de ruta relativa  a ruta absoluta. aqui usare opererador ternario.
const convertToAbsolute = (route) => (isAbsolute(route) ? route : path.resolve(route));

//Es un directorio, returna T/F
const isDirectory = (route) => fs.statSync(route).isDirectory();
TODO://Entrar al directorio.

TODO://Revisar los archivos.

TODO://Es un archivo md.

TODO://Leer el documento.

//Guardar links en un array de objetos.
//Checar options.



module.exports = {

}