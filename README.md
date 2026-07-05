# Gym SaaS - Panel de Administración

Sistema de administración SaaS para gimnasios con 3 roles: **Admin**, **Profesor** y **Alumno**.

## Tecnologías

- **Astro 7** — Framework web con renderizado del lado del servidor (SSR)
- **Supabase** — Base de datos PostgreSQL + Autenticación
- **Tailwind CSS 4** — Estilos utilitarios
- **Vercel** — Deploy serverless

## Estructura de roles

| Rol      | Acceso                                 |
| -------- | -------------------------------------- |
| Admin    | Dashboard completo con CRUD de todo    |
| Profesor | Gestión de clientes, ejercicios y rutinas |
| Alumno   | Visualización de su rutina asignada    |

## Funcionalidades

- Autenticación por rol con sesiones y middleware de protección de rutas
- Dashboard admin con métricas
- CRUD de clientes, profesores, planes, ejercicios y rutinas
- Módulo de caja
- Configuración del sistema
- Interfaz responsiva

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PUBLIC_SUPABASE_URL=tu_url_de_supabase
PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

## Comandos

| Comando             | Acción                               |
| :------------------ | :----------------------------------- |
| `npm install`       | Instalar dependencias                |
| `npm run dev`       | Iniciar servidor de desarrollo       |
| `npm run build`     | Compilar para producción             |
| `npm run preview`   | Previsualizar el build localmente    |

## Deploy

El proyecto está configurado para deploy automático en **Vercel** mediante el adapter `@astrojs/vercel`. Conectá el repositorio en [vercel.com](https://vercel.com) y agregá las variables de entorno correspondientes.
