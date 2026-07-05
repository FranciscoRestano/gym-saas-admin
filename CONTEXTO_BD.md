# Esquema de Base de Datos - Gym SaaS (Multi-tenant)
Todas las tablas usan UUID para los IDs principales y se encuentran protegidas por RLS.

## Tablas y Relaciones:
- `gimnasios` (id, nombre)
- `profesores` (id, gimnasio_id -> gimnasios.id, nombre)
- `planes` (id, gimnasio_id -> gimnasios.id, nombre, precio)
- `rutinas` (id, gimnasio_id -> gimnasios.id, nombre, creado_por -> profesores.id)
- `ejercicios` (id, nombre, grupo_muscular)
- `rutina_ejercicio` (id, rutina_id -> rutinas.id, ejercicio_id -> ejercicios.id, series, repeticiones, peso_sugerido)
- `clientes` (id, gimnasio_id -> gimnasios.id, nombre, dni, profesor_id -> profesores.id, plan_id -> planes.id, rutina_id -> rutinas.id, fecha_vencimiento)
- `pagos` (id, gimnasio_id -> gimnasios.id, cliente_id -> clientes.id, monto, fecha_pago)