import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import {fromJSON} from 'transit-immutable-js';

import reducer from './reducer.js';
import App from './components/App.jsx';
import * as api from './api.js';

import './scss/main.scss';


const getInitState = () => {
  if(window.__INIT_STATE__){
    return fromJSON(window.__INIT_STATE__);
  }
  return api.get('/init-state')
  .then(resp => fromJSON(resp))
  .catch(() => undefined);
};

Promise.resolve()
.then(() => getInitState())
.then(initState => {
  const history = createBrowserHistory();

  const store = createStore(
    reducer, 
    initState,
    applyMiddleware(routerMiddleware(history), thunk)
  );

  render(
    <App store={store} history={history} />,
    document.getElementById('app')
  );
});
