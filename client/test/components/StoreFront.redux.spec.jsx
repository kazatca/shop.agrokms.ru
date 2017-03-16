import React from 'react';
import {expect} from 'chai';
import {fromJS, OrderedMap} from 'immutable';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {set as setProducts} from '../../src/actions/products';

import reducer from '../../src/reducer';
import StoreFront from '../../src/components/StoreFront';

const [coffee, burger] = require('../mocks/products.json');

describe('StoreFront with state', function() {
  it('basic', ()=>{
    const store = createStore(reducer);
    const storeFront = mount(<Provider store={store}>
      <StoreFront />
    </Provider>);

    expect(storeFront.find('.product').length).to.eql(0);

    store.dispatch(setProducts([coffee, burger]));

    expect(storeFront.find('.product').length).to.eql(2);
  });

  it('change qty', ()=>{
    const store = createStore(reducer);
    const storeFront = mount(<Provider store={store}>
      <StoreFront />
    </Provider>);
    store.dispatch(setProducts([coffee]));

    storeFront.find('.product').forEach(product => 
      expect(product.find('.qty input').prop('value')).to.eql(1)
    );

    const product = storeFront.find('.product');

    const plusBtn = product.find('.plus');
    const minusBtn = product.find('.minus');
    plusBtn.simulate('click');
    expect(product.find('.qty input').prop('value')).to.eql(2);

    plusBtn.simulate('click');
    expect(product.find('.qty input').prop('value')).to.eql(3);

    minusBtn.simulate('click');
    expect(product.find('.qty input').prop('value')).to.eql(2);
  });

  it('buy', ()=>{
    const store = createStore(reducer);
    const storeFront = mount(<Provider store={store}>
      <StoreFront />
    </Provider>);
    store.dispatch(setProducts([coffee]));

    const buyBtn = storeFront.find('.product .buy');
    buyBtn.simulate('click');

    expect(store.getState().get('cart')).to.eql(OrderedMap([
      ['1', 1]
    ]));
  });

  it('buy custom qty', ()=>{
    const store = createStore(reducer);
    const storeFront = mount(<Provider store={store}>
      <StoreFront />
    </Provider>);
    store.dispatch(setProducts([coffee]));

    const buyBtn = storeFront.find('.product .buy');
    const plusBtn = storeFront.find('.product .plus');
    plusBtn.simulate('click');
    buyBtn.simulate('click');

    expect(store.getState().get('cart')).to.eql(OrderedMap([
      ['1', 2]
    ]));    
  });
});