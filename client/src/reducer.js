import {Map} from 'immutable';

// import {combineReducers} from 'redux';

import cartReducer from './reducers/cart';
import productsReducer from './reducers/products';
import userReducer from './reducers/user.js';
import credsReducer from './reducers/creds.js';

import {routerReducer} from 'react-router-redux';

export const combineReducers = reducers => {
  return (state = Map(), action) => {
    return Map(Object.keys(reducers).reduce((result, key) => {
      return {...result, [key]: reducers[key](state.get(key), action)};
    }, {}));
  };
};


const reducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  user: userReducer,
  creds: credsReducer,
  router: routerReducer
});

export default reducer;
