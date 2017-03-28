import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import app from '../../src/app.js';

const browse = () => request(app);

describe('Order route', function() {
  beforeEach(() => db.sync({force: true}));
  
  it('got 401 on /all', () => 
    browse()
    .get('/api/order/all')
    .expect(401)
  );

  xit('got /all after login', () => Promise.all([
    db.model('Product').bulkCreate([
      {name: 'Coffee', price: 5000},
      {name: 'Burger', price: 8000}
    ]),
    db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      address: 'Lenina, 1'
    }),
    db.model('Order').create({
      UserId: 1,
      CartItems: [
        {ProductId: 1, qty: 1, price: 5000},
        {ProductId: 2, qty: 1, price: 8000},
      ]
    }, {include: [db.model('CartItem')]})])
    .then(() => {
      
    })
  );
});
