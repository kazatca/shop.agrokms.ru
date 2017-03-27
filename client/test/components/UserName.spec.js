import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {UserNameDummy as UserName} from '../../src/components/UserName.jsx';

const name = 'Joe';

describe('UserName component', function() {
  it('basic', function() {
    const comp = mount(<UserName 
      name={name}
      setName={()=>{}}
    />);

    expect(comp.find('.username').prop('value')).to.eql(name);
  });

  it('change', function() {
    var newName;
    const changeName = name => {newName = name;};
    const comp = mount(<UserName 
      name={name}
      setName={name => changeName(name)}
    />);

    comp.find('.username').simulate('change', {target: {value: 'Dave'}});
    expect(newName).to.eql('Dave');
  });
}); 