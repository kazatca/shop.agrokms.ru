import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import {init, truncate} from '../dbInit.js';
import app from '../../src/app.js';

const browse = () => request(app);

describe('StoreFront route', function() {
  before(init);
  beforeEach(() => truncate('Product', 'Category'));

  it('get /', () => 
    Promise.all([
      db.model('Product').create({id: 1, name: 'Coffee'}),
      db.model('Category').create({id: 1, name: 'Drinks'})
    ])
    .then(() => browse()
      .get('/api/storefront')
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
});
