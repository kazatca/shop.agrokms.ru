import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {setAll as setProducts} from '../../src/actions/products.js';
import reducer from '../../src/reducer.js';
import StoreFront from '../../src/components/StoreFront.jsx';

const [coffee, burger] = require('../mocks/products.json');

describe('StoreFront component', function() {
  it('basic', ()=>{
    const store = createStore(reducer);
    const storeFront = mount(<Provider store={store}>
      <StoreFront />
    </Provider>);

    expect(storeFront.find('.product').length).to.eql(0);

    store.dispatch(setProducts([coffee, burger]));

    expect(storeFront.find('.product').length).to.eql(2);
  });
});