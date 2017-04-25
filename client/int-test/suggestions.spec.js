import {expect} from 'chai';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {setApiKey, getAddresses, stripSuggestions} from '../src/actions/suggestions.js';
import reducer from '../src/reducer.js';

describe('Suggestions service', function() {
  it('basic', function() {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setApiKey(process.env.DADATA_KEY));
    store.dispatch(getAddresses('Ленина'))
    .then(() => {
      const addresses = store.getState().getIn(['suggestions', 'addresses']);
      expect(addresses).to.be.array;
      addresses.forEach(item => {
        expect(item).to.have.property('value');
        expect(item).to.have.property('unrestricted_value');
        expect(item).to.have.property('data');
      });
    });
  });
});