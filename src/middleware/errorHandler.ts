import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { errorResponse } from '../utils/apiResponse';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  errorResponse(res, err.message, err);
};

