import { existsRoute, 
  isAbsolute, 
  convertToAbsolute, 
  getAllFiles, 
  getOnlyMds,
  contentOfFiles,
  findLinksInFile,
  validator
} from "../api";

import {
  statsTotal,
  brokenStats,
  uniqueStats,
  mdLinks
} from "../index"
//import { fileURLToPath } from 'url';
// jest.mock('../api.js', ()=>{
//   fileURLToPath: jest.fn(()=> './directory/su-directory/test')
// })
// crear carpeta y seguir la documentacions
// jest.createMockFromModule('url')
// describe('mdLinks', () => {

//   it('should...', () => {
    
//     expect(mdLinks)
//   });
  
// });

describe(existsRoute, () => {
 
  it('deberia validar si la ruta existe', () => {
    expect(existsRoute('./README.md')).toBe(true);
  });

  it('deberia retornar false cuando la ruta no existe', () => {
    expect(existsRoute('./noexistenarchivos.txt')).toBe(false);
  });
});

describe(isAbsolute, () => {
  it('si la ruta no es absoluta', () => {
    expect(isAbsolute('./README.md')).not.toBeTruthy();
  })
})

describe(convertToAbsolute, () => {
  it('Deberia cambiar una ruta relativa a una ruta absoluta', () => {
    const pathAbs = "C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\README.md";
    expect(convertToAbsolute('./README.md')).toBe(pathAbs);
  })
})

describe(getAllFiles, () => {
  it('Deberia retornar las un array de todos los archivos de un directorio', () => {
    const dirPath = ["C:\Users\Zhaida\Documents\laboratoria proyectos\DEV004-md-links\directory\su-directory\sub-sub-directory\secret.md",
    "C:\Users\Zhaida\Documents\laboratoria proyectos\DEV004-md-links\directory\su-directory\sub-sub-directory\secret.md",
    "C:\Users\Zhaida\Documents\laboratoria proyectos\DEV004-md-links\directory\su-directory\test\zv.txt"
  ]
    // expect(getAllFiles('./directory/su-directory/test')).toBe(dirPath);
    expect(getAllFiles('./directory/su-directory/test')).toHaveBeenCalled()
  })
})

describe(getOnlyMds, () => {
  it('Deberia retornar una array con solo archivos md', () => {
    const onlyMd = [ 
    "C:\Users\Zhaida\Documents\laboratoria proyectos\DEV004-md-links\directory\su-directory\sub-sub-directory\secret.md",
    "C:\Users\Zhaida\Documents\laboratoria proyectos\DEV004-md-links\directory\su-directory\sub-sub-directory\secret.md"
  ]
    expect(getOnlyMds('./directory/su-directory/test')).toBe(onlyMd);
  })
})

describe(contentOfFiles, () => {
  it('Deberia leer un archivo', () => {
    const readFile = contentOfFiles("./directory/su-directory/test/ejemplo.md");
    return readFile.then((res) => {
      expect(res).toBe("hola");
    })
  })

  it('Deberia dar un error', () => {
    const readFile = contentOfFiles("./directory/su-directory/test/otroEjemplo.md");
    return readFile.catch((error) => {
      expect(error).toBe("No se puede leer el archivo");
    })
  })
})

describe(findLinksInFile, () => {
  it('Deberia encontrar todos los links de un archivo', () =>{
    const links = [
      {
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md'
      },
      {
        text: 'Node.js',
        href: 'https://nodejs.org/',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md'
      },
      {
        text: 'Node.js',
        href: 'https://nodejs.org/es/',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md'
      },
      {
        text: 'motor de JavaScript V8 de Chrome',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md'
      }
  ]
  expect(findLinksInFile('./directory/su-directory/test')).toBe(links)
  })
})

describe(validator,() =>{
  it('Deberia validar que el link funciona', () => {
    const validatorLink = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md',
        status: 200,
        message: 'OK'
      }
    ];
     return validator('./directory/su-directory/test').then((res) =>{
      expect(res).toBe(validatorLink);
     });
  });

  it('Deberia validar cuando el link no funciona', () => {

  })
})

describe("statsTotal", () => {
  it("Cantidad de links", () => { 
    const link = [
      {
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md'
              
      }
    ]
    const statsT = statsTotal(link)
    expect(statsT).toBe(1) 
  });
});

describe("bronkenStats", () => {
  it("Debería decirnos cuantos links estan rotos", () => { 
    const link = [
      {
        href: 'https://app.slack.com/zhaida.jpg',
        text: 'Slack',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\sub-sub-directory\\secret.md',
        status: 404,
        message: 'FAIL'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md',
        status: 200,
        message: 'OK'
      }
    ]
    const bronken = brokenStats(link)
    expect(bronken).toBe(1) 
  });
});

describe("uniqueStats", () => {
  it("Debería decirnos cuantos links unicos hay", () => { 
    const link = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://app.slack.com/zhaida.jpg',
        text: 'Slack',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\sub-sub-directory\\secret.md',
        status: 404,
        message: 'FAIL'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\test\\vz.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://app.slack.com/zhaida.jpg',
        text: 'Slack',
        file: 'C:\\Users\\Zhaida\\Documents\\laboratoria proyectos\\DEV004-md-links\\directory\\su-directory\\sub-sub-directory\\secret.md',
        status: 404,
        message: 'FAIL'
      }
      
    ]
    const unique = uniqueStats(link)
    expect(unique).toBe(2) 
  });
});

