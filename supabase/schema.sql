-- =====================================================
-- Ceramic Store – Supabase schema
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- =====================================================

-- ---------- Reference tables ----------
create table public.categories (
  id bigint generated always as identity primary key,
  nom text not null unique
);

create table public.utilisations (
  id bigint generated always as identity primary key,
  nom text not null unique
);

create table public.finitions (
  id bigint generated always as identity primary key,
  nom text not null unique
);

-- ---------- Producers (fabriquants) ----------
create table public.producers (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  logo_img text
);

-- ---------- Main product tables ----------
create table public.faience (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nom text not null,
  disponibilite text default 'En stock',
  format text,
  aspect text,
  epaisseur text,
  marque text,
  producer_id bigint references public.producers(id) on delete set null,
  est_nouveau boolean default false,
  prix numeric(10,2),
  prix_promo numeric(10,2)
);

create table public.bathroom (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nom text not null,
  disponibilite text default 'En stock',
  dimensions text,
  poids text,
  absorption text,
  retrait text,
  prix numeric(10,2),
  producer_id bigint references public.producers(id) on delete set null,
  est_nouveau boolean default false,
  prix_promo numeric(10,2)
);

-- ---------- Photos ----------
create table public.photos_grand_faience (
  id bigint generated always as identity primary key,
  id_faience bigint not null references public.faience(id) on delete cascade,
  url text not null
);

create table public.photos_unite_faience (
  id bigint generated always as identity primary key,
  id_faience bigint not null references public.faience(id) on delete cascade,
  url text not null,
  description text
);

create table public.photos_grand_bathroom (
  id bigint generated always as identity primary key,
  id_bathroom bigint not null references public.bathroom(id) on delete cascade,
  url text not null
);

create table public.photos_unite_bathroom (
  id bigint generated always as identity primary key,
  id_bathroom bigint not null references public.bathroom(id) on delete cascade,
  url text not null,
  description text
);

-- ---------- Junction tables ----------
-- The app embeds relations like .select("id_faience, categories(nom)")
-- so foreign keys are required for PostgREST to resolve them.
create table public.faience_categories (
  id_faience bigint not null references public.faience(id) on delete cascade,
  id_categorie bigint not null references public.categories(id) on delete cascade,
  primary key (id_faience, id_categorie)
);

create table public.faience_utilisations (
  id_faience bigint not null references public.faience(id) on delete cascade,
  id_utilisation bigint not null references public.utilisations(id) on delete cascade,
  primary key (id_faience, id_utilisation)
);

create table public.faience_finitions (
  id_faience bigint not null references public.faience(id) on delete cascade,
  id_finition bigint not null references public.finitions(id) on delete cascade,
  primary key (id_faience, id_finition)
);

-- =====================================================
-- Row Level Security: allow anonymous reads (public site)
-- =====================================================
alter table public.categories enable row level security;
alter table public.producers enable row level security;
alter table public.utilisations enable row level security;
alter table public.finitions enable row level security;
alter table public.faience enable row level security;
alter table public.bathroom enable row level security;
alter table public.photos_grand_faience enable row level security;
alter table public.photos_unite_faience enable row level security;
alter table public.photos_grand_bathroom enable row level security;
alter table public.photos_unite_bathroom enable row level security;
alter table public.faience_categories enable row level security;
alter table public.faience_utilisations enable row level security;
alter table public.faience_finitions enable row level security;

create policy "public read" on public.categories            for select using (true);
create policy "public read" on public.producers             for select using (true);
create policy "public read" on public.utilisations          for select using (true);
create policy "public read" on public.finitions             for select using (true);
create policy "public read" on public.faience               for select using (true);
create policy "public read" on public.bathroom              for select using (true);
create policy "public read" on public.photos_grand_faience  for select using (true);
create policy "public read" on public.photos_unite_faience  for select using (true);
create policy "public read" on public.photos_grand_bathroom for select using (true);
create policy "public read" on public.photos_unite_bathroom for select using (true);
create policy "public read" on public.faience_categories    for select using (true);
create policy "public read" on public.faience_utilisations  for select using (true);
create policy "public read" on public.faience_finitions     for select using (true);

