import {expect} from 'chai';

import db from '../../src/db';
import {init, truncate} from '../dbInit.js';
import {getAll} from '../../src/controllers/StoreFront';

const [coffee, burger] = require('../mocks/products.json');

describe('StoreFront controller', function() {
  before(init);
  beforeEach(() => truncate('Product', 'Category'));

  it('basic', function() {
    return db.model('Product').bulkCreate([coffee, burger])
    .then(() => getAll())
    .then(store => {
      const {products} = store;

      expect(products).to.have.length(2);
      expect(products[0]).to.have.property('id', '1');
      expect(products[0]).to.have.property('name', 'Coffee');

      expect(products[1]).to.have.property('id', '2');
      expect(products[1]).to.have.property('name', 'Burger');
    });
  });

  it('empty list', () => {
    return getAll()
    .then(storeFront => {
      expect(storeFront).to.have.property('products');
      expect(storeFront.products).to.be.a('Array');
      expect(storeFront.products).to.have.length(0);

      expect(storeFront).to.have.property('categories');
      expect(storeFront.categories).to.be.a('Array');
      expect(storeFront.categories).to.have.length(0);
    });
  });

  it('with categories', function() {
    return Promise.all([
      db.model('Product').create({
        ...coffee, CategoryId: 1
      }),
      db.model('Category').create({
        id: 1, name: 'Drinks'
      })
    ])
    .then(() => getAll())
    .then(store => {
      const {products, categories} = store;

      expect(products).to.have.length(1);
      expect(products[0]).to.have.property('id', '1');
      expect(products[0]).to.have.property('name', 'Coffee');
      expect(products[0]).to.have.property('category', '1');
      expect(products[0]).to.not.have.property('CategoryId');

      expect(categories).to.have.length(1);
      expect(categories[0]).to.have.property('id', '1');
      expect(categories[0]).to.have.property('name', 'Drinks');
    });
  });
});