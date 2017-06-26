import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Password from '../../src/components/Password.jsx';
import reducer from '../../src/reducer';
import {setPassword} from '../../src/actions/user.js';

describe('Password component', function() {
  let store, password;

  beforeEach(() => {
    store = createStore(reducer);
    password = mount(<Provider store={store}><Password /></Provider>);
  });

  it('basic', function() {
    store.dispatch(setPassword('secret'));
    expect(password.find('input').prop('type')).to.eql('password');
    expect(password.find('input').prop('value')).to.eql('secret');
  });

  it('change', function() {
    password.find('input').simulate('change', {target: {value: 'hollyarmadillo'}});
    expect(store.getState().getIn(['user', 'password'])).to.eql('hollyarmadillo');
  });
});