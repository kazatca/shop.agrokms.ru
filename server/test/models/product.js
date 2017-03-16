import {expect} from 'chai';

import Sequelize from 'sequelize';
import productSchema from '../../models/Product';

describe('Product model', function() {
  var seq, Product;

  before(()=> {
    seq = new Sequelize('mysql://root:root@localhost/shop_test', {
      logging: null
    });
    Product = seq.import('product', productSchema);
  });

  beforeEach(() => Product.sync({force: true}));

  it('basic', () =>
    Product.create({
      name: 'Coffee'
    })
    .then(() => Product.findAndCountAll())
    .then(result => expect(result.count).to.eql(1))
  );

  it('empty product must throw', ()=>
    expect(
      Product.create({})
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('name cannot be null')
  );

  it('unique name', ()=>
    expect(
      Product.bulkCreate([
        {name: 'Coffee'},
        {name: 'Coffee'}
      ])
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('name must be unique')
  );

  it('fetching', ()=>
    Product.bulkCreate([
      {name: 'Coffee', image: '/coffee.png', price: 5000},
      {name: 'Burger', image: '/burger.png', price: 8000}
    ])
    .then(() => 
      Product.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
    )
    .then(products => 
      expect(products.map(product => 
        product.get({plain: true}) 
      )).to.eql([
        {id: 1, name: 'Coffee', image: '/coffee.png', price: 5000},
        {id: 2, name: 'Burger', image: '/burger.png', price: 8000}
      ])
    )
  );
});