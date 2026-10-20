# Deploying EstateUSA to GitHub + Vercel — Step-by-Step Guide

This guide walks you through uploading the EstateUSA project to a GitHub repository and deploying it live on Vercel. No prior deployment experience needed — every step is spelled out.

**Total time:** 15–25 minutes (most of it waiting on Vercel's build).
**Cost:** Free (both GitHub and Vercel have free tiers that cover this project).
**Result:** A public `https://your-project.vercel.app` URL that anyone can visit.

---

## Prerequisites (do these once, before you start)

You need these accounts and tools installed on your computer.

### 1. Accounts to create (free)

| Service | URL | What you'll use it for |
|---------|-----|------------------------|
| GitHub  | https://github.com/signup | Host your code repo |
| Vercel  | https://vercel.com/signup | Build & host the live site (sign up with the **GitHub** button so they're linked) |
| Web3Forms | https://web3forms.com | Get a free access key so inquiry-form emails actually arrive in your inbox |

### 2. Tools to install on your computer

- **Git** — https://git-scm.com/downloads (Mac/Linux often have it pre-installed; check with `git --version` in your terminal)
- **Node.js 18+** — https://nodejs.org (Vercel build needs this; pick the LTS button)
- **Bun** (optional, faster) — https://bun.sh

Verify in a terminal:
```bash
git --version
node --version
```

If both print version numbers, you're set.

---

## Step 1 — Get your Web3Forms access key

This is what makes the "Request a tour" form actually email you when someone fills it out.

1. Go to https://web3forms.com
2. Type your email in the box and click **Get Access Key**
3. Check your inbox — Web3Forms emails you a UUID that looks like `abcd1234-1234-1234-1234-abcd1234abcd`
4. Copy that key — you'll paste it into Vercel in Step 5

> Until you add this key, the form runs in DEMO MODE: it shows the success message and logs the payload to the browser console, but doesn't actually send an email. That's intentional so you can test the UX first.

---

## Step 2 — Package the project files for upload

If you've been editing in this sandbox and want to take the project to your computer:

1. In this sandbox, the project lives at `/home/z/my-project/`.
2. You'll need to copy these folders/files to your local machine:
   - `src/` — all source code
   - `public/` — static files (logo, robots)
   - `prisma/` — database schema (unused at runtime but kept for reference)
   - `package.json`, `bun.lock`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `components.json`, `eslint.config.mjs`, `.gitignore`
3. Easiest method: zip the project root and download the zip.

> If you'd rather start fresh, you can also just `git clone` the repo you'll create in Step 4 and paste the `src/` folder in.

---

## Step 3 — Initialize git locally and make your first commit

Open a terminal in the project root (the folder that contains `package.json`).

```bash
# Initialize a new git repository
git init

# Stage all files (respecting .gitignore — node_modules, .next, etc. are excluded)
git add .

# Make your first commit
git commit -m "Initial commit: EstateUSA real estate platform"
```

If you see a warning about `default branch name`, run:
```bash
git branch -M main
```

(That just renames your local branch to `main`, which is GitHub's default.)

---

## Step 4 — Create the GitHub repo and push your code

1. Open https://github.com/new in your browser
2. Fill in:
   - **Repository name:** `estate-usa` (or any name you like)
   - **Description:** `American real estate platform — 320+ listings across all 50 U.S. states`
   - **Public** (so Vercel can read it on the free tier)
   - **Do NOT** check "Add a README", "Add .gitignore", or "Add license" — we already have a .gitignore and adding another would conflict
3. Click **Create repository**

GitHub now shows you a page with commands. Copy the lines under **"…or push an existing repository from the command line"** — they look like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/estate-usa.git
git branch -M main
git push -u origin main
```

Paste those into your terminal. When prompted, authenticate with your GitHub username and a Personal Access Token (GitHub no longer accepts passwords for git over HTTPS — see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token if you've never made one).

> **Tip:** To skip the token dance, you can install the official GitHub CLI (`gh`) and run `gh auth login` once. After that, `git push` just works.

When the push completes, refresh your repo page on GitHub — you should see all your files there.

---

## Step 5 — Connect Vercel and deploy

1. Go to https://vercel.com/new
2. You'll see a list of your GitHub repos. Find `estate-usa` and click **Import**.
3. On the configure page, fill in:

| Field | Value |
|-------|-------|
| Framework Preset | **Next.js** (auto-detected) |
| Root Directory | `./` (leave as default) |
| Build Command | `next build` (leave default — Vercel ignores the local `package.json` build script that copies standalone assets, that's only needed for self-hosting) |
| Output Directory | (leave blank, Vercel knows) |
| Install Command | `bun install` or `npm install` (Vercel auto-detects) |

4. Open the **Environment Variables** section and add this one variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | (paste the UUID you got from web3forms.com in Step 1) |

> The `NEXT_PUBLIC_` prefix is required — Next.js only exposes env vars to the browser if they start with that prefix. Without it, your form would silently fall back to demo mode.

5. Click **Deploy**. Vercel now clones your repo, runs `npm install` / `bun install`, runs `next build`, and uploads the result to its global CDN.

First build takes 2–4 minutes. Watch the build log scroll by — it's normal to see warnings about Tailwind / Next.js telemetry.

When it says **"Congratulations!"**, click the **Visit** button. Your site is live at `https://estate-usa.vercel.app` (or a similar name — Vercel will suggest one based on your repo name).

---

## Step 6 — Verify the live site works

Visit your new Vercel URL and check:

1. **Home page loads** with the hero, search panel, featured listings, popular states
2. **Click "Browse Listings"** → all 320 houses show up with images loading
3. **Click any listing** → property detail page with gallery, specs, agent name (no phone number), and the inquiry form at the bottom
4. **Fill in the inquiry form** → after submit, you should see "Inquiry submitted!" success message
5. **Check your inbox** — within a minute, you should receive an email from `no-reply@web3forms.com` with the form payload (your name, email, phone, the property address, the agent's name and email, etc.)

If step 5 doesn't arrive, check:
- Did you add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` env var in Vercel? (Project Settings → Environment Variables)
- Did you set it for the **Production** environment? (Vercel asks Production / Preview / Development — check Production)
- Did you **redeploy** after adding the env var? (Env vars only apply to NEW builds — go to Deployments → click the latest → click the "..." menu → Redeploy)

---

## Step 7 — Use a custom domain (optional but recommended)

Free Vercel URLs look like `estate-usa-abc123.vercel.app`. For a real business you'll want `estateusa.com` or similar.

1. Buy a domain from any registrar (Namecheap, Cloudflare, Google Domains, etc.) — typically $10–$15/year for a `.com`
2. In Vercel: open your project → **Settings** → **Domains**
3. Type your domain (e.g. `estateusa.com`) and click **Add**
4. Vercel shows you DNS records to add at your registrar. They look like:
   ```
   A     @        76.76.21.21
   CNAME www       cname.vercel-dns.com
   ```
5. Log into your domain registrar, find their DNS settings, add those records
6. Wait 5 minutes to a few hours for DNS to propagate (Vercel will show a green "Valid Configuration" check when it's live)
7. Once verified, set the `www` version to redirect to the bare domain (or vice versa — Vercel will suggest)

---

## Step 8 — Set up automatic deploys (free with Vercel)

This is the magic of Vercel: every time you `git push` to `main`, Vercel automatically rebuilds and deploys.

To try it:
1. Make a change locally (e.g., tweak a color in `src/components/site/header.tsx`)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Tweak header color"
   git push
   ```
3. Open Vercel → Deployments → watch the new build appear automatically
4. A minute later, your live site has the new color

> Vercel also builds every Pull Request as a "Preview Deployment" — you get a unique URL for each PR so reviewers can see the change before merging.

---

## Common issues and fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Build fails with `Module not found` | Missing dependency | Run `npm install <package>` locally, commit `package.json`, push |
| Form submits but no email arrives | Web3Forms env var not set or build was done before adding it | Project Settings → Environment Variables → add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` → Redeploy |
| Images don't load on Vercel but worked locally | The image CDN requires HTTPS; mixed-content block | Our image URLs are already HTTPS, so this shouldn't happen. If it does, check the network tab for 4xx |
| Site loads but stuck on "Z.ai Logo" splash | You hit the Caddy gateway's fallback page (only relevant in this sandbox, not on Vercel) | Not applicable on Vercel — Vercel serves your real Next.js build directly |
| `git push` rejected with "fetch first" | Someone (you, on another machine) pushed a commit you don't have | Run `git pull --rebase origin main` then `git push` again |
| Vercel build runs out of memory | Rare; happens on huge bundles | Settings → Functions → bump memory (paid plan) OR remove unused deps from `package.json` |
| Custom domain stuck on "Invalid Configuration" | DNS not propagated yet, or wrong records | Wait 15 min, recheck DNS at https://dnschecker.org — the A record and CNAME must match exactly what Vercel shows |

---

## Project structure (reference)

```
estate-usa/
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout, metadata, fonts
│   │   ├── page.tsx          ← Entry — dispatches by hash route to views/*
│   │   └── globals.css       ← Tailwind + design tokens
│   ├── components/site/
│   │   ├── header.tsx        ← Sticky nav with mobile drawer
│   │   ├── footer.tsx        ← Sticky footer
│   │   ├── router.tsx        ← Hash-based router (useRouter, parseRoute)
│   │   ├── property-card.tsx ← Reusable listing card
│   │   ├── inquiry-form.tsx  ← Web3Forms integration  ← put your access key here
│   │   ├── icons.tsx         ← 35+ inline SVG icons
│   │   └── views/            ← 8 page-level views
│   │       ├── home.tsx
│   │       ├── listings.tsx
│   │       ├── property-detail.tsx
│   │       ├── states.tsx
│   │       ├── state-detail.tsx
│   │       ├── about.tsx
│   │       ├── services.tsx
│   │       └── contact.tsx
│   ├── data/
│   │   ├── states.ts          ← 50 U.S. states + DC
│   │   ├── houses.ts         ← 320 generated listings
│   │   └── image_pools.json  ← 297 verified house photos
│   └── lib/
│       └── utils.ts          ← cn() helper for Tailwind
├── public/
│   ├── logo.svg
│   └── robots.txt
├── prisma/schema.prisma       ← Schema (not used at runtime)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json            ← shadcn/ui config
├── eslint.config.mjs
└── .gitignore
```

---

## Quick reference — the 8 commands you'll actually run

```bash
# Once, in the project folder:
git init
git add .
git commit -m "Initial commit: EstateUSA"

# Push to GitHub (replace YOUR-USERNAME):
git remote add origin https://github.com/YOUR-USERNAME/estate-usa.git
git branch -M main
git push -u origin main

# After making changes locally:
git add .
git commit -m "Describe your change"
git push
```

That's it. The first push triggers the first Vercel deploy; every push after triggers an automatic redeploy.

---

## What to do next

- Add Google Analytics or Plausible (Vercel → Project → Analytics, or paste the snippet in `src/app/layout.tsx`)
- Set up a contact email auto-responder through Web3Forms dashboard
- Add a sitemap.xml for SEO (Vercel + Next.js can generate this automatically — see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- Buy a custom domain (Step 7 above)
- Add Open Graph preview images so links look nice when shared on social media (drop a 1200×630 PNG in `public/og.png` and add `openGraph.images` to `src/app/layout.tsx`)

You're live. Welcome to the internet. 🏠
