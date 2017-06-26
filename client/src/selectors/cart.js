import {createSelector} from 'reselect';

export const getProductsInCart = createSelector(
  [state => state.get('cart')],
  cart => cart.map((qty, id) => id).toArray()
);
