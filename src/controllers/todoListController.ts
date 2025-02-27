import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/apiResponse';
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
 *         description: Failed to create list
 */
export const createList = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const list = await TodoList.create({ title, description, status });
    successResponse(res, 'List created successfully', list, 201);
  } catch (error) {
    errorResponse(res, 'Failed to create list', error);
  }
};

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all lists
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               lists:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Failed to fetch lists
 */
export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await TodoList.find();
    successResponse(res, 'Lists fetched successfully', lists);
  } catch (error) {
    errorResponse(res, 'Failed to fetch lists', error);
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
export const getListById = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await TodoList.findById(req.params.id);
    if (!list) {
      errorResponse(res, 'Todo not found', null, 404);
      return;
    }
    successResponse(res, 'List fetched successfully', list);
  } catch (error) {
    errorResponse(res, 'Failed to fetch list', error);
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
export const updateList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const list = await TodoList.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    if (!list) {
      errorResponse(res, 'Todo not found', null, 404);
      return;
    }
    successResponse(res, 'List updated successfully', list);
  } catch (error) {
    errorResponse(res, 'Failed to update list', error);
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
 *         description: Failed to delete list
 */
export const deleteList = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await TodoList.findByIdAndDelete(req.params.id);
    if (!list) {
      errorResponse(res, 'List not found', null, 404);
      return;
    }
    successResponse(res, 'List deleted successfully');
  } catch (error) {
    errorResponse(res, 'Failed to delete list', error);
  }
};
