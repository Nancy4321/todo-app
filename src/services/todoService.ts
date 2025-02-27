import { Todo } from '../models/Todo';

export const createTodo = async (title: string, description?: string, status?: string) => {
  return await Todo.create({ title, description, status });
};

export const getTodos = async () => {
  return await Todo.find();
};

export const getTodoById = async (id: string) => {
  return await Todo.findById(id);
};

export const updateTodo = async (id: string, updateData: any) => {
  return await Todo.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTodo = async (id: string) => {
  return await Todo.findByIdAndDelete(id);
};