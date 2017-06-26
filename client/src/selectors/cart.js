import {createSelector} from 'reselect';

export const getProductsInCart = createSelector(
  [state => state.get('cart')],
  cart => cart.map((qty, id) => id).toArray()
);

export const getCost = createSelector(
  [
    state => state.get('products'),
    state => state.get('cart')
  ],
  (products, cart) => 
    cart.reduce((cost, qty, id) => cost + qty * products.getIn([id, 'price'], 0), 0)
);