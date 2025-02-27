import { Schema, model, Document } from 'mongoose';

interface List extends Document {
  title: string;
  description?: string;
  status: 'pending' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}

const listSchema = new Schema<List>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'complete'], default: 'pending' },
  },
  { timestamps: true }
);

export const TodoList = model<List>('TodoList', listSchema);