/* global __dirname */
import React from 'react';
import {readFileSync} from 'fs';
import {renderToString} from 'react-dom/server';
import {toJSON} from 'transit-immutable-js';

import {createStore, applyMiddleware} from 'redux';
import {createMemoryHistory as createHistory} from 'history';
import {routerMiddleware, push} from 'react-router-redux';


import reducer from '../../client/src/reducer';
import App from '../../client/src/components/App';

import {set as setProducts} from '../../client/src/actions/products';

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

const tmpl = readFileSync(`${__dirname}/../../client/dist/index.html`, 'utf-8');

const renderPage = path => {
  const history = createHistory();

  const store = createStore(
    reducer, 
    applyMiddleware(routerMiddleware(history))
  );

  store.dispatch(push(path));
  store.dispatch(setProducts([coffee, burger]));

  const html = renderToString(<App 
    store={store}
    history={history}
  />);

  const initState = toJSON(store.getState());

  return tmpl
    .replace(/<!-- html -->/, html)
    .replace(/\/\* init state \*\//, `window.__INIT_STATE__ = ${initState};`);
};

export default renderPage;
