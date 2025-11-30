create table public.foods (
  id uuid primary key default gen_random_uuid(), 
  name text not null, 
  image_url text, 
  ingredients text, 
  tutorial text, 
  category_id uuid references public.content_categories(id) on delete restrict, -- Links to the 'Makanan Khas' category
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.profiles(id) on delete set null
);

alter table public.foods enable row level security;

create policy "Allow all users to view foods"
on public.foods for select
using ( true );

create policy "Allow authenticated users to create foods"
on public.foods for insert
with check ( auth.uid() = created_by );