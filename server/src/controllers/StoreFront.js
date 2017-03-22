import db from '../db';
import {getAll as getProducts} from '../controllers/Product.js';
import {getAll as getCategories} from '../controllers/Category.js';

export const getAll = () => {
  return Promise.all([
    getProducts(),
    getCategories()
  ])
  .then(([products, categories]) => {
    return {
      products,
      categories
    };
  });
};
