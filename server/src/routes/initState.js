import Router from 'express-promise-router';

import {getInitState} from '../initState.js';
import {toJSON} from 'transit-immutable-js';

const router = Router();

router.get('/', (req, res) => 
  getInitState('/')
  .then(({store, history}) => res.send(toJSON(store.getState())))
);


export default router;