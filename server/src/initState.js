import {createStore, applyMiddleware} from 'redux';
import {createMemoryHistory as createHistory} from 'history';
import {routerMiddleware, push} from 'react-router-redux';

import reducer from '../../client/src/reducer.js';

import {getAll as getStoreFront} from './controllers/StoreFront.js';
import {getAll as getStores} from './controllers/Store.js';
import {getAll as getCategories} from './controllers/Category.js';
import {get as getUser} from './controllers/User.js';

import {set as setProducts} from '../../client/src/actions/products.js';
import {setGMapKey, setDadataKey} from '../../client/src/actions/creds.js';
import {setStores} from '../../client/src/actions/stores.js';
import {setCategories} from '../../client/src/actions/categories.js';
import {set as setUser} from '../../client/src/actions/user.js';


const passStoreFront = store => 
  getStoreFront().then(storeFront => 
    store.dispatch(setProducts(storeFront.products)));

const passStores = store => 
  getStores().then(stores => 
    store.dispatch(setStores(stores)));

const passCategories = store => 
  getCategories().then(categories => 
    store.dispatch(setCategories(categories)));

const passUser = (store, session) => {
  if(!session || !session.userId){
    return;
  }
  
  return getUser(session.userId)
  .then(user => store.dispatch(setUser(user)));
};


export const getInitState = (path, session) => {
  const history = createHistory();

  const store = createStore(
    reducer, 
    applyMiddleware(routerMiddleware(history))
  );

  store.dispatch(push(path));
  store.dispatch(setGMapKey(process.env.GMAP_KEY));
  store.dispatch(setDadataKey(process.env.DADATA_KEY));

  return Promise.all([
    passStoreFront(store),
    passStores(store),
    passCategories(store),
    passUser(store, session)
  ])
  .then(() => {
    return {store, history};
  });
};
