import { Request, Response } from 'express';
import { ENV } from '../config/env.js';
import { proxyToAI } from '../services/aiService.js';
import { formatResponse } from '../utils/responseFormatter.js';

function getBody(req: Request): Buffer | undefined {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (req.body === undefined || req.body === null) return undefined;
  return Buffer.from(JSON.stringify(req.body));
}

export const aiController = {
  proxy: async (req: Request, res: Response): Promise<void> => {
    if (!ENV.AI_SERVICE_TOKEN) {
      res.status(503).json(formatResponse.error('AI_SERVICE_TOKEN is not configured', 503));
      return;
    }

    try {
      const aiResponse = await proxyToAI({
        method: req.method,
        path: req.path || '/',
        query: req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '',
        contentType: req.headers['content-type'],
        body: getBody(req)
      });

      const responseType = aiResponse.headers.get('content-type');
      if (responseType) res.setHeader('content-type', responseType);
      res.status(aiResponse.status).send(Buffer.from(await aiResponse.arrayBuffer()));
    } catch (error) {
      res.status(502).json(formatResponse.error('AI service is unavailable', 502, {
        cause: error instanceof Error ? error.message : String(error)
      }));
    }
  }
};