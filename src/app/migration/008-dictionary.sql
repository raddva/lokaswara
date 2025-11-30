create table public.dictionary (
  id uuid primary key default gen_random_uuid(),
  word text not null,
  meaning text not null,
  synonym text,
  pronunciation text,
  language_id uuid references public.languages(id) on delete restrict,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.profiles(id) on delete set null
);

alter table public.dictionary enable row level security;
-- Policy: Allow all users to view dictionary entries
create policy "Allow all users to view dictionary"
on public.dictionary for select
using ( true );