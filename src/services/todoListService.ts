import { TodoList } from '../models/TodoList';

export const createTodo = async (title: string, description?: string, status?: string) => {
  return await TodoList.create({ title, description, status });
};

export const getTodos = async () => {
  return await TodoList.find();
};

export const getTodoById = async (id: string) => {
  return await TodoList.findById(id);
};

export const updateTodo = async (id: string, title: string, description?: string, status?: string) => {
  return await TodoList.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true }
  );
};

export const patchTodo = async (id: string, title: string, description?: string, status?: string) => {
  return await TodoList.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true }
  );
};

export const deleteTodo = async (id: string) => {
  return await TodoList.findByIdAndDelete(id);
};