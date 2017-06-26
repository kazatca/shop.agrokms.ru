import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Phone, {mask, unmask} from '../../src/components/Phone.jsx';
import reducer from '../../src/reducer';
import {setPhone} from '../../src/actions/user.js';
import {setAll as setSettings} from '../../src/actions/settings.js';

describe('Phone component', function() {
  let store, phone;

  const getPhone = () => 
    store.getState().getIn(['user', 'phone']);

  beforeEach(() => {
    store = createStore(reducer);
    phone = mount(<Provider store={store}><Phone /></Provider>);
  });

  it('basic', function() {
    store.dispatch(setPhone('+12223334455'));
    expect(phone.find('.phone').prop('value')).to.eql('+12223334455');
  });

  it('change', function() {
    const value = '+12223334466';
    phone.find('.phone').simulate('change', {target: {value}});
    expect(getPhone()).to.eql(value);
  });

  it('mask working', () => {
    expect(mask('', '2223334455')).to.eql('2223334455');
    expect(mask('+1(999)999-99-99', '2223334455')).to.eql('+1(222)333-44-55');
    expect(mask('+1(999)999-99-99', '22233344556')).to.eql('+1(222)333-44-556');
  });

  it('unmask working', () => {
    expect(unmask('', '+1(222)333-44-55')).to.eql('+1(222)333-44-55');
    expect(unmask('+1(999)999-99-99', '+1(222)333-44-55')).to.eql('2223334455');
    expect(unmask('+1(999)999-99-99', '+1(222)333-44-556')).to.eql('22233344556');
  });

  it('use mask', () => {
    store.dispatch(setSettings([{key: 'phone.mask', value: '"+1(999)999-99-99"'}]));
    store.dispatch(setPhone('2223334455'));

    expect(phone.find('.phone').prop('value')).to.eql('+1(222)333-44-55');
  });

  it('use unmask', () => {
    store.dispatch(setSettings([{key: 'phone.mask', value: '"+1(999)999-99-99"'}]));

    phone.find('.phone').simulate('change', {target: {value: '+1(222)333-44-55'}});
    expect(getPhone()).to.eql('2223334455');
  });
});