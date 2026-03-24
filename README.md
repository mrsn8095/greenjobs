# Green Jobs HR Consultancy - Full Stack Recruitment Portal

A production-ready full-stack website built for Green Jobs HR Consultancy, designed to capture leads, list jobs, and manage candidate applications efficiently.

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** NextAuth.js (Email Magic Links + Admin Credentials)
- **Icons:** Lucide React

## 📋 Features

- High-converting landing page with animated gradients and trust indicators
- Secure, split authentication for Candidates and Administrators
- Advanced Job Listing System with dynamic search and geographical filtering
- 1-Click candidate registration & job application flows
- Candidate Dashboard to upload resumes (UI ready) and track applications
- Powerful Admin Panel to manage Jobs, Users, Applications
- Export to CSV utility for all applications and leads
- Integrated native Lead Capture forms and floating WhatsApp chat widget

## ⚙️ How to Deploy (Vercel & Supabase/Railway)

1. **Spin up a Database**
   Create a new project on [Supabase](https://supabase.com) or [Railway](https://railway.app), and obtain your PostgreSQL Connection string. Set the mode to Transaction (PGBouncer disabled/direct mode) or append `?pgbouncer=true` if required by your setup.

2. **Configure Environment Variables**
   Open `.env` (or set these inside your Vercel Dashboard):

   ```env
   DATABASE_URL="postgres://user:pass@db-address:5432/db"
   DIRECT_URL="postgres://user:pass@db-address:5432/db" # If using connection pooling

   NEXTAUTH_URL="https://your-domain.com"
   NEXTAUTH_SECRET="your-super-secret-key-for-jwt"

   EMAIL_SERVER_USER="apikey"
   EMAIL_SERVER_PASSWORD="your-sendgrid-or-resend-api-key"
   EMAIL_SERVER_HOST="smtp.sendgrid.net"
   EMAIL_SERVER_PORT="587"
   EMAIL_FROM="noreply@greenjobs.com"
   ```

3. **Deploy the Database Schema**
   Run the following terminal commands to push the schema to production:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Vercel Deployment**
   - Push your code to a GitHub repository.
   - Go to Vercel and import the repository.
   - Input your `.env` variables from Step 2 into Vercel's Environment Variables tab.
   - Click **Deploy**.

## 🔐 Setup Admin Credentials

Since candidates use Magic Links, you must manually create the first **ADMIN** user.

1. Create a `seed.js` script in your local environment or use your database tool (like Prisma Studio via `npx prisma studio`):

   ```bash
   npx prisma studio
   ```

2. In the `User` table, manually add a row:
   - **email**: `admin@greenjobs.com`
   - **password**: Generate a bcrypt hash for your desired password (e.g., using a web tool or script). For `password123`, the bcrypt hash is `$2a$12$R.Sj..1/Z.1y//g/C.dMNeB/H/4Snt.g1wI/O2M2Kq1B8fO2/28e.`.
   - **role**: `ADMIN`

3. Once saved, you can log in natively via the `/login` portal.

---

_Built meticulously to convert your IG traffic into lasting, paid candidates._
