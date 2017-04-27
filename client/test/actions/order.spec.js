import {expect} from 'chai';
import {OrderedMap, fromJS} from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';

import {add as addToCart} from '../../src/actions/cart.js'; 
import {send as sendOrder, getAll as getOrders} from '../../src/actions/order.js'; 
import {setAll as setProducts} from '../../src/actions/products.js';
import {setName, setPhone, setAddress, set as setUser} from '../../src/actions/user.js';

import reducer from '../../src/reducer.js';

const [coffee, burger] = require('../mocks/products.json');

describe('Order actions', function() {
  it('get orders', () => {
    nock(/localhost/)
    .get('/api/order/my')
    .reply(200, [{
      id: '1', 
      status: 'Pending',
      user: '1',
      cart: [{id: '1', qty: 10, price: 5000}],
      date: '2010-01-01'
    }]);

    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setUser({
      role: 'customer'
    }));
    return store.dispatch(getOrders())
    .then(() => {
      expect(store.getState().get('orders')).to.eql(fromJS([{
        id: '1', 
        status: 'Pending',
        user: '1',
        cart: [{id: '1', qty: 10, price: 5000}],
        date: '2010-01-01'
      }]));
    });
  });

  it('clean cart after order sending', function() {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(addToCart(1, 1));

    const cart = store.getState().get('cart');
    expect(cart).to.eql(OrderedMap([[1, 1]]));

    nock(/localhost/)
    .put('/api/order')
    .reply(200, {id: '1'});

    return store.dispatch(sendOrder())
    .then(() => {
      expect(store.getState().get('cart')).to.eql(OrderedMap());
    });
  });

  it('send order', () => {
    const store = createStore(reducer, applyMiddleware(thunk));
    
    var request;

    nock(/localhost/)
    .put('/api/order')
    .reply(200, (uri, body) => {
      request = body;
      return {id: '1'};
    });

    store.dispatch(setProducts([coffee, burger]));

    store.dispatch(addToCart('1', 1));    
    store.dispatch(addToCart('2', 2));

    store.dispatch(setName('John'));
    store.dispatch(setPhone('+12223334455'));
    store.dispatch(setAddress('Lenina, 1'));

    return store.dispatch(sendOrder())
    .then(() => {
      expect(request).to.eql({
        cart: {
          1: 1,
          2: 2
        },
        user: {
          name: 'John',
          phone: '+12223334455',
          address: 'Lenina, 1',
          password: ''
        }
      });
    });
  });
});