import {useState, useEffect} from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if(!loading) {
    selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType);
    //price = selectedPizza.sizes[pizzaSize];
  }

  async function fetchPizzaTypes() {
    const response = await fetch("/api/pizzas");
    const pizzaJson = await response.json();  
    setPizzaTypes(pizzaJson);                   
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
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
        <div className="order-pizza">
          <Pizza
            name="Pepperoni"
            description="Mozzarella Cheese, Pepperoni"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  );
}