import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware, push} from 'react-router-redux';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import {fromJSON} from 'transit-immutable-js';

import reducer from './reducer.js';
import App from './components/App.jsx';
import {get} from './api.js';

import './scss/main.scss';

const getInitState = () => {
  return Promise.resolve(window.__INIT_STATE__ || get('/init-state'))
  .then(data => fromJSON(data))
  .catch(() => undefined);
};

getInitState()
.then(initState => {
  const history = createBrowserHistory({forceRefresh: false});

  const store = createStore(
    reducer, 
    initState,
    applyMiddleware(routerMiddleware(history), thunk)
  );

  if(process.env.NODE_ENV == 'development'){ // eslint-disable-line no-undef
    window.store = store; 
    window.__push = push;
  }

  render(
    <App store={store} history={history} />,
    document.getElementById('app')
  );
});
