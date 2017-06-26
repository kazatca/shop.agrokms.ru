import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux'; 
import {OrderedMap} from 'immutable';

import reducer from '../../src/reducer.js';
import {setAll as setProducts} from '../../src/actions/products.js';
import Product from '../../src/components/Product';

const [coffee] = require('../mocks/products.json');

describe('Product component', ()=>{
  let store, product;
  
  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(setProducts([coffee]));
    product = mount(<Provider store={store}>
      <Product id={'1'} />
    </Provider>);
  });

  it('basic', ()=>{
    expect(product.find('.name').text()).to.equal('Coffee');
    expect(product.find('.price').text()).to.equal('50 р.');
    expect(product.find('img').prop('src')).to.equal('/coffee.png');
    expect(product.find('.qty').prop('value')).to.equal(1);
    expect(product.find('.buy')).to.be.ok;
    expect(product.find('.minus')).to.be.ok;
    expect(product.find('.plus')).to.be.ok;
  });

  it('buy click', ()=>{
    const buyBtn = product.find('.buy');
    buyBtn.simulate('click');
    expect(store.getState().getIn(['cart'])).to.eql(OrderedMap([['1', 1]]));
  });

  it('change qty by buttons', ()=>{
    const minusBtn = product.find('.minus');
    const plusBtn = product.find('.plus');

    plusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(2);

    plusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(3);

    minusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(2);

    minusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(1);
  });

  it('change by direct input', ()=> {
    const qtyInput = product.find('.qty');

    qtyInput.simulate('change', {target: {value: '10'}});

    expect(qtyInput.prop('value')).to.eql(10);
  });

  it('buy click with custom qty', ()=>{
    const buyBtn = product.find('.buy');
    const plusBtn = product.find('.plus');

    plusBtn.simulate('click');
    buyBtn.simulate('click');

    expect(store.getState().getIn(['cart'])).to.eql(OrderedMap([['1', 2]]));
  });

  it('qty cant be less than 1', () => {
    const minusBtn = product.find('.minus');
    minusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(1);

    const qtyInput = product.find('.qty');
    qtyInput.simulate('change', {target: {value: '-10'}});
    expect(qtyInput.prop('value')).to.eql(1);
  });
}); 

