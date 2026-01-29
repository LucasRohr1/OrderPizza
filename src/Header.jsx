import { useContext } from "react";
import { CartContext } from "./contexts";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const [cart] = useContext(CartContext);
  return (
    <nav>
      <Link to="/" className="logo-link">
        <img 
          src="/public/padre_gino.svg" 
          alt="Padre Gino's Logo" 
          className="logo-icon"
        />
      </Link>
      <div className="nav-cart">
        <span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
