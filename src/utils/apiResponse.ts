import { Response } from 'express';

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  data?: any;
  error?: any;
}

export const successResponse = (
  res: Response,
  message: string,
  data?: any,
  statusCode: number = 200
) => {
  const response: ApiResponse = {
    status: 'success',
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message: string,
  error?: any,
  statusCode: number = 500
) => {
  const response: ApiResponse = {
    status: 'error',
    message,
    error,
  };
  res.status(statusCode).json(response);
};