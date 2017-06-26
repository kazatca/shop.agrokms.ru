import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Address from '../../src/components/Address.jsx';
import reducer from '../../src/reducer';
import {setAddress} from '../../src/actions/user.js';

describe('Address component', function() {
  let store, address;
  beforeEach(() => {
    store = createStore(reducer);
    address = mount(<Provider store={store}><Address /></Provider>);
  });

  it('got value from store', function() {
    store.dispatch(setAddress('Lenina, 1'));
    expect(address.find('.address').prop('value')).to.eql('Lenina, 1');
  });

  it('change', function() {
    address.find('.address').simulate('change', {target: {value: 'Marksa, 2'}});
    expect(store.getState().getIn(['user', 'address'])).to.eql('Marksa, 2');
  });
});