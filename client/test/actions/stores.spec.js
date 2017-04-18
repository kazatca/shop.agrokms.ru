import {expect} from 'chai';
import {List, Map} from 'immutable';

import reducer from '../../src/reducers/stores.js';

describe('Stores actions', function() {
  it('set', ()=>{
    const state = List();

    const action = {type: 'STORES.SET', stores: [
      {address: 'Lenina, 1'}
    ]};
    const newState = reducer(state, action);

    expect(newState).to.equal(List([Map({address: 'Lenina, 1'})]));
  });
});