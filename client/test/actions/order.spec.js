import {expect} from 'chai';
import {OrderedMap} from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';
import {add as addToCart} from '../../src/actions/cart.js'; 
import {send as sendOrder} from '../../src/actions/order.js'; 
import reducer from '../../src/reducer.js';

describe('Order actions', function() {
  it('clean cart after order sending', function() {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(addToCart(1, 1));

    const cart = store.getState().get('cart');
    expect(cart).to.eql(OrderedMap([[1, 1]]));

    nock('https://localhost')
    .put('/api/order')
    .reply(200, {id: '1'});

    return store.dispatch(sendOrder())
    .then(() => {
      expect(store.getState().get('cart')).to.eql(OrderedMap());
    });
  });
});