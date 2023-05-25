#! /usr/bin/env node
import { resolvePlugin } from "@babel/core";
import chalk from 'chalk';

import { statsTotal, brokenStats, uniqueStats, mdLinks } from "./index.js"

const filePath = process.argv[2];

// mdLinks(filePath, { validate: true })
//     .then(info => {
//         console.log(info)
//     })
//     .catch(err => {
//         console.log(err)
//     })


//Checar options.
if (process.argv[2] === undefined) {
    console.log("Por favor ingrese una ruta o escriba --help");
} else if (process.argv[3] === undefined) {
    mdLinks(filePath, { validate: false })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

}

else if (process.argv[2] === "--help") {
    console.log(chalk.bold.cyan(`Para validar los links de tu(s) archivo(s), puedes usar las siguientes opciones:

                --validate: Revisa si tu(s) link(s) funciona o no, 
                --stats: Te dará la cantidad total de links y cantidad de links unicos,
                --validate--stats: Te dará la cantidad total de links,cantidad de links unicos
                                   y cantidad de links rotos"`));
} else  {
    mdLinks(filePath, { validate: true })
        .then((res) => {
            const total = `Total: ${statsTotal(res)}`;
            const unique = `Unique: ${uniqueStats(res)}`;
            const broken = `Broken: ${brokenStats(res)}`;
            const election1 = process.argv[4] === "--stats" && process.argv[3] === "--validate";
            const election2 = process.argv[4] === "--validate" && process.argv[3] === "--stats";
            const election3 = process.argv[3] === "--validate" && process.argv[4] === undefined;

            if (election1 || election2) {
                console.log(chalk.bgCyan.black("Cargando Links: "));
                console.log(chalk.bold.magenta(`${total}\n${unique}\n${broken}`));
            } else if (process.argv[3] === "--stats") {
                console.log(chalk.bgCyan.black("Cargando Links: "));
                console.log(chalk.bold.yellow(`${total}\n${unique}`));
            } else if (election3) {
                console.log(res);
            } else {
                console.log(chalk.bold.blueBright(`Escribe "md-links --help" para mayor informacion de tus links"                            
            `));
            }
        })



}











// mdLinks(filePath, {validate: true})
//     .then((res) => {
//         const total = `Total: ${statsTotal(res)}`;
//         const unique = `Unique: ${uniqueStats(res)}`;
//         const broken = `Broquen: ${brokenStats(res)}`;
//         const election1 = fp.argv[4] === "--stats" && fp.argv[3] === "--validate";
//         const election2 = fp.argv[4] === "--validate" && fp.argv[3] === "--stats";
//         const election3 = fp.argv[3] === "--validate" && fp.argv[4] === undefined;

//         if (election1 || election2) {
//             console.log(`${total}\n${unique}\n${broken}`);
//         } else if (fp.argv[3] === "--stats") {
//             console.log(`${total}\n${unique}`);
//         } else if (election3) {
//             console.log(res);
//         } else {
//             console.log("Escribir una opcion");
//         }
//     })