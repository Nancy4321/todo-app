import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo, patchTodo } from '../../services/todoListService';
import { TodoList } from '../../models/TodoList';
import { jest } from '@jest/globals';

jest.mock('../../models/TodoList');

const mockedTodoList = TodoList as jest.Mocked<typeof TodoList>;

describe('TodoList Service', () => {
  it('should create a new list', async () => {
    const mockTodo = { title: 'Test Todo List', description: 'Test Description', status: 'pending' };
    mockedTodoList.create.mockResolvedValue(mockTodo as any);

    const result = await createTodo('Test Todo List', 'Test Description');
    expect(result).toEqual(mockTodo);
  });

  it('should get all lists', async () => {
    const mockTodos = [{ title: 'Test Todo List', description: 'Test Description', status: 'pending' }];
    mockedTodoList.find.mockResolvedValue(mockTodos as any);

    const result = await getTodos();
    expect(result).toEqual(mockTodos);
  });

  it('should get a todo list by id', async () => {
    const mockTodo = { title: 'Test Todo List', description: 'Test Description', status: 'complete' };
    mockedTodoList.findById.mockResolvedValue(mockTodo as any);

    const result = await getTodoById('1');
    expect(result).toEqual(mockTodo);
  });

  it('should update a todo list', async () => {
    const mockUpdatedTodo = { title: 'Updated Todo List', description: 'Updated Description', status: 'complete' };
    mockedTodoList.findByIdAndUpdate.mockResolvedValue(mockUpdatedTodo as any);

    const result = await updateTodo('1', 'Updated Title', 'Updated Description', 'complete');
    expect(result).toEqual(mockUpdatedTodo);
  });

  it('should patch a todo list', async () => {
    const mockPatchedTodo = { title: 'Updated Todo List', description: 'Updated Description', status: 'complete' };
    mockedTodoList.findByIdAndUpdate.mockResolvedValue(mockPatchedTodo as any);

    const result = await patchTodo('1', 'Updated Title', 'Updated Description', 'complete');
    expect(result).toEqual(mockPatchedTodo);
  });

  it('should delete a todo list', async () => {
    const mockTodo = { title: 'Test Todo List', description: 'Test Description', status: 'pending' };
    mockedTodoList.findByIdAndDelete.mockResolvedValue(mockTodo as any);

    const result = await deleteTodo('1');
    expect(result).toEqual(mockTodo);
  });
});