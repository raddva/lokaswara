create table public.images (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  content_id uuid references public.content(id) on delete set null, -- Relasi ke Konten terkait
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.profiles(id) on delete set null
);

alter table public.images enable row level security;
-- Policy: Allow all users to view images
create policy "Allow all users to view images"
on public.images for select
using ( true );