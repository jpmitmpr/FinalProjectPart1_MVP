import { Router } from 'express';
import {
  create,
  getAll,
  getOne,
  update,
  remove
} from '../controllers/usersController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import authorizeRole from '../middleware/authorizeRole.js';
import checkOwnership from '../middleware/ownership.js';

const router = Router();

// PUBLIC
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);

// PROTECTED
router.put('/:id', authenticateToken, checkOwnership, update);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), remove);

export default router;
