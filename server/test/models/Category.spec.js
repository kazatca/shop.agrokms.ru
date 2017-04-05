import {expect} from 'chai';
import db from '../../src/db';
import {init, truncate} from '../dbInit.js';

describe('Category model', function() {
  before(init);
  beforeEach(() => truncate('Category'));

  it('basic', () =>
    db.model('Category').create({
      name: 'Drinks'
    })
    .then(() => db.model('Category').findAndCountAll())
    .then(result => expect(result.count).to.eql(1))
  );

  it('empty product must throw', ()=>
    expect(
      db.model('Category').create({})
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('name cannot be null')
  );

  it('unique name', ()=>
    expect(
      db.model('Category').bulkCreate([
        {name: 'Drinks'},
        {name: 'Drinks'}
      ])
      .catch(err => {throw err.errors[0].message;})
    ).to.be.rejectedWith('name must be unique')
  );
});