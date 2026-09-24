-- Apply in the Supabase SQL Editor for project kieihfixgbfiormlqhmi.
-- Auth credentials live only in Supabase Auth; this schema stores profiles and app data.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  mobile text,
  age integer,
  gender text,
  state text,
  district text,
  category text,
  occupation text,
  annual_income numeric(12, 2),
  education text,
  disability boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index if not exists assessments_user_created_idx
  on public.assessments (user_id, created_at desc);

create table if not exists public.schemes (
  id uuid primary key default gen_random_uuid(),
  scheme_name text not null,
  category text,
  level text,
  ministry text,
  description text,
  benefits text,
  gender text,
  occupation text,
  education text,
  disability_required boolean not null default false,
  income_limit numeric(12, 2),
  state text,
  helpline text,
  official_url text,
  documents jsonb not null default '[]'::jsonb,
  eligibility jsonb not null default '[]'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.schemes enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select, insert, update on table public.profiles to authenticated;
drop policy if exists "users read their profile" on public.profiles;
drop policy if exists "users create their profile" on public.profiles;
drop policy if exists "users update their profile" on public.profiles;
create policy "users read their profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
create policy "users create their profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);
create policy "users update their profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

revoke all on table public.assessments from anon, authenticated;
grant select, insert, update, delete on table public.assessments to authenticated;
drop policy if exists "users read their assessments" on public.assessments;
drop policy if exists "users create their assessments" on public.assessments;
drop policy if exists "users update their assessments" on public.assessments;
drop policy if exists "users delete their assessments" on public.assessments;
create policy "users read their assessments"
  on public.assessments for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "users create their assessments"
  on public.assessments for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "users update their assessments"
  on public.assessments for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "users delete their assessments"
  on public.assessments for delete to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.schemes from anon, authenticated;
grant select on table public.schemes to anon, authenticated;
drop policy if exists "published schemes are visible" on public.schemes;
create policy "published schemes are visible"
  on public.schemes for select to anon, authenticated
  using (is_published);
grant usage on schema public to anon, authenticated;

insert into public.schemes (id, scheme_name, category, description, official_url, is_published)
values
  ('2e54dc41-1690-4a8a-9ccd-9c247ce5b3d1', 'PM-KISAN', 'Agriculture', 'Financial support for eligible farmer families to support agricultural needs.', 'https://pmkisan.gov.in/', true),
  ('d12875a4-f5b2-4f1a-8a18-b1a90b46e80c', 'Post-Matric Scholarship', 'Education', 'Financial assistance for eligible students pursuing education after matriculation.', 'https://scholarships.gov.in/Students', true),
  ('20c1bb6a-017d-4f0d-a16a-42fdf4a79d12', 'Pradhan Mantri Kaushal Vikas Yojana', 'Skill Development', 'Skill training and certification opportunities for eligible candidates.', 'https://www.skillindiadigital.gov.in/pmkvy-dashboard', true)
on conflict (id) do update set
  scheme_name = excluded.scheme_name,
  category = excluded.category,
  description = excluded.description,
  official_url = excluded.official_url,
  is_published = excluded.is_published,
  updated_at = now();
