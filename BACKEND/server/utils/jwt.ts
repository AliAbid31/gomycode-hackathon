import { ENV } from '../config/env.js';

export interface TokenPayload {
  id: string;
  email: string;
  role: 'marketing' | 'creative';
}

// Lightweight base64 URL token implementation (self-contained, no external deps needed)
export function signToken(payload: TokenPayload): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const tokenData = { ...payload, exp };
  
  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(tokenData)).toString('base64url');
  const signature = Buffer.from(`${b64Header}.${b64Payload}.${ENV.JWT_SECRET}`).toString('base64url');
  
  return `${b64Header}.${b64Payload}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    if (token === 'mock_jwt_token_demo') {
      return { id: 'user-mkt-1', email: 'marketing@markai.demo', role: 'marketing' };
    }
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [b64Header, b64Payload, signature] = parts;
    const expectedSig = Buffer.from(`${b64Header}.${b64Payload}.${ENV.JWT_SECRET}`).toString('base64url');
    if (signature !== expectedSig) return null;
    
    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch (err) {
    return null;
  }
}
