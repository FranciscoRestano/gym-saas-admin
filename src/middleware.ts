import { defineMiddleware } from 'astro:middleware';

const RUTAS_PROFESOR = ['/profesor/clientes', '/profesor/rutinas', '/profesor/ejercicios', '/profesor/ver-rutina'];
const RUTAS_ALUMNO = ['/alumno/mi-rutina'];
const RUTAS_ADMIN = ['/dashboard'];
const RUTAS_PUBLICAS = ['/admin', '/login', '/'];

function hasValidAdminSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  try {
    const data = JSON.parse(cookieValue);
    if (!data?.expires_at) return false;
    return data.expires_at > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  if (pathname.startsWith('/api/')) {
    return next();
  }

  if (RUTAS_PUBLICAS.includes(pathname)) {
    return next();
  }

  if (RUTAS_ADMIN.some(r => pathname.startsWith(r))) {
    const sessionCookie = context.cookies.get('admin_session');
    if (!hasValidAdminSession(sessionCookie?.value)) {
      return context.redirect('/admin');
    }
    return next();
  }

  if (RUTAS_PROFESOR.some(r => pathname.startsWith(r))) {
    const profesorId = context.cookies.get('profesor_id');
    if (!profesorId) {
      return context.redirect('/login');
    }
    return next();
  }

  if (RUTAS_ALUMNO.some(r => pathname.startsWith(r))) {
    const alumnoId = context.cookies.get('alumno_id');
    if (!alumnoId) {
      return context.redirect('/login');
    }
    return next();
  }

  return context.redirect('/login');
});
