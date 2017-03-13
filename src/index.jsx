import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import {set as setProducts} from './actions/products';
import reducer from './reducer';

import App from './components/App';


const coffee = {
  id: '1',
  name: 'Coffee',
  price: 15,
  image: '/coffee.png'
};

const burger = {
  id: '2', 
  name: 'Burger',
  price: 40,
  image: '/burger.png'
};

const store = createStore(reducer);

store.dispatch(setProducts([coffee, burger]));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);