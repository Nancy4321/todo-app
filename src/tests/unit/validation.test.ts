import { Request, Response, NextFunction } from 'express';
import { validateListInput } from '../../utils/validation';

describe('validateListInput', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next() if title is given', () => {
    req.body = { title: 'Test Title' };
    validateListInput(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if title is not given', () => {
    req.body = { title: '' };
    validateListInput(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Validation failed',
      data: null,
      error: expect.any(Array),
    });
  });

  it('should return 400 if status is not one of the enums', () => {
    req.body = { title: 'Test 3', status: 'invalid_status' };
    validateListInput(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Validation failed',
      data: null,
      error: expect.any(Array),
    });
  });

  it('should return 200 when no description given', () => {
    req.body = { title: 'Test 2', description: '', status: 'pending' };
    validateListInput(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });
});