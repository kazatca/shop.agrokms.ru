import Router from 'express-promise-router';

import storeFrontRouter from './routes/storeFront.js';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category.js';
import orderRouter from './routes/order.js';
import userRouter from './routes/user.js';
import initStateRouter from './routes/initState.js';

const router = Router();

router.use('/storefront', storeFrontRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/order', orderRouter);
router.use('/user', userRouter);
router.use('/init-state', initStateRouter);

export default router;