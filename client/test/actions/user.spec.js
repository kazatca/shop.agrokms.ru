import {expect} from 'chai';
import {createStore} from 'redux';
import {Map} from 'immutable';

import reducer from '../../src/reducer.js';
import {setName, setPhone, setAddress} from '../../src/actions/user.js';

describe('User actions', function() {
  it('init state', () => {
    const store = createStore(reducer);
    expect(store.getState().get('user')).to.eql(Map({
      name: '',
      phone: '',
      address: ''
    }));    
  });

  it('set name', function() {
    const store = createStore(reducer);
    store.dispatch(setName('Joe'));
    expect(store.getState().get('user').get('name')).to.eql('Joe');
  });
  
  it('set phone', function() {
    const store = createStore(reducer);
    store.dispatch(setPhone('+12223334455'));
    expect(store.getState().get('user').get('phone')).to.eql('+12223334455');
  });

  it('set address', function() {
    const store = createStore(reducer);
    store.dispatch(setAddress('Lenina, 1'));
    expect(store.getState().get('user').get('address')).to.eql('Lenina, 1');
  });
});