import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export async function createAdminClient(cookies: { get: (name: string) => { value: string } | undefined }): Promise<SupabaseClient | null> {
  const sessionCookie = cookies.get('admin_session');
  if (!sessionCookie?.value) return null;

  try {
    const data = JSON.parse(sessionCookie.value);
    if (!data?.access_token || !data?.refresh_token) return null;

    const client = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await client.auth.setSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });

    if (error) return null;
    return client;
  } catch {
    return null;
  }
}
