import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import {init, truncate} from '../dbInit.js';
import app from '../../src/app.js';
import {getHash, compareHash} from '../../src/controllers/User.js'; 

describe('User route', function() {
  before(init);
  beforeEach(() => truncate('User'));

  it('login', () => 
    getHash('secret')
    .then(hash => db.model('User').create({
      id: 1,
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => {
      return request(app).post('/api/user/login')
      .send({
        login: '+12223334455', 
        password: 'secret'
      })
      .expect(200)
      .expect(({headers, body}) => {
        expect(body).to.be.ok;
        expect(body).to.have.property('id', '1');
        expect(headers).to.have.property('set-cookie');
      });
    })
  );

  it('got 401 on wrong password', () => 
    getHash('secret')
    .then(hash => db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => 
      request(app).post('/api/user/login')
      .send({
        login: '+12223334455', 
        password: 'wrong password'
      })
      .expect(401)
    )
  );

  it('got 401 on wrong login', () => 
    getHash('secret')
    .then(hash => db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => 
      request(app).post('/api/user/login')
      .send({
        login: '+122233344', 
        password: 'secret'
      })
      .expect(401)
    )
  );

  it('get user info', ()=> 
    getHash('secret')
    .then(hash => db.model('User').create({
      id: 1,
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => {
      const agent = request.agent(app);
      
      return agent.post('/api/user/login')
      .send({
        login: '+12223334455', 
        password: 'secret'
      })
      .then(() => 
        agent.get('/api/user')
        .expect(200)
        .expect(({body}) => {
          expect(body).to.be.ok;
          expect(body).to.have.property('id', '1');
        })
      );
    })
  );

  it('got 401 on /', () => 
    request(app).get('/api/user')
    .expect(401)
  );

  it('logout', () => 
    getHash('secret')
    .then(hash => db.model('User').create({
      name: 'Joe',
      phone: '+12223334455',
      password: hash
    }))
    .then(() => {
      const agent = request.agent(app);

      return agent.post('/api/user/login')
      .send({
        login: '+12223334455', 
        password: 'secret'
      })
      .expect(200)
      .then(() => 
        agent.post('/api/user/logout')
        .send()
        .expect(200)
      )
      .then(() => 
        agent.get('/api/user')
        .expect(401)
      );
    })
  );

  it('reset password', () => 
    db.model('User').create({
      id: 1,
      name: 'Joe',
      phone: '+12223334455'
    })
    .then(() => {
      return request(app)
      .post('/api/user/reset-password')
      .send({login: '+12223334455'})
      .expect(200);
    })
    .then(() => db.model('User').findAll())
    .then(users => {
      expect(users).to.have.length(1);
      expect(users[0]).to.have.property('tmpPassword');
      expect(users[0].tmpPassword).match(/\d{6,}/);
    })
  );

  it('change password', () => {
    const agent = request.agent(app);

    return db.model('User').create({
      id: 1,
      name: 'Joe',
      phone: '+12223334455',
      tmpPassword: '123'
    })
    .then(() => {
      return agent.post('/api/user/login')
      .send({
        login: '+12223334455',
        password: '123'
      })
      .expect(200);
    })
    .then(() => {
      return agent.post('/api/user/password')
      .send({password: 'secret'})
      .expect(200);
    })
    .then(() => db.model('User').findAll())
    .then(users => {
      expect(users).to.have.length(1);
      expect(users[0]).to.have.property('password');
      return expect(compareHash('secret', users[0].password)).to.not.rejected;
    });
  });

  it('got 401 on change password without session', () => {
    return request(app).post('/api/user/password')
    .send({password: 'secret'})
    .expect(401);
  });
});