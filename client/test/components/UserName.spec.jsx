import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import UserName, {UserNameDummy} from '../../src/components/UserName.jsx';
import reducer from '../../src/reducer';
import {setName} from '../../src/actions/user.js';

describe('UserName component', function() {
  it('basic', function() {
    const comp = mount(<UserNameDummy 
      name={'Joe'}
      setName={()=>{}}
    />);

    expect(comp.find('.username').prop('value')).to.eql('Joe');
  });

  it('change', function() {
    var newName;
    const changeName = name => {newName = name;};
    const comp = mount(<UserNameDummy 
      name={name}
      setName={name => changeName(name)}
    />);

    comp.find('.username').simulate('change', {target: {value: 'Dave'}});
    expect(newName).to.eql('Dave');
  });

  it('name from state', () => {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><UserName /></Provider>);
    store.dispatch(setName('Joe'));

    expect(comp.find('.username').prop('value')).to.eql('Joe');
  });

  it('name to state', function() {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><UserName /></Provider>);
    comp.find('.username').simulate('change', {target: {value: 'Dave'}});

    expect(store.getState().getIn(['user', 'name'])).to.eql('Dave');
  });
});