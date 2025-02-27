import express from 'express';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';
import { validateCreateTodo } from '../utils/validation';

const router = express.Router();

router.post('/todos', validateCreateTodo, createTodo);
router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.put('/todos/:id', validateCreateTodo, updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;