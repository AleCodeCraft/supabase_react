-- Create a table for public users
create table users (
  -- Campi collegati a auth.users di default Supabase
  id uuid references auth.users(id) not null primary key,
  email text unique not null,
  last_sign_in_at timestamp with time zone,
  is_super_admin boolean,
  encrypted_password text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  -- Campi extra per Arena StileNuovo
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  fitness_level text,
  level integer default 1 check (level >= 1 and level <= 100),
  class text,
  role text default 'user' check (role in ('user', 'trainer', 'admin')),
  experience_points integer default 0 check (experience_points >= 0)
);

-- Set up Row Level Security (RLS)
alter table users
  enable row level security;

create policy "Users can view their own profile." on users
  for select using ((select auth.uid()) = id);

create policy "Users can insert their own profile." on users
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on users
  for update using ((select auth.uid()) = id);

-- Policy for admins to view all profiles
create policy "Admin can view all profiles." on users
  for select using (
    exists (
      select 1 from users 
      where id = (select auth.uid()) and role in ('admin')
    )
  );

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create or replace function public.handle_new_user() 
returns trigger
set search_path = ''
as $$
begin
  insert into public.users (
    id, 
    email,
    last_sign_in_at,
    is_super_admin,
    encrypted_password,
    created_at,
    updated_at,
    full_name, 
    username, 
    level, 
    class, 
    role
  )
  values (
    new.id, 
    new.email,
    new.last_sign_in_at,
    new.is_super_admin,
    new.encrypted_password,
    new.created_at,
    new.updated_at,
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'username',
    1, -- default level
    'athlete', -- default class
    'user' -- default role
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage for avatars
insert into storage.buckets (id, name)
  values ('avatars', 'avatars')
  on conflict (id) do nothing;

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
drop policy if exists "Avatar images are publicly accessible." on storage.objects;  -- ✅ AGGIUNGI questa riga
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "Anyone can upload an avatar." on storage.objects;  -- ✅ AGGIUNGI questa riga
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

drop policy if exists "Anyone can update their own avatar." on storage.objects;  -- ✅ AGGIUNGI questa riga
create policy "Anyone can update their own avatar." on storage.objects
  for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');