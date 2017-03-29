import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import app from '../../src/app.js';

const browse = () => request(app);
const model = db.model('Product');

describe('Product route', function() {
  beforeEach(() => db.sync({force: true}));

  it('get all', () => 
    model.create({
      name: 'Coffee',
      price: 5000
    })
    .then(() => 
      browse()
      .get('/api/product/all')
      .expect(200)
      .then(({body}) => {
        expect(body).to.have.length(1);
        expect(body[0]).to.have.property('id', '1');
        expect(body[0]).to.have.property('price', 5000);
      })
    )
  );

  it('add new product', () => browse()
    .put('/api/product')
    .send({name: 'Coffee'})
    .expect(200)
    .then(({body}) => {
      expect(body).to.have.property('id', '1');
    })
    .then(() => model.findAll())
    .then(products => {
      expect(products).to.have.length(1);
      expect(products[0].get({plain: true})).to.have.property('name', 'Coffee');
    })
  );

  it('change name of product', () => 
    model.create({name: 'Coffee', price: 5000})
    .then(() => browse()
      .post('/api/product/1')
      .send({name: 'Burger'})
      .expect(200)
      .then(({body}) => {
        expect(body).to.have.property('id', '1');
        expect(body).to.have.property('name', 'Burger');
        expect(body).to.have.property('price', 5000);
      })
      .then(() => model.findAll())
      .then(products => {
        expect(products).to.have.length(1);
        expect(products[0].get({plain: true})).to.have.property('name', 'Burger');
      })
    )
  );
});
