# MalikFits

Editorial men's-style affiliate site. Data-driven (JSON), static-built with Astro + Tailwind,
mobile-first, light/quiet-luxury palette.

## Editing content (the only file you touch day-to-day)

Everything on the site renders from two files:

- `src/data/products.json` — every piece in the catalog
- `src/data/looks.json` — every "Shop the fit" outfit, referencing products by `id`

Open them in the GitHub web editor (pencil icon on github.com), edit, commit. Cloudflare Pages
auto-rebuilds and deploys in ~30 seconds.

### Add a product
```json
{
  "id": "tshirt-cream-boxy-001",
  "name": "Cream Boxy Tee",
  "category": "t-shirts",
  "image": "/images/products/tshirt-cream-boxy-001.jpg",
  "price": 48,
  "retailer": "Stylink",
  "affiliateUrl": "https://stylink.example/xxxx",
  "isNew": true
}
```
- `id` must be unique, lowercase, kebab-case
- `category` must be one of: `t-shirts`, `shoes`, `jackets`, `jeans`, `accessories`, `shorts`
- `price` is a number in USD (rendered as `$48`)
- `isNew` is optional, defaults to `false`
- Image goes under `/public/images/products/` and is referenced by absolute path

### Add a look
```json
{
  "id": "camel-coat-sunday",
  "title": "Camel Coat Sunday",
  "style": "quiet-luxury",
  "heroImage": "/images/looks/camel-coat-sunday.jpg",
  "description": "Soft tailoring for a slow morning.",
  "productIds": ["jacket-camel-overcoat-001", "tshirt-cream-boxy-001", "shoes-cream-loafer-001"]
}
```
- `style` must be one of: `smart-casual`, `quiet-luxury`, `streetwear`, `summer`, `tailoring`
- Every id in `productIds` must exist in `products.json` (the build will fail with a clear error if not)
- `productIds` order = display order on the look page

### Swap the hero
Replace `/public/images/hero.svg` with your hero photo. Keep it ~4:5 portrait or ~16:9.

## Local development
```
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in ./dist
npm run preview  # serve the build locally
```

## Deploy (Cloudflare Pages — recommended, free)
1. Push this repo to GitHub.
2. cloudflare.com → Workers & Pages → Create → Pages → Connect to Git → pick this repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save. Every push to the branch redeploys.

(Vercel and Netlify work identically with the same settings.)

## File map
```
src/
  data/        ← edit these
    products.json
    looks.json
    categories.json
    styles.json
  pages/       ← one file per route
  components/  ← reusable UI
  layouts/Base.astro
  lib/data.ts  ← data helpers + build-time integrity check
  styles/global.css
public/        ← static assets (images, favicon, robots.txt)
```

## Design tokens (locked in `tailwind.config.mjs`)
- Background ivory `#F7F4EE`, surface `#FDFBF7`
- Text `#1A1714`, muted `#6B655B`
- Hairline `#E5DFD3`, accent camel `#B88A5C`
- Headings: Fraunces (variable serif). Body: Inter (variable sans).
