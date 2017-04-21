import {Map} from 'immutable';

import cart from './reducers/cart';
import products from './reducers/products';
import categories from './reducers/categories';
import user from './reducers/user.js';
import creds from './reducers/creds.js';
import stores from './reducers/stores.js';
import orders from './reducers/orders.js';
import settings from './reducers/settings.js';

import {routerReducer as router} from 'react-router-redux';

export const combineReducers = reducers => (state = Map(), action) =>
  Object.keys(reducers).reduce((newState, key) => 
    newState.set(key, reducers[key](newState.get(key), action)), state);


const reducer = combineReducers({
  cart,
  products,
  categories,
  user,
  creds,
  stores,
  orders,
  settings,
  router
});

export default reducer;
