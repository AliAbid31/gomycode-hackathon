import { Request, Response } from 'express';
import { authService } from '../services/index.js';
import { formatResponse } from '../utils/responseFormatter.js';
import { logger } from '../utils/logger.js';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { full_name, email, password, role } = req.body;
      const result = await authService.register(full_name, email, password, role);
      res.status(201).json(formatResponse.success(result, 'Account created successfully'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(formatResponse.success(result, 'Authentication successful'));
    } catch (err: any) {
      res.status(401).json(formatResponse.error(err.message, 401));
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await authService.requestPasswordReset(email);
      logger.info(`Password reset requested for ${email}`);
      res.json(formatResponse.success({ resetInitiated: true }, 'If the email exists, a reset link has been sent.'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      await authService.resetPassword(token, password);
      res.json(formatResponse.success(null, 'Password reset successfully'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  }
};
