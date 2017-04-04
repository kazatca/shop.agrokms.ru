import Router from 'express-promise-router';

import {
  getAll as getStoreFront
} from '../controllers/StoreFront.js';

const router = Router();

router.get('/', (req, res) => 
  getStoreFront()
  .then(storeFront => res.json(storeFront))
);

export default router;