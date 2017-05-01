import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import db from './db.js';
import SessionStore from 'express-session-sequelize';

import router from './router.js';
import renderPage from './renderPage.jsx';

const app = express();

app.use(bodyParser.json());

if(process.env.NODE_ENV == 'development'){
  app.use(morgan('tiny'));
  app.use((req, res, next) => {
    console.log('body', req.body);
    next();
  });
} 
if(process.env.NODE_ENV == 'production'){
  app.use(morgan('combined'));
}

let sessionStore = null;
if(process.env.NODE_ENV != 'test'){
  sessionStore = new (SessionStore(session.Store))({db});
}

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  store: sessionStore,
  unset: 'destroy'
}));

app.use(express.static(`${__dirname}/../../client/dist`, {index: false}));

app.get('/status', (req, res) => res.send('ok'));

app.use('/api', router);

app.use((req, res, next) => 
  renderPage(req.path, req.session)
  .then(({status, body}) => {
    res.status(status).send(body);
  })
  .catch(next)
);

app.use((err, req, res, next) => {
  if(err){
    res.writeHead(500);
    res.end();
    console.error(err);
  }
});

export default app;