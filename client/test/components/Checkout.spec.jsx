import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createMemoryHistory} from 'history';

import Checkout, {CheckoutDummy} from '../../src/components/Checkout.jsx';
import reducer from '../../src/reducer';
import {setAll as setProducts} from '../../src/actions/products.js';
import {add as addToCart} from '../../src/actions/cart.js';

const [coffee] = require('../mocks/products.json');

describe('Checkout component', function() {
  it('basic', function() {
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const order = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <Checkout />
      </ConnectedRouter>
    </Provider>);

    store.dispatch(setProducts([coffee]));
    store.dispatch(addToCart('1', 1));

    expect(order.find('.cart')).to.have.length(1);
    expect(order.find('.username')).to.have.length(1);
    expect(order.find('.phone')).to.have.length(1);
    expect(order.find('.address')).to.have.length(1);
    expect(order.find('.submit-order')).to.have.length(1);
  });

  it('submit', function() {
    var submitted;
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const order = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <CheckoutDummy
          submit={() => {submitted = true;}}
        />
      </ConnectedRouter>
    </Provider>);

    order.find('.submit-order').simulate('click');
    expect(submitted).to.be.ok;
  });
});