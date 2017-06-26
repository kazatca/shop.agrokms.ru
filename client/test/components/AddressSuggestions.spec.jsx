import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';

import AddressSuggestions from '../../src/components/AddressSuggestions.jsx';
import reducer from '../../src/reducer.js';
import {setAddresses, moveCursor} from '../../src/actions/suggestions.js';

describe('AddressSuggestions component', function() {
  let store, suggestions;
  const addresses = ['Lenina, 1', 'Lenina, 12'];

  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setAddresses(addresses));
    suggestions = mount(<Provider store={store}><AddressSuggestions /></Provider>);
  });

  it('basic', () => {
    expect(suggestions.find('.address-suggestions')).to.have.length(1);
    expect(suggestions.find('li')).to.have.length(2);
  });

  it('select', () => {
    suggestions.find('li').first().simulate('click');
    expect(store.getState().getIn(['user', 'address'])).to.eql(addresses[0]);
    
    suggestions.find('li').last().simulate('click');
    expect(store.getState().getIn(['user', 'address'])).to.eql(addresses[1]);
  });

  it('clear', () => {
    suggestions.find('.clear-suggestions').simulate('click');
    expect(store.getState().getIn(['suggestions', 'addresses'])).to.be.not.ok;
    expect(suggestions.find('li')).to.have.length(0);
  });

  it('move cursor', () => {
    const expectActive = cursor => addresses.forEach((address, i) => {
      const cls = suggestions.find('li').at(i).prop('className');
      if(i == cursor){
        expect(cls).to.match(/active/);
        expect(store.getState().getIn(['user', 'address'])).to.eql(address);
      }
      else{
        expect(cls).to.not.match(/active/);
      }
    });
    
    store.dispatch(moveCursor('down'));
    expectActive(0);
    
    store.dispatch(moveCursor('down'));
    expectActive(1);

    store.dispatch(moveCursor('down'));
    expectActive(1);
    
    store.dispatch(moveCursor('up'));
    expectActive(0);

    store.dispatch(moveCursor('up'));
    expectActive(0);
  });
});
