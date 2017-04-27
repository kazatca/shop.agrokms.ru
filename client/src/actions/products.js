import * as api from '../api.js';

export const setAll = products => {
  return {
    type: 'PRODUCTS.SET',
    products
  };
};

export const fetch = () => 
  dispatch => 
    api.get('/product/all')
    .then(products => dispatch(setAll(products)));


