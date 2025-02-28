import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { apiResponse } from '../utils/apiResponse';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  apiResponse(res, 'error', err.message, err, 500);
};

