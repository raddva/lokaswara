create table public.content (
  id uuid primary key default gen_random_uuid(),
  title text not null, 
  slug text unique not null,
  body text not null, 
  category_id uuid references public.content_categories(id) on delete restrict, -- Links to the main category (e.g., 'Seni')
  featured_image_url text, 
  publish_status text not null default 'draft', -- 'draft', 'public'

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.profiles(id) on delete set null
);

alter table public.content enable row level security;

create policy "Allow users to view public content"
on public.content for select
using ( publish_status = 'public' );

create policy "Allow authenticated users to create content"
on public.content for insert
with check ( auth.uid() = created_by );