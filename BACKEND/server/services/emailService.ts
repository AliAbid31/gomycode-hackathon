import { ENV } from '../config/env.js';

export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  if (!ENV.RESEND_API_KEY) {
    throw new Error('Email service is not configured. Set RESEND_API_KEY.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ENV.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: ENV.EMAIL_FROM,
      to: [email],
      subject: 'Reset your MarkAI password',
      text: `Reset your MarkAI password using this link (valid for 1 hour): ${resetUrl}`,
      html: `<p>Reset your MarkAI password by clicking the link below.</p><p><a href="${resetUrl}">Reset password</a></p><p>This link expires in 1 hour.</p>`
    })
  });

  if (!response.ok) {
    throw new Error(`Unable to send password reset email: ${await response.text()}`);
  }
}