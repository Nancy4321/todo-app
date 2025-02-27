import { createList, getLists, getListById, updateList, deleteList } from '../../services/todoListService';
import { TodoList } from '../../models/TodoList';
import { jest } from '@jest/globals';

jest.mock('../../models/TodoList');

const mockedTodoList = TodoList as jest.Mocked<typeof TodoList>;

describe('TodoList Service', () => {
  it('should create a new list', async () => {
    const mockTodo = { title: 'Test Todo List', description: 'Test Description', status: 'pending' };
    mockedTodoList.create.mockResolvedValue(mockTodo as any); // Use "as any" to bypass TypeScript type checking

    const result = await createList('Test Todo List', 'Test Description');
    expect(result).toEqual(mockTodo);
  });

  it('should get all lists', async () => {
    const mockTodos = [{ title: 'Test Todo List', description: 'Test Description', status: 'pending' }];
    mockedTodoList.find.mockResolvedValue(mockTodos as any);

    const result = await getLists();
    expect(result).toEqual(mockTodos);
  });

  it('should get a list by id', async () => {
    const mockTodo = { title: 'Test Todo List', description: 'Test Description', status: 'complete' };
    mockedTodoList.findById.mockResolvedValue(mockTodo as any);

    const result = await getListById('1');
    expect(result).toEqual(mockTodo);
  });

  it('should update a list', async () => {
    const mockUpdatedTodo = { title: 'Updated Todo List', description: 'Updated Description', status: 'complete' };
    mockedTodoList.findByIdAndUpdate.mockResolvedValue(mockUpdatedTodo as any);

    const result = await updateList('1', 'Updated Title', 'Updated Description', 'complete');
    expect(result).toEqual(mockUpdatedTodo);
  });

  it('should delete a list', async () => {
    const mockTodo = { title: 'Test Todo List', description: 'Test Description', status: 'pending' };
    mockedTodoList.findByIdAndDelete.mockResolvedValue(mockTodo as any);

    const result = await deleteList('1');
    expect(result).toEqual(mockTodo);
  });
});