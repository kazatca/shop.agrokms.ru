import {expect} from 'chai';
import db from '../src/db.js';
import {init, truncate} from './dbInit.js';
import {getInitState} from '../src/initState.js';

const [coffee] = require('./mocks/products.json');

describe('initState', function() {
  before(() => init());

  beforeEach(() => truncate('Product', 'Store', 'Category', 'User'));
  
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

  it('creds stored', () => {
    process.env.GMAP_KEY='google_map_key';
    return getInitState('/')
    .then(({store, history}) => {
      expect(store.getState().getIn(['creds', 'google_map'])).to.eql('google_map_key');
    })
  });

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

  it('user stored', () => 
    db.model('User').create({
      id: 1,
      name: 'Joe',
      phone: '+12223334455',
      address: 'Lenina, 1'
    })
    .then(() => getInitState('/', {userId: '1'}))
    .then(({store, history}) => {
      const state = store.getState().get('user');
      expect(state.get('id')).to.eql('1');
      expect(state.get('phone')).to.eql('+12223334455');
      expect(state.get('name')).to.eql('Joe');
      expect(state.get('address')).to.eql('Lenina, 1');
    })
  );
});