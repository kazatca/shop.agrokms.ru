import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import app from '../../src/app.js';
import {getHash} from '../../src/controllers/User.js'; 

describe('User route', function() {
  beforeEach(() => db.model('User').sync({force: true}));

  it('login', () => 
    getHash('secret')
    .then(hash => db.model('User').create({
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
      request(app).post({
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
      request(app).post({
        login: '+122233344', 
        password: 'secret'
      })
      .expect(401)
    )
  );

  it('get user info', ()=> 
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
});