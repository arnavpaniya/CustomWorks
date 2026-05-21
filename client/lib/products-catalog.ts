export interface PriceTier {
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
  customizerType: "apparel" | "business-cards" | "envelopes" | "banners" | "lanyards" | "standard-tiers" | "area-tiers" | "whatsapp-only";
  subproducts?: {
    id: string;
    name: string;
    basePrice: number;
    priceTiers: PriceTier[];
  }[];
  priceTiers?: PriceTier[]; // for standard customizer types without subproducts
  options?: {
    name: string;
    key: string;
    type: "select" | "toggle" | "range" | "text" | "dimensions";
    choices?: { label: string; value: string; priceAdj?: number }[];
    defaultValue?: any;
  }[];
}

export const PRODUCTS_CATALOG: ProductCatalogItem[] = [
  // 1. Business Cards
  {
    id: "business-cards",
    slug: "custom-business-cards",
    name: "Custom Business Cards (Visiting Cards)",
    category: "Business Cards",
    basePrice: 1.00,
    description: "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    moq: 200,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 342,
    badge: "Best Seller",
    customizerType: "business-cards",
    subproducts: [
      {
        id: "300gsm-standard",
        name: "300 GSM Standard (Matte)",
        basePrice: 1.75,
        priceTiers: [
          { min: 200, max: 299, price: 1.75 },
          { min: 300, max: 399, price: 1.72 },
          { min: 400, max: 499, price: 1.69 },
          { min: 500, max: 599, price: 1.66 },
          { min: 600, max: 699, price: 1.63 },
          { min: 700, max: 799, price: 1.60 },
          { min: 800, max: 899, price: 1.57 },
          { min: 900, max: 999, price: 1.54 },
          { min: 1000, max: 1499, price: 1.50 },
          { min: 1500, max: 1999, price: 1.45 },
          { min: 2000, max: 2999, price: 1.40 },
          { min: 3000, max: 4999, price: 1.30 },
          { min: 5000, max: 7499, price: 1.25 },
          { min: 7500, max: 9999, price: 1.15 },
          { min: 10000, max: 19999, price: 1.00 },
          { min: 20000, max: 999999, price: 0.95 }
        ]
      },
      {
        id: "350gsm-premium",
        name: "350 GSM Premium Matte / Glossy",
        basePrice: 2.50,
        priceTiers: [
          { min: 500, max: 599, price: 2.50 },
          { min: 600, max: 699, price: 2.45 },
          { min: 700, max: 799, price: 2.40 },
          { min: 800, max: 899, price: 2.35 },
          { min: 900, max: 999, price: 2.30 },
          { min: 1000, max: 1499, price: 2.25 },
          { min: 1500, max: 1999, price: 2.20 },
          { min: 2000, max: 2999, price: 2.15 },
          { min: 3000, max: 4999, price: 2.05 },
          { min: 5000, max: 7499, price: 1.95 },
          { min: 7500, max: 9999, price: 1.85 },
          { min: 10000, max: 19999, price: 1.75 },
          { min: 20000, max: 29999, price: 1.60 },
          { min: 30000, max: 999999, price: 1.50 }
        ]
      },
      {
        id: "400gsm-heavy",
        name: "400 GSM Heavy Duty",
        basePrice: 3.50,
        priceTiers: [
          { min: 200, max: 299, price: 3.50 },
          { min: 300, max: 399, price: 3.45 },
          { min: 400, max: 499, price: 3.40 },
          { min: 500, max: 599, price: 3.35 },
          { min: 600, max: 699, price: 3.30 },
          { min: 700, max: 799, price: 3.25 },
          { min: 800, max: 899, price: 3.20 },
          { min: 900, max: 999, price: 3.15 },
          { min: 1000, max: 1499, price: 3.05 },
          { min: 1500, max: 1999, price: 2.95 },
          { min: 2000, max: 2999, price: 2.85 },
          { min: 3000, max: 4999, price: 2.75 },
          { min: 5000, max: 7499, price: 2.65 },
          { min: 7500, max: 9999, price: 2.55 },
          { min: 10000, max: 19999, price: 2.45 },
          { min: 20000, max: 29999, price: 2.30 },
          { min: 30000, max: 999999, price: 2.25 }
        ]
      },
      {
        id: "textured",
        name: "Premium Textured Cards",
        basePrice: 3.50,
        priceTiers: [
          { min: 500, max: 599, price: 3.50 },
          { min: 600, max: 699, price: 3.45 },
          { min: 700, max: 799, price: 2.40 },
          { min: 800, max: 899, price: 3.35 },
          { min: 900, max: 999, price: 3.30 },
          { min: 1000, max: 1499, price: 3.25 },
          { min: 1500, max: 1999, price: 3.15 },
          { min: 2000, max: 2999, price: 3.05 },
          { min: 3000, max: 4999, price: 2.95 },
          { min: 5000, max: 7499, price: 2.85 },
          { min: 7500, max: 9999, price: 2.75 },
          { min: 10000, max: 19999, price: 2.65 },
          { min: 20000, max: 29999, price: 2.40 },
          { min: 30000, max: 999999, price: 2.25 }
        ]
      },
      {
        id: "metallic",
        name: "Metallic Foil Highlight",
        basePrice: 5.50,
        priceTiers: [
          { min: 500, max: 599, price: 5.50 },
          { min: 600, max: 699, price: 5.35 },
          { min: 700, max: 799, price: 5.20 },
          { min: 800, max: 899, price: 5.05 },
          { min: 900, max: 999, price: 4.90 },
          { min: 1000, max: 1499, price: 4.75 },
          { min: 1500, max: 1999, price: 4.55 },
          { min: 2000, max: 2999, price: 4.35 },
          { min: 3000, max: 4999, price: 4.05 },
          { min: 5000, max: 7499, price: 3.75 },
          { min: 7500, max: 9999, price: 3.45 },
          { min: 10000, max: 19999, price: 3.15 },
          { min: 20000, max: 29999, price: 2.50 },
          { min: 30000, max: 999999, price: 2.25 }
        ]
      },
      {
        id: "square-cut",
        name: "Square Cut (300 GSM Standard)",
        basePrice: 2.00,
        priceTiers: [
          { min: 400, max: 499, price: 2.00 },
          { min: 500, max: 599, price: 1.95 },
          { min: 600, max: 699, price: 1.90 },
          { min: 700, max: 799, price: 1.85 },
          { min: 800, max: 899, price: 1.80 },
          { min: 900, max: 999, price: 1.75 },
          { min: 1000, max: 1499, price: 1.70 },
          { min: 1500, max: 1999, price: 1.60 },
          { min: 2000, max: 2999, price: 1.50 },
          { min: 3000, max: 4999, price: 1.40 },
          { min: 5000, max: 7499, price: 1.30 },
          { min: 7500, max: 9999, price: 1.15 },
          { min: 10000, max: 19999, price: 1.00 },
          { min: 20000, max: 29999, price: 0.90 },
          { min: 30000, max: 999999, price: 0.85 }
        ]
      },
      {
        id: "mini-card",
        name: "Mini Card (300 GSM Standard)",
        basePrice: 1.85,
        priceTiers: [
          { min: 300, max: 399, price: 1.85 },
          { min: 400, max: 499, price: 1.80 },
          { min: 500, max: 599, price: 1.75 },
          { min: 600, max: 699, price: 1.70 },
          { min: 700, max: 799, price: 1.65 },
          { min: 800, max: 899, price: 1.60 },
          { min: 900, max: 999, price: 1.55 },
          { min: 1000, max: 1499, price: 1.50 },
          { min: 1500, max: 1999, price: 1.45 },
          { min: 2000, max: 2999, price: 1.40 },
          { min: 3000, max: 4999, price: 1.30 },
          { min: 5000, max: 7499, price: 1.25 },
          { min: 7500, max: 9999, price: 1.15 },
          { min: 10000, max: 19999, price: 1.05 },
          { min: 20000, max: 29999, price: 1.00 },
          { min: 30000, max: 999999, price: 0.95 }
        ]
      }
    ],
    options: [
      {
        name: "Print Sides",
        key: "printSides",
        type: "select",
        choices: [
          { label: "Double Sided", value: "double-sided" },
          { label: "Single Sided (50% off base rate)", value: "single-sided" }
        ],
        defaultValue: "double-sided"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      },
      {
        name: "Matte/Glossy Finish",
        key: "finish",
        type: "select",
        choices: [
          { label: "Matte Finish", value: "matte" },
          { label: "Glossy Finish", value: "glossy" }
        ],
        defaultValue: "matte"
      },
      {
        name: "Texture Variant",
        key: "texture",
        type: "select",
        choices: [
          { label: "White Texture", value: "white" },
          { label: "Cream Texture", value: "cream" },
          { label: "Ivory Texture", value: "ivory" },
          { label: "Criss Cross Texture", value: "criss-cross" },
          { label: "Needle Point Texture", value: "needle-point" }
        ],
        defaultValue: "white"
      },
      {
        name: "Metallic Foil Highlight",
        key: "foil",
        type: "select",
        choices: [
          { label: "Gold Foil Highlight", value: "gold" },
          { label: "Silver Foil Highlight", value: "silver" }
        ],
        defaultValue: "gold"
      }
    ]
  },

  // 2. Envelopes
  {
    id: "envelopes",
    slug: "custom-envelopes",
    name: "Custom Envelope Stationery",
    category: "Envelopes",
    basePrice: 6.00,
    description: "Branded commercial envelopes in DL, C5, and C4 formats. Ideal for official communication, marketing mailers, and document deliveries.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 94,
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "dl-envelopes",
        name: "DL Envelopes",
        basePrice: 20.00,
        priceTiers: [
          { min: 10, max: 24, price: 20.00 },
          { min: 25, max: 49, price: 19.00 },
          { min: 50, max: 99, price: 18.00 },
          { min: 100, max: 199, price: 17.00 },
          { min: 200, max: 299, price: 16.00 },
          { min: 300, max: 399, price: 15.50 },
          { min: 400, max: 499, price: 15.00 },
          { min: 500, max: 999, price: 14.50 },
          { min: 1000, max: 1499, price: 13.50 },
          { min: 1500, max: 1999, price: 12.50 },
          { min: 2000, max: 2499, price: 11.50 },
          { min: 2500, max: 4999, price: 10.75 },
          { min: 5000, max: 7499, price: 9.00 },
          { min: 7500, max: 9999, price: 7.50 },
          { min: 10000, max: 999999, price: 6.00 }
        ]
      },
      {
        id: "c5-envelopes",
        name: "C5 Envelopes",
        basePrice: 23.00,
        priceTiers: [
          { min: 10, max: 24, price: 23.00 },
          { min: 25, max: 49, price: 22.00 },
          { min: 50, max: 99, price: 21.00 },
          { min: 100, max: 199, price: 20.00 },
          { min: 200, max: 299, price: 19.00 },
          { min: 300, max: 399, price: 18.50 },
          { min: 400, max: 499, price: 18.00 },
          { min: 500, max: 999, price: 17.50 },
          { min: 1000, max: 1499, price: 16.50 },
          { min: 1500, max: 1999, price: 15.50 },
          { min: 2000, max: 2499, price: 14.50 },
          { min: 2500, max: 4999, price: 14.00 },
          { min: 5000, max: 7499, price: 12.50 },
          { min: 7500, max: 9999, price: 11.25 },
          { min: 10000, max: 999999, price: 10.00 }
        ]
      },
      {
        id: "c4-envelopes",
        name: "C4 Envelopes",
        basePrice: 30.00,
        priceTiers: [
          { min: 10, max: 24, price: 30.00 },
          { min: 25, max: 49, price: 28.50 },
          { min: 50, max: 99, price: 27.00 },
          { min: 100, max: 199, price: 25.50 },
          { min: 200, max: 299, price: 24.00 },
          { min: 300, max: 399, price: 23.00 },
          { min: 400, max: 499, price: 22.00 },
          { min: 500, max: 999, price: 21.00 },
          { min: 1000, max: 1499, price: 19.50 },
          { min: 1500, max: 1999, price: 18.50 },
          { min: 2000, max: 2499, price: 17.50 },
          { min: 2500, max: 4999, price: 17.00 },
          { min: 5000, max: 7499, price: 15.50 },
          { min: 7500, max: 9999, price: 14.75 },
          { min: 10000, max: 999999, price: 14.00 }
        ]
      }
    ]
  },

  // 3. Flyers & Letterheads
  {
    id: "flyers-letterheads",
    slug: "flyers-letterheads",
    name: "Flyers & Letterheads",
    category: "Corporate Stationery",
    basePrice: 15.00,
    description: "Premium A4 letterheads (MOQ 50) and custom flyers in high quality matte/glossy offset printing. Perfect for office correspondence and distribution campaigns.",
    moq: 50,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 68,
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "letterheads-a4",
        name: "Custom Letterheads (A4 / A5)",
        basePrice: 20.00,
        priceTiers: [
          { min: 50, max: 99, price: 20.00 },
          { min: 100, max: 249, price: 19.00 },
          { min: 250, max: 499, price: 18.00 },
          { min: 500, max: 749, price: 17.00 },
          { min: 750, max: 999, price: 16.00 },
          { min: 1000, max: 999999, price: 15.00 }
        ]
      },
      {
        id: "bulk-flyers",
        name: "Bulk Offset Flyers (MOQ 2000)",
        basePrice: 0,
        priceTiers: [] // pricing by enquiry
      }
    ]
  },

  // 4. Banners
  {
    id: "banners",
    slug: "custom-banners",
    name: "Custom Vinyl Banners & Signs",
    category: "Signage & Display",
    basePrice: 22.00,
    description: "Heavy duty flex frontlit and Starflex banners. Available with sturdy wooden framing or structural steel framing. Fully calculated dynamically by surface area (sqft).",
    moq: 1,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 112,
    badge: "Fast Shipping",
    customizerType: "banners",
    subproducts: [
      {
        id: "frontlit-flex",
        name: "Normal Frontlit Flex Banner",
        basePrice: 35.00,
        priceTiers: [
          { min: 1, max: 49, price: 35 },
          { min: 50, max: 249, price: 31 },
          { min: 250, max: 499, price: 27 },
          { min: 500, max: 999999, price: 22 }
        ]
      },
      {
        id: "starflex-glossy",
        name: "Premium Starflex (Glossy)",
        basePrice: 45.00,
        priceTiers: [
          { min: 1, max: 49, price: 45 },
          { min: 50, max: 249, price: 41 },
          { min: 250, max: 499, price: 37 },
          { min: 500, max: 999999, price: 32 }
        ]
      },
      {
        id: "starflex-wood-frame",
        name: "Starflex with Wooden Framing",
        basePrice: 55.00,
        priceTiers: [
          { min: 1, max: 49, price: 55 },
          { min: 50, max: 249, price: 52 },
          { min: 250, max: 999999, price: 50 }
        ]
      },
      {
        id: "starflex-steel-frame",
        name: "Starflex with Steel Framing",
        basePrice: 95.00,
        priceTiers: [
          { min: 1, max: 999999, price: 95 }
        ]
      }
    ],
    options: [
      {
        name: "Banner Dimensions (feet)",
        key: "bannerDimensions",
        type: "dimensions",
        defaultValue: { width: 6, height: 4 }
      }
    ]
  },

  // 5. ID Cards & Lanyards
  {
    id: "id-lanyards",
    slug: "id-lanyards",
    name: "Corporate ID Cards & Lanyards",
    category: "ID & Lanyards",
    basePrice: 15.00,
    description: "Premium satin-finished 20mm polyester lanyards, keychain lanyards, XXL custom PVC cards, and standard paper/PVC employee cards with clear protective sleeves.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 201,
    customizerType: "lanyards",
    subproducts: [
      {
        id: "polyester-lanyard-20mm",
        name: "20mm Polyester Printed Lanyards",
        basePrice: 55.00,
        priceTiers: [] // Handled inside pricing-engine dynamic matrix for different hooks
      },
      {
        id: "keychain-lanyard",
        name: "Printed Keychain Lanyards",
        basePrice: 45.00,
        priceTiers: [
          { min: 39, max: 99, price: 45 },
          { min: 100, max: 149, price: 37 },
          { min: 150, max: 199, price: 33 },
          { min: 200, max: 249, price: 30 },
          { min: 250, max: 299, price: 27 },
          { min: 300, max: 399, price: 25 },
          { min: 400, max: 499, price: 22 },
          { min: 500, max: 999999, price: 19 }
        ]
      },
      {
        id: "xxl-pvc-card",
        name: "XXL PVC ID Cards",
        basePrice: 100.00,
        priceTiers: [
          { min: 10, max: 19, price: 100 },
          { min: 20, max: 39, price: 85 },
          { min: 40, max: 59, price: 80 },
          { min: 60, max: 99, price: 75 },
          { min: 100, max: 149, price: 65 },
          { min: 150, max: 999999, price: 60 }
        ]
      },
      {
        id: "standard-pvc-card",
        name: "Standard PVC ID Card (With Clear Cover)",
        basePrice: 40.00,
        priceTiers: [
          { min: 10, max: 19, price: 40 },
          { min: 20, max: 39, price: 35 },
          { min: 40, max: 59, price: 30 },
          { min: 60, max: 99, price: 27 },
          { min: 100, max: 999999, price: 25 }
        ]
      },
      {
        id: "paper-id-card",
        name: "Paper ID Card (With Clear Cover)",
        basePrice: 25.00,
        priceTiers: [
          { min: 10, max: 19, price: 25 },
          { min: 20, max: 39, price: 22 },
          { min: 40, max: 59, price: 22 },
          { min: 60, max: 99, price: 20 },
          { min: 100, max: 149, price: 18 },
          { min: 150, max: 999999, price: 15 }
        ]
      }
    ],
    options: [
      {
        name: "Lanyard Attachment Hook",
        key: "lanyardHook",
        type: "select",
        choices: [
          { label: "China Hook", value: "china" },
          { label: "Overlock Hook (+₹3.00)", value: "overlock" },
          { label: "Double China Hook (+₹3.00)", value: "double-china" },
          { label: "Safety Breakaway (+₹5.00)", value: "safety-breakaway" }
        ],
        defaultValue: "china"
      }
    ]
  },

  // 6. Table Calendars
  {
    id: "calendars",
    slug: "custom-calendars",
    name: "Custom Table Calendars",
    category: "Calendars & Planners",
    basePrice: 135.00,
    description: "Premium wire-o bound desk table calendars, available in classic landscape rectangle and modern balanced square layouts. Excellent end-of-year custom gifts.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 46,
    badge: "Corporate Favorite",
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "rectangle-calendar",
        name: "Rectangle Table Desk Calendar (Landscape)",
        basePrice: 240.00,
        priceTiers: [
          { min: 10, max: 19, price: 240 },
          { min: 20, max: 29, price: 235 },
          { min: 30, max: 49, price: 225 },
          { min: 50, max: 99, price: 200 },
          { min: 100, max: 199, price: 150 },
          { min: 200, max: 499, price: 145 },
          { min: 500, max: 999999, price: 135 }
        ]
      },
      {
        id: "square-calendar",
        name: "Square Table Desk Calendar (Balanced)",
        basePrice: 280.00,
        priceTiers: [
          { min: 10, max: 19, price: 280 },
          { min: 20, max: 29, price: 265 },
          { min: 30, max: 49, price: 245 },
          { min: 50, max: 99, price: 225 },
          { min: 100, max: 199, price: 180 },
          { min: 200, max: 499, price: 165 },
          { min: 500, max: 999999, price: 140 }
        ]
      }
    ]
  },

  // 7. Custom Apparel & Embroidery
  {
    id: "custom-apparel",
    slug: "custom-apparel",
    name: "Custom Corporate Apparel & Embroidery",
    category: "Apparel & Embroidery",
    basePrice: 0,
    description: "Premium customized t-shirts, hoodies, jackets, and athletic jerseys featuring multi-color prints or structural heavy duty embroidery. Quote based on volume and complexity.",
    moq: 1,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 382,
    badge: "Premium Quality",
    customizerType: "whatsapp-only"
  },

  // 8. Brochures
  {
    id: "brochures",
    slug: "custom-brochures",
    name: "Branded Tri-Fold & Bi-Fold Brochures",
    category: "Marketing Materials",
    basePrice: 15.00,
    description: "Custom folded flyers and multi-page corporate bifold, trifold, and Z-fold brochures. Thick 130 GSM offset paper with clean creasing and dynamic bulk discounts.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.6,
    reviewCount: 52,
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "bifold",
        name: "Bi-Fold Brochures (4 Pages)",
        basePrice: 20.00,
        priceTiers: [
          { min: 10, max: 49, price: 20.00 },
          { min: 50, max: 499, price: 18.00 },
          { min: 500, max: 999, price: 17.50 },
          { min: 1000, max: 2999, price: 16.00 },
          { min: 3000, max: 999999, price: 15.00 }
        ]
      },
      {
        id: "trifold",
        name: "Tri-Fold Brochures (6 Panels)",
        basePrice: 25.00,
        priceTiers: [
          { min: 10, max: 49, price: 25.00 },
          { min: 50, max: 499, price: 23.00 },
          { min: 500, max: 999, price: 22.50 },
          { min: 1000, max: 2999, price: 21.00 },
          { min: 3000, max: 999999, price: 20.00 }
        ]
      },
      {
        id: "zfold",
        name: "Z-Fold Brochures (6 Panels Accordion)",
        basePrice: 25.00,
        priceTiers: [
          { min: 10, max: 49, price: 25.00 },
          { min: 50, max: 499, price: 23.00 },
          { min: 500, max: 999, price: 22.50 },
          { min: 1000, max: 2999, price: 21.00 },
          { min: 3000, max: 999999, price: 20.00 }
        ]
      }
    ]
  },

  // 9. Diaries
  {
    id: "diaries",
    slug: "corporate-diaries",
    name: "Corporate Brand Notebook Diaries",
    category: "Calendars & Planners",
    basePrice: 275.00,
    description: "Luxury hardbound corporate diaries in A4 and A5 sizes. Includes debossed covers, satin ribbons, ruled pages, and dynamic company logo engraving.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 77,
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "a5-diary",
        name: "A5 Hardbound Diary",
        basePrice: 310.00,
        priceTiers: [
          { min: 10, max: 49, price: 310 },
          { min: 50, max: 99, price: 305 },
          { min: 100, max: 299, price: 300 },
          { min: 300, max: 499, price: 295 },
          { min: 500, max: 999, price: 290 },
          { min: 1000, max: 999999, price: 275 }
        ]
      },
      {
        id: "a4-diary",
        name: "A4 Hardbound Diary (Large Desk Size)",
        basePrice: 450.00,
        priceTiers: [
          { min: 10, max: 49, price: 450 },
          { min: 50, max: 99, price: 430 },
          { min: 100, max: 299, price: 410 },
          { min: 300, max: 499, price: 390 },
          { min: 500, max: 999, price: 370 },
          { min: 1000, max: 999999, price: 350 }
        ]
      }
    ]
  },

  // 10. Promotional Cards & Display
  {
    id: "promotional-cards",
    slug: "promotional-cards",
    name: "Bookmarks & Table Tent Cards",
    category: "Marketing Materials",
    basePrice: 5.00,
    description: "Laminated cardstock bookmarks and table top tent cards. Extremely effective for restaurant menus, promotional counter displays, and custom reading inserts.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.5,
    reviewCount: 39,
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "bookmarks",
        name: "Custom Gloss Bookmarks",
        basePrice: 20.00,
        priceTiers: [
          { min: 10, max: 49, price: 20.00 },
          { min: 50, max: 99, price: 18.00 },
          { min: 100, max: 299, price: 16.00 },
          { min: 300, max: 499, price: 12.00 },
          { min: 500, max: 999, price: 10.00 },
          { min: 1000, max: 2999, price: 8.00 },
          { min: 3000, max: 4999, price: 6.00 },
          { min: 5000, max: 999999, price: 5.00 }
        ]
      },
      {
        id: "tent-cards",
        name: "Table Top Tent Cards",
        basePrice: 20.00,
        priceTiers: [
          { min: 10, max: 49, price: 20.00 },
          { min: 50, max: 99, price: 18.00 },
          { min: 100, max: 299, price: 15.00 },
          { min: 300, max: 499, price: 12.00 },
          { min: 500, max: 999, price: 11.00 },
          { min: 1000, max: 2999, price: 10.00 },
          { min: 3000, max: 4999, price: 8.00 },
          { min: 5000, max: 999999, price: 6.00 }
        ]
      }
    ]
  },

  // 11. Stickers, Tags, Mugs & Badges
  {
    id: "stickers-mugs-badges",
    slug: "stickers-mugs-badges",
    name: "Custom Stickers, Tags, Mugs & Badges",
    category: "Promotional Merchandise",
    basePrice: 4.50,
    description: "Printed custom stickers, clothing hang tags, sublimation mugs, pop-up rollup standees, safety-pin badges, and ceiling marketing danglers.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 184,
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "stickers",
        name: "Custom Stickers (Die-cut)",
        basePrice: 25.00,
        priceTiers: [
          { min: 10, max: 49, price: 25.00 },
          { min: 50, max: 99, price: 22.00 },
          { min: 100, max: 299, price: 20.00 },
          { min: 300, max: 499, price: 20.00 },
          { min: 500, max: 999, price: 18.00 },
          { min: 1000, max: 2999, price: 15.00 },
          { min: 3000, max: 4999, price: 8.00 },
          { min: 5000, max: 999999, price: 17.00 } // Typo from pricing.md: 5000->₹17. Keeping it compliant!
        ]
      },
      {
        id: "hang-tags",
        name: "Hang Tags / Clothing Tags",
        basePrice: 12.00,
        priceTiers: [
          { min: 10, max: 49, price: 12.00 },
          { min: 50, max: 99, price: 11.00 },
          { min: 100, max: 299, price: 10.00 },
          { min: 300, max: 499, price: 8.00 },
          { min: 500, max: 999, price: 7.00 },
          { min: 1000, max: 2999, price: 6.50 },
          { min: 3000, max: 4999, price: 5.00 },
          { min: 5000, max: 999999, price: 4.50 }
        ]
      },
      {
        id: "ceramic-mugs",
        name: "Ceramic Mugs (Sublimation Print)",
        basePrice: 200.00,
        priceTiers: [
          { min: 10, max: 49, price: 200 },
          { min: 50, max: 99, price: 180 },
          { min: 100, max: 299, price: 165 },
          { min: 300, max: 499, price: 150 },
          { min: 500, max: 999, price: 140 },
          { min: 1000, max: 2999, price: 130 },
          { min: 3000, max: 4999, price: 120 },
          { min: 5000, max: 999999, price: 110 }
        ]
      },
      {
        id: "standees",
        name: "Premium Roll-up Standees (MOQ 1)",
        basePrice: 1800.00,
        priceTiers: [
          { min: 1, max: 1, price: 1800 },
          { min: 2, max: 2, price: 1750 },
          { min: 3, max: 3, price: 1700 },
          { min: 4, max: 4, price: 1650 },
          { min: 5, max: 5, price: 1600 },
          { min: 6, max: 6, price: 1550 },
          { min: 7, max: 999999, price: 1500 }
        ]
      },
      {
        id: "badges",
        name: "Safety Pin Button Badges (MOQ 25)",
        basePrice: 33.00,
        priceTiers: [
          { min: 25, max: 49, price: 33 },
          { min: 50, max: 74, price: 31 },
          { min: 75, max: 99, price: 29 },
          { min: 100, max: 149, price: 27 },
          { min: 150, max: 299, price: 25 },
          { min: 300, max: 499, price: 22 },
          { min: 500, max: 999999, price: 20 }
        ]
      },
      {
        id: "danglers",
        name: "Ceiling Danglers",
        basePrice: 20.00,
        priceTiers: [
          { min: 10, max: 24, price: 20.00 },
          { min: 25, max: 49, price: 19.50 },
          { min: 50, max: 74, price: 19.00 },
          { min: 75, max: 99, price: 18.50 },
          { min: 100, max: 149, price: 18.00 },
          { min: 150, max: 299, price: 17.00 },
          { min: 300, max: 499, price: 16.00 },
          { min: 500, max: 999999, price: 15.00 }
        ]
      }
    ]
  },

  // 12. Office & Speciality Printing
  {
    id: "office-printing",
    slug: "office-printing",
    name: "Office Forms & Register Books",
    category: "Corporate Stationery",
    basePrice: 7.50,
    description: "Standard duplicate receipt books, A4 invoice books, hardbound register books, adhesive office stickers, and custom printed certificates on thick 300 GSM cards.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 65,
    customizerType: "standard-tiers",
    subproducts: [
      {
        id: "invoice-books",
        name: "Invoice Books (A4, 50 Sets)",
        basePrice: 185.00,
        priceTiers: [
          { min: 10, max: 49, price: 185 },
          { min: 50, max: 99, price: 165 },
          { min: 100, max: 299, price: 150 },
          { min: 300, max: 499, price: 130 },
          { min: 500, max: 999, price: 120 },
          { min: 1000, max: 2999, price: 110 },
          { min: 3000, max: 4999, price: 100 },
          { min: 5000, max: 999999, price: 90 }
        ]
      },
      {
        id: "receipt-books",
        name: "Receipt Books (Duplicate, 50 Sets)",
        basePrice: 155.00,
        priceTiers: [
          { min: 10, max: 49, price: 155 },
          { min: 50, max: 99, price: 135 },
          { min: 100, max: 299, price: 120 },
          { min: 300, max: 499, price: 105 },
          { min: 500, max: 999, price: 95 },
          { min: 1000, max: 2999, price: 85 },
          { min: 3000, max: 4999, price: 75 },
          { min: 5000, max: 999999, price: 65 }
        ]
      },
      {
        id: "register-books",
        name: "Register Books (A4 Hardbound, 100 pgs)",
        basePrice: 285.00,
        priceTiers: [
          { min: 10, max: 49, price: 285 },
          { min: 50, max: 99, price: 255 },
          { min: 100, max: 299, price: 235 },
          { min: 300, max: 499, price: 215 },
          { min: 500, max: 999, price: 200 },
          { min: 1000, max: 2999, price: 185 },
          { min: 3000, max: 4999, price: 170 },
          { min: 5000, max: 999999, price: 155 }
        ]
      },
      {
        id: "office-labels",
        name: "Adhesive Office Labels",
        basePrice: 25.00,
        priceTiers: [
          { min: 10, max: 49, price: 25.00 },
          { min: 50, max: 99, price: 17.00 },
          { min: 100, max: 299, price: 14.00 },
          { min: 300, max: 499, price: 11.00 },
          { min: 500, max: 999, price: 10.00 },
          { min: 1000, max: 2999, price: 9.00 },
          { min: 3000, max: 4999, price: 8.00 },
          { min: 5000, max: 999999, price: 7.50 }
        ]
      },
      {
        id: "certificates",
        name: "A4 Certificates (300 GSM)",
        basePrice: 25.00,
        priceTiers: [
          { min: 10, max: 49, price: 25 },
          { min: 50, max: 74, price: 23 },
          { min: 75, max: 99, price: 21 },
          { min: 100, max: 149, price: 19 },
          { min: 150, max: 199, price: 17 },
          { min: 200, max: 249, price: 16 },
          { min: 250, max: 299, price: 15 },
          { min: 300, max: 499, price: 14 },
          { min: 500, max: 999999, price: 12 }
        ]
      }
    ]
  }
];
