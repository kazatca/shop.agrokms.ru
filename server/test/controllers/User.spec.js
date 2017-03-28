import {expect} from 'chai';

import db from '../../src/db';
import * as User from '../../src/controllers/User.js';

describe('User controller', function() {
  beforeEach(() => db.model('User').sync({force: true}));

  it('genTmpPassword', () => {
    expect(User.genTmpPassword()).to.match(/\d{6,}/);
  });

  it('create', ()=> {
    User.create('')
  })
});