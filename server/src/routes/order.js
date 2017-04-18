import Router from 'express-promise-router';

import hasRole from '../hasRole.js';
import {
  getAll,
  getByUser,
  add
} from '../controllers/Order.js';

const router = Router();

router.get('/all', hasRole('admin'), (req, res) => 
  getAll()
  .then(orders => res.json(orders))
);

router.get('/my', hasRole('customer'), (req, res) => {
  if(!req.session || !req.session.userId){
    return res.writeHead(401);
  }
  return getByUser(req.session.userId)
  .then(orders => res.json(orders));
});

router.put('/', (req, res) => 
  add(req.body)
  .then(order => res.json(order))
);


export default router;