import { TodoList } from '../models/TodoList';

export const createList = async (title: string, description?: string, status?: string) => {
  return await TodoList.create({ title, description, status });
};

export const getLists = async () => {
  return await TodoList.find();
};

export const getListById = async (id: string) => {
  return await TodoList.findById(id);
};

export const updateList = async (id: string, title: string, description?: string, status?: string) => {
  return await TodoList.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true }
  );
};

export const deleteList = async (id: string) => {
  return await TodoList.findByIdAndDelete(id);
};