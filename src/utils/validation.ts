import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { apiResponse } from './apiResponse';

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'complete']).optional(),
});

export const validateListInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createTodoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      apiResponse(res, 'error', 'Validation failed', null, error.errors, 400);
    } else {
      next(error);
    }
  }
};