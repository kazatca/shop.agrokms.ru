import Router from 'express-promise-router';

import {
  getAll as getStoreFront, 
  addProduct, 
  changeProduct,
  addCategory
} from '../controllers/StoreFront.js';

const router = Router();

const cutId = obj => {
  /* eslint-disable */
  const {id, ...rest} = obj;
  /* eslint-enable */
  return rest;
};

router.get('/', (req, res) => 
  getStoreFront()
  .then(storeFront => res.json(storeFront))
);

router.put('/product', (req, res) => 
  addProduct(req.body)
  .then(product => res.json(product))
);

router.post('/product/:id', (req, res) => 
  changeProduct(req.params.id, cutId(req.body))
  .then(product => res.json(product))
);

router.put('/category', (req, res) => 
  addCategory(req.body)
  .then(category => res.json(category))
);

export default router;