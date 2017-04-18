import {createStore, applyMiddleware} from 'redux';
import {createMemoryHistory as createHistory} from 'history';
import {routerMiddleware, push} from 'react-router-redux';

import reducer from '../../client/src/reducer.js';

import {getAll as getStoreFront} from './controllers/StoreFront.js';
import {getAll as getStores} from './controllers/Store.js';
import {getAll as getCategories} from './controllers/Category.js';

import {set as setProducts} from '../../client/src/actions/products.js';
import {setGMapKey} from '../../client/src/actions/creds.js';
import {setStores} from '../../client/src/actions/stores.js';
import {setCategories} from '../../client/src/actions/categories.js';


export const getInitState = path => {
  const history = createHistory();

  const store = createStore(
    reducer, 
    applyMiddleware(routerMiddleware(history))
  );

  store.dispatch(push(path));
  store.dispatch(setGMapKey(process.env.GMAP_KEY));

  return Promise.all([
    getStoreFront().then(storeFront => 
      store.dispatch(setProducts(storeFront.products))),
    getStores().then(stores => 
      store.dispatch(setStores(stores))),
    getCategories().then(categories => 
      store.dispatch(setCategories(categories)))
  ])
  .then(() => {
    return {store, history};
  });
};
