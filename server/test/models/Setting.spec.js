import {expect} from 'chai';
import db from '../../src/db';
import {init, truncate} from '../dbInit.js';

describe('Setting model', function() {
  before(init);
  beforeEach(() => truncate('Setting'));

  it('validation error on duplicate key', () => 
    db.model('Setting').create({
      key: 'creds.gmap',
      value: 'GMAP_API_KEY'
    })
    .then(() => {
      expect(db.model('Setting').create({
        key: 'creds.gmap',
        value: 'GMAP_API_KEY_2'
      })).to.be.rejectedWith('Validation error');
    })
  );
});
