#! /usr/bin/env node
import { resolvePlugin } from "@babel/core";
import {
    existsRoute,
    convertToAbsolute,
    readMultiplesMdsFiles,
    findLinksInMultipleFiles,
    getAllFiles, validator
} from "./api.js";

const filePath = process.argv[2];
// console.log(getAllFiles(filePath));


// const mdLinks = (process.argv[2], options = {}) => {
//   return new Promise((resolve, reject) => {

if (existsRoute(filePath) === false) {
    console.log("Esta ruta no existe, intente con otra.");
} else {
    console.log("Esta es la ruta convertida" + " " + convertToAbsolute(filePath));
    let allFiles = getAllFiles(filePath);
    console.log(allFiles);
    if (readMultiplesMdsFiles(allFiles).length !== 0) {
        findLinksInMultipleFiles(allFiles)
            .then((res) => {
                console.log("cargando links");
                validator(res).then((val) => {
                    console.log(val);
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}



//     })
// }







// .then(links => {
//     console.log('Enalces encontrados:');
//     for(const link of links) {
//         console.log(`Enlace: ${link.text}`);
//         console.log(`URL: ${link.href}`);
//         console.log(`Archivo: ${link.file}`);
//     }
// })
// .catch(err => {
//     console.log('Error', err);
// })













//------STATS--------
//cantidad de links
const statsTotal = (links) => {
    const linksTotal = links.length;
    return linksTotal;
};

// cantidad de links rotos 
const brokenStats = (links) => {
    const brokenLinks = links.filter((link) => link.message === "FAIL")
    return brokenLinks.length;
}

const uniqueStats = (links) => {
    const uniqueLinks = [...new Set(links.map((link) => link.href))]
    return uniqueLinks.length
}

export {
    statsTotal,
    brokenStats,
    uniqueStats
}