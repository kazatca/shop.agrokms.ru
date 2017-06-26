import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createMemoryHistory} from 'history';

import CheckoutPage from '../../src/components/CheckoutPage.jsx';
import reducer from '../../src/reducer.js';
import {setAll as setProducts} from '../../src/actions/products.js';
import {add as addToCart} from '../../src/actions/cart.js';

describe('CheckoutPage component', function() {
  let store, page;

  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(setProducts(require('../mocks/products.json')));

    const history = createMemoryHistory();

    //ConnectedRouter is for NavLink
    page = mount(<Provider store={store}>
      <ConnectedRouter history={history}> 
        <CheckoutPage/>
      </ConnectedRouter>
    </Provider>);
  });

  it('empty cart', ()=>{
    expect(page.find('.empty-cart')).to.have.length(1);
    expect(page.find('.cart')).to.have.length(0);
  });

  it('filled cart', () => {
    store.dispatch(addToCart('1', 1));

    expect(page.find('.cart')).to.have.length(1);
    expect(page.find('.empty-cart')).to.have.length(0);
  });
});