import Router from 'express-promise-router';

import {
  getAll,
  getByUser
} from '../controllers/Order.js';

const router = Router();

const cutId = obj => {
  /* eslint-disable */
  const {id, ...rest} = obj;
  /* eslint-enable */
  return rest;
};

router.get('/all', (req, res) => 
  getAll()
  .then(orders => res.json(orders))
);

router.get('/my', (req, res) => {
  if(!req.session || !req.session.userId){
    return res.writeHead(401);
  }
  return getByUser(req.session)
  .then(orders => res.json(orders));
});


export default router;