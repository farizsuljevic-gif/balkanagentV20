BALKANAGENT V3 ENTERPRISE — GITHUB / CLOUDFLARE PAGES SETUP

This ZIP has NO extra main folder. After extraction, index.html, package.json,
functions/, scripts/ and the other project files are immediately visible.
Upload the extracted CONTENTS directly to the root of your GitHub repository.

1. CLOUDFLARE PAGES
- Connect the GitHub repository to Cloudflare Pages.
- Framework preset: None.
- Build command: leave empty.
- Build output directory: .
- Deploy.

2. D1 DATABASE
- Create a Cloudflare D1 database.
- Replace REPLACE_WITH_YOUR_D1_DATABASE_ID in wrangler.toml.
- In the Pages project, bind the database as: DB
- Execute the complete schema.sql in the D1 console.

3. ADMIN ACCOUNT
- Register normally at /register.html using: fariz.suljevic@gmail.com
- New accounts are created with status pending until an administrator activates them.
- Then run this once in D1:
  UPDATE users SET is_admin=1,status='active' WHERE lower(email)='fariz.suljevic@gmail.com';
- Log out and log in again, then open /admin.html.
- No default administrator password is stored in this ZIP.

4. STRIPE BILLING
Create four recurring monthly Stripe Prices, then add these encrypted environment variables
in Cloudflare Pages > Settings > Variables and Secrets:
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_STARTER      (€49/month)
- STRIPE_PRICE_GROWTH       (€99/month)
- STRIPE_PRICE_BUSINESS     (€159/month)
- STRIPE_PRICE_ENTERPRISE   (€259/month)

Stripe webhook endpoint:
  https://YOUR-DOMAIN/api/stripe/webhook
Recommended events:
- checkout.session.completed
- invoice.paid
- invoice.payment_succeeded
- invoice.payment_failed
- customer.subscription.updated
- customer.subscription.deleted

After Stripe confirms a paid invoice, it is stored in D1 and the customer can download
automatically generated PDF invoices from Billing.

5. COMPANY DETAILS USED ON PDF INVOICES
DOO Balkan Agent
Djerane II b.b.
Ulcinj, Crna Gora
Fariz.suljevic@gmail.com

6. LOCAL VALIDATION
- npm install
- npm run check
- npm run dev

7. IMPORTANT
- Never commit Stripe secrets to GitHub.
- Change the D1 database ID before deployment.
- The included demo bot is rule-based. A real generative AI assistant requires a separate AI API integration.
- Review legal pages and tax/VAT invoice requirements with a qualified accountant or lawyer before commercial launch.
