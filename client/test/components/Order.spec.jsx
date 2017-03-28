import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Order, {OrderDummy} from '../../src/components/Order.jsx';
import reducer from '../../src/reducer';

describe('Order component', function() {
  it('basic', function() {
    const store = createStore(reducer);
    const order = mount(<Provider store={store}><Order /></Provider>);

    expect(order.find('.cart')).to.have.length(1);
    expect(order.find('.username')).to.have.length(1);
    expect(order.find('.phone')).to.have.length(1);
    expect(order.find('.address')).to.have.length(1);
    expect(order.find('.submit')).to.have.length(1);
  });

  it('submit', function() {
    var submitted;
    const store = createStore(reducer);
    const order = mount(<Provider store={store}><OrderDummy
      submit={() => {submitted = true;}}
    /></Provider>);

    order.find('.submit').simulate('click');
    expect(submitted).to.be.ok;
  });
});