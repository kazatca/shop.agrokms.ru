import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {PhoneDummy as Phone} from '../../src/components/Phone.jsx';

const phone = '+12223334455';

describe('Phone component', function() {
  it('basic', function() {
    const comp = mount(<Phone 
      phone={phone}
      setPhone={()=>{}}
    />);

    expect(comp.find('.phone').prop('value')).to.eql(phone);
  });

  it('change', function() {
    var newPhone;
    const changePhone = phone => {newPhone = phone;};
    const comp = mount(<Phone 
      phone={phone}
      setPhone={phone => changePhone(phone)}
    />);

    comp.find('.phone').simulate('change', {target: {value: '+12223334466'}});
    expect(newPhone).to.eql('+12223334466');
  });
}); 