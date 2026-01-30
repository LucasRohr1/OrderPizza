import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  /**
   * Agrega un item al carrito
   * Responsabilidad única: actualizar el estado del carrito
   */
  const addToCart = (item) => {
    setCart([...cart, item]);
  };


  let price, selectedPizza;

  if(!loading) {
    selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType);
    
    // Verificar que selectedPizza existe antes de acceder a sus propiedades
    if (selectedPizza) {
      price = intl.format(selectedPizza.sizes[pizzaSize]);
    }
  }

  async function fetchPizzaTypes() {
    const response = await fetch("/api/pizzas");
    const pizzaJson = await response.json();
    setPizzaTypes(pizzaJson);
    
    // Establecer el primer tipo de pizza automáticamente después de cargar
    if (pizzaJson.length > 0) {
      setPizzaType(pizzaJson[0].id);
    }
    
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  /**
   * Maneja el submit del formulario
   * Delega la lógica de agregar al carrito al contexto
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedPizza) return;

    addToCart({
      pizza: selectedPizza,
      size: pizzaSize,
      price: price,
    });
  };

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type:</label>
            <select
              id="pizza-type"
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map(pizza => (
                <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {
          loading ? (
            <h3>Loading pizza...</h3>
          ) : selectedPizza ? (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          ) : (
            <h3>No pizza selected</h3>
          )
        }
      </form>
    </div>
  );
}