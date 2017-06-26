import {createSelector} from 'reselect';

export const getOrderIds = createSelector(
  [state => state.get('orders')],
  orders => 
    orders
      .map(order => order.get('id'))
      .toArray()
);

export const getTotalQty = createSelector(
  [(state, id) => state.getIn(['orders', id, 'cart'])],
  cart => 
    cart.reduce((total, item) => total + item.get('qty'), 0)
);

export const getTotalCost = createSelector(
  [(state, id) => state.getIn(['orders', id, 'cart'])],
  cart => 
    cart.reduce((total, item) => total + item.get('qty') * item.get('price'), 0)
);