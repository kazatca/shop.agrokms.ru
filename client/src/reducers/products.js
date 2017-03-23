import {Map} from 'immutable';

const set = newProducts => 
  Map(newProducts.reduce((result, product) => {
    return {...result, [product.id]: Map(product)};
  }, {}));


const reducers = {
  'PRODUCTS.SET': (products, action) => 
    set(action.products)
};

export default (products = Map(), action) => {
  return action.type in reducers ? reducers[action.type](products, action) : products;
};
