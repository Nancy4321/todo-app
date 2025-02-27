import { Schema, model, Document } from 'mongoose';

interface ITodo extends Document {
  title: string;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>('Todo', todoSchema);