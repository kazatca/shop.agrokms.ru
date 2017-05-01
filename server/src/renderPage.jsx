/* global __dirname */
import React from 'react';
import {readFileSync} from 'fs';
import {renderToString} from 'react-dom/server';
import {toJSON} from 'transit-immutable-js';
import {Helmet} from 'react-helmet';

import App from '../../client/src/components/App.jsx';

import {getInitState} from './initState.js';

const tmpl = readFileSync(`${__dirname}/../../client/dist/index.html`, 'utf-8');

const renderPage = (path, session) => {
  return getInitState(path, session)
  .then(({store, history}) => {
    const html = renderToString(<App store={store} history={history} />);
    const status = store.getState().get('status');
    if([404].indexOf(status) != -1){
      return {status};
    }
    const head = Helmet.renderStatic();
    const initState = toJSON(store.getState());

    return {status, body: tmpl
      .replace(/<!-- title -->/, head.title.toString())
      .replace(/<!-- html -->/, html)
      .replace(/\/\* init state \*\//, `window.__INIT_STATE__ = '${initState}';`)
    };
  });
};

export default renderPage;
