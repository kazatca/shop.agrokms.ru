import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import {init, truncate} from '../dbInit.js';
import app from '../../src/app.js';

const browse = () => request(app);
const model = db.model('Category');

describe('Category route', function() {
  before(init);
  beforeEach(() => truncate('Category'));
  
  it('get all', () => 
    db.model('Category').create({id: 1, name: 'Drinks'})
    .then(() => 
      browse()
      .get('/api/category/all')
      .expect(200)
      .then(({body}) => {
        expect(body).to.have.length(1);
        expect(body[0]).to.have.property('id', '1');
        expect(body[0]).to.have.property('name', 'Drinks');
      })
    )
  );

  it('add new category', () => browse()
    .put('/api/category')
    .send({name: 'Drinks'})
    .expect(200)
    .then(({body}) => {
      expect(body).to.have.property('id');
    })
    .then(() => model.findAll())
    .then(categories => {
      expect(categories).to.have.length(1);
      expect(categories[0]).to.have.property('name', 'Drinks');
    })
  );
});
