create table public.content_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- e.g: 'Seni', 'Makanan Khas', 'Musik'
  slug text unique not null,
  description text,
  parent_id uuid references public.content_categories(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.content_categories enable row level security;

create policy "Allow all users to read content_categories"
on public.content_categories for select
using ( true );