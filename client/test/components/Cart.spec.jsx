import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {CartDummy as Cart} from '../../src/components/Cart';

const [coffee, burger] = require('../mocks/cart-items.json');

const dispatch = {
  changeQty: ()=>{},
  removeItem: ()=>{},
  removeAll: ()=>{}
};

describe('Cart component', function() {
  it('basic', function() {
    const cart = mount(<Cart
      items={[coffee]}
      {...dispatch}
    />);

    const cartItem = cart.find('.cart-item').first();

    expect(cartItem.find('.name').text()).to.eql('Coffee');
    expect(cartItem.find('.image img').prop('src')).to.eql('/coffee.png');
    expect(cartItem.find('.qty input').prop('value')).to.eql(10);
    expect(cartItem.find('.price').text()).to.eql('50 р.');
    expect(cartItem.find('.cost').text()).to.eql('500 р.');

    expect(cart.find('.total .cost').text()).to.eql('500 р.');
  });

  it('empty cart', ()=>{
    mount(<Cart {...dispatch} />);
  });

  it('total', function() {
    const cart = mount(<Cart
      items={[coffee, burger]}
      {...dispatch}
    />);

    expect(cart.find('.total .cost').text()).to.eql('760 р.');
  });

  it('item removing', function() {
    let itemRemoved;
    const removeItem = id=> {itemRemoved = id;};

    const cart = mount(<Cart
      items={[coffee, burger]}
      {...dispatch}
      removeItem={removeItem}
    />);

    let removeBtn = cart.find('.cart-item').first().find('.remove');
    expect(removeBtn).to.be.ok;

    removeBtn.simulate('click');
    expect(itemRemoved).to.eql('1');

    removeBtn = cart.find('.cart-item').last().find('.remove');
    expect(removeBtn).to.be.ok;

    removeBtn.simulate('click');
    expect(itemRemoved).to.eql('2');
  });
});