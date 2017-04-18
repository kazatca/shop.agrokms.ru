import * as api from '../api.js';

import {removeAll} from './cart.js';
import {push} from 'react-router-redux';

export const send = () => 
  (dispatch, getState) => 
    api.put('/order', {
      cart: getState().get('cart').toJS(),
      user: getState().get('user').toJS()
    })
    .then(res => {
      dispatch(removeAll());
      dispatch(push('/thanks'));
      return res;
    });

export const set = orders => {
  return {
    type: 'ORDERS.SET',
    orders
  };
};

export const getAll = () => 
  (dispatch, getState) => {
    const role = getState().getIn(['user', 'role'], '');
    
    return api.get(`/order/${role == 'admin'? 'all' : 'my'}`)
    .then(orders => {
      dispatch(set(orders));
    });
  };