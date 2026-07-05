import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan las variables de entorno de Supabase. Verificá tu archivo .env");
}

function cookieStorage() {
  return {
    getItem: (key: string): string | null => {
      const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    },
    setItem: (key: string, value: string) => {
      document.cookie = `${key}=${encodeURIComponent(value)}; path=/; samesite=lax; max-age=31536000`;
    },
    removeItem: (key: string) => {
      document.cookie = `${key}=; path=/; max-age=0`;
    },
  };
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: cookieStorage(),
    storageKey: 'sb-session',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
