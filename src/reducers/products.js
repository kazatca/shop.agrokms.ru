import {Map} from 'immutable';

export default {
  set: newProducts => {
    return Map(newProducts.reduce((result, product) => {
      return {...result, [product.id]: Map(product)};
    }, {}));
  }
};