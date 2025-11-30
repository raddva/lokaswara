create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  name text,
  role text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  primary key (id)
);

alter table public.profiles enable row level security;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'role');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create function public.handle_delete_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

create trigger on_auth_user_delated
  after delete on auth.users
  for each row execute procedure public.handle_delete_user()