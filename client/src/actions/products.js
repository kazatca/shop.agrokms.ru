import * as api from '../api.js';

export const set = products => {
  return {
    type: 'PRODUCTS.SET',
    products
  };
};

export const fetch = () => 
  dispatch => 
    api.get('/product/all')
    .then(products => dispatch(set(products)));


