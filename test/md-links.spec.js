import  { mdLinks } from '../index';
import { existsRoute, isAbsolute, convertToAbsolute} from "../api";


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
});

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