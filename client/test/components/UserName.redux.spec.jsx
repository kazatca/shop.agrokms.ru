import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import UserName from '../../src/components/UserName.jsx';
import reducer from '../../src/reducer';
import {setName} from '../../src/actions/user.js';

const name = 'Joe';

describe('UserName component with state', function() {
  it('name from state', () => {
    const store = createStore(reducer);
    const comp = mount(<Provider store={store}><UserName /></Provider>)
    store.dispatch(setName('Joe'));

    expect(comp.find('.username').prop('value')).to.eql('Joe');

  });
}); 