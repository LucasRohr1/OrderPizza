# Explicación Detallada del Componente Order.jsx

## Índice
1. [Estados del Componente](#estados-del-componente)
2. [Variables Calculadas](#variables-calculadas)
3. [Función para Traer Datos del Servidor](#función-para-traer-datos-del-servidor)
4. [useEffect Hook](#useeffect-hook)
5. [Renderizado Dinámico del Select](#renderizado-dinámico-del-select)
6. [Flujo Completo de Ejecución](#flujo-completo-de-ejecución)

---

## Estados del Componente

```javascript
const [pizzaTypes, setPizzaTypes] = useState([]);
const [pizzaType, setPizzaType] = useState("pepperoni");
const [pizzaSize, setPizzaSize] = useState("M");
const [loading, setLoading] = useState(true);
```

### **Estado 1: `pizzaTypes`**
- **Valor inicial:** `[]` (array vacío)
- **Propósito:** Guardar la lista completa de pizzas que viene del servidor/API
- **Ejemplo de datos que contendrá:**
  ```javascript
  [
    { id: "pepperoni", name: "Pepperoni Pizza", sizes: { S: 10, M: 12, L: 15 } },
    { id: "hawaiian", name: "Hawaiian Pizza", sizes: { S: 11, M: 13, L: 16 } },
    // ...más pizzas
  ]
  ```

### **Estado 2: `pizzaType`**
- **Valor inicial:** `"pepperoni"`
- **Propósito:** Guardar el tipo de pizza seleccionado actualmente
- **Valores posibles:** "pepperoni", "hawaiian", "big_meat", etc.

### **Estado 3: `pizzaSize`**
- **Valor inicial:** `"M"` (Medium)
- **Propósito:** Guardar el tamaño de pizza seleccionado
- **Valores posibles:** "S" (Small), "M" (Medium), "L" (Large)

### **Estado 4: `loading`**
- **Valor inicial:** `true` (cargando)
- **Propósito:** Indicar si los datos aún se están cargando desde el servidor
- **Flujo:** `true` → (cargando...) → `false` (datos listos)

---

## Variables Calculadas

```javascript
let price, selectedPizza;

if(!loading) {
  selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType);
  //price = selectedPizza.sizes[pizzaSize];
}
```

### **`selectedPizza`**
- Busca en el array `pizzaTypes` la pizza que coincida con la selección actual del usuario
- **Ejemplo:**
  ```javascript
  // Si pizzaType = "pepperoni"
  pizzaTypes.find(pizza => pizza.id === "pepperoni")
  // Devuelve: { id: "pepperoni", name: "Pepperoni Pizza", sizes: {...} }
  ```

### **¿Por qué el `if(!loading)`?**
- Evita errores mientras los datos se están cargando
- Si intentas hacer `.find()` en un array vacío mientras `loading = true`, no encontrarás nada

### **`price` (comentado)**
- Cuando lo descomentes, obtendrá el precio específico según el tamaño seleccionado
- Ejemplo: `selectedPizza.sizes["M"]` → precio Medium

---

## Función para Traer Datos del Servidor

```javascript
async function fetchPizzaTypes() {
  const response = await fetch("/api/pizzas");
  const pizzaJson = await response.json();  
  setPizzaTypes(pizzaJson);                   
  setLoading(false);
}
```

### **¿Qué hace cada línea?**

**Línea 1: `async function`**
- La palabra `async` permite usar `await` dentro de la función
- Las operaciones de red son asíncronas (toman tiempo)

**Línea 2: `fetch("/api/pizzas")`**
- Hace una petición HTTP GET al endpoint `/api/pizzas`
- `await` espera a que el servidor responda
- `response` contiene la respuesta completa del servidor (headers, status, body, etc.)

**Línea 3: `response.json()`**
- Convierte el body de la respuesta (texto JSON) a un objeto JavaScript
- `await` espera a que termine la conversión
- `pizzaJson` ahora es un array de objetos de pizzas

**Línea 4: `setPizzaTypes(pizzaJson)`**
- Guarda los datos en el estado `pizzaTypes`
- Esto dispara un re-render del componente

**Línea 5: `setLoading(false)`**
- Marca que la carga terminó
- Ahora el código en el `if(!loading)` puede ejecutarse

---

## useEffect Hook

```javascript
useEffect(() => {
  fetchPizzaTypes();
}, []);
```

### **¿Qué es `useEffect`?**
Es un Hook que ejecuta código cuando el componente se monta (aparece por primera vez en pantalla).

### **Parámetros:**
1. **Función:** `() => { fetchPizzaTypes(); }` - El código a ejecutar
2. **Array de dependencias:** `[]` - Vacío significa "ejecutar solo UNA vez al montar"

### **Flujo completo:**
```
1. Componente Order se renderiza por primera vez
2. useEffect se ejecuta
3. fetchPizzaTypes() se llama
4. Hace fetch a /api/pizzas
5. Recibe los datos
6. Actualiza pizzaTypes con los datos
7. Actualiza loading a false
8. Componente se re-renderiza con los datos
```

---

## Renderizado Dinámico del Select

```javascript
{pizzaTypes.map(pizza => (
  <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
))}
```

### **¿Qué hace `.map()`?**
Transforma cada elemento del array en JSX.

### **Ejemplo paso a paso:**

**Antes (datos en `pizzaTypes`):**
```javascript
[
  { id: "pepperoni", name: "Pepperoni Pizza" },
  { id: "hawaiian", name: "Hawaiian Pizza" },
  { id: "big_meat", name: "Big Meat Pizza" }
]
```

**Después (JSX generado):**
```jsx
<option key="pepperoni" value="pepperoni">Pepperoni Pizza</option>
<option key="hawaiian" value="hawaiian">Hawaiian Pizza</option>
<option key="big_meat" value="big_meat">Big Meat Pizza</option>
```

### **Propiedades importantes:**

**`key={pizza.id}`**
- React necesita una key única para cada elemento en listas
- Ayuda a React a identificar qué elementos cambiaron

**`value={pizza.id}`**
- El valor que se enviará cuando se seleccione esta opción
- Es lo que guardará `setPizzaType(e.target.value)`

**`{pizza.name}`**
- El texto visible para el usuario
- Puede ser diferente del value (ej: value="pepperoni", texto="Pepperoni Pizza")

---

## Flujo Completo de Ejecución

```
┌────────────────────────────────────────────────────┐
│ 1. Componente Order se monta                      │
│    - pizzaTypes = []                              │
│    - loading = true                               │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│ 2. useEffect se ejecuta (solo una vez)           │
│    - Llama a fetchPizzaTypes()                    │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│ 3. fetchPizzaTypes() ejecuta                      │
│    - fetch("/api/pizzas")                         │
│    - Espera respuesta del servidor...            │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│ 4. Servidor responde con JSON                     │
│    - Convierte a objeto JavaScript                │
│    - setPizzaTypes([...datos...])                 │
│    - setLoading(false)                            │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│ 5. Componente se re-renderiza                     │
│    - pizzaTypes tiene datos                       │
│    - loading = false                              │
│    - El <select> ahora tiene opciones             │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│ 6. Usuario interactúa                             │
│    - Selecciona una pizza del dropdown            │
│    - onChange actualiza pizzaType                 │
│    - selectedPizza se calcula automáticamente     │
└────────────────────────────────────────────────────┘
```

---

## Comparación: Antes vs Ahora

### **ANTES (hardcodeado):**
```jsx
<option value="pepperoni">The Pepperoni Pizza</option>
<option value="hawaiian">The Hawaiian Pizza</option>
<option value="big_meat">The Big Meat Pizza</option>
```
❌ Datos fijos en el código
❌ Para agregar pizzas, editas el código

### **AHORA (dinámico):**
```jsx
{pizzaTypes.map(pizza => (
  <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
))}
```
✅ Datos vienen del servidor
✅ Para agregar pizzas, cambias la base de datos

---

## Conceptos Clave de React

### **useState**
- Hook para agregar estado a componentes funcionales
- Devuelve un array con [valor, función_para_actualizar]
- Cuando se actualiza, el componente se re-renderiza

### **useEffect**
- Hook para efectos secundarios (side effects)
- Se ejecuta después del render
- Array de dependencias controla cuándo se ejecuta:
  - `[]` = solo al montar
  - `[variable]` = cuando variable cambia
  - Sin array = en cada render

### **async/await**
- Sintaxis moderna para manejar promesas
- `async` declara una función asíncrona
- `await` pausa la ejecución hasta que la promesa se resuelva
- Hace el código más legible que `.then().catch()`

### **Componentes Controlados**
- El valor del input está controlado por el estado de React
- React es la "fuente única de verdad"
- Cambios pasan por handlers (onChange)
- Permite validación, formateo y control total

---

## Errores Comunes

### 1. **Nombres de variables inconsistentes**
```javascript
// ❌ MAL
const response = await fetch("/api/pizzas");
const data = await pizzaResponse.json(); // ❌ pizzaResponse no existe!

// ✅ BIEN
const response = await fetch("/api/pizzas");
const data = await response.json(); // ✅ usa 'response'
```

### 2. **Olvidar el array de dependencias en useEffect**
```javascript
// ❌ MAL - se ejecuta en cada render
useEffect(() => {
  fetchPizzaTypes();
});

// ✅ BIEN - se ejecuta solo una vez
useEffect(() => {
  fetchPizzaTypes();
}, []);
```

### 3. **No verificar si los datos están cargados**
```javascript
// ❌ MAL - error si pizzaTypes está vacío
const selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType);

// ✅ BIEN - verifica antes de usar
if(!loading) {
  const selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType);
}
```

### 4. **Olvidar key en .map()**
```javascript
// ❌ MAL - React mostrará warning
{pizzaTypes.map(pizza => (
  <option value={pizza.id}>{pizza.name}</option>
))}

// ✅ BIEN - incluye key única
{pizzaTypes.map(pizza => (
  <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
))}
```

---

## Recursos para Aprender Más

- **React Docs - useState:** https://react.dev/reference/react/useState
- **React Docs - useEffect:** https://react.dev/reference/react/useEffect
- **MDN - Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **MDN - async/await:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

---

**Fecha de creación:** 2026-01-27
**Proyecto:** Pizza App - Padre Gino's
