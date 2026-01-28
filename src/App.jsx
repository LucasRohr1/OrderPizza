
import ReactDOM from 'react-dom/client';
import Pizza from './Pizza';
import './style.css';

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza 
        name="Pepperoni" 
        description="Mozzarella cheese, pepperoni"
        image="/public/pizzas/pepperoni.webp"
      />
      <Pizza 
        name="Hawaiian" 
        description="Ham, pineapple, mozzarella cheese"
        image="/public/pizzas/hawaiian.webp"
      />
      <Pizza 
        name="The Big Meat" 
        description="Bacon, pepperoni, Italian sausage, chorizo sausage"
        image="/public/pizzas/big_meat.webp"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
