import Router from 'express-promise-router';
import * as User from '../controllers/User.js';

const router = Router();

router.post('/login', (req, res) => 
  User.login(req.body.login, req.body.password)
  .then(user => {
    if(user){
      req.session.userId = user.id;
      req.session.role = user.role;
    }
    return user;
  })
  .then(user => res.json(user))
);

router.get('/', (req, res) => {
  if(!req.session || !req.session.userId){
    return res.status(401).end();
  }

  return User.get(req.session.userId)
  .then(user => res.json(user));
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.end();
});

export default router;