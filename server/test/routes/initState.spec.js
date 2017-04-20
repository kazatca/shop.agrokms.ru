import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import {init, truncate} from '../dbInit.js';
import {fromJSON} from 'transit-immutable-js';
import app from '../../src/app.js';

const browse = () => request(app);

describe('initState route', function() {
  before(init);

  beforeEach(() => truncate('User'));
  
  it('response is text', () => 
    browse()
    .get('/api/init-state')
    .expect(200)
    .then(({text, headers}) => {
      expect(headers['content-type']).match(/text/);
      expect(() => fromJSON(text)).to.not.throw();
    })
  );

  it('got user if session is opened', () => 
    db.model('User').create({
      id: 1,
      phone: '+12223334455',
      tmpPassword: 'secret',
      name: 'Joe',
      address: 'Lenina, 1'
    })
    .then(() => {
      const agent = request.agent(app);
      return agent.post('/api/user/login')
      .send({
        login: '+12223334455',
        password: 'secret'
      })
      .expect(200)
      .then(() => {
        return agent.get('/api/init-state')
        .expect(200)
        .then(({text}) => {
          const state = fromJSON(text);
          expect(state.getIn(['user', 'id'])).to.eql('1');
          expect(state.getIn(['user', 'name'])).to.eql('Joe');
          expect(state.getIn(['user', 'address'])).to.eql('Lenina, 1');
        });
      });
    })
  );
});
