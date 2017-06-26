import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Address from '../../src/components/AddressWithSuggestions.jsx';
import reducer from '../../src/reducer.js';
import {setAddress} from '../../src/actions/user.js';

describe('AddressWithSuggestions component', function() {
  let store, address;

  beforeEach(() => {
    store = createStore(reducer);
    address = mount(<Provider store={store}><Address /></Provider>);
  });

  it('basic', () => {
    store.dispatch(setAddress('Lenina, 1'));
    expect(address.find('.address')).to.have.length(1);
    expect(address.find('.address').prop('value')).to.eql('Lenina, 1');
  });

  it('change', () => {
    const value = 'Lenina, 1';
    address.find('.address').simulate('change', {target: {value}});

    expect(store.getState().getIn(['user', 'address'])).to.eql(value);
  });
});
