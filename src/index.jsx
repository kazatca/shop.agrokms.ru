import React from 'react';
import ReactDOM from 'react-dom';

// import App from './components/App';
import Cart from './components/Cart';

const coffee = {
  id: 1,
  name: 'Coffee',
  image: '/coffee.png',
  qty: 1,
  price: 50
};
const burger = {
  id: 2,
  name: 'Burger',
  image: '/burger.png',
  qty: 2,
  price: 130
};


ReactDOM.render(
  <Cart
    items={[coffee, burger]}
  />,
  document.getElementById('app')
);