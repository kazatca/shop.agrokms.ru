/* global __dirname */
import React from 'react';
import {readFileSync} from 'fs';
import {renderToString} from 'react-dom/server';
import {toJSON} from 'transit-immutable-js';
import {Helmet} from 'react-helmet';
import {createStore, applyMiddleware} from 'redux';
import {createMemoryHistory as createHistory} from 'history';
import {routerMiddleware, push} from 'react-router-redux';

import reducer from '../../client/src/reducer';
import App from '../../client/src/components/App';

import {getAll as getStoreFront} from './controllers/StoreFront';

import {set as setProducts} from '../../client/src/actions/products';

const tmpl = readFileSync(`${__dirname}/../../client/dist/index.html`, 'utf-8');

const renderPage = path => {
  return getStoreFront()
  .then(storeFront => {
    const history = createHistory();

    const store = createStore(
      reducer, 
      applyMiddleware(routerMiddleware(history))
    );

    store.dispatch(push(path));
    store.dispatch(setProducts(storeFront.products));

    const html = renderToString(<App 
      store={store}
      history={history}
    />);
    
    const head = Helmet.renderStatic();

    const initState = toJSON(store.getState());

    return tmpl
      .replace(/<!-- title -->/, head.title.toString())
      .replace(/<!-- html -->/, html)
      .replace(/\/\* init state \*\//, `window.__INIT_STATE__ = '${initState}';`);
  });
};

export default renderPage;
