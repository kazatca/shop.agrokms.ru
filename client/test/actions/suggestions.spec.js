import {expect} from 'chai';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';
import flatten from 'flat';

import reducer from '../../src/reducer.js';
import {setAll as setSettings} from '../../src/actions/settings.js';
import {getAddresses} from '../../src/actions/suggestions.js';

const convert = data => {
  const result = flatten({'suggestions.address': {
    apiKey: 'apiKey',
    ...data
  }}, {safe: true});
  return Object.keys(result)
  .map(key => ({key, value: JSON.stringify(result[key])}));
};

const makeStore = params => {
  const store = createStore(reducer, applyMiddleware(thunk));
  store.dispatch(setSettings(convert(params)));
  return store;
};

const mockResp = {suggestions: [
  {value: 'Хабаровский край, г. Комсомольск-на-Амуре, ул. Мира, д 1'},
  {value: 'Хабаровский край, Комсомольский р-н, село Верхняя Эконь, ул. Мира, д 1'}
]};

const mockService = () => 
  nock(/dadata.ru/)
  .post('/suggestions/api/4_1/rs/suggest/address');

describe('Suggestion actions', function() {
  it('rm unwanted words', () => {
    const store = makeStore({unwantedWords: [
      'Хабаровский край', 
      'Комсомольский р-н'
    ]});

    mockService().reply(200, () => mockResp);

    return store.dispatch(getAddresses('Мира'))
    .then(resp => {
      expect(store.getState().getIn(['suggestions', 'addresses'])).to.eql([
        {value: 'г. Комсомольск-на-Амуре, ул. Мира, д 1'},
        {value: 'село Верхняя Эконь, ул. Мира, д 1'}
      ]);
    });
  });

  it('restrict address requested', () => {
    const store = makeStore({locations: [
      {city: 'Комсомольск-на-Амуре'}, 
      {kladr_id: '2701'}
    ]});

    var request;
    mockService()
    .reply(200, (uri, body) => {
      request = body;
      return mockResp;
    });

    return store.dispatch(getAddresses('Мира'))
    .then(() => {
      expect(request).to.have.property('restrict_value', true);
      expect(request).to.have.property('locations');
    });
  });

  it('use count value', () => {
    const store = makeStore({count: 10});

    var request;
    mockService()
    .reply(200, (uri, body) => {
      request = body;
      return mockResp;
    });

    return store.dispatch(getAddresses('Мира'))
    .then(() => {
      expect(request).to.have.property('count', 10);
    });
  });
});
