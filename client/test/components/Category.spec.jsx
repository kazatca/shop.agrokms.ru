import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from '../../src/reducer.js';
import {setAll as setProducts} from '../../src/actions/products.js';
import {setAll as setCategories} from '../../src/actions/categories.js';

import Category from '../../src/components/Category.jsx';

describe('Category component', () => {
  let store;
  
  before(() => {
    store = createStore(reducer);
    store.dispatch(setProducts(require('../mocks/products.json')));
    store.dispatch(setCategories(require('../mocks/categories.json')));
  });

  const getCategory = id => 
    mount(
      <Provider store={store}>
        <Category match={{params: {id}}}/>
      </Provider>);

  it('got products with category 1', () => {
    const category = getCategory('1');
    expect(category.find('.product').length).to.eq(1);
    expect(category.find('.product .name').text()).to.eq('Coffee');
  });

  it('correct name of category', () => {
    getCategory('1');
    expect(global.document.title).to.eql('Drinks');
    
    getCategory('2');
    expect(global.document.title).to.eql('Food');
  });
});