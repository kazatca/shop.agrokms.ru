import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import createBrowserHistory from 'history/createBrowserHistory';

import {fromJS} from 'transit-immutable-js';

import reducer from './reducer';

import App from './components/App';


const history = createBrowserHistory();

let initState;
if(window.__INIT_STATE__){
  initState = fromJS(window.__INIT_STATE__);
}

const store = createStore(
  reducer, 
  applyMiddleware(routerMiddleware(history), thunk),
  initState
);  


render(
  <App store={store} history={history} />,
  document.getElementById('app')
);