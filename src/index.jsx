import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import {Route} from 'react-router';
import {NavLink} from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import {set as setProducts} from './actions/products';
import {combineReducers} from './reducer';
import cartReducers from './reducers/cart';
import productsReducers from './reducers/products';

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

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    cart: cartReducers,
    products: productsReducers,
    router: routerReducer
  }), 
  applyMiddleware(routerMiddleware(history))
);

store.dispatch(setProducts([coffee, burger]));

const AboutPage = () => {
  return (
    <div className="about">o.O</div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavLink to="/">StoreFront</NavLink>
        <NavLink to="/about">About</NavLink>
        <Route exact path="/" component={App} />
        <Route path="/about" component={AboutPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);