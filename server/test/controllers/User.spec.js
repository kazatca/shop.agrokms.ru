import {expect} from 'chai';

import db from '../../src/db';
import {init, truncate} from '../dbInit.js';

import * as User from '../../src/controllers/User.js';

describe('User controller', function() {
  before(init);
  beforeEach(() => truncate('User'));

  it('create without password', ()=> 
    User.create({
      name: 'Joe',
      phone: '+12223334455'
    })
    .then(() => db.model('User').findAll())
    .then(users => {
      expect(users).to.have.length(1);
      expect(users[0]).to.have.property('name', 'Joe');
      expect(users[0]).to.have.property('phone', '+12223334455');
      expect(users[0]).to.have.property('password', null);
    })
  );

  it('create with password', ()=> 
    User.create({
      name: 'Joe',
      phone: '+12223334455',
      password: 'secret'
    })
    .then(() => db.model('User').findAll())
    .then(users => {
      expect(users).to.have.length(1);
      expect(users[0]).to.have.property('name', 'Joe');
      expect(users[0]).to.have.property('phone', '+12223334455');

      return User.compareHash('secret', users[0].password);
    })
    .then(res => {
      expect(res).to.be.ok;
    })
  );

  it('login', () => 
    User.getHash('secret')
    .then(hash => db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      password: hash,
      address: 'Lenina, 1',
      role: 'admin'
    }))
    .then(() => User.login('+12223334455', 'secret'))
    .then(user => {
      expect(user).to.be.ok;
      expect(user).to.have.property('id');
      expect(user).to.have.property('name', 'Joe');
      expect(user).to.have.property('phone', '+12223334455');
      expect(user).to.have.property('address', 'Lenina, 1');
      expect(user).to.have.property('role', 'admin');
      expect(user).to.have.property('loggedBy', 'password');

      expect(user).to.have.not.property('password');
      expect(user).to.have.not.property('tmpPassword');
    })
  );

  it('login with wrong password', () => 
    User.getHash('secret')
    .then(hash => db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => User.login('+12223334455', 'hollyarmadillo'))
    .then(user => {
      expect(user).to.be.not.ok;
    })
  );

  it('login with wrong phone', () => 
    User.getHash('secret')
    .then(hash => db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => User.login('+12223334456', 'secret'))
    .then(user => {
      expect(user).to.be.not.ok;
    })
  );

  it('set tmp password', () => 
    User.getHash('secret')
    .then(hash => db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => User.setTmpPassword('+12223334455'))
    .then(() => db.model('User').findAll())
    .then(users => {
      expect(users).to.have.length(1);
      expect(users[0]).to.have.property('tmpPassword');
      expect(users[0].tmpPassword).to.match(/\d{6,}/);
    })
  );

  it('login by tmp password', () =>
    db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      tmpPassword: '123123',
      role: 'customer'
    })
    .then(() => User.login('+12223334455', '123123'))
    .then(user => {
      expect(user).to.be.ok;
      expect(user).to.have.property('id');
      expect(user).to.have.property('name', 'Joe');
      expect(user).to.have.property('phone', '+12223334455');
      expect(user).to.have.property('role', 'customer');
      expect(user).to.have.property('loggedBy', 'tmpPassword');

      expect(user).to.have.not.property('password');
      expect(user).to.have.not.property('tmpPassword');
    })
  );

  it('tmp password erased after login', ()=> 
    db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      tmpPassword: '123123'
    })
    .then(() => User.login('+12223334455', '123123'))
    .then(() => db.model('User').findAll())
    .then(users => {
      expect(users).to.have.length(1);
      expect(users[0]).to.have.property('tmpPassword', null);
    })
  );

  it('get user by id', () => 
    db.model('User').create({
      id: 1,
      name: 'Joe',
      phone: '+12223334455',
      role: 'customer'
    })
    .then(() => User.get('1'))
    .then(user => {
      expect(user).to.have.property('id', '1');
      expect(user).to.have.property('name', 'Joe');
      expect(user).to.have.property('phone', '+12223334455');
      expect(user).to.have.property('role', 'customer');
    })
  );
});