-- =====================================================
-- Seed data (matches FilterSidebar options)
-- =====================================================
insert into public.categories (nom) values
  ('Carreaux de Sol'), ('Faïences Murales'), ('Sanitaires');

insert into public.utilisations (nom) values
  ('Extérieur'), ('Intérieur'), ('Cuisine'), ('Salle de bain');

insert into public.finitions (nom) values
  ('Brillant'), ('Lisse'), ('Matte'), ('Relief');

-- ---------- Example producers ----------
insert into public.producers (name, logo_img) values
  ('Ceramica', 'https://picsum.photos/seed/logo-ceramica/100/100'),
  ('Mosaic',   'https://picsum.photos/seed/logo-mosaic/100/100');

-- ---------- Example products (replace with your real data) ----------
insert into public.faience (nom, disponibilite, format, aspect, epaisseur, marque, producer_id, est_nouveau, prix, prix_promo) values
  ('Carrelage Grège 60x60', 'En stock', '60 × 60', 'Béton', '9mm', 'Ceramica', (select id from public.producers where name = 'Ceramica'), true, 3800, 3200),
  ('Faïence Murale Blanche 30x30', 'Sur commande', '30 × 30', 'Uni', '12mm', 'Mosaic', (select id from public.producers where name = 'Mosaic'), true, 2600, null);

insert into public.bathroom (nom, disponibilite, dimensions, poids, absorption, retrait, prix, producer_id, est_nouveau, prix_promo) values
  ('Lavabo sur pied Classique', 'En stock', '60 × 45 × 85 cm', '18 kg', '< 0.5%', '1.2%', 24500, (select id from public.producers where name = 'Ceramica'), null, null),
  ('WC suspendu Design', 'En stock', '55 × 36 cm', '24 kg', '< 0.5%', '1.0%', 38900, (select id from public.producers where name = 'Mosaic'), true, 32900);

-- Link first faience to categories / utilisations / finitions
insert into public.faience_categories (id_faience, id_categorie)
select f.id, c.id from public.faience f, public.categories c
where f.nom = 'Carrelage Grège 60x60' and c.nom = 'Carreaux de Sol';

insert into public.faience_categories (id_faience, id_categorie)
select f.id, c.id from public.faience f, public.categories c
where f.nom = 'Faïence Murale Blanche 30x30' and c.nom = 'Faïences Murales';

insert into public.faience_utilisations (id_faience, id_utilisation)
select f.id, u.id from public.faience f, public.utilisations u
where f.nom = 'Carrelage Grège 60x60' and u.nom in ('Intérieur', 'Extérieur');

insert into public.faience_finitions (id_faience, id_finition)
select f.id, fi.id from public.faience f, public.finitions fi
where f.nom = 'Carrelage Grège 60x60' and fi.nom in ('Matte', 'Lisse');

-- Example photos (placeholder URLs – replace with your own image links
-- or Supabase Storage public URLs)
insert into public.photos_grand_faience (id_faience, url)
select id, 'https://picsum.photos/seed/faience1/800/600'
from public.faience where nom = 'Carrelage Grège 60x60';

insert into public.photos_unite_faience (id_faience, url, description)
select id, 'https://picsum.photos/seed/faience-unit1/400/400', 'Vue unité'
from public.faience where nom = 'Carrelage Grège 60x60';

insert into public.photos_grand_bathroom (id_bathroom, url)
select id, 'https://picsum.photos/seed/bath1/800/600'
from public.bathroom where nom = 'Lavabo sur pied Classique';

insert into public.photos_unite_bathroom (id_bathroom, url, description)
select id, 'https://picsum.photos/seed/bath-unit1/400/400', 'Vue unité'
from public.bathroom where nom = 'Lavabo sur pied Classique';


alter table public.faience  add column if not exists est_nouveau boolean default false;
alter table public.faience  add column if not exists prix numeric(10,2);
alter table public.faience  add column if not exists prix_promo numeric(10,2);
alter table public.bathroom add column if not exists est_nouveau boolean default false;
alter table public.bathroom add column if not exists prix_promo numeric(10,2);
alter table public.faience  add column if not exists producer_id bigint references public.producers(id) on delete set null;
alter table public.bathroom add column if not exists producer_id bigint references public.producers(id) on delete set null;




