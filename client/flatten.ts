import { PRODUCTS_CATALOG } from './lib/products-catalog.ts';
import fs from 'fs';

const flattened = [];

for (const p of PRODUCTS_CATALOG) {
  if (p.subproducts && p.subproducts.length > 0) {
    for (const sub of p.subproducts) {
      flattened.push({
        id: sub.id,
        slug: sub.id,
        name: sub.name,
        category: p.category,
        basePrice: sub.basePrice,
        description: p.description,
        moq: p.moq,
        images: p.images,
        rating: p.rating,
        reviewCount: p.reviewCount,
        badge: p.badge,
        customizerType: p.customizerType,
        priceTiers: sub.priceTiers,
        options: p.options
      });
    }
  } else {
    flattened.push(p);
  }
}

const fileContent = `export interface PriceTier {
  min: number;
  max: number;
  price: number;
}

export interface ProductCatalogItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  moq: number;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  isNew?: boolean;
  
  // Custom metadata for our pricing engine & UI options
  customizerType: "apparel" | "business-cards" | "envelopes" | "banners" | "lanyards" | "standard-tiers" | "area-tiers" | "email-quote-only" | "upload-only";
  priceTiers?: PriceTier[]; 
  options?: {
    name: string;
    key: string;
    type: "select" | "toggle" | "range" | "text" | "dimensions";
    choices?: { label: string; value: string; priceAdj?: number }[];
    defaultValue?: any;
  }[];
}

export const PRODUCTS_CATALOG: ProductCatalogItem[] = ${JSON.stringify(flattened, null, 2)};
`;

fs.writeFileSync('./lib/products-catalog.ts', fileContent);
console.log('Flattened products catalog!');
