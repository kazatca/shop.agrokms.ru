import {createStore} from 'redux';

import reducer from '../../src/reducer.js';
import {setAll as setProducts} from '../../src/actions/products.js';
import {setAll as setCategories} from '../../src/actions/categories.js';
import {getProductsInCategory} from '../../src/selectors/category.js';

const [coffee, burger] = require('../mocks/products.json');

describe('category selector', () => {
  it('basic', () => {
    const store = createStore(reducer);
    store.dispatch(setProducts([coffee, burger]));

  })

});