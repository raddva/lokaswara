create table public.languages (
  id uuid primary key default gen_random_uuid(),
  name text not null
);

alter table public.languages enable row level security;
-- Policy: Allow all users to read languages
create policy "Allow all users to read languages"
on public.languages for select
using ( true );