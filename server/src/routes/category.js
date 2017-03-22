import Router from 'express-promise-router';

import {
  getAll,
  addCategory
} from '../controllers/Category.js';

const router = Router();

router.get('/all', (req, res) => 
  getAll()
  .then(categories => res.json(categories))
);

router.put('/', (req, res) => 
  addCategory(req.body)
  .then(category => res.json(category))
);

export default router;