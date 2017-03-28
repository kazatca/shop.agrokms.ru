import {expect} from 'chai';
import nock from 'nock';
import * as api from '../src/api.js';


describe('Api methods', function() {
  it('get json', function() {
    nock(/localhost/)
    .get('/api/json')
    .reply(200, {ok: true});

    return api.get('/json')
    .then(res => {
      expect(res).to.have.property('ok', true);
    });
  });

  it('get 404', () => {
    nock(/localhost/)
    .get('/api/404')
    .reply(404);

    return expect(api.get('/404'))
    .to.be.rejectedWith('404');
  });
});