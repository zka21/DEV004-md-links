import {
    existsRoute,
    convertToAbsolute,
    readMultiplesMdsFiles,
    findLinksInMultipleFiles,
    getAllFiles, validator, getOnlyMds
} from "./api.js";

// import { c}
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

const mdLinks = (filePath, options = {}) => {
    return new Promise((resolve, reject) => {

        if (existsRoute(filePath) === false) {
            reject("Esta ruta no existe, intente con otra.");
        } else {
            console.log("Esta es la ruta convertida" + " " + convertToAbsolute(filePath));
            let allFiles = getAllFiles(filePath);
            let allFilesMd = getOnlyMds(allFiles);

            // if(allFiles.length == 0) {
            //     reject('no hay archivos ')
            // }
            console.log(allFilesMd);

            getOnlyMds(allFiles)


            findLinksInMultipleFiles(allFilesMd)
                .then((res) => {
                    console.log("cargando links");
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