import {expect} from 'chai';
import request from 'supertest';

import db from '../../src/db.js';
import app from '../../src/app.js';

const browse = () => request(app);
const model = db.model('Category');

describe('Category route', function() {
  beforeEach(() => db.sync({force: true}));
  
  it('get all', () => 
    db.model('Category').create({name: 'Drinks'})
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
      expect(body).to.have.property('id', '1');
    })
    .then(() => model.findAll())
    .then(categories => {
      expect(categories).to.have.length(1);
      expect(categories[0]).to.have.property('name', 'Drinks');
    })
  );
});
