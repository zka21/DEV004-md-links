# Markdown Links

## Índice

* [1. Resumen del proyecto](#2-resumen-del-proyecto)
* [2. Objetivos de aprendizaje](#2-objetivos-de-aprendizaje)
* [3. Diagrama de Flujo](#3-diagrama-de-flujo)
* [4. Instalacion y Uso](#4-instalacion-y-uso)
* [5. Pruebas Unitarias](#5-pruebas-unitarias)

***

## 2. Resumen del proyecto

Markdown es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir. 

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando Node.js, que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Objetivos de aprendizaje

### JavaScript

- [✅] **Diferenciar entre tipos de datos primitivos y no primitivos**

- [✅ ] **Arrays (arreglos)**


  * Arreglos
  * Array
  * Array.prototype.sort()
  * Array.prototype.forEach()
  * Array.prototype.map()
  * Array.prototype.filter()
  * Array.prototype.reduce() 


- [✅] **Objetos (key, value)**


  * Objetos en JavaScript



- [✅ ] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**


  * Estructuras condicionales y repetitivas
  * Tomando decisiones en tu código — condicionales

- [✅] **Funciones (params, args, return)**


  * Funciones (control de flujo)
  * Funciones clásicas
  * Arrow Functions
  * Funciones — bloques de código reutilizables

- [✅] **Recursión o recursividad**

- [✅] **Módulos de CommonJS**



- [✅] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- [✅] **Callbacks**


  * Función Callback 

- [✅] **Promesas**


  * Promise
 

- [✅] **Pruebas unitarias (unit tests)**


- [✅] **Pruebas asíncronas**


  * Tests de código asincrónico con Jest

- [✅] **Uso de mocks y espías**

  
- [✅] **Pruebas de compatibilidad en múltiples entornos de ejecución**

- [✅] **Uso de linter (ESLINT)**

- [✅] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

- [✅] **Instalar y usar módulos con npm**

- [✅] **Configuración de package.json**

- [✅] **Configuración de npm-scripts**

- [✅] **process (env, argv, stdin-stdout-stderr, exit-code)**

- [✅] **File system (fs, path)**

### Control de Versiones (Git y GitHub)

- [✅] **Git: Instalación y configuración**

- [✅] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [✅] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [✅] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [✅] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [✅] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- [✅] **Consulta o petición (request) y respuesta (response).**



- [✅] **Códigos de status de HTTP**




## 3. Diagrama de Flujo

##### API
![api](/Imagenes/api.png)

##### CLI (Linea de Comandos)
![api](/Imagenes/cli.png)


## 4. Instalacion y Uso

#### Instalación
Mediante npm, colocando en la terminal:

npm ----

#### Uso

##### Este proyecto consta de DOS partes

### 1) JavaScript API

##### Valor de retorno

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

Comando principal:
#### `md-links`


#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

![validate](/Imagenes/--validate.png)

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

Por ejemplo:

![stats](/Imagenes/--stats.png)

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

Por ejemplo:

![statsyvalidate](/Imagenes/--validate%20--stats.png)


## 5. Pruebas Unitarias

