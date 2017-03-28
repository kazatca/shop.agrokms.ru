import {expect} from 'chai';
import {fromJS} from 'immutable';
import nock from 'nock';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducer from '../../src/reducer.js';
import {fetch} from '../../src/actions/products.js';


describe('Product actions', function() {
  it('fetch', function() {
    const store = createStore(
      reducer, 
      applyMiddleware(thunk)
    );

    nock(/localhost/)
    .get('/api/product/all')
    .reply(200, [
      {id: '1', name: 'Coffee', price: 5000}
    ]);

    return store.dispatch(fetch())
    .then(() => {
      const state = store.getState();
      const products = state.get('products');
      expect(products).to.eql(fromJS({
        1: {id: '1', name: 'Coffee', price: 5000}
      }));
    });
  });
});