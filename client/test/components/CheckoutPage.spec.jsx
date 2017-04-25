import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createMemoryHistory} from 'history';

import {CheckoutPageDummy} from '../../src/components/CheckoutPage.jsx';
import reducer from '../../src/reducer';
import {setAll as setProducts} from '../../src/actions/products.js';
import {add as addToCart} from '../../src/actions/cart.js';

const [coffee] = require('../mocks/products.json');

describe('CheckoutPage component', function() {
  it('empty cart', ()=>{
    const history = createMemoryHistory();
    const store = createStore(reducer);
    
    const page = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <CheckoutPageDummy cartIsEmpty={true} />
      </ConnectedRouter>
    </Provider>);
    expect(page.find('.empty-cart')).to.have.length(1);
    expect(page.find('.cart')).to.have.length(0);
  });

  it('filled cart', () => {
    const history = createMemoryHistory();
    const store = createStore(reducer);
    
    store.dispatch(setProducts([coffee]));
    store.dispatch(addToCart('1', 1));

    const page = mount(<Provider store={store}>
      <ConnectedRouter history={history}>
        <CheckoutPageDummy cartIsEmpty={false} />
      </ConnectedRouter>
    </Provider>);

    expect(page.find('.cart')).to.have.length(1);
    expect(page.find('.empty-cart')).to.have.length(0);
  });
});