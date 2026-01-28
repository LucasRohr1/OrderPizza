# Aplicación React Básica - Padre Gino's

## ¿Qué es esto?

Esta es una aplicación web básica construida con **React**, que es una biblioteca de JavaScript para crear interfaces de usuario (UI). Es desarrollada por Meta (Facebook) y es una de las herramientas más populares para desarrollo web frontend.

## Estructura del Proyecto

```
Pizza/
├── index.html    # Archivo HTML principal
├── App.js        # Componente React de la aplicación
└── README.md     # Este archivo
```

## ¿Cómo funciona?

### 1. **index.html** - La Base HTML

Este archivo es el punto de entrada de tu aplicación web. Contiene:

#### Estructura básica:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Padre Gino's</title>
</head>
```
- **DOCTYPE**: Declara que es un documento HTML5
- **charset="UTF-8"**: Permite usar caracteres especiales (tildes, ñ, emojis, etc.)
- **viewport**: Hace que la página sea responsive (se adapte a móviles)
- **title**: El título que aparece en la pestaña del navegador

#### El contenedor de React:
```html
<div id="root">not rendered</div>
```
- Este `<div>` con id="root" es donde React "montará" toda tu aplicación
- El texto "not rendered" solo aparece si React no carga correctamente
- React reemplazará todo el contenido de este div

#### Las librerías de React:
```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
```
- **react.development.js**: La librería principal de React
- **react-dom.development.js**: La librería que permite a React interactuar con el DOM (Document Object Model) del navegador
- Se cargan desde **unpkg.com**, un CDN (Content Delivery Network) que sirve paquetes de npm
- Versión 18.3.1 de React (desarrollo, no optimizada para producción)

#### Tu código:
```html
<script src="App.js"></script>
```
- Carga tu código JavaScript personalizado

### 2. **App.js** - Tu Aplicación React

Este archivo contiene el código de tu aplicación React escrita con JavaScript puro (sin JSX).

#### El Componente App:
```javascript
const App = () => {
  return React.createElement(
    'div',
    {},
    React.createElement("h1", {}, "Padre Gino's")
  );
};
```

**¿Qué hace esto?**

- `const App = () => { ... }`: Define un componente funcional de React llamado `App`
  - Es una función de flecha (arrow function) de ES6
  - Los componentes son piezas reutilizables de UI

- `React.createElement()`: Es la forma "pura" de crear elementos en React
  - **Primer parámetro** (`'div'`): El tipo de elemento HTML a crear
  - **Segundo parámetro** (`{}`): Props (propiedades) del elemento (vacío en este caso)
  - **Tercer parámetro**: Los hijos (children) del elemento

- La estructura crea esto:
  ```html
  <div>
    <h1>Padre Gino's</h1>
  </div>
  ```

#### Renderizado de la Aplicación:
```javascript
const root_container = document.getElementById("root");
```
- Busca el elemento del DOM con id="root" (el div del HTML)
- Lo guarda en la variable `root_container`

```javascript
const root = ReactDOM.createRoot(root_container);
```
- Crea una "raíz" de React 18 (nuevo API)
- Esta raíz es el punto donde React controlará el DOM

```javascript
root.render(React.createElement(App));
```
- Renderiza (dibuja) el componente `App` dentro de la raíz
- `React.createElement(App)` crea una instancia del componente App

## ¿Cómo ejecutar la aplicación?

Tienes varias opciones:

### Opción 1: Abrir directamente en el navegador
```bash
open index.html
```
Esto abrirá el archivo en tu navegador predeterminado.

### Opción 2: Usar un servidor local (RECOMENDADO)
React funciona mejor con un servidor local:

**Con Python 3:**
```bash
python3 -m http.server 8000
```

**Con Node.js (npx):**
```bash
npx http-server -p 8000
```

Luego abre en tu navegador: `http://localhost:8000`

## Conceptos Clave de React

### 1. **Componentes**
- Son bloques de construcción reutilizables
- Pueden ser funciones (como `App`) o clases
- Retornan elementos de React que describen qué debe aparecer en pantalla

### 2. **Virtual DOM**
- React mantiene una representación virtual del DOM en memoria
- Cuando algo cambia, React compara el Virtual DOM con el DOM real
- Solo actualiza lo que cambió (muy eficiente)

### 3. **React.createElement()**
- Es la forma "bajo nivel" de crear elementos
- Normalmente se usa **JSX** en su lugar, que es más legible:
  ```jsx
  // Con JSX (más común):
  return <div><h1>Padre Gino's</h1></div>
  
  // Sin JSX (lo que estás usando):
  return React.createElement('div', {}, 
    React.createElement("h1", {}, "Padre Gino's")
  )
  ```

### 4. **ReactDOM**
- Es el "puente" entre React y el DOM del navegador
- `createRoot()`: API de React 18 para crear puntos de montaje
- `render()`: Método para renderizar componentes

## Flujo de Ejecución

1. El navegador carga `index.html`
2. Descarga las librerías de React desde unpkg.com
3. Carga `App.js`
4. Busca el elemento `#root` en el DOM
5. Crea una raíz de React en ese elemento
6. Ejecuta el componente `App()`
7. `App` retorna una estructura de elementos React
8. React convierte esos elementos en DOM real
9. El navegador muestra "Padre Gino's" en un `<h1>`

## Próximos Pasos

Para mejorar esta aplicación, podrías:

1. **Agregar más componentes**: Crear componentes para menú, pizzas, etc.
2. **Usar JSX**: Instalar Babel para usar sintaxis JSX (más legible)
3. **Agregar estado**: Usar `useState` para manejar datos dinámicos
4. **Agregar estilos**: Crear un archivo CSS
5. **Migrar a un proyecto moderno**: Usar Create React App, Vite o Next.js
6. **Agregar interactividad**: Botones, formularios, eventos

## Ventajas de este Enfoque

- ✅ **Simple**: No requiere instalación de Node.js ni build tools
- ✅ **Educativo**: Muestra cómo funciona React por debajo
- ✅ **Rápido de probar**: Solo abre el HTML en un navegador

## Desventajas

- ❌ No usa JSX (sintaxis menos legible)
- ❌ No tiene hot reload (recargar manualmente)
- ❌ No tiene módulos ES6 (import/export)
- ❌ No está optimizado para producción
- ❌ Cargar React desde CDN es más lento que bundlear localmente

## Glosario

- **React**: Biblioteca de JavaScript para crear UIs
- **DOM**: Document Object Model - representación del HTML en memoria
- **CDN**: Content Delivery Network - servidor que distribuye archivos estáticos
- **Componente**: Pieza reutilizable de UI
- **Props**: Propiedades que se pasan a componentes
- **Render**: Proceso de convertir código React en HTML visible
- **Root**: Punto de montaje donde React controla el DOM
