import {expect} from 'chai';
import request from 'supertest';

// import db from '../src/db.js';
import app from '../src/app.js';


const browse = () => request(app);

describe('cookie', function() {
  it('basic', () => browse()
    .get('/status')
    .expect(200)
  );

  it('no cookie', () => browse()
    .get('/status')
    .then(res => {
      expect(res.headers).to.not.have.property('set-cookie');
      expect(res.headers).to.not.have.property('cookie');
    })
  );
});

