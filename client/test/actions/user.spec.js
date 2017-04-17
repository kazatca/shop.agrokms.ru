import {expect} from 'chai';
import {createStore, applyMiddleware} from 'redux';
import {Map} from 'immutable';
import thunk from 'redux-thunk';
import nock from 'nock';

import reducer from '../../src/reducer.js';
import {
  setName,
  setPhone,
  setAddress,
  setPassword,
  login
} from '../../src/actions/user.js';

describe('User actions', function() {
  it('init state', () => {
    const store = createStore(reducer);
    expect(store.getState().get('user')).to.eql(Map({
      name: '',
      phone: '',
      address: '',
      password: ''
    }));    
  });

  it('set name', function() {
    const store = createStore(reducer);
    store.dispatch(setName('Joe'));
    expect(store.getState().get('user').get('name')).to.eql('Joe');
  });
  
  it('set phone', function() {
    const store = createStore(reducer);
    store.dispatch(setPhone('+12223334455'));
    expect(store.getState().get('user').get('phone')).to.eql('+12223334455');
  });

  it('set address', function() {
    const store = createStore(reducer);
    store.dispatch(setAddress('Lenina, 1'));
    expect(store.getState().get('user').get('address')).to.eql('Lenina, 1');
  });

  it('set password', function() {
    const store = createStore(reducer);
    store.dispatch(setPassword('secret'));
    expect(store.getState().get('user').get('password')).to.eql('secret');
  });

  it('login', () => {
    var request;

    nock(/localhost/)
    .post('/api/user/login')
    .reply(200, (uri, body) => {
      request = body;
    });
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setPhone('+12223334455'));
    store.dispatch(setPassword('secret'));
    return store.dispatch(login())
    .then(() => {
      expect(request).to.have.property('login', '+12223334455');
      expect(request).to.have.property('password', 'secret');
    });
  });

  it('clean password after login', () => {
    nock(/localhost/)
    .post('/api/user/login')
    .reply(200);
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setPhone('+12223334455'));
    store.dispatch(setPassword('secret'));
    return store.dispatch(login())
    .then(() => {
      expect(store.getState().getIn(['user', 'password'], '')).to.eql('');
    });
  });

  it('clean password after failed login', () => {
    nock(/localhost/)
    .post('/api/post/login')
    .reply(401);

    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setPhone('+12223334455'));
    store.dispatch(setPassword('secret'));
    return store.dispatch(login())
    .then(() => {
      expect(store.getState().getIn(['user', 'password'], '')).to.eql('');
    });
  });

  it('set creds on success login', () => {
    nock(/localhost/)
    .post('/api/user/login')
    .reply(200, {
      id: '1',
      name: 'Joe',
      phone: '+12223334455',
      address: 'Lenina, 1',
      loggedBy: 'password',
      role: 'admin'
    });
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setPhone('+12223334455'));
    store.dispatch(setPassword('secret'));
    return store.dispatch(login())
    .then(() => {
      const user = store.getState().get('user').toJS();
      expect(user).to.have.property('id', '1');
      expect(user).to.have.property('name', 'Joe');
      expect(user).to.have.property('phone', '+12223334455');
      expect(user).to.have.property('address', 'Lenina, 1');
      expect(user).to.have.property('loggedBy', 'password');
      expect(user).to.have.property('role', 'admin');
    });
  });

  it('work on failed login', () => {
    nock(/localhost/)
    .post('/api/user/login')
    .reply(401);
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(setPhone('+12223334455'));
    store.dispatch(setPassword('secret'));
    return store.dispatch(login())
    .then(() => {
      const user = store.getState().get('user').toJS();
      expect(user).to.have.property('phone', '+12223334455');
    });
  });
});