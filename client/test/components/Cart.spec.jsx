import React from 'react';
import {expect} from 'chai';
import {fromJS} from 'immutable';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createMemoryHistory} from 'history';

import {set as setProducts} from '../../src/actions/products';
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
  it('basic', function() {
    const cart = mount(<CartDummy
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
    const history = createMemoryHistory();
    const store = createStore(reducer);
    
    const cart = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <CartDummy {...dispatch} />
      </ConnectedRouter>
    </Provider>);
    expect(cart.find('.empty-cart')).to.be.ok;
  });

  it('total', function() {
    const cart = mount(<CartDummy
      items={[coffee, burger]}
      {...dispatch}
    />);

    expect(cart.find('.total .cost').text()).to.eql('760 р.');
  });

  it('item removing', function() {
    let itemRemoved;
    const removeItem = id=> {itemRemoved = id;};

    const cart = mount(<CartDummy
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

  it('create store', () => {
    const store = createStore(reducer);
    store.dispatch(setProducts([coffee, burger]));

    expect(store.getState().get('products')).to.eql(fromJS({
      1: coffee, 
      2: burger
    }));
  });

  it('add to cart', ()=>{
    const history = createMemoryHistory();
    const store = createStore(reducer);

    const cart = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <Cart />
      </ConnectedRouter>
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
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <Cart />
      </ConnectedRouter>
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));

    store.dispatch(addToCart('1', 10));

    store.dispatch(changeQty('1', 5));

    const cartItem = cart.find('.cart-item');

    expect(cartItem.find('.qty input').prop('value')).to.eql(5);
    expect(cartItem.find('.cost').text()).to.eql('250 р.');
  });

  it('remove item', ()=>{
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <Cart />
      </ConnectedRouter>
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));
    store.dispatch(addToCart('1', 10));

    expect(cart.find('.cart-item').length).to.eql(1);

    store.dispatch(removeItem('1'));

    expect(cart.find('.cart-item').length).to.eql(0);
  });

  it('remove all', ()=>{
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <Cart />
      </ConnectedRouter>
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));
    store.dispatch(addToCart('1', 10));
    store.dispatch(addToCart('2', 10));

    expect(cart.find('.cart-item').length).to.eql(2);

    store.dispatch(removeAll());
    expect(cart.find('.cart-item').length).to.eql(0);
  });

  it('total', ()=>{
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const cart = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <Cart />
      </ConnectedRouter>
    </Provider>);

    store.dispatch(setProducts([coffee, burger]));

    expect(cart.find('.total .cost')).to.have.length(0);

    store.dispatch(addToCart('1', 1));
    expect(cart.find('.total .cost').text()).to.eql('50 р.');

    store.dispatch(addToCart('2', 1));
    expect(cart.find('.total .cost').text()).to.eql('180 р.');

    store.dispatch(changeQty('1', 2));
    expect(cart.find('.total .cost').text()).to.eql('230 р.');

    store.dispatch(removeItem('1'));
    expect(cart.find('.total .cost').text()).to.eql('130 р.');

    store.dispatch(removeAll());
    expect(cart.find('.total .cost')).to.have.length(0);
  });
});