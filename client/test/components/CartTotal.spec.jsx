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
import CartTotal from '../../src/components/CartTotal.jsx';

const [coffee, burger] = require('../mocks/cart-items.json');

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


describe('CartTotal component', function() {
  var store, cart;

  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(setProducts([coffee, burger]));

    cart = mount(<Provider store={store}>
      <Cart>
        <CartTotal />
      </Cart>
    </Provider>);
  });

  it('got 0 if empty', function() {
    expect(cart.find('.total .cost').text()).to.eql('0 р.');
  });

  it('filled', function() {
    store.dispatch(addToCart('1', 10));
    store.dispatch(addToCart('2', 2));

    expect(cart.find('.total .cost').text()).to.eql('760 р.');
  });

  it('total changing', ()=>{
    expect(cart.find('.total .cost').text()).to.eql('0 р.');

    store.dispatch(addToCart('1', 1));
    expect(cart.find('.total .cost').text()).to.eql('50 р.');

    store.dispatch(addToCart('2', 1));
    expect(cart.find('.total .cost').text()).to.eql('180 р.');

    store.dispatch(changeQty('1', 2));
    expect(cart.find('.total .cost').text()).to.eql('230 р.');

    store.dispatch(removeItem('1'));
    expect(cart.find('.total .cost').text()).to.eql('130 р.');

    store.dispatch(removeAll());
    expect(cart.find('.total .cost').text()).to.eql('0 р.');
  });

});