import {expect} from 'chai';

import db from '../../src/db';
import {init, truncate} from '../dbInit.js';

import {getAll} from '../../src/controllers/Setting.js';

describe('Setting controller', () => {
  before(() => init());
  beforeEach(() => truncate('Setting'));

  it('getAll', () => 
    db.model('Setting').bulkCreate([
      {key: 'creds.gmap', value: 'GMAP_API_KEY'},
      {key: 'creds.mailgun', value: 'MAILGUN_API_KEY'}
    ])
    .then(() => getAll())
    .then(settings => {
      expect(settings).to.have.length(2);

      expect(settings[0]).to.have.property('key', 'creds.gmap');
      expect(settings[0]).to.have.property('value', 'GMAP_API_KEY');

      expect(settings[1]).to.have.property('key', 'creds.mailgun');
      expect(settings[1]).to.have.property('value', 'MAILGUN_API_KEY');
    })
  );
});