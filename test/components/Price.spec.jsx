import React from 'react';
import expect from 'expect.js';
import {shallow} from 'enzyme';

import Price from '../../src/components/Price';

describe('Price component', function() {
  it('basic', function() {
    const price = shallow(<Price 
      price={50}
      format={':price р.'}
    />);

    expect(price.find('.price').text()).to.eql('50 р.');
  });

  it('use default format', function() {
    const price = shallow(<Price 
      price={50}
    />);
    
    expect(price.find('.price').text()).to.eql('50 р.');
  });

  xit('warn on wrong price format', function() {
    const price = shallow(<Price 
      price={50}
      format={'wrong fromat'}
    />);
  });
});