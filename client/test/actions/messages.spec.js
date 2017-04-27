import {expect} from 'chai';
import {createStore} from 'redux';

import reducer from '../../src/reducer.js';
import {set, clear} from '../../src/actions/messages.js';

describe('Messages actions', function() {
  it('set', function() {
    const store = createStore(reducer);
    store.dispatch(set('hello', 'world'));

    expect(store.getState().getIn(['messages', 'hello'])).to.eql('world');    
  });

  it('clear', ()=>{
    const store = createStore(reducer);
    store.dispatch(set('hello', 'world'));
    expect(store.getState().getIn(['messages', 'hello'])).to.eql('world');    

    store.dispatch(clear('hello'));
    expect(store.getState().getIn(['messages', 'hello'])).to.be.not.ok;
  });
});