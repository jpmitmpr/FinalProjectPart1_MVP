import express from 'express';
import { create, getOne, getAll } from '../controllers/usersController.js';

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);

export default router;
