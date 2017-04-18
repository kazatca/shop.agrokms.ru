import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Password, {PasswordDummy} from '../../src/components/Password.jsx';
import reducer from '../../src/reducer';
import {setPassword} from '../../src/actions/user.js';

describe('Password component', function() {
  it('basic', function() {
    const pass = mount(<PasswordDummy 
      password={'secret'}
      setPassword={()=>{}}
    />);

    expect(pass.find('.password').prop('type')).to.eql('password')
    expect(pass.find('.password').prop('value')).to.eql('secret');
  });

  it('change', function() {
    var newPassword;
    const changePassword = password => {newPassword = password;};
    const comp = mount(<PasswordDummy 
      password={''}
      setPassword={password => changePassword(password)}
    />);

    comp.find('.password').simulate('change', {target: {value: 'hollyarmadillo'}});
    expect(newPassword).to.eql('hollyarmadillo');
  });

  it('password from state', () => {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><Password /></Provider>);
    store.dispatch(setPassword('secret'));

    expect(comp.find('.password').prop('value')).to.eql('secret');
  });

  it('password to state', function() {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><Password /></Provider>);
    comp.find('.password').simulate('change', {target: {value: 'secret'}});

    expect(store.getState().getIn(['user', 'password'])).to.eql('secret');
  });
});