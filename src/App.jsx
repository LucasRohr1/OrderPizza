
import ReactDOM from 'react-dom/client';
import {StrictMode} from 'react';
//import Pizza from './Pizza';
import './style.css';
import Order from './Order';

const App = () => {
  return (
    <StrictMode>  
      <div>
      <h1>Padre Gino's - Order Now</h1>
        <Order />
      </div>
    </StrictMode>
    
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
