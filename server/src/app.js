import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import storeFrontRouter from './routers/storeFront.js';

import renderPage from './renderPage';

const app = express();

app.usePromise = fn => {
  app.use((req, res, next) => fn(req, res).catch(next));
};

app.use(bodyParser.json());

// app.use(express.cookieDecoder());
app.use(cookieSession({
  name: 'session',
  keys: ['secureKey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}));

app.use(express.static('../../client/dist', {index: false}));

app.get('/status', (req, res) => res.send('ok'));

app.use('/storefront', storeFrontRouter);

app.usePromise((req, res) => 
  renderPage(req.path)
  .then(page => {
    res.send(page);
  })
);

app.use((err, req, res, next) => {
  if(err){
    res.writeHead(500);
    res.end();
    console.warn('[!]Error:', err);
  }
});

export default app;