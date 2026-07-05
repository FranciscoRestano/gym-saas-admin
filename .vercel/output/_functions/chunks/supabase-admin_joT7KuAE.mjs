import { createClient } from "@supabase/supabase-js";
//#region src/lib/supabase-admin.ts
var supabaseUrl = "https://xqzquobypwoqbdqxzfhx.supabase.co";
var supabaseAnonKey = "sb_publishable_uMLZGqwSSQnsSeS5h7yHbA_20mcslhu";
async function createAdminClient(cookies) {
	const sessionCookie = cookies.get("admin_session");
	if (!sessionCookie?.value) return null;
	try {
		const data = JSON.parse(sessionCookie.value);
		if (!data?.access_token || !data?.refresh_token) return null;
		const client = createClient(supabaseUrl, supabaseAnonKey);
		const { error } = await client.auth.setSession({
			access_token: data.access_token,
			refresh_token: data.refresh_token
		});
		if (error) return null;
		return client;
	} catch {
		return null;
	}
}
//#endregion
export { createAdminClient as t };
