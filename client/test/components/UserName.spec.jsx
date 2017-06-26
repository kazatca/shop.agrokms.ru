import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import UserName from '../../src/components/UserName.jsx';
import reducer from '../../src/reducer';
import {setName} from '../../src/actions/user.js';

describe('UserName component', function() {
  let store, username;

  beforeEach(() => {
    store = createStore(reducer);
    username = mount(<Provider store={store}><UserName /></Provider>);
  });

  it('basic', () => {
    store.dispatch(setName('Joe'));
    expect(username.find('.username').prop('value')).to.eql('Joe');
  });

  it('change', function() {
    const value = 'Dave';
    username.find('.username').simulate('change', {target: {value}});

    expect(store.getState().getIn(['user', 'name'])).to.eql(value);
  });
});