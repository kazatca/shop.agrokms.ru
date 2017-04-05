import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import {init, truncate} from '../dbInit.js';
import app from '../../src/app.js';

const [coffee] = require('../mocks/products.json');
const browse = () => request(app);

describe('Product route', function() {
  before(init);
  beforeEach(() => truncate('Product'));

  it('get all', () => 
    db.model('Product').create(coffee)
    .then(() => 
      browse()
      .get('/api/product/all')
      .expect(200)
      .then(({body}) => {
        expect(body).to.have.length(1);
        expect(body[0]).to.have.property('id', '1');
        expect(body[0]).to.have.property('name', 'Coffee');
        expect(body[0]).to.have.property('price', 5000);
      })
    )
  );

  it('add new product', () => browse()
    .put('/api/product')
    .send({name: 'Coffee'})
    .expect(200)
    .then(({body}) => {
      expect(body).to.have.property('id');
    })
    .then(() => db.model('Product').findAll())
    .then(products => {
      expect(products).to.have.length(1);
      expect(products[0].get({plain: true})).to.have.property('name', 'Coffee');
    })
  );

  it('change name of product', () => 
    db.model('Product').create(coffee)
    .then(() => browse()
      .post('/api/product/1')
      .send({name: 'Burger'})
      .expect(200)
      .then(({body}) => {
        expect(body).to.have.property('id', '1');
        expect(body).to.have.property('name', 'Burger');
        expect(body).to.have.property('price', 5000);
      })
      .then(() => db.model('Product').findAll())
      .then(products => {
        expect(products).to.have.length(1);
        expect(products[0].get({plain: true})).to.have.property('name', 'Burger');
      })
    )
  );
});
