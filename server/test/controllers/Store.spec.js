import {expect} from 'chai';

import db from '../../src/db';
import {init, truncate} from '../dbInit.js';

import * as Store from '../../src/controllers/Store.js';

describe('Store controller', function() {
  before(init);
  beforeEach(() => truncate('Store'));
  
  it('getAll', ()=> 
    db.model('Store').bulkCreate([
      {address: 'Lenina, 1', coords: '50,130'},
      {address: 'Marksa, 2', coords: '52,132'}
    ])
    .then(() => Store.getAll())
    .then(stores => {
      expect(stores).to.have.length(2);
      expect(stores[0]).to.have.property('address', 'Lenina, 1');
      expect(stores[0]).to.have.property('coords', '50,130');
      expect(stores[1]).to.have.property('address', 'Marksa, 2');
      expect(stores[1]).to.have.property('coords', '52,132');
    })
  );
});