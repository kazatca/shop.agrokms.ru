import React from 'react';
import expect from 'expect.js';
import {shallow, mount} from 'enzyme';

import CartItem from '../../src/components/CartItem';

const [coffee] = require('../mocks/cart-items.json');

describe('CartItem component', function() {
  it('basic', function() {
    const cartItem = shallow(<CartItem {...coffee} />);

    expect(cartItem.find('.name').text()).to.eql('Coffee');
    expect(cartItem.find('.image img').prop('src')).to.eql('/coffee.png');
    expect(cartItem.find('.qty input').prop('value')).to.eql(10);
    expect(cartItem.find('.price').text()).to.eql('50 р.');
    expect(cartItem.find('.cost').text()).to.eql('500 р.');
  });

  it('change qty by buttons', ()=>{
    let qty = 10;
    const changeQty = (id, newQty) => {qty = newQty;};
    const cartItem = shallow(<CartItem {...coffee}
      qty={qty}
      changeQty={changeQty}
    />);

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
    const cartItem = mount(<table><tbody><CartItem {...coffee}
      qty={qty}
      changeQty={changeQty}
    /></tbody></table>);

    const qtyInput = cartItem.find('.qty input');

    qtyInput.simulate('change', { target: { value: 20 } });
    expect(qty).to.eql(20);
  });

  it('remove button', ()=>{
    let removed;
    const remove = (id) => {removed = id;};
    const cartItem = shallow(<CartItem {...coffee}
      remove={remove}
    />);

    const removeBtn = cartItem.find('.remove');

    removeBtn.simulate('click');
    expect(removed).to.eql(1);
  });
}); 