import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Phone, {PhoneDummy, mask, unmask} from '../../src/components/Phone.jsx';
import reducer from '../../src/reducer';
import {setPhone} from '../../src/actions/user.js';
import {setAll as setSettings} from '../../src/actions/settings.js';

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

  it('mask', () => {
    expect(mask('', '2223334455')).to.eql('2223334455');
    expect(mask('+1(999)999-99-99', '2223334455')).to.eql('+1(222)333-44-55');
    expect(mask('+1(999)999-99-99', '22233344556')).to.eql('+1(222)333-44-556');
  });

  it('unmask', () => {
    expect(unmask('', '+1(222)333-44-55')).to.eql('+1(222)333-44-55');
    expect(unmask('+1(999)999-99-99', '+1(222)333-44-55')).to.eql('2223334455');
    expect(unmask('+1(999)999-99-99', '+1(222)333-44-556')).to.eql('22233344556');
  });

  it('use mask', () => {
    const comp = mount(<PhoneDummy 
      phone={'2223334455'}
      mask={'+1(999)999-99-99'}
      setPhone={()=>{}}
    />);

    expect(comp.find('.phone').prop('value')).to.eql('+1(222)333-44-55');
  });

  it('use unmask', () => {
    var newPhone;
    const comp = mount(<PhoneDummy
      mask={'+1(999)999-99-99'} 
      setPhone={phone => {newPhone = phone;}}
    />);

    comp.find('.phone').simulate('change', {target: {value: '+1(222)333-44-55'}});
    expect(newPhone).to.eql('2223334455');
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

  it('phone from state with mask', () => {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><Phone /></Provider>);
    store.dispatch(setSettings([{key: 'phone.mask', value: '"+1(999)999-99-99"'}]));
    store.dispatch(setPhone('2223334455'));

    expect(comp.find('.phone').prop('value')).to.eql('+1(222)333-44-55');
  });
});