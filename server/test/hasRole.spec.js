import request from 'supertest';
import express from 'express';
import session from 'express-session';
import hasRole from '../src/hasRole.js';

describe('hasRole', function() {
  it('got 401', function() {
    const app = express();
    app.get('/', hasRole('admin'), (req, res) => res.send('ok'));

    request(app)
    .get('/')
    .expect(401);
  });

  it('got 200 with creds', () => {
    const app = express();
    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false
    }));

    app.post('/login', (req, res) => {
      req.session.role = 'admin';
      res.send('ok');
    });

    app.get('/admin', hasRole('admin'), (req, res) => res.send('ok'));

    request(app)    
    .get('/admin')
    .expect(401);

    const agent = request.agent(app);
    
    return agent.post('/login')
    .then(() => agent.get('/admin').expect(200));
  });
});