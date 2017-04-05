import {expect} from 'chai';
import db from '../../src/db';
import {init, truncate} from '../dbInit.js';

describe('User model', function() {
  before(init);
  beforeEach(() => truncate('User'));

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
        {name: 'Joe', phone: '+12223334455'},
        {name: 'Dave', phone: '+12223334455'}
      ])
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('phone must be unique')
  );

  it('validate role', function() {
    expect(db.model('User').create({
      name: 'Joe', 
      phone: '+12223334455',
      role: 'wrongRole'
    }))
    .to.be.rejectedWith('wrong role');
  });
});