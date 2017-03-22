import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import Product from '../../src/components/Product';

const coffee = {
  id: 1,
  name: 'Coffee',
  price: 50,
  image: '/coffee.png',
  addToCart: ()=>{}
};

describe('Product component', ()=>{
  it('basic', ()=>{
    const product = mount(<Product {...coffee}/>);

    expect(product.find('.name').text()).to.equal('Coffee');
    expect(product.find('.price').text()).to.equal('50 р.');
    expect(product.find('img').prop('src')).to.equal('/coffee.png');
    expect(product.find('.qty').prop('value')).to.equal(1);
    expect(product.find('.buy')).to.be.ok;
    expect(product.find('.minus')).to.be.ok;
    expect(product.find('.plus')).to.be.ok;
  });

  it('buy click', ()=>{
    let cart = [];
    const addToCart = id => cart.push(id);
    const product = mount(<Product {...coffee} 
      addToCart={addToCart}
    />);

    const buyBtn = product.find('.buy');
    buyBtn.simulate('click');
    expect(cart).to.eql([1]);
  });

  it('change qty by buttons', ()=>{
    const product = mount(<Product {...coffee} />);

    const minusBtn = product.find('.minus');
    const plusBtn = product.find('.plus');

    plusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(2);

    plusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(3);

    minusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(2);

    minusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(1);

    //cant be less than 1
    minusBtn.simulate('click');
    expect(product.find('.qty').prop('value')).to.eql(1);
  });

  it('change by direct input', ()=> {
    const product = mount(<Product {...coffee} />);

    const qtyInput = product.find('.qty');

    qtyInput.simulate('change', {target: {value: '10'}});

    //todo: why numeric?
    expect(qtyInput.prop('value')).to.eql(10);
  });

  it('buy click with custom qty', ()=>{
    let cart = [];
    const addToCart = (id, qty) => cart.push({id, qty});
    const product = mount(<Product {...coffee} 
      addToCart={addToCart}
    />);

    const buyBtn = product.find('.buy');
    const plusBtn = product.find('.plus');

    plusBtn.simulate('click');
    buyBtn.simulate('click');

    expect(cart).to.eql([{id: 1, qty: 2}]);
  });
}); 

