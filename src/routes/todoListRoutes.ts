import express from 'express';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  patchTodo,
} from '../controllers/todoListController';
import { validateListInput } from '../utils/validation';

const router = express.Router();

router.post('/todos', validateListInput, createTodo);
router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.put('/todos/:id', validateListInput, updateTodo);
router.patch('/todos/:id', validateListInput, patchTodo)
router.delete('/todos/:id', deleteTodo);

export default router;