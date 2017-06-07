import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from '../../src/reducer';
import {setAll as setProducts} from '../../src/actions/products';
import {add as addToCart, changeQty} from '../../src/actions/cart';

import CartItem from '../../src/components/CartItem';

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

describe('CartItem component', function() {
  var store, cartItem;

  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(setProducts([coffee]));
    store.dispatch(addToCart('1', 10));

    cartItem = mount(<Provider store={store}>
      <Cart>
        <CartItem productId={'1'}/>
      </Cart>
    </Provider>);
  });

  it('change qty by buttons', ()=>{
    const minusBtn = cartItem.find('.minus');    
    const plusBtn = cartItem.find('.plus');
    const getQty = () => store.getState().get('cart').get('1');

    plusBtn.simulate('click');
    expect(getQty()).to.eql(11);

    minusBtn.simulate('click');
    minusBtn.simulate('click');
    expect(getQty()).to.eql(9);
  });

  it('change qty by direct input', function() {
    const qtyInput = cartItem.find('.qty input');
    const getQty = () => store.getState().get('cart').get('1');

    qtyInput.simulate('change', { target: { value: 20 } });
    expect(getQty()).to.eql(20);
  });

  it('remove button', ()=>{
    const removeBtn = cartItem.find('.remove');

    removeBtn.simulate('click');
    expect(store.getState().get('cart').size).to.eql(0);
  });

  it('price changing', () => {
    store.dispatch(changeQty('1', 5));

    expect(cartItem.find('.qty input').prop('value')).to.eql(5);
    expect(cartItem.find('.cost').text()).to.eql('250 р.');
  });
}); 