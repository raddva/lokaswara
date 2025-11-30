create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  youtube_url text not null,
  language_id uuid references public.languages(id) on delete restrict,
  content_id uuid references public.content(id) on delete set null, -- Relasi ke Konten terkait
  publish_status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.profiles(id) on delete set null
);

alter table public.videos enable row level security;
-- Policy: Allow all users to view videos
create policy "Allow all users to view videos"
on public.videos for select
using ( true );