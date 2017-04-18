import {expect} from 'chai';
import request from 'supertest';

import {init} from '../dbInit.js';
import {fromJSON} from 'transit-immutable-js';
import app from '../../src/app.js';

const browse = () => request(app);

describe('initState route', function() {
  before(init);
  
  it('response is text', () => 
    browse()
    .get('/api/init-state')
    .expect(200)
    .then(({text, headers}) => {
      expect(headers['content-type']).match(/text/);
      expect(() => fromJSON(text)).to.not.throw();
    })
  );
});
