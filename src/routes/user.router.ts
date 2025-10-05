import { Router } from 'express';
import { checkUsers, setUsers } from '@controllers/user.controllers';

const userRouter = Router();

userRouter.post('/buscar-usuario', checkUsers);
userRouter.post('/cadastrar-usuario', setUsers);

export default userRouter;
