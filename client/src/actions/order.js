import * as api from '../api.js';

import {removeAll} from './cart.js';

export const send = () => 
  (dispatch, getState) => 
    api.put('/order', getState().get('cart').toJS())
    .then(res => {
      dispatch(removeAll());
      return res;
    });