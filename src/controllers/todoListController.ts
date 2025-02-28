import { Request, Response } from 'express';
import { apiResponse } from '../utils/apiResponse';
import { TodoList } from '../models/TodoList';

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Failed to create todo list
 */
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const list = await TodoList.create({ title, description, status });
    apiResponse(res, 'success', 'Todo created successfully', list, null, 201);
  } catch (error) {
    apiResponse(res, 'error', 'Failed to create todo list', null, error, 500);
  }
};

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all lists
 *     responses:
 *       200:
 *         description: Todo fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               lists:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Failed to fetch todo lists
 */
export const getTodos = async (req: Request, res: Response) => {
  try {
    const lists = await TodoList.find();
    apiResponse(res, 'success', 'Todos fetched successfully', lists, null);
  } catch (error) {
    apiResponse(res, 'error', 'Failed to fetch todo lists', null, error);
  }
};

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a single list by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Failed to fetch todo list
 */
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await TodoList.findById(req.params.id);
    if (!list) {
      apiResponse(res, 'error', 'Todo not found', null, null, 404);
      return;
    }
    apiResponse(res, 'success', 'Todo fetched successfully', list, null);
  } catch (error) {
    apiResponse(res, 'error', 'Failed to fetch todo list', null, error);
  }
};

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a list by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Failed to update todo list
 */
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const list = await TodoList.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    if (!list) {
      apiResponse(res, 'error', 'Todo not found', null, null, 404);
      return;
    }
    apiResponse(res, 'success', 'Todo updated successfully', list, null);
  } catch (error) {
    apiResponse(res, 'error', 'Failed to update todo list', null, error);
  }
};

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Partially update a todo item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, complete]
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Failed to update todo list
 */
export const patchTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const item = await TodoList.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    if (!item) {
      apiResponse(res, 'error', 'Todo not found', null, null, 404);
      return;
    }
    apiResponse(res, 'success', 'Todo updated successfully', item, null);
  } catch (error) {
    apiResponse(res, 'error', 'Failed to update todo list', null, error);
  }
};

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a list by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Failed to delete todo list
 */
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await TodoList.findByIdAndDelete(req.params.id);
    if (!list) {
      apiResponse(res, 'error', 'Todo not found', null, null, 404);
      return;
    }
    apiResponse(res, 'success', 'Todo deleted successfully', null, null);
  } catch (error) {
    apiResponse(res, 'error', 'Failed to delete todo list', null, error);
  }
};
