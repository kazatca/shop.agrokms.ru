/* global __dirname */
import React from 'react';
import {readFileSync} from 'fs';
import {renderToString} from 'react-dom/server';
import {toJSON} from 'transit-immutable-js';
import {Helmet} from 'react-helmet';
import {createStore, applyMiddleware} from 'redux';
import {createMemoryHistory as createHistory} from 'history';
import {routerMiddleware, push} from 'react-router-redux';

import reducer from '../../client/src/reducer.js';
import App from '../../client/src/components/App.jsx';

import {getAll as getStoreFront} from './controllers/StoreFront.js';
import {getAll as getStores} from './controllers/Store.js';

import {set as setProducts} from '../../client/src/actions/products.js';
import {setGMapKey} from '../../client/src/actions/creds.js';
import {setStores} from '../../client/src/actions/stores.js';

const tmpl = readFileSync(`${__dirname}/../../client/dist/index.html`, 'utf-8');

const makeApp = () => {
  const history = createHistory();

  const store = createStore(
    reducer, 
    applyMiddleware(routerMiddleware(history))
  );

  store.dispatch(setGMapKey(process.env.GMAP_KEY));

  return Promise.all([
    getStoreFront().then(storeFront => 
      store.dispatch(setProducts(storeFront.products))),
    getStores().then(stores => 
      store.dispatch(setStores(stores)))
  ])
  .then(() => {
    return {store, history};
  });
};

const renderPage = path => {
  return makeApp()
  .then(({store, history}) => {
    store.dispatch(push(path));
    
    const html = renderToString(<App store={store} history={history} />);
    const head = Helmet.renderStatic();
    const initState = toJSON(store.getState());

    return tmpl
      .replace(/<!-- title -->/, head.title.toString())
      .replace(/<!-- html -->/, html)
      .replace(/\/\* init state \*\//, `window.__INIT_STATE__ = '${initState}';`);
  });
};

export default renderPage;
