import { useContext } from "react";
import { CartContext } from "./contexts";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Cart({ checkout }) {
  const [cart] = useContext(CartContext);
  
  let total = 0;
  for(let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }
  
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>🛒</p>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div className="cart-item-header">
                  <span className="cart-item-name">{item.pizza.name}</span>
                  <span className="size-badge">{item.size}</span>
                </div>
                <p className="cart-item-description">{item.pizza.description}</p>
                <div className="cart-item-price">{item.price}</div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total:</span>
            <span className="cart-total-amount">{intl.format(total)}</span>
          </div>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}