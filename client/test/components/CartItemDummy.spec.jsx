import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {CartItemDummy} from '../../src/components/CartItem';

const [coffee] = require('../mocks/cart-items.json');

// avoid react warning "<div> cannot appear as a child of <tr>"
const Cart = props => {
  return (
    <table>
      <tbody>
        {props.children}
      </tbody>
    </table>
  );
};

describe('CartItemDummy component', function() {
  it('basic', function() {
    const cartItem = mount(<Cart><CartItemDummy 
      {...coffee} 
      qty={10} 
      changeQty={() => {}}
      removeItem={() => {}}
    /></Cart>);

    expect(cartItem.find('.name').text()).to.eql('Coffee');
    expect(cartItem.find('.image img').prop('src')).to.eql('/coffee.png');
    expect(cartItem.find('.qty input').prop('value')).to.eql(10);
    expect(cartItem.find('.price').text()).to.eql('50 р.');
    expect(cartItem.find('.cost').text()).to.eql('500 р.');
  });
});