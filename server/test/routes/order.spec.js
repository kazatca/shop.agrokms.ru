import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import {init, truncate} from '../dbInit.js';
import app from '../../src/app.js';

const browse = () => request(app);

const {secret} = require('../mocks/hashs.json');
const [coffee] = require('../mocks/products.json');

describe('Order route', function() {
  before(init);  
  beforeEach(() => truncate('User', 'Product', 'Order', 'CartItem'));
  
  it('got 401 on /all', () => 
    browse()
    .get('/api/order/all')
    .expect(401)
  );

  it('got /all after admin login', () => 
    Promise.all([
      db.model('User').bulkCreate([{
        id: 1,
        name: 'Joe',
        phone: '+12223334455',
        password: secret,
        role: 'admin'
      }, {
        id: 2,
        name: 'Dave',
        phone: '+12223334466',
        role: 'customer'
      }]),
      db.model('Product').create(coffee),
      db.model('Order').create({
        id: 1,
        UserId: 2,
        CartItems: [{ProductId: 1, qty: 1, price: 5000}]
      }, {include: [db.model('CartItem')]})
    ])
    .then(() => {
      const agent = request.agent(app);
      
      return agent.post('/api/user/login')
      .send({
        login: '+12223334455',
        password: 'secret'
      })
      .expect(200)
      .then(() => 
        agent.get('/api/order/all')
        .expect(200)
        .expect(({body}) => {
          expect(body).to.have.length(1);
          expect(body[0]).to.have.property('id', '1');
          expect(body[0]).to.have.property('status', 'Pending');
          expect(body[0]).to.have.property('cart');
          expect(body[0].cart).to.have.length(1);
          expect(body[0].cart[0]).to.have.property('id', '1');
          expect(body[0].cart[0]).to.have.property('qty', 1);
          expect(body[0].cart[0]).to.have.property('price', 5000);

          //todo: fill user (user id now)
          expect(body[0]).to.have.property('user');
        })
      );
    })
  );
});
