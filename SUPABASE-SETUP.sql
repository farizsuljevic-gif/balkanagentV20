
-- RUN ONCE IN SUPABASE SQL EDITOR
create extension if not exists pgcrypto;

create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 email text not null unique,
 full_name text, company_name text, phone text, country text,
 role text not null default 'user' check(role in('user','admin')),
 status text not null default 'trial' check(status in('trial','active','suspended')),
 plan text not null default 'Starter' check(plan in('Starter','Business','Pro','Enterprise')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.bots(
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 name text not null,business_name text not null,welcome_message text not null,language text not null default 'English',
 brand_color text not null default '#3976ff',contact_email text,status text not null default 'active',
 created_at timestamptz not null default now()
);
create table if not exists public.bot_faqs(
 id uuid primary key default gen_random_uuid(),bot_id uuid not null references public.bots(id) on delete cascade,
 question text not null,answer text not null,created_at timestamptz not null default now()
);
create table if not exists public.leads(
 id uuid primary key default gen_random_uuid(),bot_id uuid not null references public.bots(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,name text,email text,phone text,message text,
 created_at timestamptz not null default now()
);
create table if not exists public.demo_requests(
 id uuid primary key default gen_random_uuid(),name text not null,email text not null,company_name text,message text,status text default 'new',created_at timestamptz default now()
);
create table if not exists public.payment_requests(
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 plan text not null,status text not null default 'pending',proof_url text,created_at timestamptz default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin insert into public.profiles(id,email,full_name,company_name) values(new.id,new.email,new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'company_name'); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='admin'); $$;

alter table public.profiles enable row level security; alter table public.bots enable row level security;
alter table public.bot_faqs enable row level security; alter table public.leads enable row level security;
alter table public.demo_requests enable row level security; alter table public.payment_requests enable row level security;

create policy "profiles read" on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
create policy "profiles update" on public.profiles for update to authenticated using(id=auth.uid() or public.is_admin()) with check(public.is_admin() or (id=auth.uid() and role=(select role from public.profiles where id=auth.uid()) and status=(select status from public.profiles where id=auth.uid()) and plan=(select plan from public.profiles where id=auth.uid())));
create policy "bots owner read" on public.bots for select to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "bots public active" on public.bots for select to anon using(status='active');
create policy "bots owner insert" on public.bots for insert to authenticated with check(user_id=auth.uid());
create policy "bots owner update" on public.bots for update to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "bots owner delete" on public.bots for delete to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "faq owner all" on public.bot_faqs for all to authenticated using(exists(select 1 from public.bots b where b.id=bot_id and (b.user_id=auth.uid() or public.is_admin()))) with check(exists(select 1 from public.bots b where b.id=bot_id and (b.user_id=auth.uid() or public.is_admin())));
create policy "faq public read" on public.bot_faqs for select to anon using(exists(select 1 from public.bots b where b.id=bot_id and b.status='active'));
create policy "lead public insert" on public.leads for insert to anon,authenticated with check(exists(select 1 from public.bots b where b.id=bot_id and b.user_id=user_id and b.status='active'));
create policy "lead owner read" on public.leads for select to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "demo public insert" on public.demo_requests for insert to anon,authenticated with check(true);
create policy "demo admin read" on public.demo_requests for select to authenticated using(public.is_admin());
create policy "payment owner insert" on public.payment_requests for insert to authenticated with check(user_id=auth.uid());
create policy "payment owner read" on public.payment_requests for select to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "payment admin update" on public.payment_requests for update to authenticated using(public.is_admin());

grant usage on schema public to anon,authenticated;
grant select on public.bots,public.bot_faqs to anon;
grant insert on public.leads,public.demo_requests to anon,authenticated;
grant select,insert,update,delete on public.bots,public.bot_faqs to authenticated;
grant select on public.leads,public.profiles,public.demo_requests,public.payment_requests to authenticated;
grant update on public.profiles,public.payment_requests to authenticated;
grant insert on public.payment_requests to authenticated;

-- After registering your own account:
-- update public.profiles set role='admin',status='active',plan='Enterprise' where email='YOUR_EMAIL';
