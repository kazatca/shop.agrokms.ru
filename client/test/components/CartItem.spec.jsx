import React from 'react';
import expect from 'expect.js';
import {mount} from 'enzyme';

import CartItem from '../../src/components/CartItem';

let [coffee] = require('../mocks/cart-items.json');

coffee = {
  ...coffee,
  changeQty: ()=>{},
  removeItem: ()=>{}
};
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

describe('CartItem component', function() {
  it('basic', function() {
    const cartItem = mount(<Cart><CartItem {...coffee} /></Cart>);

    expect(cartItem.find('.name').text()).to.eql('Coffee');
    expect(cartItem.find('.image img').prop('src')).to.eql('/coffee.png');
    expect(cartItem.find('.qty input').prop('value')).to.eql(10);
    expect(cartItem.find('.price').text()).to.eql('50 р.');
    expect(cartItem.find('.cost').text()).to.eql('500 р.');
  });

  it('change qty by buttons', ()=>{
    let qty = 10;
    const changeQty = (id, newQty) => {qty = newQty;};
    const cartItem = mount(<Cart><CartItem {...coffee}
      qty={qty}
      changeQty={changeQty}
    /></Cart>);

    const minusBtn = cartItem.find('.minus');    
    const plusBtn = cartItem.find('.plus');

    plusBtn.simulate('click');
    expect(qty).to.eql(11);

    minusBtn.simulate('click');
    expect(qty).to.eql(9);
  });

  it('change qty by direct input', function() {
    let qty = 10;
    const changeQty = (id, newQty) => {qty = newQty;};
    const cartItem = mount(<Cart><CartItem {...coffee}
      qty={qty}
      changeQty={changeQty}
    /></Cart>);

    const qtyInput = cartItem.find('.qty input');

    qtyInput.simulate('change', { target: { value: 20 } });
    expect(qty).to.eql(20);
  });

  it('remove button', ()=>{
    let removed;
    const removeItem = (id) => {removed = id;};
    const cartItem = mount(<Cart><CartItem {...coffee}
      removeItem={removeItem}
    /></Cart>);

    const removeBtn = cartItem.find('.remove');

    removeBtn.simulate('click');
    expect(removed).to.eql(1);
  });
}); 