import React from 'react';
import expect from 'expect.js';
import {mount} from 'enzyme';

import {StoreFrontDummy as StoreFront} from '../../src/components/StoreFront';

const [coffee, burger] = require('../mocks/products.json');

describe('StoreFront component', function() {
  it('basic', function() {
    const storeFront = mount(<StoreFront 
      products={[coffee, burger]}
      addToCart={()=>{}}
    />);

    expect(storeFront.find('.product').length).to.eql(2);
  });

  it('add to cart', ()=>{
    let added;
    const addToCart = (id, qty) => {added = {id, qty};};
    const storeFront = mount(<StoreFront 
      products={[coffee]}
      addToCart={addToCart}
    />);

    storeFront.find('.product .buy').simulate('click');
    expect(added).to.eql({id: '1', qty: 1});
  });
}); 