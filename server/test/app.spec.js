import {expect} from 'chai';
import request from 'supertest-as-promised';

import db from '../src/db.js';
import app from '../src/app.js';


const browse = () => request(app);

describe('cookie', function() {
  it('basic', () => browse()
    .get('/status')
    .expect(200)
  );

  it('no cookie', () => browse()
    .get('/status')
    .then(res => {
      expect(res.headers).to.not.have.property('set-cookie');
      expect(res.headers).to.not.have.property('cookie');
    })
  );
});

describe('/storefront', function() {
  beforeEach(() => Promise.all(['Product', 'Category'].map(model => 
    db.model(model).sync({force: true})
  )));

  it('get', () => 
    Promise.all([
      db.model('Product').create({name: 'Coffee'}),
      db.model('Category').create({name: 'Drinks'})
    ])
    .then(() => browse()
      .get('/storefront')
      .expect(200)
      .then(res => {
        expect(res.headers)
        .to.have.property(
          'content-type', 
          'application/json; charset=utf-8'
        );

        expect(res.body).to.have.property('products');
        expect(res.body.products).to.have.length(1);
        expect(res.body.products[0]).to.have.property('id', '1');
        expect(res.body.products[0]).to.have.property('name', 'Coffee');

        expect(res.body).to.have.property('categories');
        expect(res.body.categories).to.have.length(1);
        expect(res.body.categories[0]).to.have.property('id', '1');
        expect(res.body.categories[0]).to.have.property('name', 'Drinks');
      })
    )
  );

  it('put product', () => browse()
    .put('/storefront/product')
    .send({name: 'Coffee'})
    .expect(200)
    .then(({body}) => {
      expect(body).to.have.property('id', '1');
    })
  );

  it('put category', () => browse()
    .put('/storefront/category')
    .send({name: 'Drinks'})
    .expect(200)
    .then(({body}) => {
      expect(body).to.have.property('id', '1');
    })
  );

  it('change name of product', () => 
    db.model('Product').create({name: 'Coffee', price: 5000})
    .then(() => browse()
      .post('/storefront/product/1')
      .send({name: 'Burger'})
      .expect(200)
      .then(({body}) => {
        expect(body).to.have.property('id', '1');
        expect(body).to.have.property('name', 'Burger');
        expect(body).to.have.property('price', 5000);
      })
    )
  );
});
