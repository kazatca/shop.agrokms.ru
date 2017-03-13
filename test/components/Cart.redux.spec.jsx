import React from 'react';
import {expect} from 'chai';
import {fromJS} from 'immutable';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {set as setProducts} from '../../src/actions/products';
import {
  add as addToCart, 
  changeQty, 
  removeItem, 
  removeAll
} from '../../src/actions/cart';

import reducer from '../../src/reducer';
import Cart from '../../src/components/Cart';

const [coffee, burger] = require('../mocks/products.json');

describe('Cart with state', function() {
  it('create store', () => {
    const store = createStore(reducer);
    store.dispatch(setProducts([coffee, burger]));

    expect(store.getState().get('products')).to.eql(fromJS({
      1: coffee, 
      2: burger
    }));
  });

  it('add to cart', ()=>{
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <Cart />
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));

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

  it('change qty', () => {
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <Cart />
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));

    store.dispatch(addToCart('1', 10));

    store.dispatch(changeQty('1', 5));

    const cartItem = cart.find('.cart-item');

    expect(cartItem.find('.qty input').prop('value')).to.eql(5);
    expect(cartItem.find('.cost').text()).to.eql('250 р.');
  });

  it('remove item', ()=>{
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <Cart />
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));
    store.dispatch(addToCart('1', 10));

    expect(cart.find('.cart-item').length).to.eql(1);

    store.dispatch(removeItem('1'));

    expect(cart.find('.cart-item').length).to.eql(0);
  });

  it('remove all', ()=>{
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <Cart />
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));
    store.dispatch(addToCart('1', 10));
    store.dispatch(addToCart('2', 10));

    expect(cart.find('.cart-item').length).to.eql(2);

    store.dispatch(removeAll());
    expect(cart.find('.cart-item').length).to.eql(0);
  });

  it('total', ()=>{
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <Cart />
    </Provider>);
    const total = cart.find('.total .cost');

    store.dispatch(setProducts([coffee, burger]));

    expect(total.text()).to.eql('0 р.');

    store.dispatch(addToCart('1', 1));
    expect(total.text()).to.eql('50 р.');

    store.dispatch(addToCart('2', 1));
    expect(total.text()).to.eql('180 р.');

    store.dispatch(changeQty('1', 2));
    expect(total.text()).to.eql('230 р.');

    store.dispatch(removeItem('1'));
    expect(total.text()).to.eql('130 р.');

    store.dispatch(removeAll());
    expect(total.text()).to.eql('0 р.');
  });
});