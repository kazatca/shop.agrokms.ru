import {expect} from 'chai';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {getAddresses} from '../src/actions/suggestions.js';
import {setValue} from '../src/actions/settings.js';
import reducer from '../src/reducer.js';

describe('Suggestions service', function() {
  it('basic', function() {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setValue(['suggestions', 'address', 'apiKey'], process.env.DADATA_KEY));
    return store.dispatch(getAddresses('Ленина'))
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