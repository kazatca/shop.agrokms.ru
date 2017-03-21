import {expect} from 'chai';
import db from '../../src/db';

describe('User model', function() {
  beforeEach(() => db.model('User').sync({force: true}));

  it('basic', () =>
    db.model('User').create({
      name: 'Joe',
      phone: '+12223334455'
    })
    .then(() => db.model('User').findAndCountAll())
    .then(result => expect(result.count).to.eql(1))
  );

  it('empty phone must throw', ()=>
    expect(
      db.model('User').create({name: 'Joe'})
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('phone cannot be null')
  );

  it('unique phone', ()=>
    expect(
      db.model('User').bulkCreate([
        {name: 'Joe',  phone: '+12223334455'},
        {name: 'Dave', phone: '+12223334455'}
      ])
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('phone must be unique')
  );
});