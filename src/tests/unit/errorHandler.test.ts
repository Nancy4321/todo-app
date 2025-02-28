import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../middleware/errorHandler';
import { apiResponse } from '../../utils/apiResponse';

jest.mock('../../utils/apiResponse');

describe('errorHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should handle errors and call apiResponse', () => {
    const mockError = new Error('Test Error');

    errorHandler(mockError, req as Request, res as Response, next);

    expect(apiResponse).toHaveBeenCalledWith(res, 'error', 'Test Error', mockError, 500);
  });
});