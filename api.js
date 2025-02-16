import fs from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { template } from '@babel/core';


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
    const __filename = fileURLToPath(import.meta.url);// para obtener la ruta completa
    const __dirname = path.dirname(__filename);// para obtener el directorio actual

    files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            // use el operador spread para descomponer los elementos de un array y agregarlo individualmente a otro array
            arrayOfFiles.push(...getAllFiles(dirPath + "/" + file))
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
        }
    });

    return arrayOfFiles;
}

//-------- función para obtener un array  de archivos md ---------------
const getOnlyMds = (arrayFiles) => {
    const mdsOnly = arrayFiles.filter((file) => {
        return path.extname(file) === ".md";
    });

    if (mdsOnly.length === 0) {
        console.log('Error: no existe archivos md');
    }

    return mdsOnly;
}

//--------funcion para leer archivo  ---------
const contentOfFiles = (route) => new Promise((resolve, reject) => {
    // console.log("ëste es route " + route);
    fs.readFile(route, "utf-8", (err, string) => {
        if (err) {
            reject("No se puede leer el archivo");
        } else {
            //console.log("este es un string" + string);
            resolve(string);
        }
    });
});

//----------funcion para leer varios archivos--------
const readMultiplesMdsFiles = (filePaths) => {
    const promises = filePaths.map(filePath => contentOfFiles(filePath));

    return Promise.all(promises);
}

//--------funcion para encontrar links en un archivo md-------
const findLinksInFile = (filePath, fileContent) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/gm;
    const matches = [...fileContent.matchAll(linkRegex)];
    const links = [];

    if (matches.length === 0) {
        console.log('Hay un archivo(s) que no tiene links');
        // return links
    }

    for (const match of matches) {
        const [, text, href, file] = match;
        links.push({
            text,
            href,
            file: filePath
        });
        
    }
    return links;
}
//--------funcion para encontrar links de multiples archivos md-------
const findLinksInMultipleFiles = (filePaths) => {
    return readMultiplesMdsFiles(filePaths)
        .then(textFiles => {

            // console.log(textFiles);
            const allLinks = [];
            //console.log("tecttt" + textFiles);
            for (let i = 0; i < filePaths.length; i++) {
                if (filePaths.length !== 0) {
                    const filePath = filePaths[i];
                    const ContentFile = textFiles[i];
                    // console.log("esto es content of file" + ContentFile);
                    // console.log("esto es file path" + filePath);
                    const linksInFile = findLinksInFile(filePath, ContentFile);
                    allLinks.push(...linksInFile);
                }
            }
            // console.log(allLinks);
            return Promise.resolve(allLinks);
        })
        .catch(err => {
            console.log("No se pudo obtener las propiedades del link", err);
            return Promise.reject(err)
        });

}

//--------- validar los links---------------

const validator = (arrayOfObjOfLinks) => {
    return Promise.all(
       

        arrayOfObjOfLinks.map((cambiarnombre) => {
            return axios
                .get(cambiarnombre.href)
                .then((res) => {
                    const axios = {
                        href: cambiarnombre.href,
                        text: cambiarnombre.text,
                        file: cambiarnombre.file,
                        status: res.status,
                        message: "OK"
                    }
                    return axios;
                })
                .catch((err) => {

                    const axios = {
                        href: cambiarnombre.href,
                        text: cambiarnombre.text,
                        file: cambiarnombre.file,
                        status: err?.response?.status,
                        message: "FAIL",
                    };
                    return axios;
                });
        })
    );

}
export {
    existsRoute,
    isAbsolute,
    convertToAbsolute,
    getAllFiles,
    contentOfFiles,
    getOnlyMds,
    findLinksInFile,
    findLinksInMultipleFiles,
    readMultiplesMdsFiles,
    validator
};
