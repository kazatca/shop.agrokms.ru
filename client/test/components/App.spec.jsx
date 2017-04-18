import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createMemoryHistory} from 'history';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware, push} from 'react-router-redux';

import reducer from '../../src/reducer.js';
import App from '../../src/components/App.jsx';

describe('App component', function() {
  it('basic', () => {
    const history = createMemoryHistory();
    const store = createStore(
      reducer,
      applyMiddleware(routerMiddleware(history))
    );

    const app = mount(<App store={store} history={history} />);
    
    store.dispatch(push('/'));
    expect(app.find('.storefront')).to.have.length(1);
    
    store.dispatch(push('/cart'));
    expect(app.find('.storefront')).to.have.length(0);
    expect(app.find('.empty-cart')).to.have.length(1);
  });

  /*
    cant test it with jsdom env
  */
  xit('redirect to / on 404', () => {
    const history = createMemoryHistory();
    const store = createStore(
      reducer,
      applyMiddleware(routerMiddleware(history))
    );

    const app = mount(<App store={store} history={history} />);

    store.dispatch(push('/life-on-mars'));
    // console.log(store.getState().get('router'));

    expect(app.find('.storefront')).to.have.length(1);
  });
});