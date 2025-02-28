import request from 'supertest';
import app from '../../app';
import { TodoList } from '../../models/TodoList';
import { jest } from '@jest/globals';

jest.mock('../../models/TodoList');

const mockedTodoList = TodoList as jest.Mocked<typeof TodoList>;

const mockTodo = { 
  title: 'Test Todo', 
  description: 'Test Description', 
  status: 'pending', 
  createdAt: '2025-02-28T01:16:18.191Z',
  updatedAt: '2025-02-28T01:16:18.191Z'
};
const mockTodos = [mockTodo];

describe('Todo API', () => {
  it('should create a new todo list', async () => {
    mockedTodoList.create.mockResolvedValue(mockTodo as any);

    const res = await request(app)
      .post('/api/todos')
      .send(mockTodo);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toEqual(mockTodo);
    expect(res.body.message).toEqual('Todo created successfully');
  });

  it('should get all todos', async () => {
    mockedTodoList.find.mockResolvedValue(mockTodos as any);

    const res = await request(app)
      .get('/api/todos');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(mockTodos);
    expect(res.body.message).toEqual('Todos fetched successfully');
  });

  it('should get a todo list by id', async () => {
    mockedTodoList.findById.mockResolvedValue(mockTodo as any);

    const res = await request(app)
      .get('/api/todos/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(mockTodo);
    expect(res.body.message).toEqual('Todo fetched successfully');
  });

  it('should update a todo list', async () => {
    const updatedTodo = { title: 'Updated Title', description: 'Updated Description', status: 'complete' };
    mockedTodoList.findByIdAndUpdate.mockResolvedValue(updatedTodo as any);

    const res = await request(app)
      .put('/api/todos/1')
      .send(updatedTodo);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(updatedTodo);
    expect(res.body.message).toEqual('Todo updated successfully');
  });

  it('should patch a todo list', async () => {
    const updatedTodo = { title: 'Patched Title', description: 'Patched Description', status: 'complete' };
    mockedTodoList.findByIdAndUpdate.mockResolvedValue(updatedTodo as any);

    const res = await request(app)
      .patch('/api/todos/1')
      .send(updatedTodo);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(updatedTodo);
    expect(res.body.message).toEqual('Todo updated successfully');
  });

  it('should delete a todo list', async () => {
    mockedTodoList.findByIdAndDelete.mockResolvedValue(mockTodo as any);

    const res = await request(app)
      .delete('/api/todos/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Todo deleted successfully');
  });
});