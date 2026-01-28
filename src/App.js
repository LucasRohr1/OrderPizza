import React from 'react';
import { createRoot } from 'react-dom/client';

const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "The Margherita",
      description: "Tomate, mozzarella fresca, albahaca y aceite de oliva, la pizza napolitana clásica",
    }),
    React.createElement(Pizza, {
      name: "The Marinara",
      description: "Tomate, ajo, orégano y aceite de oliva, sin queso, auténtica de Nápoles",
    }),
    React.createElement(Pizza, {
      name: "The Four Cheese",
      description: "Mozzarella, gorgonzola, parmesano y fontina, una explosión de quesos italianos",
    }),
    React.createElement(Pizza, {
      name: "The Spicy Diavola",
      description: "Tomate, mozzarella y salame picante, para los amantes del picante",
    }),
    React.createElement(Pizza, {
      name: "The Capricciosa",
      description: "Jamón, champiñones, alcachofas, aceitunas y mozzarella, la favorita italiana",
    }),
    React.createElement(Pizza, {
      name: "The Prosciutto",
      description: "Jamón cocido y champiñones frescos sobre mozzarella, un clásico del norte",
    }),
  ]);
};

const root_container = document.getElementById("root");
const root = createRoot(root_container);
root.render(React.createElement(App));
