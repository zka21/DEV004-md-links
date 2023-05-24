import {
    existsRoute,
    convertToAbsolute,
    readMultiplesMdsFiles,
    findLinksInMultipleFiles,
    getAllFiles, validator, getOnlyMds
} from "./api.js";

const mdLinks = (filePath, options = {}) => {
    return new Promise((resolve, reject) => {

        if (existsRoute(filePath) === false) {
            reject("Tu ruta no existe, intente con otra.");
        } else {
            console.log("Ruta ingresada:" + " " + convertToAbsolute(filePath));
            let allFiles = getAllFiles(filePath);
            let allFilesMd = getOnlyMds(allFiles);

            // if(allFiles.length == 0) {
            //     reject('no hay archivos ')
            // }
            // console.log(allFilesMd); esto es para mostrar los archi md.

            // getOnlyMds(allFiles)

          

            findLinksInMultipleFiles(allFilesMd)
                .then((res) => {
                    validator(res).then((val) => {
                        resolve(val);
                    }) .catch((err) => {
                        reject(err)
                    }); 
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
};


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
    uniqueStats,
    mdLinks,
}





//-----practicando promesas -------
// const getDatos = () => {
//     return new Promise((resolve, reject) => {
//         getName().then((infoNombre) => {
//             resolve(`El nombre es: ${infoNombre}`)
//         })
//     })
// }

// const getName = () => {
//     return new Promise((resolve, reject) => {
//         resolve('Zhaida');
//     })
// }