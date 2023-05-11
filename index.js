#! /usr/bin/env node
import { getAllFiles } from "./api.js"

const filePath = process.argv[2];
console.log(getAllFiles(filePath));


const mdLinks = (filePath)=> {

}
















// const mdLinks = (path = "./README.md", options = {}) => {
//   return new Promise((resolve, reject) => {

//     if (!existsRoute(path)) {
//       reject("Esta ruta no existe");
//     } else {
//       convertToAbsolute(path);
//     }

//   })
// }