import productsJson from '../data/products.json';
import looksJson from '../data/looks.json';
import categoriesJson from '../data/categories.json';
import stylesJson from '../data/styles.json';
import couponsJson from '../data/coupons.json';

export type CategorySlug =
  | 't-shirts' | 'shoes' | 'jackets' | 'trousers' | 'jeans' | 'accessories' | 'shorts';

export type StyleSlug =
  | 'smart-casual' | 'quiet-luxury' | 'streetwear' | 'summer' | 'tailoring';

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  image: string;
  price: number;
  retailer: string;
  affiliateUrl: string;
  isNew?: boolean;
}

export interface Look {
  id: string;
  title: string;
  style: StyleSlug;
  heroImage: string;
  description?: string;
  productIds: string[];
  addedAt: string;
}

export interface Category { slug: CategorySlug; label: string; image: string; }
export interface Style    { slug: StyleSlug;    label: string; }

export interface Coupon {
  code?: string;
  retailer: string;
  label: string;
  description: string;
  url: string;
  expires: string | null;
  logo?: string;
}

export const products: Product[]     = productsJson as Product[];
export const looks: Look[]           = (looksJson as Look[])
  .slice()
  .sort((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt));
export const categories: Category[]  = categoriesJson as Category[];
export const styles: Style[]         = stylesJson as Style[];
export const coupons: Coupon[]       = couponsJson as Coupon[];

// Build-time integrity check: every productId in every look must resolve.
const productIds = new Set(products.map(p => p.id));
for (const look of looks) {
  for (const pid of look.productIds) {
    if (!productIds.has(pid)) {
      throw new Error(
        `[data] Look "${look.id}" references unknown product "${pid}". ` +
        `Add it to products.json or fix the id in looks.json.`
      );
    }
  }
}

export const formatPrice = (n: number): string =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export const productById = (id: string): Product | undefined =>
  products.find(p => p.id === id);

export const productsByCategory = (slug: CategorySlug): Product[] =>
  products.filter(p => p.category === slug);

export const looksByStyle = (slug: StyleSlug): Look[] =>
  looks.filter(l => l.style === slug);

export const looksContainingProduct = (productId: string): Look[] =>
  looks.filter(l => l.productIds.includes(productId));

export const newReleases = (limit = 12): Product[] =>
  products.filter(p => p.isNew).slice(0, limit);

export const relatedProducts = (p: Product, limit = 6): Product[] =>
  products.filter(x => x.id !== p.id && x.category === p.category).slice(0, limit);

export const similarLooks = (l: Look, limit = 6): Look[] =>
  looks.filter(x => x.id !== l.id && x.style === l.style).slice(0, limit);

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find(c => c.slug === slug);

export const styleBySlug = (slug: string): Style | undefined =>
  styles.find(s => s.slug === slug);

const isCouponLive = (c: Coupon, now = Date.now()): boolean =>
  !c.expires || Date.parse(c.expires) >= now;

export const activeCoupons = (): Coupon[] => coupons.filter(c => isCouponLive(c));

export const couponsForRetailer = (retailer: string): Coupon[] =>
  activeCoupons().filter(c => c.retailer.toLowerCase() === retailer.toLowerCase());
