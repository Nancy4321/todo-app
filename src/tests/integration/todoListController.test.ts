import { Request, Response } from 'express';
import { TodoList } from '../../models/TodoList';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../../controllers/todoListController';

// Mock the TodoList model
jest.mock('../../models/TodoList');

describe('TodoListController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTodo', () => {
    it('should create a new list and return 201 status', async () => {
      const mockList = { _id: '1', title: 'Test List', description: 'Test Description', status: 'pending' };
      (TodoList.create as jest.Mock).mockResolvedValue(mockList);

      req.body = { title: 'Test List', description: 'Test Description', status: 'pending' };
      await createTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'List created successfully',
        data: mockList,
        status: 'success'
      });
    });

    it('should handle errors when creating a list', async () => {
      const mockError = new Error('Failed to create list');
      (TodoList.create as jest.Mock).mockRejectedValue(mockError);

      req.body = { title: 'Test List' };
      await createTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to create list',
        error: mockError,
        status: 'error'
      });
    });
  });

  describe('getTodos', () => {
    it('should fetch all lists and return 200 status', async () => {
      const mockLists = [{ _id: '1', title: 'Test List' }];
      (TodoList.find as jest.Mock).mockResolvedValue(mockLists);

      await getTodos(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Lists fetched successfully',
        data: mockLists,
        status: 'success'
      });
    });

    it('should handle errors when fetching lists', async () => {
      const mockError = new Error('Failed to fetch lists');
      (TodoList.find as jest.Mock).mockRejectedValue(mockError);

      await getTodos(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch lists',
        error: mockError,
        status: 'error'
      });
    });
  });


  describe('getTodoById', () => {
    it('should fetch a list by ID and return 200 status', async () => {
      const mockList = { _id: '1', title: 'Test List' };
      (TodoList.findById as jest.Mock).mockResolvedValue(mockList);

      req.params = { id: '1' };
      await getTodoById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'List fetched successfully',
        data: mockList,
        status: 'success'
      });
    });

    it('should return 404 if list is not found', async () => {
      (TodoList.findById as jest.Mock).mockResolvedValue(null);

      req.params = { id: '1' };
      await getTodoById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Todo not found',
        error: null,
        status: 'error'
      });
    });

    it('should handle errors when fetching a list by ID', async () => {
      const mockError = new Error('Failed to fetch list');
      (TodoList.findById as jest.Mock).mockRejectedValue(mockError);

      req.params = { id: '1' };
      await getTodoById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch list',
        error: mockError,
        status: 'error'
      });
    });
  });

  describe('updateTodo', () => {
    it('should update a list and return 200 status', async () => {
      const mockList = { _id: '1', title: 'Updated List' };
      (TodoList.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockList);

      req.params = { id: '1' };
      req.body = { title: 'Updated List' };
      await updateTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'List updated successfully',
        data: mockList,
        status: 'success'
      });
    });

    it('should return 404 if list to update is not found', async () => {
      (TodoList.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      req.params = { id: '1' };
      req.body = { title: 'Updated List' };
      await updateTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Todo not found',
        error: null,
        status: 'error'
      });
    });

    it('should handle errors when updating a list', async () => {
      const mockError = new Error('Failed to update list');
      (TodoList.findByIdAndUpdate as jest.Mock).mockRejectedValue(mockError);

      req.params = { id: '1' };
      req.body = { title: 'Updated List' };
      await updateTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to update list',
        error: mockError,
        status: 'error'
      });
    });
  });

  describe('deleteTodo', () => {
    it('should delete a list and return 200 status', async () => {
      const mockList = { _id: '1', title: 'Test List' };
      (TodoList.findByIdAndDelete as jest.Mock).mockResolvedValue(mockList);

      req.params = { id: '1' };
      await deleteTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: null,
        message: 'List deleted successfully',
        status: 'success'
      });
    });

    it('should return 404 if list to delete is not found', async () => {
      (TodoList.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      req.params = { id: '1' };
      await deleteTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'List not found',
        error: null,
        status: 'error'
      });
    });

    it('should handle errors when deleting a list', async () => {
      const mockError = new Error('Failed to delete list');
      (TodoList.findByIdAndDelete as jest.Mock).mockRejectedValue(mockError);

      req.params = { id: '1' };
      await deleteTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to delete list',
        error: mockError,
        status: 'error'
      });
    });
  });
});