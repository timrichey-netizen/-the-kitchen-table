-- Run in Supabase SQL editor. Never expose a service_role secret in website code.
create table if not exists public.user_favorites (
 user_id uuid not null references auth.users(id) on delete cascade,
 recipe_id text not null check (recipe_id in ('neapolitan-lasagna.html','vincisgrassi.html','pasta-alla-norma.html','pasta-with-bottarga.html')),
 created_at timestamptz not null default now(),
 primary key (user_id,recipe_id)
);
alter table public.user_favorites enable row level security;
revoke all on public.user_favorites from anon;
grant select,insert,delete on public.user_favorites to authenticated;
create policy "read own favorites" on public.user_favorites for select to authenticated using ((select auth.uid())=user_id);
create policy "add own favorites" on public.user_favorites for insert to authenticated with check ((select auth.uid())=user_id);
create policy "remove own favorites" on public.user_favorites for delete to authenticated using ((select auth.uid())=user_id);
