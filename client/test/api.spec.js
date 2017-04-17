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

  it('post send data', () => {
    var request;

    nock(/localhost/)
    .post('/api/post')
    .reply(200, (uri, body) => {
      request = body;
    });

    return api.post('/post', {
      x: 1
    })
    .then(() => {
      expect(request).to.have.property('x', 1);
    });
  });

  it('put send data', () => {
    var request;

    nock(/localhost/)
    .put('/api/put')
    .reply(200, (uri, body) => {
      request = body;
    });

    return api.put('/put', {
      x: 1
    })
    .then(() => {
      expect(request).to.have.property('x', 1);
    });
  });

  it('delete', () => {
    nock(/localhost/)
    .delete('/api/delete')
    .reply(200, {ok: true});

    return api.del('/delete')
    .then(res => {
      expect(res).to.have.property('ok', true);
    });
  });
});