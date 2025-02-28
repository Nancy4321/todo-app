import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { apiResponse } from '../utils/apiResponse';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  apiResponse(res, 'error', err.message, null, err, err.statusCode);
};

