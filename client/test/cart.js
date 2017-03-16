import {expect} from 'chai';
import {OrderedMap, Map} from 'immutable';

import reducer from '../src/reducers/cart';

// const [coffee, burger] = require('./mocks/products.json');

describe('Cart actions', function() {
  it('add to cart empty cart', function() {
    const state = OrderedMap();

    const action = {type: 'CART.ADD', id: 1, qty: 1 };
    const newState = reducer(state, action);

    expect(newState).to.equal(OrderedMap([
      [1, 1]  
    ]));
  }); 

  it('add to filled cart', function() {
    const state = OrderedMap([[1, 1]]);
    
    const action = {type: 'CART.ADD', id: 2, qty: 1 };
    const newState = reducer(state, action);

    expect(newState).to.equal(OrderedMap([
      [1, 1],
      [2, 1]
    ]));
  });

  it('add same product', function() {
    const state = OrderedMap([[1, 1]]);
    
    const action = {type: 'CART.ADD', id: 1, qty: 10 };
    const newState = reducer(state, action);

    expect(newState).to.equal(OrderedMap([
      [1, 11]
    ]));
  });

  it('change qty', function() {
    const state = OrderedMap([[1, 1]]);

    const action = {type: 'CART.CHANGE_QTY', id: 1, qty: 10};
    const newState = reducer(state, action);

    expect(newState).to.equal(OrderedMap([
      [1, 10]
    ]));
  });

  it('remove from cart', function() {
    const state = OrderedMap([[1, 1]]);

    const action = {type: 'CART.REMOVE_ITEM', id: 1};
    const newState = reducer(state, action);

    expect(newState).to.equal(OrderedMap());
  });

  it('clean cart', ()=>{
    const state = OrderedMap([[1, 1], [2, 1]]);

    const action = {type: 'CART.REMOVE_ALL'};
    const newState = reducer(state, action);

    expect(newState).to.equal(OrderedMap());
  });
});