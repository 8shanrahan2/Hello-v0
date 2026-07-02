# Hello v0

A minimal Next.js app with Supabase Auth on the home page.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Set these variables in `.env.local` and in Vercel Project Settings for Preview and Production:

```txt
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

## Auth

The app uses Supabase email magic-link auth. The home page lets a user enter an email address, receive a sign-in link, persist the browser session, and sign out.

The publishable key is safe to expose to browser code. Do not use a Supabase service-role key in this app.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
