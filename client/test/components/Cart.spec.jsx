import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {setAll as setProducts} from '../../src/actions/products';
import {
  add as addToCart, 
  changeQty, 
  removeItem, 
  removeAll
} from '../../src/actions/cart';

import reducer from '../../src/reducer';
import Cart, {CartDummy} from '../../src/components/Cart';

const [coffee, burger] = require('../mocks/cart-items.json');

const dispatch = {
  changeQty: ()=>{},
  removeItem: ()=>{},
  removeAll: ()=>{}
};

describe('Cart component', function() {
  var store, cart;

  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(setProducts([coffee, burger]));

    cart = mount(<Provider store={store}>
      <Cart />
    </Provider>);
  });
  
  it('add to cart', ()=>{
    store.dispatch(addToCart('1', 10));

    expect(cart.find('.cart')).to.be.ok;

    let cartItem = cart.find('.cart-item');
    expect(cartItem.length).to.eql(1);

    expect(cartItem.find('.name').text()).to.eql('Coffee');
    expect(cartItem.find('.image img').prop('src')).to.eql('/coffee.png');
    expect(cartItem.find('.qty input').prop('value')).to.eql(10);
    expect(cartItem.find('.price').text()).to.eql('50 р.');
    expect(cartItem.find('.cost').text()).to.eql('500 р.');

    store.dispatch(addToCart('1', 1));

    cartItem = cart.find('.cart-item');
    expect(cartItem.length).to.eql(1);

    expect(cartItem.find('.name').text()).to.eql('Coffee');
    expect(cartItem.find('.qty input').prop('value')).to.eql(11);
    expect(cartItem.find('.cost').text()).to.eql('550 р.');

    store.dispatch(addToCart('2', 1));

    cartItem = cart.find('.cart-item');
    expect(cartItem.length).to.eql(2);


    expect(cartItem.first().find('.name').text()).to.eql('Coffee');
    expect(cartItem.first().find('.qty input').prop('value')).to.eql(11);
    expect(cartItem.first().find('.cost').text()).to.eql('550 р.');

    expect(cartItem.last().find('.name').text()).to.eql('Burger');
    expect(cartItem.last().find('.qty input').prop('value')).to.eql(1);
    expect(cartItem.last().find('.cost').text()).to.eql('130 р.');
  });

  it('remove all', ()=>{
    store.dispatch(addToCart('1', 10));
    store.dispatch(addToCart('2', 10));

    expect(cart.find('.cart-item').length).to.eql(2);

    store.dispatch(removeAll());
    expect(cart.find('.cart-item').length).to.eql(0);
  });
});