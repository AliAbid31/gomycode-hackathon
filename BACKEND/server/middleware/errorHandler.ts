import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../utils/responseFormatter.js';
import { logger } from '../utils/logger.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  logger.error('Unhandled API Error:', err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json(formatResponse.error(message, status, err.details));
}

export function validateRequest(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missing = requiredFields.filter((field) => {
      const val = req.body?.[field];
      return val === undefined || val === null || val === '';
    });

    if (missing.length > 0) {
      res.status(400).json(
        formatResponse.error(`Missing required fields: ${missing.join(', ')}`, 400, { missing })
      );
      return;
    }
    next();
  };
}
