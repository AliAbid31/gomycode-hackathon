import { ENV } from '../config/env.js';
import { logger } from '../utils/logger.js';

export interface AIProxyRequest {
  method: string;
  path: string;
  query: string;
  contentType?: string;
  body?: Buffer;
}

export async function proxyToAI(request: AIProxyRequest): Promise<Response> {
  const target = new URL(request.path.replace(/^\//, ''), `${ENV.AI_SERVICE_URL.replace(/\/$/, '')}/`);
  target.search = request.query;

  const headers: Record<string, string> = {};
  if (request.contentType) headers['content-type'] = request.contentType;
  if (ENV.AI_SERVICE_TOKEN) headers.authorization = `Bearer ${ENV.AI_SERVICE_TOKEN}`;

  logger.ai('BrandForge AI', `${request.method} ${target.pathname}`);
  return fetch(target, {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
    duplex: 'half'
  } as RequestInit);
}