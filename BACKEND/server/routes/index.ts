import { Router } from 'express';
import { authController } from '../controllers/index.js';
import { aiController } from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const apiRouter = Router();

apiRouter.post('/auth/login', authController.login);
apiRouter.post('/auth/register', authController.register);
apiRouter.post('/auth/forgot-password', authController.forgotPassword);
apiRouter.post('/auth/reset-password', authController.resetPassword);

// FastAPI owns campaigns, briefs, tasks and assets. Keep the frontend on one API origin.
apiRouter.use('/ai', authMiddleware, aiController.proxy);

export default apiRouter;
