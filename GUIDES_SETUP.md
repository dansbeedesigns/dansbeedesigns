# Guides Setup Checklist

Follow these steps in order the first time you deploy. After that, adding new guides is just step 5.

---

## 1. Install the new dependency

```bash
npm install
```

---

## 2. Create the Cloudflare R2 bucket

```bash
npx wrangler r2 bucket create dansbee-guides
```

---

## 3. Create the Cloudflare D1 database

```bash
npx wrangler d1 create dansbee-guides-db
```

The output will show a block like:

```toml
[[d1_databases]]
binding = "DB"
database_name = "dansbee-guides-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Copy the `database_id` value and paste it into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_D1_DATABASE_ID`.

---

## 4. Apply the database schema

```bash
# Apply to your remote (production) D1 database
npx wrangler d1 execute dansbee-guides-db --remote --file=migrations/0001_init.sql
```

---

## 5. Upload your PDFs to R2

Upload each PDF with a filename that matches the `key` in `src/data/guides.ts`.

```bash
npx wrangler r2 object put dansbee-guides/getting-started-woodworking.pdf \
  --file="/path/to/your/getting-started-woodworking.pdf"
```

Repeat for each additional guide PDF.

---

## 6. Push to GitHub

The Cloudflare Pages auto-deploy will pick up all the changes:

- `@astrojs/cloudflare` adapter installed
- New API routes (`/api/request-guide`, `/api/download/[token]`)
- New `/guides` page

---

## 7. Add bindings in the Cloudflare Pages dashboard

Cloudflare Pages reads `wrangler.toml` for local dev, but for production you also need to connect the bindings in the dashboard:

1. Go to **Cloudflare Dashboard → Pages → dansbee-designs → Settings → Functions**
2. Under **D1 database bindings**, add: Variable name `DB` → select `dansbee-guides-db`
3. Under **R2 bucket bindings**, add: Variable name `GUIDES_BUCKET` → select `dansbee-guides`

Trigger a new deploy after saving.

---

## Adding more guides later

1. Upload the PDF: `npx wrangler r2 object put dansbee-guides/your-new-guide.pdf --file="..."`
2. Add an entry to `src/data/guides.ts`
3. Push to GitHub — done.

---

## Viewing collected emails

```bash
npx wrangler d1 execute dansbee-guides-db --remote \
  --command="SELECT email, guide_key, created_at FROM email_leads ORDER BY created_at DESC"
```

## Local development with wrangler

```bash
npx wrangler pages dev -- npm run dev
```

This boots a local Cloudflare Pages environment with D1 and R2 emulated. You'll need to apply the migration to the local DB first:

```bash
npx wrangler d1 execute dansbee-guides-db --local --file=migrations/0001_init.sql
```

And upload a test PDF to the local R2:

```bash
npx wrangler r2 object put dansbee-guides/getting-started-woodworking.pdf \
  --file="/path/to/test.pdf" --local
```
