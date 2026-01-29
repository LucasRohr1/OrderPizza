import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Order from "./Order";
import Cart from "./Cart";
import Header from "./Header";
import { CartContext } from "./contexts";
import "./style.css";

const App = () => {
  const cartHook = useState([]);
  const [cart, setCart] = cartHook;

  /**
   * Procesa el checkout del pedido
   * Responsabilidad única: comunicarse con la API y limpiar el carrito
   */
  async function checkout() {
    try {
      // Enviar el pedido al servidor mediante HTTP POST
      await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      // Limpiar el carrito después de un checkout exitoso
      setCart([]);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <div className="layout-container">
            <PizzaOfTheDay />
            <Order />
            <Cart checkout={checkout} />
          </div>
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
