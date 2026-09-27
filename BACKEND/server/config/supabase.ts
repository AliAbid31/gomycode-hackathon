import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

let client: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (client) return client;

  if (!ENV.SUPABASE_URL || !ENV.SUPABASE_SECRET_KEY) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY.');
  }

  client = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SECRET_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  return client;
};