import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import storeFrontRouter from './routers/storeFront.js';
import productRouter from './routers/product.js';
import categoryRouter from './routers/category.js';
import renderPage from './renderPage';

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.static('../../client/dist', {index: false}));

app.get('/status', (req, res) => res.send('ok'));

app.use('/api/storefront', storeFrontRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

app.use((req, res, next) => 
  renderPage(req.path)
  .then(page => res.send(page))
  .catch(next)
);

app.use((err, req, res, next) => {
  if(err){
    res.writeHead(500);
    res.end();
    console.error('[!]Error:', err);
  }
});

export default app;