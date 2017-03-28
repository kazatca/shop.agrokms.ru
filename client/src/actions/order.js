import * as api from '../api.js';

import {removeAll} from './cart.js';

export const send = () => 
  (dispatch, getState) => 
    api.put('/order', {
      cart: getState().get('cart').toJS(),
      user: getState().get('user').toJS()
    })
    .then(res => {
      dispatch(removeAll());
      return res;
    });