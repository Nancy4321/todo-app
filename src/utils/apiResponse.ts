import { Response } from 'express';

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  data?: null;
  error?: null;
}

export const apiResponse = (
  res: Response,
  status: 'success' | 'error',
  message: string,
  data?: any,
  error?: any,
  statusCode: number = status === 'success' ? 200 : 500
) => {
  const response: ApiResponse = {
    status,
    message,
    data,
    error,
  };
  res.status(statusCode).json(response);
};