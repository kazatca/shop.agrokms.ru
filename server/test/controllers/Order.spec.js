import {expect} from 'chai';

import db from '../../src/db.js';
import * as Order from '../../src/controllers/Order.js';

describe('Order controller', function() {
  beforeEach(() => db.sync({force: true}));

  it('get', () => {
    return Promise.all([
      db.model('Product').bulkCreate([
        {name: 'Coffee'},
        {name: 'Burger'}
      ]),
      db.model('Order').create({
        UserId: 1,
        CartItems: [
          {ProductId: 1, qty: 1},
          {ProductId: 2, qty: 1}
        ]
      }, {
        include: [db.model('CartItem')]
      })
    ])
    .then(() => {
      return Order.getAll();
    })
    .then(orders => {
      const order = orders[0];
      expect(order).to.have.property('id', '1');
      expect(order).to.have.property('user', '1');
      expect(order.cart).to.deep.have.members([
        {id: '1', qty: 1},
        {id: '2', qty: 1}
      ]);
    });
  });

  it('get emty order list', ()=> {
    return Order.getAll()
    .then(orders => {
      expect(orders).to.be.a('Array');
      expect(orders).to.have.length(0);
    });
  });

  it('add order', function() {
    return Order.add({
      status: 'Delivered',
      user: '1',
      cart: [
        {id: '1', qty: 1}, 
        {id: '2', qty: 1}
      ]
    })
    .then(() => {
      return db.model('Order').findOne({
        include: [{
          model: db.model('CartItem')
        }]
      })
      .then(order => order.get({plain: true}))
      .then(order => {
        expect(order).to.have.property('UserId', 1);
        expect(order).to.have.property('CartItems');

        expect(order.CartItems).to.have.length(2);
        expect(order.CartItems[0]).to.have.property('ProductId', 1);
        expect(order.CartItems[0]).to.have.property('qty', 1);
        expect(order.CartItems[1]).to.have.property('ProductId', 2);
        expect(order.CartItems[1]).to.have.property('qty', 1);
      });
    });
  });

  it('default status is Pending', ()=> {
    return Order.add({
      user: '1',
      cart: [{id: '1', qty: 2}]
    })
    .then(() => db.model('Order').findOne())
    .then(order => {
      expect(order.status).to.eql('Pending');
    });
  });

  it('throw on empty user id', ()=>{
    return expect(Order.add({
      cart: [{id: '1', qty: 1}]
    }))
    .to.rejectedWith('notNull Violation: UserId cannot be null');
  });

  it('throw on empty position id in cart', ()=>{
    return expect(Order.add({
      user: '1',
      cart: [{qty: 1}]
    }))
    .to.rejectedWith('notNull Violation: ProductId cannot be null');
  });

  it('throw on wrong qty in cart', ()=>{
    return expect(Order.add({
      user: '1',
      cart: [{id: '1', qty: 0}]
    }))
    .to.rejectedWith('Validation error: Validation min failed');
  });

  it('get by userId', () => {
    return db.model('Order').bulkCreate([
      {UserId: 1, CartItems: [{ProductId: '1', qty: 1}]},
      {UserId: 2, CartItems: [{ProductId: '1', qty: 1}]}
    ], {
      include: [db.model('CartItem')]
    })
    .then(() => Order.getByUser('1'))
    .then(orders => {
      expect(orders).to.have.length(1);
      expect(orders[0]).to.have.property('user', '1');
    })
  });
});