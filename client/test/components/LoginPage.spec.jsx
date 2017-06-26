import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from '../../src/reducer.js';
import Phone from '../../src/components/Phone.jsx';
import Password from '../../src/components/Password.jsx';
import {set as setMessage} from '../../src/actions/messages.js';
import LoginPage, {LoginPage as LoginPageDummy} from '../../src/components/LoginPage.jsx';

describe('LoginPage component', function() {
  let store, page;

  beforeEach(() => {
    store = createStore(reducer);
    page = mount(<Provider store={store}><LoginPage /></Provider>);
  });

  it('basic', function() {
    expect(page.find(Phone)).to.have.length(1);
    expect(page.find(Password)).to.have.length(1);
    expect(page.find('input[type="submit"]')).to.have.length(1);
  });

  it('show error', ()=> {
    store.dispatch(setMessage('loginError', 'Error msg'));

    expect(page.find('.error')).to.have.length(1);
    expect(page.find('.error').text()).to.eql('Error msg');
  });

  it('login', ()=> {
    let clicked;
    const page = mount(<Provider store={store}><LoginPageDummy 
      login={()=>{clicked = true;}}
    /></Provider>);

    page.find('form').simulate('submit');

    expect(clicked).to.be.ok;
  });
});
