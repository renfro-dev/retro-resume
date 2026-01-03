import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tpffsajfxoqbyzevvwnu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lazy initialization - only create client when needed
let _supabase: SupabaseClient | null = null;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase Environment Variables. VibeTube features require VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseKey);
  }

  return _supabase;
}

// Export a proxy object that lazily initializes on first use
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  }
});
