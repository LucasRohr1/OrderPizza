import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";
import { CartContext } from "../contexts";

function RootComponent() {
  const cartHook = useState([]);
  return (
    <>
      <CartContext.Provider value={cartHook}>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Outlet />
          </main>
          <aside className="sidebar-content">
            <PizzaOfTheDay />
          </aside>
        </div>
      </CartContext.Provider>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div style={{ padding: '20px' }}>
      <h1>Something went wrong!</h1>
      <pre>{error.message}</pre>
    </div>
  ),
});
