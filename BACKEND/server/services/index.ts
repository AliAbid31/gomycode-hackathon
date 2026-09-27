import { getSupabaseClient } from '../config/supabase.js';
import { ENV } from '../config/env.js';
import { sendPasswordResetEmail } from './emailService.js';
import { signToken } from '../utils/jwt.js';
import { hashPassword, verifyPassword } from '../utils/hashPassword.js';
import { createHash, randomBytes } from 'node:crypto';

// AUTH SERVICE
export const authService = {
  register: async (fullName: string, email: string, password: string, role: 'marketing' | 'creative') => {
    if (!fullName?.trim() || !email?.trim() || !password || password.length < 8) {
      throw new Error('full_name, email and a password of at least 8 characters are required');
    }
    if (role !== 'marketing' && role !== 'creative') {
      throw new Error('role must be marketing or creative');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const client = getSupabaseClient();
    const existing = await client.from('Marketing').select('id').ilike('email', normalizedEmail).maybeSingle();
    if (existing.error) throw new Error(`Unable to check email: ${existing.error.message}`);
    if (existing.data) throw new Error('An account already exists with this email');

    const { data, error } = await client
      .from('Marketing')
      .insert({ full_name: fullName.trim(), email: normalizedEmail, password: hashPassword(password), role })
      .select('id, created_at, full_name, email, role')
      .single();
    if (error) throw new Error(`Unable to create account: ${error.message}`);

    const user = { id: String(data.id), email: data.email, name: data.full_name, role: data.role, createdAt: data.created_at };
    return { user, token: signToken({ id: user.id, email: user.email, role: user.role }) };
  },
  login: async (email: string, passwordPlain: string) => {
    const { data, error } = await getSupabaseClient()
      .from('Marketing')
      .select('id, created_at, full_name, email, password, role')
      .ilike('email', email)
      .maybeSingle();

    if (error) throw new Error(`Unable to read Marketing user: ${error.message}`);
    if (!data) {
      throw new Error('User not found with this email');
    }
    if (!verifyPassword(passwordPlain, data.password)) {
      throw new Error('Invalid credentials');
    }

    const user = {
      id: String(data.id),
      email: data.email,
      name: data.full_name,
      role: data.role,
      createdAt: data.created_at
    };

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    return { user, token };
  },
  requestPasswordReset: async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await getSupabaseClient()
      .from('Marketing')
      .select('id, email')
      .ilike('email', normalizedEmail)
      .maybeSingle();
    if (error) throw new Error(`Unable to find account: ${error.message}`);
    if (!data) return;

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const client = getSupabaseClient();
    const { error: tokenError } = await client.from('password_reset_tokens').insert({
      user_id: data.id,
      token_hash: tokenHash,
      expires_at: expiresAt
    });
    if (tokenError) throw new Error(`Unable to create reset token: ${tokenError.message}`);

    const resetUrl = `${ENV.FRONTEND_URL.replace(/\/$/, '')}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(data.email, resetUrl);
  },
  resetPassword: async (rawToken: string, newPassword: string) => {
    if (!rawToken || !newPassword || newPassword.length < 8) {
      throw new Error('A valid token and a password of at least 8 characters are required');
    }

    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    const client = getSupabaseClient();
    const { data: token, error: tokenError } = await client
      .from('password_reset_tokens')
      .select('id, user_id, expires_at, used_at')
      .eq('token_hash', tokenHash)
      .maybeSingle();
    if (tokenError) throw new Error(`Unable to validate reset token: ${tokenError.message}`);
    if (!token || token.used_at || new Date(token.expires_at).getTime() < Date.now()) {
      throw new Error('Invalid or expired password reset token');
    }

    const { error: passwordError } = await client
      .from('Marketing')
      .update({ password: hashPassword(newPassword) })
      .eq('id', token.user_id);
    if (passwordError) throw new Error(`Unable to update password: ${passwordError.message}`);

    const { error: usedError } = await client
      .from('password_reset_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', token.id);
    if (usedError) throw new Error(`Unable to invalidate reset token: ${usedError.message}`);
  },
  getUserById: async (id: string) => {
    const { data, error } = await getSupabaseClient()
      .from('Marketing')
      .select('id, created_at, full_name, email, role')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Unable to read Marketing user: ${error.message}`);
    if (!data) return null;

    return {
      id: String(data.id),
      email: data.email,
      name: data.full_name,
      role: data.role,
      createdAt: data.created_at
    };
  }
};

const databaseNotMigrated = (): never => {
  throw new Error('This endpoint requires its Supabase table to be created by the data migration owner.');
};

export const brandService = { getAll: databaseNotMigrated, getById: databaseNotMigrated, create: databaseNotMigrated, update: databaseNotMigrated, delete: databaseNotMigrated };
export const campaignService = { getAll: databaseNotMigrated, getById: databaseNotMigrated, create: databaseNotMigrated, update: databaseNotMigrated, delete: databaseNotMigrated };
export const taskService = { getAll: databaseNotMigrated, getById: databaseNotMigrated, create: databaseNotMigrated, submitWork: databaseNotMigrated, reviewSubmission: databaseNotMigrated, updateStatus: databaseNotMigrated };
export const assetService = { getAll: databaseNotMigrated, create: databaseNotMigrated, delete: databaseNotMigrated, rename: databaseNotMigrated };
export const calendarService = { getAll: databaseNotMigrated, create: databaseNotMigrated, update: databaseNotMigrated, delete: databaseNotMigrated };
export const creativeTeamService = { getAll: databaseNotMigrated, getById: databaseNotMigrated };
