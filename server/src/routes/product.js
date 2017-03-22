import Router from 'express-promise-router';

import {
  getAll, 
  addProduct, 
  changeProduct
} from '../controllers/Product.js';

const router = Router();

const cutId = obj => {
  /* eslint-disable */
  const {id, ...rest} = obj;
  /* eslint-enable */
  return rest;
};

router.get('/all', (req, res) => 
  getAll()
  .then(products => res.json(products))
);

router.put('/', (req, res) => 
  addProduct(req.body)
  .then(product => res.json(product))
);

router.post('/:id', (req, res) => 
  changeProduct(req.params.id, cutId(req.body))
  .then(product => res.json(product))
);

export default router;