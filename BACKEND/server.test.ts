import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { app } from './server.ts';
import { Server } from 'node:http';

describe('API Integration Tests', () => {
  let server: Server;
  const PORT = 5055;
  const baseUrl = `http://localhost:${PORT}`;

  before((done) => {
    server = app.listen(PORT, () => done());
  });

  after((done) => {
    server.close(() => done());
  });

  it('GET /api/health should return 200', async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(response.status, 200);
    const body = await response.json();
    assert.strictEqual(body.status, 'ok');
  });

  it('POST /api/auth/login should fail without credentials', async () => {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.ok(response.status >= 400 && response.status < 600);
  });

  it('POST /api/auth/register should fail without user data', async () => {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.ok(response.status >= 400 && response.status < 600);
  });

  it('POST /api/auth/forgot-password should fail without email', async () => {
    const response = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.ok(response.status >= 400 && response.status < 600);
  });

  it('POST /api/auth/reset-password should fail without token/password', async () => {
    const response = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.ok(response.status >= 400 && response.status < 600);
  });

  it('POST /api/ai should return 401 Unauthorized without token', async () => {
    const response = await fetch(`${baseUrl}/api/ai/some-endpoint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(response.status, 401);
  });
});
