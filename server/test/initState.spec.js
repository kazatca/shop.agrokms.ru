import {expect} from 'chai';
import db from '../src/db.js';
import {init, truncate} from './dbInit.js';
import {getInitState} from '../src/initState.js';

const [coffee] = require('./mocks/products.json');

describe('initState', function() {
  before(() => init());

  beforeEach(() => truncate('Product', 'Store', 'Category'));
  
  it('basic', () => 
    getInitState('/')
    .then(({store, history}) => {
      expect(store).to.be.ok;
      expect(history).to.be.ok;
    })
  );

  it('path stored', ()=>
    getInitState('/path')
    .then(({store, history}) => {
      expect(history.location).to.have.property('pathname', '/path');
    })
  );

  it('creds stored', () => 
    getInitState('/')
    .then(({store, history}) => {
      expect(store.getState().getIn(['creds', 'google_map'])).to.eql('google_map_key');
    })
  );

  it('products stored', () =>
    db.model('Product').create(coffee)
    .then(() => getInitState('/'))
    .then(({store, history}) => {
      expect(store.getState().getIn(['products', '1', 'name'])).to.eql('Coffee');
    })
  );

  it('stores stored', () => 
    db.model('Store').create({
      address: 'Lenina, 1'
    })
    .then(() => getInitState('/'))
    .then(({store, history}) => {
      expect(store.getState().getIn(['stores', 0, 'address'])).to.eql('Lenina, 1');
    })
  );

  it('categories stored', () =>
    db.model('Category').create({name: 'Drinks'})
    .then(() => getInitState('/'))
    .then(({store, history}) => {
      expect(store.getState().getIn(['categories', 0, 'name'])).to.eql('Drinks');
    })
  );
});