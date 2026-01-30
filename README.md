# Padre Gino's Pizza 🍕

Aplicación web completa de pizzería construida con React 19 y TanStack Router. Permite explorar el menú de pizzas, agregar al carrito, realizar pedidos, ver pedidos anteriores y enviar formularios de contacto. El front end esta inspirado en el siguiente curso, y el servidor backend proviene tambien del curso [**Complete Intro to React v9**](https://github.com/btholt/complete-intro-to-react-v9) de **Brian Holt** para Frontend Masters.

## ¿Qué es esta aplicación?

Una aplicación full-stack de pizzería con:
- **Frontend**: React moderno con routing, state management y optimistic updates
- **Backend**: API REST con Fastify y SQLite (del curso de Frontend Masters)
- **Base de datos**: SQLite con datos reales de pedidos de pizzas

## Características Principales

### 📱 Funcionalidades
- **Menú de pizzas**: Explora todas las pizzas disponibles con sus descripciones
- **Pizza del día**: Una pizza destacada que cambia diariamente
- **Carrito de compras**: Agrega pizzas, modifica cantidades
- **Sistema de pedidos**: Crea y consulta pedidos
- **Historial**: Ve todos los pedidos anteriores paginados
- **Formulario de contacto**: Envía mensajes al restaurante
- **Notificaciones Toast**: Feedback visual para acciones del usuario

### 🛠️ Tecnologías y Conceptos de React Utilizados

#### Routing
- **TanStack Router v1**: File-based routing moderno
- Lazy loading de rutas para code splitting
- Error boundaries y páginas 404 personalizadas

#### State Management
- **Context API**: 
  - `CartContext` para el carrito de compras global
  - `NotificationContext` para el sistema de notificaciones
- **TanStack Query v5**: 
  - Cache de datos del servidor
  - Optimistic updates
  - Invalidación automática de queries
  - Loading y error states

#### Custom Hooks
- `usePizzaOfTheDay`: Fetching de la pizza destacada
- `useCurrency`: Formateo de precios (lazy loading)
- `useNotification`: Manejo de notificaciones toast

#### Componentes y Patrones
- Componentes funcionales con React 19
- Lazy loading de componentes
- Modal reutilizable para el carrito
- Separation of concerns (UI vs logic)

#### Testing
- **Vitest**: Framework de testing
- **Testing Library**: Testing de componentes
- **happy-dom**: DOM virtual para tests
- Mocking de APIs con `vitest-fetch-mock`
- Snapshot testing

#### Herramientas de Desarrollo
- **Vite**: Build tool y dev server
- **ESLint**: Linting de código
- **TanStack DevTools**: Debugging de Router y Query
- Hot Module Replacement (HMR)

## Estructura del Proyecto

```
Pizza/
├── src/
│   ├── routes/              # Páginas de la aplicación (TanStack Router)
│   │   ├── __root.jsx       # Layout principal
│   │   ├── index.lazy.jsx   # Home (menú de pizzas)
│   │   ├── order.lazy.jsx   # Página de pedido
│   │   ├── past.lazy.jsx    # Historial de pedidos
│   │   └── contact.lazy.jsx # Formulario de contacto
│   ├── api/                 # Funciones para llamadas a la API
│   ├── __tests__/           # Tests unitarios
│   ├── contexts.jsx         # Context API (CartContext)
│   ├── NotificationContext.jsx  # Sistema de notificaciones
│   ├── Toast.jsx            # Componente de notificaciones
│   ├── Cart.jsx             # Componente del carrito
│   ├── Pizza.jsx            # Card de pizza individual
│   ├── PizzaOfTheDay.jsx    # Componente de pizza destacada
│   └── Modal.jsx            # Modal reutilizable
├── api/                     # Servidor backend (Fastify)
│   ├── server.js            # API REST endpoints
│   ├── pizza.sqlite         # Base de datos SQLite
│   └── public/              # Assets estáticos (imágenes de pizzas)
├── package.json
└── vite.config.js
```

## Instalación y Ejecución

### 1. Instalar dependencias del frontend
```bash
npm install
```

### 2. Instalar dependencias del servidor
```bash
cd api
npm install
cd ..
```

### 3. Ejecutar en desarrollo
```bash
# Terminal 1: Frontend (puerto 5173)
npm run dev

# Terminal 2: Servidor (puerto 5173)
cd api
npm start
```

### 4. Ejecutar tests
```bash
npm test
```

### 5. Build para producción
```bash
npm run build
npm run preview
```

## API / Servidor

El servidor backend proviene del curso [**Complete Intro to React v9**](https://github.com/btholt/complete-intro-to-react-v9) de **Brian Holt** para Frontend Masters.
