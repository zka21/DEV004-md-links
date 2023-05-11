import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import marked from 'marked';
import axios from 'axios';
import { log } from 'console';

//Esta ruta existe,retorna T/F
const existsRoute = (route) => fs.existsSync(route);

//Es una ruta absoluta, retorna T/F
const isAbsolute = (route) => path.isAbsolute(route);

//Convertir de ruta relativa  a ruta absoluta. aqui usare opererador ternario.
const convertToAbsolute = (route) => (isAbsolute(route) ? route : path.resolve(route));


//---función expresada para  obtener una lista de todos los archivos de  dentro y fuera de un directorio  -------------------------

const getAllFiles = function (dirPath) {
    let arrayOfFiles = [];
    let files = fs.readdirSync(dirPath);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()){
            arrayOfFiles.push(...getAllFiles(dirPath + "/" + file))
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
        }
    });

    return arrayOfFiles;
}

//-------- función para obtener un array  de archivos md ---------------
const getOnlyMds = function(){
    const getAllFilesMds = getAllFiles(dirPath);
    const mdsOnly = getAllFilesMds.filter((file) => {
        return path.extname(file) === ".md";
    });
     
    if(mdsOnly.length === 0) {
        console.log('Error: no existe archivos md');
    }
}

//--------recibo un archivo markdown y quiero extraer  ---------
const extractLinksFromMdFile = function(path, callback){
    //Lee el contenido del archivo Markdown de forma asíncrona.
    fs.readFile(path, 'utf8',(err, markdown)=>{
        if (err) {
            callback(err);
        } else {
          //Analiza el contenido del archivo con marked
          const analyzeContent = marked.Lexer(markdown);

          //Recorrer el arbol AST y busaca nodos que representen enlaces
          const links = analyzeContent.filter(node => node.type === 'link');

          //Extrae la informacion del enlace de cada nodo encontrado
          const linksInformation = links.map(link => ({
            text:link.text,
            href: link.href
          }));
          callback(null, linksInformation);
        }
    });
}
//--------- validar los links---------------


//Checar options.



export {
    existsRoute,
    isAbsolute,
    convertToAbsolute,
    getAllFiles,

}
