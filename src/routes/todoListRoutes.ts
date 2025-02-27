import express from 'express';
import {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
} from '../controllers/todoListController';
import { validateListInput } from '../utils/validation';

const router = express.Router();

router.post('/todos', validateListInput, createList);
router.get('/todos', getLists);
router.get('/todos/:id', getListById);
router.put('/todos/:id', validateListInput, updateList);
router.delete('/todos/:id', deleteList);

export default router;