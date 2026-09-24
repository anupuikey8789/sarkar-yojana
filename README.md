# React + Vite

## Supabase and Vercel

The Vite app uses Supabase Auth for accounts and Supabase Postgres for profiles, assessments, and the published scheme catalogue. Apply [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor of project `kieihfixgbfiormlqhmi` before using the app. The script enables row-level security and grants public read access only to published schemes.

Copy `.env.example` to `.env.local` for local development and set the project URL and **publishable** key. Add the same two variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`) to the Vercel project’s Production, Preview, and Development environments. Never put a Supabase secret/service-role key in a `VITE_` variable.

In Supabase Authentication URL Configuration, set the Site URL to the deployed Vercel domain and add that domain (and `http://localhost:5173` for local development) to the allowed redirect URLs. Vercel serves the Vite build from the repository root; `vercel.json` provides SPA fallback for client-side routes.

The public app currently seeds the three scheme cards already present on the home page. Import the complete vetted scheme catalogue into `public.schemes` before publishing a full catalogue. Existing accounts in the former MySQL `users` table are not migrated by the frontend; users must be imported into Supabase Auth or create/reset their accounts there.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
