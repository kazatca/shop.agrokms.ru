import {expect} from 'chai';
import {createStore} from 'redux';

import {set as setStatus} from '../../src/actions/status.js';
import reducer from '../../src/reducer.js';

describe('Status actions', function() {
  it('status is 200', () => {
    const store = createStore(reducer);
    expect(store.getState().get('status')).to.eql(200);
  });
    
  it('set', function() {
    const store = createStore(reducer);
    store.dispatch(setStatus(404));

    expect(store.getState().get('status')).to.eql(404);
  });
});