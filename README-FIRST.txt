BALKANAGENT V7 CORRECTED

1. Upload every file directly to the GitHub repository root.
2. In Supabase SQL Editor run SUPABASE-SETUP.sql.
3. Authentication -> URL Configuration:
   Site URL: https://balkanagent.com
   Redirect URL: https://balkanagent.com/**
   Add your Cloudflare pages.dev preview URL/**
4. Register your own account.
5. Make it admin with:
   update public.profiles
   set role='admin',status='active',plan='Enterprise'
   where email='YOUR_EMAIL';
6. Use admin-login.html for admin access.

This ZIP contains no extra top-level folder.
