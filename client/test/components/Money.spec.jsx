import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import Money from '../../src/components/Money';

describe('Money component', function() {
  it('basic', function() {
    const money = mount(<Money format={':money р.'} >{50}</Money>);

    expect(money.find('.money').text()).to.eql('50 р.');
  });

  it('use default format', function() {
    const money = mount(<Money>{50}</Money>);
    
    expect(money.find('.money').text()).to.eql('50 р.');
  });

  it('warn on wrong money format', function() {
    let failed;
    const error = console.error;
    console.error = (msg, ...args) => {
      if(/Failed prop type/.test(msg)){
        failed = true;
        return;
      }
      Reflect.apply(error, console, [msg, ...args]);
    };

    mount(<Money format={'wrong fromat'}>{50}</Money>);

    expect(failed).to.be.ok;
  });
});