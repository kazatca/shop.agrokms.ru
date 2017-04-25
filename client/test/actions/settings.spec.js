import {expect} from 'chai';
import {createStore} from 'redux'; 

import reducer from '../../src/reducer.js';
import {setAll, setValue} from '../../src/actions/settings.js';

describe('Setting actions', function () {
  it('setAll', () => {
    const store = createStore(reducer);
    store.dispatch(setAll([
      {key: 'creds.gmap', value: '"GMAP_API_KEY"'},
      {key: 'creds.mailgun', value: '"MAILGUN_API_KEY"'}
    ]));

    expect(store.getState().getIn(['settings', 'creds', 'gmap'])).to.eql('GMAP_API_KEY');
    expect(store.getState().getIn(['settings', 'creds', 'mailgun'])).to.eql('MAILGUN_API_KEY');
  });

  it('setValue', () => {
    const store = createStore(reducer);
    store.dispatch(setValue(['creds', 'gmap'], 'GMAP_API_KEY'));

    expect(store.getState().getIn(['settings', 'creds', 'gmap'])).to.eql('GMAP_API_KEY');
  });
});