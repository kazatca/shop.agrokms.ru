import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore, applyMiddleware} from 'redux';
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

  it('dataConnect working', () => {
    let fetched = false;
    const fetcher = store => next => action => {
      if(action.type == 'FETCH'){
        fetched = action;
      }
      return next(action);
    };

    const store = createStore(reducer, applyMiddleware(fetcher));
    
    mount(<Provider store={store}>
      <StoreFront />
    </Provider>);

    expect(fetched).to.have.property('url', '/products/all');
    expect(fetched).to.have.property('params');
  });
});