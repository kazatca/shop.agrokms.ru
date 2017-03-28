import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Phone, {PhoneDummy} from '../../src/components/Phone.jsx';
import reducer from '../../src/reducer';
import {setPhone} from '../../src/actions/user.js';

describe('Phone component', function() {
  it('basic', function() {
    const comp = mount(<PhoneDummy 
      phone={'+12223334455'}
      setPhone={()=>{}}
    />);

    expect(comp.find('.phone').prop('value')).to.eql('+12223334455');
  });

  it('change', function() {
    var newPhone;
    const changePhone = phone => {newPhone = phone;};
    const comp = mount(<PhoneDummy 
      phone={'+12223334455'}
      setPhone={phone => changePhone(phone)}
    />);

    comp.find('.phone').simulate('change', {target: {value: '+12223334466'}});
    expect(newPhone).to.eql('+12223334466');
  });

  it('phone from state', () => {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><Phone /></Provider>);
    store.dispatch(setPhone('+12223334455'));

    expect(comp.find('.phone').prop('value')).to.eql('+12223334455');
  });

  it('phone to state', function() {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><Phone /></Provider>);
    comp.find('.phone').simulate('change', {target: {value: '+12223334466'}});

    expect(store.getState().getIn(['user', 'phone'])).to.eql('+12223334466');
  });
});