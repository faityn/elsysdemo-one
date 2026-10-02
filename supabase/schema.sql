create table if not exists public.site_settings (
  id text primary key default 'main',
  brand_name text not null default 'elsys',
  brand_suffix text not null default '.eng.',
  tagline text not null default 'BUILDING A SAFER FUTURE',
  updated_at timestamptz not null default now()
);

create table if not exists public.site_trust_items (
  id text primary key,
  title text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.special_product_slides (
  id text primary key,
  category text not null default '',
  title text not null default '',
  description text not null default '',
  image text not null default '',
  link_label text not null default 'Дэлгэрэнгүй',
  link_href text not null default '#products',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.special_product_features (
  id text primary key,
  slide_id text not null references public.special_product_slides(id) on delete cascade,
  icon text not null default 'bolt',
  title text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_hero (
  id text primary key default 'main', eyebrow text not null default '', title text not null default '',
  accent text not null default '', description text not null default '', image text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.site_contact (
  id text primary key default 'main', address text not null default '', phone text not null default '',
  email text not null default '', updated_at timestamptz not null default now()
);

create table if not exists public.site_menu (
  id text primary key, parent_id text references public.site_menu(id) on delete cascade,
  label text not null, href text not null, enabled boolean not null default true,
  sort_order integer not null default 0, updated_at timestamptz not null default now()
);

alter table public.site_menu add column if not exists parent_id text references public.site_menu(id) on delete cascade;

create table if not exists public.categories (
  id text primary key,
  name text not null unique,
  parent_id text references public.categories(id) on delete set null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.categories
  add column if not exists parent_id text references public.categories(id) on delete set null;

create table if not exists public.about_pages (
  id text primary key,
  title text not null,
  description text not null default '',
  enabled boolean not null default true,
  image text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.about_pages
  add column if not exists image text not null default '';

create table if not exists public.about_company_sections (
  id text primary key,
  page_id text not null references public.about_pages(id) on delete cascade,
  title text not null default '',
  description text not null default '',
  image text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.about_projects (
  id text primary key,
  page_id text not null references public.about_pages(id) on delete cascade,
  title text not null default '',
  description text not null default '',
  image text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.career_openings (
  id text primary key,
  page_id text not null references public.about_pages(id) on delete cascade,
  title text not null default '',
  duties text not null default '',
  requirements text not null default '',
  headcount integer not null default 1 check (headcount > 0),
  application_deadline text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key, name text not null, sku text not null,
  category_id text references public.categories(id) on update cascade on delete set null,
  price text not null default '', image text not null default '', description text not null default '',
  is_new boolean not null default false,
  featured boolean not null default false, sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.products
  add column if not exists description text not null default '';

do $$
declare table_name text;
begin
  foreach table_name in array array['site_settings','site_hero','site_contact','site_menu','categories','about_pages','about_company_sections','about_projects','career_openings','site_trust_items','special_product_slides','special_product_features','products'] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('drop policy if exists "Public read %1$s" on public.%1$s', table_name);
    execute format('drop policy if exists "Demo write %1$s" on public.%1$s', table_name);
    execute format('create policy "Public read %1$s" on public.%1$s for select using (true)', table_name);
    execute format('create policy "Demo write %1$s" on public.%1$s for all using (true) with check (true)', table_name);
  end loop;
end $$;

insert into public.about_pages (id, title, description, enabled, sort_order)
values
  ('about-company', 'Компанийн тухай', 'Elsys Eng. ХХК нь барилгын цахилгаан тоног төхөөрөмжийн найдвартай нийлүүлэгч.', true, 0),
  ('about-projects', 'Оролцсон төсөл', 'Бидний хэрэгжүүлсэн төсөл, хамтын ажиллагааны мэдээлэл.', true, 1),
  ('about-careers', 'Ажлын байр', 'Манай багт нэгдэх боломжуудын мэдээлэл.', true, 2)
on conflict (id) do nothing;

insert into public.site_trust_items (id, title, description, sort_order)
select
  'legacy-trust-' || item.position,
  coalesce(item.value ->> 'title', ''),
  coalesce(item.value ->> 'description', ''),
  item.position - 1
from public.site_settings settings
cross join lateral jsonb_array_elements(
  case
    when jsonb_typeof(to_jsonb(settings) -> 'trust_items') = 'array'
      then to_jsonb(settings) -> 'trust_items'
    else '[]'::jsonb
  end
) with ordinality as item(value, position)
on conflict (id) do nothing;

insert into public.special_product_slides (
  id, category, title, description, image, link_label, link_href, sort_order
)
select
  coalesce(slide.value ->> 'id', 'legacy-special-' || slide.position),
  coalesce(slide.value ->> 'category', ''),
  coalesce(slide.value ->> 'title', ''),
  coalesce(slide.value ->> 'description', ''),
  coalesce(slide.value ->> 'image', ''),
  coalesce(slide.value ->> 'linkLabel', 'Дэлгэрэнгүй'),
  coalesce(slide.value ->> 'linkHref', '#products'),
  slide.position - 1
from public.site_settings settings
cross join lateral jsonb_array_elements(
  case
    when jsonb_typeof(to_jsonb(settings) -> 'special_products') = 'array'
      then to_jsonb(settings) -> 'special_products'
    else '[]'::jsonb
  end
) with ordinality as slide(value, position)
on conflict (id) do nothing;

insert into public.special_product_features (
  id, slide_id, icon, title, description, sort_order
)
select
  coalesce(feature.value ->> 'id', saved_slide.id || '-feature-' || feature.position),
  saved_slide.id,
  coalesce(feature.value ->> 'icon', 'bolt'),
  coalesce(feature.value ->> 'title', ''),
  coalesce(feature.value ->> 'description', ''),
  feature.position - 1
from public.site_settings settings
cross join lateral jsonb_array_elements(
  case
    when jsonb_typeof(to_jsonb(settings) -> 'special_products') = 'array'
      then to_jsonb(settings) -> 'special_products'
    else '[]'::jsonb
  end
) with ordinality as slide(value, position)
join public.special_product_slides saved_slide
  on saved_slide.id = coalesce(slide.value ->> 'id', 'legacy-special-' || slide.position)
cross join lateral jsonb_array_elements(
  case
    when jsonb_typeof(slide.value -> 'features') = 'array'
      then slide.value -> 'features'
    else '[]'::jsonb
  end
) with ordinality as feature(value, position)
on conflict (id) do nothing;

insert into public.about_projects (
  id, page_id, title, description, image, sort_order
)
select
  coalesce(project.value ->> 'id', 'legacy-project-' || page.id || '-' || project.position),
  page.id,
  coalesce(project.value ->> 'title', ''),
  coalesce(project.value ->> 'description', ''),
  coalesce(project.value ->> 'image', ''),
  project.position - 1
from public.about_pages page
cross join lateral jsonb_array_elements(
  case
    when jsonb_typeof(to_jsonb(page) -> 'projects') = 'array'
      then to_jsonb(page) -> 'projects'
    else '[]'::jsonb
  end
) with ordinality as project(value, position)
on conflict (id) do nothing;

insert into public.career_openings (
  id, page_id, title, duties, requirements, headcount, application_deadline, sort_order
)
select
  coalesce(opening.value ->> 'id', 'legacy-career-' || page.id || '-' || opening.position),
  page.id,
  coalesce(opening.value ->> 'title', ''),
  coalesce(opening.value ->> 'duties', opening.value ->> 'description', ''),
  coalesce(opening.value ->> 'requirements', ''),
  case
    when coalesce(opening.value ->> 'headcount', '') ~ '^[0-9]{1,9}$'
      then greatest((opening.value ->> 'headcount')::integer, 1)
    else 1
  end,
  coalesce(opening.value ->> 'applicationDeadline', ''),
  opening.position - 1
from public.about_pages page
cross join lateral jsonb_array_elements(
  case
    when jsonb_typeof(to_jsonb(page) -> 'careers') = 'array'
      then to_jsonb(page) -> 'careers'
    else '[]'::jsonb
  end
) with ordinality as opening(value, position)
on conflict (id) do nothing;

alter table public.site_settings
  drop column if exists trust_items,
  drop column if exists special_products;

alter table public.about_pages
  drop column if exists projects,
  drop column if exists careers;

insert into public.site_settings (id) values ('main') on conflict (id) do nothing;
insert into public.site_hero (id) values ('main') on conflict (id) do nothing;
insert into public.site_contact (id) values ('main') on conflict (id) do nothing;
