import express from 'express';
import apiRouter from './server/routes/index.js';
import { errorHandler } from './server/middleware/errorHandler.js';
import { logger } from './server/utils/logger.js';
import { ENV } from './server/config/env.js';

const app = express();
const PORT = Number(ENV.PORT) || 5000;

// Keep AI request bodies intact so JSON and multipart uploads can be relayed.
app.use('/api/ai', express.raw({ type: '*/*', limit: '25mb' }));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS (Allow frontend access)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// API Routes
app.use('/api', apiRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'MarkAi Backend API', timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`🚀 MarkAi backend listening on http://0.0.0.0:${PORT}`);
  });
}

export { app };