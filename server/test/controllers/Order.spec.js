import {expect} from 'chai';

import db from '../../src/db.js';
import * as Order from '../../src/controllers/Order.js';

describe('Order controller', function() {
  beforeEach(() => Promise.all([
    'Order', 
    'User', 
    'CartItem',
    'Product'
  ].map(model=> db.model(model).sync({force: true}))
  ));

  it('get', () => {
    return Promise.all([
      db.model('Product').bulkCreate([
        {name: 'Coffee'},
        {name: 'Burger'}
      ]),
      db.model('Order').create({
        UserId: 1,
        CartItems: [
          {ProductId: 1, qty: 1, price: 5000},
          {ProductId: 2, qty: 1, price: 8000}
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
        {id: '1', qty: 1, price: 5000},
        {id: '2', qty: 1, price: 8000}
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

  it('getProducts', ()=> 
    db.model('Product').bulkCreate([
      {name: 'Coffee', price: 5000},
      {name: 'Burger', price: 8000}
    ])
    .then(() => Order.getProducts([1, 2]))
    .then(products => {
      expect(products).to.have.property('1');
      expect(products[1]).to.have.property('name', 'Coffee');
      expect(products[1]).to.have.property('price', 5000);

      expect(products).to.have.property('2');
      expect(products[2]).to.have.property('name', 'Burger');
      expect(products[2]).to.have.property('price', 8000);
    })
  );

  it('add order', function() {
    return db.model('Product').bulkCreate([
      {name: 'Coffee', price: 5000},
      {name: 'Burger', price: 8000}
    ])
    .then(() => Order.add({
      status: 'Delivered',
      user: {
        name: 'Joe',
        phone: '+12223334455',
        address: 'Lenina, 1'
      },
      cart: [
        {id: '1', qty: 1}, 
        {id: '2', qty: 1}
      ]
    }))
    .then(() => db.model('Order')
      .findOne({include: [
        db.model('CartItem'), 
        db.model('User')
      ]})
    )
    .then(order => order.get({plain: true}))
    .then(order => {
      expect(order).to.have.property('status', 'Delivered');

      expect(order).to.have.property('UserId', 1);
      expect(order).to.have.property('CartItems');

      expect(order.CartItems).to.have.length(2);
      expect(order.CartItems[0]).to.have.property('ProductId', 1);
      expect(order.CartItems[0]).to.have.property('qty', 1);
      expect(order.CartItems[0]).to.have.property('price', 5000);
      expect(order.CartItems[1]).to.have.property('ProductId', 2);
      expect(order.CartItems[1]).to.have.property('qty', 1);
      expect(order.CartItems[1]).to.have.property('price', 8000);

      expect(order.User).to.have.property('id', 1);
      expect(order.User).to.have.property('name', 'Joe');
      expect(order.User).to.have.property('phone', '+12223334455');
      expect(order.User).to.have.property('address', 'Lenina, 1');
    });
  });

  it('default status is Pending', ()=>
    db.model('Product')
    .create({name: 'Coffee', price: 5000})
    .then(() => Order.add({
      user: {
        name: 'Joe',
        phone: '+12223334455',
        address: 'Lenina, 1'
      },
      cart: [{id: '1', qty: 2}]
    }))
    .then(() => db.model('Order').findOne())
    .then(order => {
      expect(order).to.have.property('status', 'Pending');
    })
  );

  it('throw on empty position id in cart', ()=>{
    return expect(Order.add({
      user: {
        name: 'Joe',
        phone: '+12223334455',
        address: 'Lenina, 1'
      },
      cart: [{qty: 1, price: 5000}]
    }))
    .to.rejectedWith('Product not found');
  });

  it('throw on wrong position id in cart', ()=>{
    return expect(Order.add({
      user: {
        name: 'Joe',
        phone: '+12223334455',
        address: 'Lenina, 1'
      },
      cart: [{id: '1', qty: 1, price: 5000}]
    }))
    .to.rejectedWith('Product not found');
  });

  it('throw on wrong qty in cart', ()=>
    db.model('Product').bulkCreate([
      {name: 'Coffee', price: 5000},
      {name: 'Burger', price: 8000}
    ])
    .then(() => expect(Order.add({
      user: {
        name: 'Joe',
        phone: '+12223334455',
        address: 'Lenina, 1'
      },
      cart: [{id: '1', qty: 0}]
    }))
    .to.rejectedWith('Validation error: Validation min failed'))
  );

  it('get by userId', () => 
    db.model('Product').bulkCreate([
      {name: 'Coffee', price: 5000},
      {name: 'Burger', price: 8000}
    ])
    .then(() => db.model('Order').bulkCreate([
      {UserId: 1, CartItems: [{ProductId: '1', qty: 1, price: 5000}]},
      {UserId: 2, CartItems: [{ProductId: '1', qty: 1, price: 8000}]}
    ], {
      include: [db.model('CartItem')]
    }))
    .then(() => Order.getByUser('1'))
    .then(orders => {
      expect(orders).to.have.length(1);
      expect(orders[0]).to.have.property('user', '1');
    })
  );

  it('change username and address on second order', () => 
    db.model('Product').create({
      name: 'Coffee', 
      price: 5000
    })
    .then(() => db.model('User').create({
      name: 'Joe', 
      phone: '+12223334455', 
      address: 'Lenina, 1'
    }))

    .then(() => Order.add({
      user: {
        name: 'John',
        phone: '+12223334455',
        address: 'Marksa, 2'
      },
      cart: [{id: '1', qty: 1}]
    }))
    .then(() => db.model('User').findAll())
    .then(users => users.map(user => user.get({plain: true})))
    .then(users => {
      expect(users).to.have.length(1);
      expect(users[0]).to.have.property('name', 'John');
      expect(users[0]).to.have.property('address', 'Marksa, 2');
    })
  );
});