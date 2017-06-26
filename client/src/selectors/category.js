import {createSelector} from 'reselect';

const getProducts = state => state.get('products');
const getCategoryId = (state, id) => id;

export const getProductsInCategory = createSelector(
  [getProducts, getCategoryId],  
  (products, categoryId) => 
    products
      .filter(product => product.get('category') == categoryId)
      .map(product => product.get('id'))
      .toArray()
);

export const getCategories = createSelector(
  [state => state.get('categories')],
  categories => categories
    .map(category => category.toJS())
    .toArray()
);