import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import Phone from '../../src/components/Phone.jsx';
import Password from '../../src/components/Password.jsx';
import {LoginPageDummy} from '../../src/components/LoginPage.jsx';

describe('LoginPage component', function() {
  it('basic', function() {
    const comp = shallow(<LoginPageDummy login={()=>{}}/>);
    expect(comp.find(Phone)).to.have.length(1);
    expect(comp.find(Password)).to.have.length(1);
  });

  it('show error', ()=> {
    const comp = shallow(<LoginPageDummy 
      login={()=>{}}
      error={'Error msg'}
    />);

    expect(comp.find('.error')).to.have.length(1);
    expect(comp.find('.error').text()).to.eql('Error msg');
  });

  it('login', ()=> {
    var clicked;
    const comp = shallow(<LoginPageDummy 
      login={()=>{clicked = true;}}
    />);

    comp.find('form').simulate('submit');

    expect(clicked).to.be.ok;
  });
});
