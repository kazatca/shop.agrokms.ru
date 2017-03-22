import request from 'supertest';
import {expect} from 'chai';

import app from '../../src/app.js';
import db from '../../src/db.js';

describe('route /', () => {
  beforeEach(() => db.sync({force: true}));

  it('renderPage called', function() {
    return request(app)
    .get('/')
    .expect(200)
    .then(res => {
      expect(res.text).to.match(/<!DOCTYPE html>/);
      expect(res.text).to.match(/window\.__INIT_STATE__/);
      // console.log(res);
    });
  });
});