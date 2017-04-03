import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createMemoryHistory} from 'history';

import Order, {OrderDummy} from '../../src/components/Order.jsx';
import reducer from '../../src/reducer';

describe('Order component', function() {
  it('basic', function() {
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const order = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <Order />
      </ConnectedRouter>
    </Provider>);

    expect(order.find('.cart')).to.have.length(1);
    expect(order.find('.username')).to.have.length(1);
    expect(order.find('.phone')).to.have.length(1);
    expect(order.find('.address')).to.have.length(1);
    expect(order.find('.submit')).to.have.length(1);
  });

  it('submit', function() {
    var submitted;
    const history = createMemoryHistory();
    const store = createStore(reducer);
    const order = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <OrderDummy
          submit={() => {submitted = true;}}
        />
      </ConnectedRouter>
    </Provider>);

    order.find('.submit').simulate('click');
    expect(submitted).to.be.ok;
  });
});