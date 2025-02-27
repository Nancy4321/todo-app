import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const validateCreateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createTodoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};