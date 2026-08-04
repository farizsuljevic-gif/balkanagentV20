
create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 email text not null unique,
 full_name text,
 company_name text,
 phone text,
 country text,
 role text not null default 'user' check(role in ('user','admin')),
 status text not null default 'trial' check(status in ('trial','active','suspended')),
 plan text not null default 'Starter' check(plan in ('Starter','Business','Pro','Enterprise')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,email,full_name,company_name)
 values(new.id,new.email,new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'company_name');
 return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;

alter table public.profiles enable row level security;

drop policy if exists "read own or admin" on public.profiles;
create policy "read own or admin" on public.profiles for select to authenticated
using(id=auth.uid() or public.is_admin());

drop policy if exists "update own or admin" on public.profiles;
create policy "update own or admin" on public.profiles for update to authenticated
using(id=auth.uid() or public.is_admin())
with check(public.is_admin() or (id=auth.uid()
 and role=(select role from public.profiles where id=auth.uid())
 and status=(select status from public.profiles where id=auth.uid())
 and plan=(select plan from public.profiles where id=auth.uid())));

grant usage on schema public to authenticated;
grant select,update on public.profiles to authenticated;

-- Poslije registracije prvog admin naloga:
-- update public.profiles set role='admin',status='active',plan='Enterprise'
-- where email='VAŠ-EMAIL';
