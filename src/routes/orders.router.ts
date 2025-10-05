import { Router } from 'express';
import { createOrders, getOrders } from '@controllers/orders.controllers';

const userRouter = Router();

userRouter.post('/criar-order', createOrders);
userRouter.get('/buscar-order', getOrders);

export default userRouter;
