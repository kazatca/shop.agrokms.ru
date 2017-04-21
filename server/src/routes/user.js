import Router from 'express-promise-router';
import * as User from '../controllers/User.js';

const router = Router();

router.post('/login', (req, res) => 
  User.login(req.body.login, req.body.password)
  .then(user => {
    if(user){
      req.session.userId = user.id;
      req.session.role = user.role;
      return res.json(user);
    }
    res.status(401).end();
  })

);

router.get('/', (req, res) => {
  if(!req.session || !req.session.userId){
    return res.status(401).end();
  }

  return User.get(req.session.userId)
  .then(user => res.json(user));
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.end());
  // res.end();
});

router.post('/reset-password', (req, res) => 
  User.setTmpPassword(req.body.login)
  .then(() => res.send())
);

router.post('/password', (req, res) => {
  if(!req.session || !req.session.userId){
    return res.status(401).end();
  }
  return User.setPassword(req.session.userId, req.body.password)
  .then(() => res.end())
  .catch(err => {
    if(err == 'not found'){
      return res.status(404).end();
    }
    throw err;
  });
});

export default router;