BALKANAGENT V1 LAUNCH

UPLOAD
Upload every file from this ZIP directly to the GitHub repository root.
There is no extra folder inside the ZIP.

BEFORE USERS CAN REGISTER
1. Supabase -> SQL Editor -> New query.
2. Paste and run SUPABASE-SETUP.sql.
3. Authentication -> URL Configuration:
   Site URL: https://balkanagent.com
   Redirect URL: https://balkanagent.com/**
   Add your pages.dev preview URL with /**
4. Authentication -> Providers -> Email must be enabled.
5. Register your own account.
6. Run:
   update public.profiles
   set role='admin', status='active', plan='Enterprise'
   where email='YOUR_EMAIL';
7. Use admin-login.html.

BANK PAYMENT
Bank details are disabled in config.js until you provide IBAN.
Users can still send a plan request. Admin sees it in Admin Panel.

BOT EMBED
A customer creates a bot and receives:
<script src="https://balkanagent.com/widget.js" data-bot-id="BOT_UUID" async></script>
Paste it before </body> on any normal HTML website.

IMPORTANT
This version uses Supabase for real cross-device accounts.
No service_role secret is included.
