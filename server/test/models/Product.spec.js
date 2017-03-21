import {expect} from 'chai';
import db from '../../src/db';

describe('Product model', function() {
  beforeEach(() => Promise.all([
    db.model('Category').sync({force: true}),
    db.model('Product').sync({force: true})
  ]));

  it('basic', () =>
    db.model('Product').create({
      name: 'Coffee'
    })
    .then(() => db.model('Product').findAndCountAll())
    .then(result => expect(result.count).to.eql(1))
  );

  it('empty product must throw', ()=>
    expect(
      db.model('Product').create({})
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('name cannot be null')
  );

  it('unique name', ()=>
    expect(
      db.model('Product').bulkCreate([
        {name: 'Coffee'},
        {name: 'Coffee'}
      ])
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('name must be unique')
  );

  it('fetching', ()=>
    db.model('Product').bulkCreate([
      {name: 'Coffee', price: 5000},
      {name: 'Burger', price: 8000}
    ])
    .then(() => db.model('Product').findAll())
    .then(products => products.map(product => 
      product.get({plain: true}) 
    ))
    .then(products => {
      expect(products).to.have.length(2);

      expect(products[0]).to.have.property('id', 1);
      expect(products[0]).to.have.property('name', 'Coffee');
      expect(products[0]).to.have.property('price', 5000);

      expect(products[1]).to.have.property('id', 2);
      expect(products[1]).to.have.property('name', 'Burger');
      expect(products[1]).to.have.property('price', 8000);
    })
  );

  it('with category', ()=>{
    return db.model('Product').create({
      name: 'Coffee',
      CategoryId: 1
    }, {
      include: [db.model('Category')]
    })
    .then(()=> db.model('Product').findOne())
    .then(product => product.get({plain: true}))
    .then(product => {
      expect(product).to.have.property('id', 1);
      expect(product).to.have.property('CategoryId', 1);
    });
  });
});