import {expect} from 'chai';

import request from '../src/services/dadata.js';

describe('Suggestions service', function() {
  it('basic', function() {
    const settings = {
      apiKey: process.env.DADATA_KEY
    };

    return request('Ленина', settings)
    .then(addresses => {
      expect(addresses).to.be.array;
      addresses.forEach(item => {
        expect(item).to.have.property('value');
        expect(item).to.have.property('unrestricted_value');
        expect(item).to.have.property('data');
        expect(item.value).to.match(/Ленина/);
      });
    });
  });
});