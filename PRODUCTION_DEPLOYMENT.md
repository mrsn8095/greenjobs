# Green Jobs HR: Production Deployment Guide

To take this website live to the world as a **100% production-ready** platform, you need three main components: a place to host the code, a robust database, and an email delivery system. 

Here is the exact battle-tested stack we recommend, which offers generous **Free Tiers** that can easily handle your initial traffic:

1. **Vercel** (Website Hosting)
2. **Supabase** or **Neon** (PostgreSQL Database)
3. **Resend** or **SendGrid** (Email / SMTP)

---

### Step 1: Set up your Database (Supabase)
Currently, you are using a local `SQLite` database (`dev.db`) for immediate testing. Serverless deployments on Vercel **cannot** use local files, so you must switch to a hosted PostgreSQL database.

1. Go to [Supabase](https://supabase.com/) and create a free account + new project.
2. Go to your Project Settings > Database to find your **Connection String (URI)**.
3. In your local codebase, open `prisma/schema.prisma` and change the DB provider back to PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. In your `.env` file, replace the SQLite URL with your new Supabase URL:
   ```env
   DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.xxxxxx.supabase.co:5432/postgres"
   ```
5. Push the database schema to your new live database by running:
   ```bash
   npx prisma db push
   ```

---

### Step 2: Set up Email Delivery (Resend)
To send live magic links to your candidates, you need to configure an SMTP service.

1. Create a free account at [Resend](https://resend.com/) or [SendGrid](https://sendgrid.com/).
2. Verify your domain (e.g., `@greenjobs.com`) or use their default testing emails.
3. Generate an API Key (this becomes your password).
4. Update your `.env` for production SMTP:
   ```env
   EMAIL_SERVER_HOST="smtp.resend.com"
   EMAIL_SERVER_PORT="465"
   EMAIL_SERVER_USER="resend"
   EMAIL_SERVER_PASSWORD="re_xxxxxxxxxxxxxxxxx"
   EMAIL_FROM="onboarding@resend.dev"
   ```

---

### Step 3: Push Code to GitHub
Vercel deploys code directly from GitHub, ensuring your site auto-updates every time you change the code!

1. Go to [GitHub](https://github.com/) and create a new private repository.
2. In your local terminal, run:
   ```bash
   git add .
   git commit -m "Ready for production"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/greenjobs_website.git
   git push -u origin main
   ```

---

### Step 4: Host on Vercel
Vercel are the creators of Next.js, making it the fastest and absolute best place to host this codebase.

1. Go to [Vercel](https://vercel.com/) and sign up with your GitHub account.
2. Click **Add New Project** and select your `greenjobs_website` repository.
3. **CRITICAL:** Before clicking deploy, go into the **Environment Variables** section and paste ALL of your live variables from your `.env` file:
   - `DATABASE_URL` (Supabase)
   - `NEXTAUTH_URL` (Your production domain, e.g., `https://greenjobs-hr.vercel.app`)
   - `NEXTAUTH_SECRET` (Generate a random secure string using `openssl rand -base64 32`)
   - `EMAIL_SERVER_...` (Resend/SendGrid credentials)
4. Click **Deploy**!

In less than 2 minutes, Vercel will build your app and give you a live production URL!

---

### Step 5: Final Admin Setup
Because you are now on a live production Supabase database, it is entirely empty.
1. Run `npx prisma studio` in your local terminal.
2. Add your `admin@greenjobs.com` user manually into the Live database with a secure bcrypt-hashed password (exactly like we did in local testing).
3. Log into your live Vercel URL as an Admin, setup your jobs, and launch your business!
