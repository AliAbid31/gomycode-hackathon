import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware.js';
import { formatResponse } from '../utils/responseFormatter.js';

export function roleMiddleware(allowedRoles: ('marketing' | 'creative')[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json(formatResponse.error('Authentication required', 401));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json(
        formatResponse.error(
          `Forbidden: Role '${req.user.role}' does not have access to this resource. Allowed: ${allowedRoles.join(', ')}`,
          403
        )
      );
      return;
    }

    next();
  };
}
