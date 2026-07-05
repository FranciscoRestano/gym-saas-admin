-- ============================================================
-- GYM SaaS - Schema completo (DROP + CREATE)
-- Ejecutar en Supabase SQL Editor - Limpia todo y recrea
-- ============================================================

-- ── DROP en orden correcto (respeta FKs) ─────────────────────
DROP TABLE IF EXISTS rutina_ejercicio CASCADE;
DROP TABLE IF EXISTS rutinas CASCADE;
DROP TABLE IF EXISTS pagos CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS ejercicios CASCADE;
DROP TABLE IF EXISTS planes CASCADE;
DROP TABLE IF EXISTS profesores CASCADE;
DROP TABLE IF EXISTS gimnasios CASCADE;

-- ── 1. GIMNASIOS ─────────────────────────────────────────────
CREATE TABLE gimnasios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  direccion TEXT,
  telefono TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO gimnasios (id, nombre) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Gym SaaS Principal');

-- ── 2. PROFESORES ────────────────────────────────────────────
CREATE TABLE profesores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gimnasio_id UUID NOT NULL REFERENCES gimnasios(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  horario TEXT,
  horas_semanales INTEGER DEFAULT 0,
  pago_por_hora NUMERIC(10,2) DEFAULT 0,
  comision_por_alumno NUMERIC(10,2) DEFAULT 0,
  dni TEXT,
  password TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 3. PLANES ────────────────────────────────────────────────
CREATE TABLE planes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gimnasio_id UUID NOT NULL REFERENCES gimnasios(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  precio NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 4. CLIENTES ──────────────────────────────────────────────
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gimnasio_id UUID NOT NULL REFERENCES gimnasios(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  dni TEXT NOT NULL,
  telefono TEXT,
  profesor_id UUID REFERENCES profesores(id) ON DELETE SET NULL,
  plan_id UUID REFERENCES planes(id) ON DELETE SET NULL,
  rutina_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 5. PAGOS ─────────────────────────────────────────────────
CREATE TABLE pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gimnasio_id UUID NOT NULL REFERENCES gimnasios(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES planes(id) ON DELETE SET NULL,
  monto_pagado NUMERIC(10,2) NOT NULL DEFAULT 0,
  metodo_pago TEXT DEFAULT 'Efectivo',
  fecha_pago DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_vencimiento DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 6. EJERCICIOS ────────────────────────────────────────────
CREATE TABLE ejercicios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gimnasio_id UUID NOT NULL REFERENCES gimnasios(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  grupo_muscular TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (gimnasio_id, nombre)
);

-- ── 7. RUTINAS ───────────────────────────────────────────────
CREATE TABLE rutinas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gimnasio_id UUID NOT NULL REFERENCES gimnasios(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES clientes(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FK de clientes.rutina_id
ALTER TABLE clientes
  ADD CONSTRAINT fk_clientes_rutina
  FOREIGN KEY (rutina_id) REFERENCES rutinas(id) ON DELETE SET NULL;

-- ── 8. RUTINA_EJERCICIO (pivot) ──────────────────────────────
CREATE TABLE rutina_ejercicio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rutina_id UUID NOT NULL REFERENCES rutinas(id) ON DELETE CASCADE,
  ejercicio_id UUID NOT NULL REFERENCES ejercicios(id) ON DELETE CASCADE,
  dia INTEGER,
  bloque_grupo TEXT,
  series INTEGER DEFAULT 3,
  repeticiones INTEGER DEFAULT 10,
  peso NUMERIC(10,2) DEFAULT 0,
  descanso NUMERIC(10,2) DEFAULT 1,
  aclaraciones TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX idx_clientes_gimnasio ON clientes(gimnasio_id);
CREATE INDEX idx_clientes_profesor ON clientes(profesor_id);
CREATE INDEX idx_clientes_dni ON clientes(gimnasio_id, dni);
CREATE INDEX idx_profesores_gimnasio ON profesores(gimnasio_id);
CREATE INDEX idx_profesores_dni ON profesores(gimnasio_id, dni);
CREATE INDEX idx_pagos_cliente ON pagos(cliente_id);
CREATE INDEX idx_pagos_gimnasio_fecha ON pagos(gimnasio_id, fecha_pago);
CREATE INDEX idx_planes_gimnasio ON planes(gimnasio_id);
CREATE INDEX idx_rutinas_cliente ON rutinas(cliente_id);
CREATE INDEX idx_rutina_ejercicio_rutina ON rutina_ejercicio(rutina_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE gimnasios ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesores ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE rutinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE rutina_ejercicio ENABLE ROW LEVEL SECURITY;

-- Políticas para admin (Supabase Auth)
CREATE POLICY "admin_select_gimnasios" ON gimnasios
  FOR SELECT USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "admin_all_profesores" ON profesores
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "admin_all_planes" ON planes
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "admin_all_clientes" ON clientes
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "admin_all_pagos" ON pagos
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "admin_all_ejercicios" ON ejercicios
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "admin_all_rutinas" ON rutinas
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "admin_all_rutina_ejercicio" ON rutina_ejercicio
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Políticas para profesores (autenticación custom via middleware)
-- Se permiten operaciones sobre datos de su gimnasio
CREATE POLICY "profesor_select_profesores" ON profesores
  FOR SELECT USING (true);

CREATE POLICY "profesor_select_ejercicios" ON ejercicios
  FOR SELECT USING (true);

CREATE POLICY "profesor_select_planes" ON planes
  FOR SELECT USING (true);

CREATE POLICY "profesor_crud_rutinas" ON rutinas
  FOR ALL USING (true);

CREATE POLICY "profesor_crud_rutina_ejercicio" ON rutina_ejercicio
  FOR ALL USING (true);

CREATE POLICY "profesor_select_clientes" ON clientes
  FOR SELECT USING (true);

CREATE POLICY "profesor_update_clientes" ON clientes
  FOR UPDATE USING (true) WITH CHECK (true);

-- Políticas de lectura pública para ejercicios (catálogo compartido)
CREATE POLICY "public_select_ejercicios" ON ejercicios
  FOR SELECT USING (true);

-- ============================================================
-- EJERCICIOS BASE
-- ============================================================
INSERT INTO ejercicios (gimnasio_id, nombre, grupo_muscular) VALUES
('00000000-0000-0000-0000-000000000000', 'Press de banca con barra', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Press de banca con mancuernas', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Press inclinado con barra', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Press inclinado con mancuernas', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Aperturas con mancuernas', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Aperturas en polea (cruzados)', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Press en máquina', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Fondos en paralelas', 'Pecho'),
('00000000-0000-0000-0000-000000000000', 'Dominadas', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Jalón al pecho en polea', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Remo con barra', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Remo con mancuerna a una mano', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Remo en polea baja', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Peso muerto con barra', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Peso muerto rumano', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Jalón al pecho agarre estrecho', 'Espalda'),
('00000000-0000-0000-0000-000000000000', 'Press militar con barra', 'Hombros'),
('00000000-0000-0000-0000-000000000000', 'Press militar con mancuernas', 'Hombros'),
('00000000-0000-0000-0000-000000000000', 'Elevaciones laterales', 'Hombros'),
('00000000-0000-0000-0000-000000000000', 'Elevaciones frontales', 'Hombros'),
('00000000-0000-0000-0000-000000000000', 'Elevaciones posteriores (pájaros)', 'Hombros'),
('00000000-0000-0000-0000-000000000000', 'Press Arnold', 'Hombros'),
('00000000-0000-0000-0000-000000000000', 'Encogimientos de hombros', 'Hombros'),
('00000000-0000-0000-0000-000000000000', 'Curl con barra', 'Bíceps'),
('00000000-0000-0000-0000-000000000000', 'Curl con mancuernas', 'Bíceps'),
('00000000-0000-0000-0000-000000000000', 'Curl martillo', 'Bíceps'),
('00000000-0000-0000-0000-000000000000', 'Curl concentrado', 'Bíceps'),
('00000000-0000-0000-0000-000000000000', 'Curl inclinado con mancuernas', 'Bíceps'),
('00000000-0000-0000-0000-000000000000', 'Curl en polea', 'Bíceps'),
('00000000-0000-0000-0000-000000000000', 'Press francés con barra', 'Tríceps'),
('00000000-0000-0000-0000-000000000000', 'Extensión de tríceps en polea', 'Tríceps'),
('00000000-0000-0000-0000-000000000000', 'Extensión con mancuerna a una mano', 'Tríceps'),
('00000000-0000-0000-0000-000000000000', 'Fondos en máquina asistida', 'Tríceps'),
('00000000-0000-0000-0000-000000000000', 'Press cerrado', 'Tríceps'),
('00000000-0000-0000-0000-000000000000', 'Sentadilla con barra', 'Cuádriceps'),
('00000000-0000-0000-0000-000000000000', 'Sentadilla frontal', 'Cuádriceps'),
('00000000-0000-0000-0000-000000000000', 'Prensa de piernas', 'Cuádriceps'),
('00000000-0000-0000-0000-000000000000', 'Extensiones de cuádriceps', 'Cuádriceps'),
('00000000-0000-0000-0000-000000000000', 'Zancadas con mancuernas', 'Cuádriceps'),
('00000000-0000-0000-0000-000000000000', 'Sentadilla búlgara', 'Cuádriceps'),
('00000000-0000-0000-0000-000000000000', 'Sentadilla en máquina Smith', 'Cuádriceps'),
('00000000-0000-0000-0000-000000000000', 'Curl femoral acostado', 'Isquiotibiales'),
('00000000-0000-0000-0000-000000000000', 'Curl femoral sentado', 'Isquiotibiales'),
('00000000-0000-0000-0000-000000000000', 'Peso muerto rumano con mancuernas', 'Isquiotibiales'),
('00000000-0000-0000-0000-000000000000', 'Peso muerto sumo', 'Isquiotibiales'),
('00000000-0000-0000-0000-000000000000', 'Buenos días con barra', 'Isquiotibiales'),
('00000000-0000-0000-0000-000000000000', 'Elevación de gemelos de pie', 'Gemelos'),
('00000000-0000-0000-0000-000000000000', 'Elevación de gemelos sentado', 'Gemelos'),
('00000000-0000-0000-0000-000000000000', 'Elevación de gemelos en prensa', 'Gemelos'),
('00000000-0000-0000-0000-000000000000', 'Aductor en máquina', 'Aductores'),
('00000000-0000-0000-0000-000000000000', 'Sentadilla sumo con mancuerna', 'Aductores'),
('00000000-0000-0000-0000-000000000000', 'Abductor en máquina', 'Aductores'),
('00000000-0000-0000-0000-000000000000', 'Plancha frontal', 'Core'),
('00000000-0000-0000-0000-000000000000', 'Plancha lateral', 'Core'),
('00000000-0000-0000-0000-000000000000', 'Crunch en máquina', 'Core'),
('00000000-0000-0000-0000-000000000000', 'Elevación de piernas colgado', 'Core'),
('00000000-0000-0000-0000-000000000000', 'Russian twist con peso', 'Core'),
('00000000-0000-0000-0000-000000000000', 'Abdominales en polea alta', 'Core'),
('00000000-0000-0000-0000-000000000000', 'Dead bug', 'Core');
