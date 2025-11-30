create table public.content_requests (
  id uuid primary key default gen_random_uuid(),
  content_type text not null, -- e.g: 'dictionary', 'content'
  subject text not null, 
  body text not null,
  user_email text not null,
  status text not null default 'waiting', -- 'waiting', 'accepted', 'rejected'
  request_date timestamp with time zone default timezone('utc'::text, now()) not null,
  reviewed_by uuid references public.profiles(id) on delete set null -- Hanya Super Admin yang mereview
);

alter table public.content_requests enable row level security;

-- Policy 1: Allow any user (anon/authenticated) to insert a request
create policy "Allow anyone to create content request"
on public.content_requests for insert
with check ( true );