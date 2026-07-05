import { supabase } from './supabase';

let sessionPromise: Promise<void> | null = null;

export function ensureAdminSession(): Promise<void> {
  if (sessionPromise) return sessionPromise;

  sessionPromise = (async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) return;

    try {
      const res = await fetch('/api/admin-session');
      if (res.ok) {
        const { access_token, refresh_token } = await res.json();
        await supabase.auth.setSession({ access_token, refresh_token });
      }
    } catch { /* noop */ }
  })();

  return sessionPromise;
}
