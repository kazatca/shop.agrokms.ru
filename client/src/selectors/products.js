import {createSelector} from 'reselect';

export const getProductIds = createSelector(
  state => state.get('products'),
  products => products.map(product => product.get('id')).toArray()
);


