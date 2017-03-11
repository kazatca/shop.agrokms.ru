import React from 'react';
import expect from 'expect.js';
import {shallow, mount} from 'enzyme';

import Cart from '../../src/components/Cart';

const [coffee, burger] = require('../mocks/cart-items.json');

describe('Cart component', function() {
  it('basic', function() {
    const cart = mount(<Cart
      items={[coffee]}
    />);

    const cartItem = cart.find('.cart-item').first();

    expect(cartItem.find('.name').text()).to.eql('Coffee');
    expect(cartItem.find('.image img').prop('src')).to.eql('/coffee.png');
    expect(cartItem.find('.qty input').prop('value')).to.eql(10);
    expect(cartItem.find('.price').text()).to.eql('50 р.');
    expect(cartItem.find('.cost').text()).to.eql('500 р.');

    expect(cart.find('.total .cost').text()).to.eql('500 р.');
  });

  it('total', function() {
    const cart = mount(<Cart
      items={[coffee, burger]}
    />);

    expect(cart.find('.total .cost').text()).to.eql('760 р.');
  });

  it('item removing', function() {
    const cart = mount(<Cart
      items={[coffee, burger]}
    />);

    let removeBtn = cart.find('.cart-item').first().find('.remove');
    expect(removeBtn).to.be.ok();

    removeBtn.simulate('click');
    expect(cart.find('.cart-item').length).to.eql(1);
    expect(cart.find('.total .cost').text()).to.eql('260 р.');

    removeBtn = cart.find('.cart-item').first().find('.remove');
    expect(removeBtn).to.be.ok();

    removeBtn.simulate('click');
    expect(cart.find('.cart-item').length).to.eql(0);
    expect(cart.find('.total .cost').text()).to.eql('0 р.');
  });
});