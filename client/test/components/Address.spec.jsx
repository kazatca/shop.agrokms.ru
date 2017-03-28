import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Address, {AddressDummy} from '../../src/components/Address.jsx';
import reducer from '../../src/reducer';
import {setAddress} from '../../src/actions/user.js';

describe('Address component', function() {
  it('basic', function() {
    const comp = mount(<AddressDummy 
      address={'Lenina, 1'}
      setAddress={()=>{}}
    />);

    expect(comp.find('.address').prop('value')).to.eql('Lenina, 1');
  });

  it('change', function() {
    var newAddress;
    const changeAddress = addr => {newAddress = addr;};
    const comp = mount(<AddressDummy 
      address={'Lenina, 1'}
      setAddress={addr => changeAddress(addr)}
    />);

    comp.find('.address').simulate('change', {target: {value: 'Marksa, 2'}});
    expect(newAddress).to.eql('Marksa, 2');
  });

  it('address from state', () => {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><Address /></Provider>);
    store.dispatch(setAddress('Lenina, 1'));

    expect(comp.find('.address').prop('value')).to.eql('Lenina, 1');
  });

  it('address to state', function() {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><Address /></Provider>);
    comp.find('.address').simulate('change', {target: {value: 'Marksa, 2'}});

    expect(store.getState().getIn(['user', 'address'])).to.eql('Marksa, 2');
  });
});