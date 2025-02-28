import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../middleware/errorHandler';
import { errorResponse } from '../../utils/apiResponse';

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

  it('should handle errors and call errorResponse', () => {
    const mockError = new Error('Test Error');

    errorHandler(mockError, req as Request, res as Response, next);

    expect(errorResponse).toHaveBeenCalledWith(res, 'Test Error', mockError);
  });
});