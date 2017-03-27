import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {AddressDummy as Address} from '../../src/components/Address.jsx';

const address = 'Lenina, 1';

describe('Address component', function() {
  it('basic', function() {
    const comp = mount(<Address 
      address={address}
      setAddress={()=>{}}
    />);

    expect(comp.find('.address').prop('value')).to.eql(address);
  });

  it('change', function() {
    var newAddress;
    const changeAddress = addr => {newAddress = addr;};
    const comp = mount(<Address 
      address={address}
      setAddress={addr => changeAddress(addr)}
    />);

    comp.find('.address').simulate('change', {target: {value: 'Marksa, 2'}});
    expect(newAddress).to.eql('Marksa, 2');
  });
}); 