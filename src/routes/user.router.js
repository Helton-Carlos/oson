import { Router } from 'express';
import { checkUsers, setUsers } from '../controllers/user.controllers.js';

const router = Router();

router.post('/buscar-usuario', checkUsers);
router.post('/cadatrar-usuario', setUsers);

export default router;
