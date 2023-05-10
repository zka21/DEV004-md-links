import { existsRoute, convertToAbsolute } from "./api.js"

const mdLinks = (path = "./README.md", options = {}) => {
  return new Promise((resolve, reject) => {

    if (!existsRoute(path)) {
      reject("Esta ruta no existe");
    } else {
      convertToAbsolute(path);
    }

  })
}

mdLinks();
export {
  mdLinks
};