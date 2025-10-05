import { Router } from 'express';
import userRouter from './user.router';
import userOrders from './orders.router';

const router = Router();

router.use('/users', userRouter);
router.use('/orders', userOrders);

export default router;
