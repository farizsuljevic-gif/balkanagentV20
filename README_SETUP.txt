BALKANAGENT PRODUCTION BETA — INSTALLATION

1. Upload ALL files and folders from this ZIP to the root of your GitHub repository.
2. In Cloudflare Pages, set Build output directory to: public
3. Create a Cloudflare D1 database and bind it to the Pages project with variable name: DB
4. Open D1 Console and execute the entire schema.sql file.
5. Deploy the Pages project again.
6. Register your own account at /register.html.
7. Make yourself admin by running this in D1 Console:
   UPDATE users SET is_admin=1,status='active' WHERE email='fariz.suljevic@gmail.com';
8. Open /admin.html to activate testers and change their status.

EMAIL
- Contact form sends to fariz.suljevic@gmail.com through FormSubmit.
- The first submitted message may trigger a FormSubmit confirmation email. Confirm it once.
- Site support links also use fariz.suljevic@gmail.com.

BOT
- A programmed demonstration bot is included on the homepage and works without an API key.
- Dashboard AI employee creation, conversations and bookings use D1.
- A true generative AI bot for each client requires an AI provider API key and per-client knowledge setup; no secret key is included in this ZIP.

IMPORTANT
- Users can register and log in immediately.
- New users start as pending. Activate them from /admin.html.
- Made in Montenegro is included in the footer.


NO-FOLDER BUILD:
All website HTML, CSS, JavaScript and the Balkan map image are in the ZIP root. Only Cloudflare-required backend folders (functions and scripts) remain. Upload the CONTENTS of the extracted folder to the root of your GitHub repository.
