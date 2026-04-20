# Backend Integration (Minimal)

## Environment Variables

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@neroapp.co
SMTP_PASS=...
FROM_EMAIL=Nero <noreply@neroapp.co>
```

Paid Zoho SMTP host: `smtppro.zoho.com`.

## Supabase SQL

```sql
create extension if not exists citext;

create table if not exists public.waitlist_signups (
  id bigserial primary key,
  email citext not null,
  source text default 'landing-page',
  created_at timestamptz not null default now(),
  constraint waitlist_email_format_chk
    check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

alter table public.waitlist_signups
  add constraint waitlist_signups_email_unique unique (email);

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);
```
