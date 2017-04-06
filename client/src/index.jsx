import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import {fromJSON} from 'transit-immutable-js';
import {setGMapKey} from './actions/creds.js';


import reducer from './reducer.js';
import App from './components/App.jsx';
import './scss/main.scss';

const history = createBrowserHistory();

let initState;
if(window.__INIT_STATE__){
  initState = fromJSON(window.__INIT_STATE__);
}

const store = createStore(
  reducer, 
  initState,
  applyMiddleware(routerMiddleware(history), thunk)
);  
store.dispatch(setGMapKey(process.env.GMAP_KEY));

render(
  <App store={store} history={history} />,
  document.getElementById('app')
);