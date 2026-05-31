import type { APIRoute } from 'astro';
import { products, looks, categories } from '../lib/data';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? 'https://malikfits.example').replace(/\/$/, '');
  const urls: string[] = [
    '/', '/catalog', '/outfits', '/search', '/wishlist', '/about',
    ...categories.map(c => `/catalog/${c.slug}`),
    ...products.map(p => `/product/${p.id}`),
    ...looks.map(l => `/outfits/${l.id}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${base}${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
